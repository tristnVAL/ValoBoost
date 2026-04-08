import React from 'react';
import { motion } from 'framer-motion';
import { calculateVRating, getRankFromStats } from '../lib/rating';
import { PlayerStats } from '../types';

interface RatingDisplayProps {
  stats: PlayerStats;
}

export function RatingDisplay({ stats }: RatingDisplayProps) {
  const rating = calculateVRating(stats);
  const rank = getRankFromStats(stats);

  return (
    <div className="flex flex-col items-center justify-center p-8 relative">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="754"
            initial={{ strokeDashoffset: 754 }}
            animate={{ strokeDashoffset: 754 - (754 * rating) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-primary"
          />
        </svg>

        {/* Inner Content */}
        <div className="text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            key={rating}
            className="text-7xl font-black font-mono tracking-tighter"
          >
            {rating}
          </motion.div>
          <div className="text-xs uppercase tracking-[0.3em] opacity-50 font-bold">V-Rating</div>
        </div>

        {/* Rank Badge */}
        <motion.div 
          className="absolute -bottom-4 bg-primary text-primary-foreground px-6 py-1 font-bold uppercase tracking-widest text-sm valo-clip"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {rank.rank}
        </motion.div>
      </div>
      
      <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-md">
        <div className="text-center">
          <div className="text-2xl font-bold font-mono">{stats.adr}</div>
          <div className="text-[10px] uppercase opacity-50">ADR</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold font-mono">{stats.hsPercent}%</div>
          <div className="text-[10px] uppercase opacity-50">HS%</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold font-mono">{stats.kdRatio}</div>
          <div className="text-[10px] uppercase opacity-50">K/D</div>
        </div>
      </div>
    </div>
  );
}
