export type BiasDetection = {
  /** 0 = none, 100 = frequent. Placeholder heuristic. */
  score: number;
  flags: string[];
};

const DEFAULT_PATTERNS: Array<{ re: RegExp; label: string; weight: number }> = [
  { re: /\bjust\b/gi, label: 'Uses "just" (minimizing)', weight: 4 },
  { re: /\bnothing to worry\b/gi, label: 'Dismissive reassurance', weight: 10 },
  { re: /\bit's normal\b/gi, label: 'Potential minimization ("normal")', weight: 6 },
  { re: /\bstress\b|\banxiety\b/gi, label: "Attributing to stress/anxiety", weight: 6 },
  { re: /\byou're young\b/gi, label: "Age-based dismissal", weight: 8 },
  { re: /\bcome back if\b/gi, label: "Deflection to later follow-up", weight: 5 },
  { re: /\bwe don't need\b/gi, label: "Shutting down options", weight: 6 },
];

export function computeBiasDetection(text: string, patterns = DEFAULT_PATTERNS): BiasDetection {
  const clean = (text || "").trim();
  if (!clean) return { score: 0, flags: [] };

  const flags: string[] = [];
  let raw = 0;

  for (const p of patterns) {
    const matches = clean.match(p.re);
    if (!matches?.length) continue;
    flags.push(p.label);
    raw += Math.min(matches.length, 3) * p.weight; // cap per-pattern
  }

  // Map raw → 0..100 with a soft cap.
  const score = Math.max(0, Math.min(100, Math.round(raw)));
  return { score, flags };
}

