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

  // Judgmental/emotional descriptors
  {
    re: /\b(hysterical|overdramatic|overreacting|emotional|dramatic)\b/gi,
    label: "Emotional dismissal language",
    weight: 12,
  },
  {
    re: /\b(difficult|challenging|demanding|exhausting|frustrating|troublesome)\b/gi,
    label: "Characterizing patient as problematic",
    weight: 10,
  },
  {
    re: /\b(manipulative|exaggerating|entitled|attention-seeking|term-seeking)\b/gi,
    label: "Accusatory/suspicious language",
    weight: 12,
  },
  {
    re: /\b(angry|belligerent|combative|confrontational|aggressive|violent|volatile|rude)\b/gi,
    label: "Hostile characterization",
    weight: 11,
  },
  {
    re: /\b(lazy|apathetic|unmotivated|sluggish|passive|indifferent)\b/gi,
    label: "Judgment of patient motivation",
    weight: 9,
  },

  // Non-compliance language
  {
    re: /\b(noncompliant|non-compliant|uncooperative|non-cooperative|refuses?|refusing|resistant)\b/gi,
    label: "Non-compliance/refusal framing",
    weight: 11,
  },
  {
    re: /\b(refuse care|refuse meds|refused treatment)\b/gi,
    label: "Treatment refusal documentation",
    weight: 10,
  },

  // Addiction/substance language
  {
    re: /\b(addict|abuser|substance-seeking|drug-seeking|sickler)\b/gi,
    label: "Stigmatizing addiction language",
    weight: 13,
  },

  // Doubt/disbelief language
  {
    re: /\b(claim(s|ed|ing)?|alleged(ly)?|denies|denied)\b/gi,
    label: "Language suggesting disbelief",
    weight: 10,
  },
  {
    re: /\b(questionable|questioning|skeptical|doubt(ed|ing)?|disbelief|disbelieve)\b/gi,
    label: "Expressing doubt about patient report",
    weight: 11,
  },
  {
    re: /\b(apparently|supposedly|described as|felt to be|viewed as)\b/gi,
    label: "Distancing/skeptical framing",
    weight: 8,
  },
  {
    re: /\b(inconsistent|contradictory|conflicting|unsubstantiated|unconfirmed)\b/gi,
    label: "Questioning patient credibility",
    weight: 10,
  },

  // Negative personality characterizations
  {
    re: /\b(stubborn|oppositional|defensive|controlling|arrogant|condescending|pretentious)\b/gi,
    label: "Negative personality judgments",
    weight: 9,
  },
  {
    re: /\b(needy|dependent|clingy|obsessive|perfectionistic)\b/gi,
    label: "Pathologizing patient needs",
    weight: 9,
  },
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

