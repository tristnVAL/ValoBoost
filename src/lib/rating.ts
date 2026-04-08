import { PlayerStats, Benchmark } from '../types';

export const BENCHMARKS: Benchmark[] = [
  {
    rank: 'Iron',
    color: '#3F4245',
    stats: { adr: 90, kast: 60, hsPercent: 8, winRate: 45, kdRatio: 0.7, firstBloodsPerMatch: 0.5, clutchRate: 5 }
  },
  {
    rank: 'Bronze',
    color: '#8C5230',
    stats: { adr: 110, kast: 65, hsPercent: 12, winRate: 48, kdRatio: 0.85, firstBloodsPerMatch: 1.0, clutchRate: 8 }
  },
  {
    rank: 'Silver',
    color: '#A9B0B3',
    stats: { adr: 125, kast: 68, hsPercent: 16, winRate: 50, kdRatio: 0.95, firstBloodsPerMatch: 1.5, clutchRate: 12 }
  },
  {
    rank: 'Gold',
    color: '#EBC74F',
    stats: { adr: 140, kast: 71, hsPercent: 20, winRate: 51, kdRatio: 1.05, firstBloodsPerMatch: 2.0, clutchRate: 15 }
  },
  {
    rank: 'Platinum',
    color: '#2EB0E3',
    stats: { adr: 150, kast: 73, hsPercent: 24, winRate: 52, kdRatio: 1.15, firstBloodsPerMatch: 2.5, clutchRate: 18 }
  },
  {
    rank: 'Diamond',
    color: '#B684F5',
    stats: { adr: 160, kast: 75, hsPercent: 27, winRate: 53, kdRatio: 1.25, firstBloodsPerMatch: 3.0, clutchRate: 21 }
  },
  {
    rank: 'Ascendant',
    color: '#249B61',
    stats: { adr: 170, kast: 77, hsPercent: 30, winRate: 54, kdRatio: 1.35, firstBloodsPerMatch: 3.5, clutchRate: 24 }
  },
  {
    rank: 'Immortal',
    color: '#B3334B',
    stats: { adr: 185, kast: 79, hsPercent: 33, winRate: 55, kdRatio: 1.5, firstBloodsPerMatch: 4.0, clutchRate: 28 }
  },
  {
    rank: 'Radiant',
    color: '#F9E6A1',
    stats: { adr: 200, kast: 82, hsPercent: 36, winRate: 58, kdRatio: 1.7, firstBloodsPerMatch: 5.0, clutchRate: 35 }
  }
];

export function calculateVRating(stats: PlayerStats): number {
  // Weights (Total = 100)
  const weights = {
    adr: 30,
    kast: 25,
    hsPercent: 15,
    winRate: 15,
    kdRatio: 15
  };

  // Normalize scores (0-100) based on Radiant benchmarks
  const radiant = BENCHMARKS[BENCHMARKS.length - 1].stats;
  
  const nADR = Math.min(100, (stats.adr / radiant.adr) * 100);
  const nKAST = Math.min(100, (stats.kast / radiant.kast) * 100);
  const nHS = Math.min(100, (stats.hsPercent / radiant.hsPercent) * 100);
  const nWin = Math.min(100, (stats.winRate / radiant.winRate) * 100);
  const nKD = Math.min(100, (stats.kdRatio / radiant.kdRatio) * 100);

  const score = (
    (nADR * weights.adr) +
    (nKAST * weights.kast) +
    (nHS * weights.hsPercent) +
    (nWin * weights.winRate) +
    (nKD * weights.kdRatio)
  ) / 100;

  return Math.round(score * 10) / 10;
}

export function getRankFromStats(stats: PlayerStats): Benchmark {
  const rating = calculateVRating(stats);
  // Find the highest benchmark where stats are mostly met or rating matches
  // For simplicity, we use the rating to map to a rank
  const index = Math.min(BENCHMARKS.length - 1, Math.floor((rating / 100) * BENCHMARKS.length));
  return BENCHMARKS[index];
}
