# HealthiHer -- AI Medical Visit Companion

Built for HackViolet 2026.

HealthiHer helps people get more out of their doctor visits. It's a web app that walks you through the full appointment lifecycle: preparing questions beforehand, recording the conversation, and then turning that recording into a plain-language summary with follow-up questions, next steps, and jargon definitions.

The idea is simple -- most people walk out of a doctor's appointment and immediately forget half of what was said. HealthiHer fixes that.

## What it does

**Before the appointment** -- You jot down symptoms and goals (typing or voice). Hit "Start AI Analysis" and it generates personalized questions to ask your doctor, organized by category. You can save the ones you like, star favorites, and tap "More" to get additional suggestions.

**During the appointment** -- A minimal recording screen stays out of your way. Start/stop recording, see a timer, and glance at your prepared questions.

**After the appointment** -- Record + Generate transcribes the audio (Whisper) and feeds it to GPT to produce:
- Bullet-point visit summary
- Actionable next-steps checklist
- Medical terms explained in plain language
- Suggested follow-up questions for your next visit
- Experimental bias detection (flags dismissive language patterns)

**Reflection** -- Rate how the conversation felt. Did you feel heard? Was the plan clear?

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- OpenAI API (Whisper for transcription, GPT-4.1-mini for everything else)
- No separate backend -- API routes run as Vite dev server middleware

## Getting started

```bash
cd web
npm install
```

Create a `.env` file in the `web/` directory:

```
OPENAI_API_KEY=your-key-here
```

Then start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

## Project structure

```
web/
  src/
    pages/
      WelcomeSignIn.tsx          -- Login screen
      HealthJournalTimeline.tsx  -- Home / journal feed
      PrepareForAppointment.tsx  -- Pre-visit notes + AI questions
      AppointmentAssistant.tsx   -- Recording screen
      VisitSummaryInsights.tsx   -- Post-visit summary + insights
      AppointmentReflection.tsx  -- Communication reflection
      Profile.tsx                -- User profile
    lib/
      biasScore.ts               -- Client-side bias detection heuristics
  vite.config.ts                 -- API middleware (Whisper + GPT endpoints)
```

## Notes

- Audio is recorded in-browser and only sent to OpenAI when you explicitly generate insights. Nothing is stored server-side.
- The bias detection feature is experimental. It combines a local keyword heuristic with a GPT-based analysis. It's meant to be informational, not accusatory.
- Auth and data persistence are stubbed out -- this is a hackathon prototype. Prepared questions persist in localStorage.
- The app does not provide medical advice. It summarizes what was said and helps you ask better questions.
