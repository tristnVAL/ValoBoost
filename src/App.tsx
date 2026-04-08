import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayerStats, TrainingAdvice } from './types';
import { RatingDisplay } from './components/RatingDisplay';
import { BenchmarkList } from './components/BenchmarkList';
import { Home } from './components/Home';
import { LoadingScreen } from './components/LoadingScreen';
import { getTrainingAdvice } from './services/gemini';
import { Button } from './components/ui/button';
import { Shield, Zap, Target, BarChart3, ArrowLeft } from 'lucide-react';

export default function App() {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [advice, setAdvice] = useState<TrainingAdvice[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'home' | 'dashboard'>('home');

  const handleAnalyze = async (currentStats: PlayerStats) => {
    setLoading(true);
    try {
      const result = await getTrainingAdvice(currentStats);
      setAdvice(result);
      setView('dashboard');
    } catch (error) {
      console.error("Failed to get advice", error);
    } finally {
      // Small artificial delay for the loading screen effect
      setTimeout(() => setLoading(false), 800);
    }
  };

  const handleStatsFetched = (newStats: PlayerStats) => {
    setStats(newStats);
    handleAnalyze(newStats);
  };

  const handleReset = () => {
    setStats(null);
    setAdvice([]);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {view === 'home' ? (
        <Home onStatsFetched={handleStatsFetched} />
      ) : (
        <>
          {/* Header */}
          <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
                <div className="w-8 h-8 bg-primary flex items-center justify-center valo-clip">
                  <Zap className="w-5 h-5 text-white fill-current" />
                </div>
                <span className="font-black text-xl tracking-tighter uppercase italic">ValoBoost</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReset}
                className="font-bold uppercase tracking-widest text-[10px] opacity-70 hover:opacity-100 flex items-center gap-2"
              >
                <ArrowLeft className="w-3 h-3" />
                New Analysis
              </Button>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8 max-w-6xl">
            <AnimatePresence mode="wait">
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                
                {/* Left Column: Summary & Quick Stats */}
                <div className="lg:col-span-4 space-y-8">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                      Performance <br />
                      <span className="text-primary">Intelligence</span>
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Combat logs analyzed. Your tactical profile has been generated based on recent competitive performance.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-6 bg-muted/30 border border-border flex flex-col gap-3 valo-border">
                        <Shield className="w-5 h-5 text-secondary" />
                        <div>
                          <span className="text-[10px] uppercase font-bold opacity-50 block mb-1">KAST Stability</span>
                          <span className="text-3xl font-mono font-bold">{stats?.kast}%</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">Percentage of rounds with Kill, Assist, Survival, or Traded.</p>
                      </div>
                      
                      <div className="p-6 bg-muted/30 border border-border flex flex-col gap-3 valo-border">
                        <Target className="w-5 h-5 text-primary" />
                        <div>
                          <span className="text-[10px] uppercase font-bold opacity-50 block mb-1">Clutch Factor</span>
                          <span className="text-3xl font-mono font-bold">{stats?.clutchRate}%</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">Success rate in 1vX situations during recent matches.</p>
                      </div>

                      <div className="p-6 bg-muted/30 border border-border flex flex-col gap-3 valo-border">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <div>
                          <span className="text-[10px] uppercase font-bold opacity-50 block mb-1">First Blood Impact</span>
                          <span className="text-3xl font-mono font-bold">{stats?.firstBloodsPerMatch}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">Average opening duels won per match.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Rating & Benchmarks */}
                <div className="lg:col-span-8 space-y-12">
                  <div className="bg-muted/10 border border-border valo-border overflow-hidden shadow-2xl shadow-primary/5">
                    <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-widest">V-Rating Dashboard</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary animate-pulse" />
                        <div className="w-2 h-2 bg-muted" />
                        <div className="w-2 h-2 bg-muted" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                      <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-transparent">
                        {stats && <RatingDisplay stats={stats} />}
                      </div>
                      <div className="p-8 overflow-y-auto max-h-[700px]">
                        {stats && <BenchmarkList stats={stats} advice={advice} />}
                      </div>
                    </div>
                  </div>

                  {/* Footer micro-info */}
                  <div className="flex flex-wrap gap-8 opacity-30 text-[10px] uppercase font-bold tracking-[0.2em]">
                    <span>Protocol: ValoBoost-v1.0.4</span>
                    <span>Status: Tactical Analysis Active</span>
                    <span>Source: Riot API Live</span>
                    <span>Encrypted Connection: Secure</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}

      {/* Background Decor */}
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-20 text-[20vw] font-black text-primary select-none rotate-90 opacity-20">
          VALORANT
        </div>
      </div>
    </div>
  );
}

