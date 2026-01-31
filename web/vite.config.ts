import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function clarityApi(): Plugin {
  const json = (res: import("http").ServerResponse, status: number, body: unknown) => {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(body));
  };

  const readBody = async (req: import("http").IncomingMessage): Promise<Buffer> => {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  };

  const safetySystem = `
You are an assistant that summarizes medical appointments for a patient.

Rules:
- Do NOT provide diagnosis, treatment recommendations, dosing, or emergency guidance.
- Only summarize what is said; if unsure, state uncertainty.
- Provide patient-centered language and suggested clarification questions.
`.trim();

  return {
    name: "clarity-api",
    configureServer(server) {
      // POST /api/whisper  (raw audio bytes; Content-Type should be audio/*)
      server.middlewares.use("/api/whisper", async (req, res, next) => {
        if (req.method !== "POST") return next();

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          return json(res, 500, {
            error:
              "Missing OPENAI_API_KEY. Create web/.env.local (gitignored) with OPENAI_API_KEY=... and restart the server.",
          });
        }

        try {
          const contentType = (req.headers["content-type"] || "application/octet-stream")
            .toString()
            .split(";")[0]
            .trim();

          const audio = await readBody(req);
          if (!audio.length) return json(res, 400, { error: "Empty audio body." });

          // Whisper accepts webm/mp3/mp4/m4a/wav/etc.
          const ext =
            contentType.includes("webm") ? "webm" : contentType.includes("wav") ? "wav" : "bin";

          const form = new FormData();
          form.append("model", "whisper-1");
          form.append("file", new Blob([audio], { type: contentType }), `audio.${ext}`);

          const r = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}` },
            body: form,
          });

          const data = await r.json().catch(() => ({}));
          if (!r.ok) {
            return json(res, r.status, {
              error: "Whisper transcription failed.",
              details: data,
            });
          }

          return json(res, 200, { text: (data as any)?.text ?? "" });
        } catch (e: any) {
          return json(res, 500, { error: e?.message ?? String(e) });
        }
      });

      // POST /api/prepare-questions  { symptoms: string, goals: string, existing?: string[] }
      server.middlewares.use("/api/prepare-questions", async (req, res, next) => {
        if (req.method !== "POST") return next();

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          return json(res, 500, { error: "Missing OPENAI_API_KEY." });
        }

        try {
          const raw = await readBody(req);
          const payload = JSON.parse(raw.toString("utf-8") || "{}") as {
            symptoms?: string;
            goals?: string;
            existing?: string[];
          };

          const symptoms = (payload.symptoms || "").trim();
          const goals = (payload.goals || "").trim();
          const existing = payload.existing || [];

          if (!symptoms && !goals) {
            return json(res, 400, { error: "Please add some notes about your symptoms or goals first." });
          }

          const excludeClause = existing.length
            ? `\n\nDo NOT repeat any of these already-suggested questions:\n${existing.map((q) => `- ${q}`).join("\n")}`
            : "";

          const prompt = `
A patient is preparing for a medical appointment. Based on their notes, suggest personalized questions they should ask their doctor.

Patient symptoms/observations:
"""
${symptoms || "(none provided)"}
"""

Patient goals for this visit:
"""
${goals || "(none provided)"}
"""
${excludeClause}

Return ONLY valid JSON with exactly this key:
- questions: Array of objects with { "category": string, "question": string }

category should be one of: "Medication", "Lifestyle", "Monitoring", "Diagnosis", "Prevention", "Follow-up"

Generate 3 unique, specific, patient-centered questions.
`.trim();

          const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-4.1-mini",
              temperature: 0.7,
              messages: [
                { role: "system", content: safetySystem },
                { role: "user", content: prompt },
              ],
            }),
          });

          const data = await r.json().catch(() => ({}));
          if (!r.ok) {
            return json(res, r.status, { error: "Question generation failed.", details: data });
          }

          const content = (data as any)?.choices?.[0]?.message?.content ?? "";
          const parsed = (() => {
            try {
              return JSON.parse(content);
            } catch {
              const start = content.indexOf("{");
              const end = content.lastIndexOf("}");
              if (start >= 0 && end > start) {
                return JSON.parse(content.slice(start, end + 1));
              }
              throw new Error("Model did not return valid JSON.");
            }
          })();

          return json(res, 200, parsed);
        } catch (e: any) {
          return json(res, 500, { error: e?.message ?? String(e) });
        }
      });

      // POST /api/visit-insights  { transcript: string }
      server.middlewares.use("/api/visit-insights", async (req, res, next) => {
        if (req.method !== "POST") return next();

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          return json(res, 500, {
            error:
              "Missing OPENAI_API_KEY. Create web/.env.local (gitignored) with OPENAI_API_KEY=... and restart the server.",
          });
        }

        try {
          const raw = await readBody(req);
          const payload = JSON.parse(raw.toString("utf-8") || "{}") as { transcript?: string };
          const transcript = (payload.transcript || "").trim();
          if (!transcript) return json(res, 400, { error: "Missing transcript." });

          const prompt = `
Summarize this medical visit transcript in a patient-centered, non-judgmental way.

Return ONLY valid JSON with exactly these keys:
- summaryBullets: string[]  (3-6 bullets, plain language)
- nextSteps: { title: string, detail?: string }[] (3-8 actionable checklist items)
- followUpQuestions: string[] (3-6 questions the patient can ask next time)
- biasDetection: { score: number, notes: string[] }

The biasDetection.score should be a 0-100 placeholder estimate of dismissive/biased communication signals (0 = none, 100 = frequent). Keep it conservative and explain briefly in notes. Do NOT accuse anyone; just describe language patterns.

For nextSteps:
- Make them practical (tests, follow-ups, questions to ask, paperwork, medication pickup, scheduling).
- Do NOT give diagnosis/treatment advice. If missing info, phrase as “Confirm with clinician: …”.

Transcript:
"""
${transcript}
"""
`.trim();

          const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-4.1-mini",
              temperature: 0.2,
              messages: [
                { role: "system", content: safetySystem },
                { role: "user", content: prompt },
              ],
            }),
          });

          const data = await r.json().catch(() => ({}));
          if (!r.ok) {
            return json(res, r.status, {
              error: "Summary generation failed.",
              details: data,
            });
          }

          const content = (data as any)?.choices?.[0]?.message?.content ?? "";

          // Best-effort JSON parse; if the model includes extra text, try to extract the first JSON object.
          const parsed = (() => {
            try {
              return JSON.parse(content);
            } catch {
              const start = content.indexOf("{");
              const end = content.lastIndexOf("}");
              if (start >= 0 && end > start) {
                return JSON.parse(content.slice(start, end + 1));
              }
              throw new Error("Model did not return valid JSON.");
            }
          })();

          return json(res, 200, parsed);
        } catch (e: any) {
          return json(res, 500, { error: e?.message ?? String(e) });
        }
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  // Load all env vars (not just VITE_-prefixed) so the API middleware can read them
  const env = loadEnv(mode, process.cwd(), "");
  process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;

  return {
    plugins: [react(), clarityApi()],
    // Relative base makes static hosting (e.g., GitHub Pages) safer without hardcoding repo name.
    base: command === "build" ? "./" : "/",
    server: {
      port: 3000,
      strictPort: true,
    },
  };
});