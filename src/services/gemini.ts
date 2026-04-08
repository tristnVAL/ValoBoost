import { GoogleGenAI, Type } from "@google/genai";
import { PlayerStats, TrainingAdvice } from "../types";
import { BENCHMARKS } from "../lib/rating";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getTrainingAdvice(stats: PlayerStats): Promise<TrainingAdvice[]> {
  // Find the next benchmark
  const currentRankIndex = BENCHMARKS.findIndex(b => stats.adr >= b.stats.adr && stats.hsPercent >= b.stats.hsPercent);
  const nextRank = BENCHMARKS[Math.min(BENCHMARKS.length - 1, currentRankIndex + 1)];

  const prompt = `
    Analyze these VALORANT stats and provide training advice to reach the next level (${nextRank.rank}).
    Current Stats:
    - ADR: ${stats.adr} (Target: ${nextRank.stats.adr})
    - HS%: ${stats.hsPercent}% (Target: ${nextRank.stats.hsPercent}%)
    - KAST: ${stats.kast}% (Target: ${nextRank.stats.kast}%)
    - K/D: ${stats.kdRatio} (Target: ${nextRank.stats.kdRatio})
    - Win Rate: ${stats.winRate}% (Target: ${nextRank.stats.winRate}%)

    Focus on the 2 stats that need the most improvement.
    For each, provide:
    1. A brief explanation of why it's important.
    2. 3 specific drills (Aim Labs, The Range, or Deathmatch).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              statName: { type: Type.STRING },
              currentValue: { type: Type.NUMBER },
              targetValue: { type: Type.NUMBER },
              advice: { type: Type.STRING },
              drills: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["statName", "currentValue", "targetValue", "advice", "drills"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error getting training advice:", error);
    return [];
  }
}
