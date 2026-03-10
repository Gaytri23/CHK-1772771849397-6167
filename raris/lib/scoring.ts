export function computeRiskScore(
    evidenceCount: number,
    descriptionLength: number,
    hasPatternMatch: boolean
): { score: number; breakdown: Record<string, number>; priority: "LOW" | "MEDIUM" | "HIGH" } {
    const breakdown: Record<string, number> = {};
    let score = 0;

    breakdown.evidence = Math.min(evidenceCount, 3) * 13;
    score += breakdown.evidence;

    breakdown.description = descriptionLength >= 200 ? 20 : descriptionLength >= 100 ? 10 : 0;
    score += breakdown.description;

    breakdown.patternMatch = hasPatternMatch ? 15 : 0;
    score += breakdown.patternMatch;

    breakdown.noEvidencePenalty = evidenceCount === 0 ? -30 : 0;
    score += breakdown.noEvidencePenalty;

    score = Math.min(100, Math.max(0, score));
    const priority = score >= 70 ? "HIGH" : score >= 40 ? "MEDIUM" : "LOW";

    return { score, breakdown, priority };
}
