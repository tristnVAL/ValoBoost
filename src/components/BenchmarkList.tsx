import React from 'react';
import { motion } from 'framer-motion';
import { PlayerStats, TrainingAdvice } from '../types';
import { BENCHMARKS } from '../lib/rating';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target, TrendingUp, Lightbulb } from 'lucide-react';

interface BenchmarkListProps {
  stats: PlayerStats;
  advice: TrainingAdvice[];
}

export function BenchmarkList({ stats, advice }: BenchmarkListProps) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Rank Benchmarks
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {BENCHMARKS.map((b, i) => {
            const isCurrent = stats.adr >= b.stats.adr && stats.hsPercent >= b.stats.hsPercent;
            const progress = Math.min(100, (stats.adr / b.stats.adr) * 100);
            
            return (
              <div key={b.rank} className={`p-4 border transition-all ${isCurrent ? 'bg-primary/5 border-primary/50' : 'bg-muted/20 border-border opacity-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold uppercase tracking-wider" style={{ color: b.color }}>{b.rank}</span>
                  <span className="text-xs opacity-70 font-mono">ADR Target: {b.stats.adr}</span>
                </div>
                <Progress value={progress} className="h-1 bg-muted" />
              </div>
            );
          })}
        </div>
      </section>

      {advice.length > 0 && (
        <section>
          <h3 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Improvement Path
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advice.map((item, idx) => (
              <motion.div
                key={item.statName}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-muted/30 border-border h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm uppercase tracking-widest flex justify-between">
                      <span>{item.statName}</span>
                      <span className="text-primary">{item.currentValue} → {item.targetValue}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                      "{item.advice}"
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-secondary">
                        <Lightbulb className="w-3 h-3" />
                        Training Drills
                      </div>
                      <ul className="space-y-1">
                        {item.drills.map((drill, i) => (
                          <li key={i} className="text-xs flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {drill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
