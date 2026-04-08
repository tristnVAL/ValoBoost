export interface PlayerStats {
  adr: number;
  kast: number;
  hsPercent: number;
  winRate: number;
  kdRatio: number;
  firstBloodsPerMatch: number;
  clutchRate: number;
}

export interface Benchmark {
  rank: string;
  stats: PlayerStats;
  color: string;
}

export interface TrainingAdvice {
  statName: string;
  currentValue: number;
  targetValue: number;
  advice: string;
  drills: string[];
}
