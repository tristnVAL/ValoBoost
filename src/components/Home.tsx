import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2, Zap } from 'lucide-react';
import { fetchPlayerStats } from '../services/riotService';
import { PlayerStats } from '../types';
import { motion } from 'framer-motion';

interface HomeProps {
  onStatsFetched: (stats: PlayerStats) => void;
}

export function Home({ onStatsFetched }: HomeProps) {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [region, setRegion] = useState('na');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !tag) return;

    setLoading(true);
    setError(null);

    try {
      const stats = await fetchPlayerStats(name, tag, region);
      onStatsFetched(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stats. Check your ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-primary select-none opacity-10">
          VALORANT
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12 text-center z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-primary flex items-center justify-center valo-clip shadow-2xl shadow-primary/20"
          >
            <Zap className="w-12 h-12 text-white fill-current" />
          </motion.div>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic">
            Valo<span className="text-primary">Boost</span>
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] font-bold opacity-70">
            Tactical Performance Intelligence
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-muted/20 p-8 border border-border valo-border backdrop-blur-sm">
          <div className="space-y-4">
            <div className="space-y-2 flex flex-col items-center">
              <Label htmlFor="name" className="text-[10px] uppercase font-bold opacity-70">
                Riot Name
              </Label>
              <Input
                id="name"
                placeholder="TenZ"
                className="bg-background border-border h-12 text-center text-lg font-bold"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 flex flex-col items-center">
                <Label htmlFor="tag" className="text-[10px] uppercase font-bold opacity-70">
                  Tag
                </Label>
                <Input
                  id="tag"
                  placeholder="001"
                  className="bg-background border-border h-12 text-center text-lg font-bold"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2 flex flex-col items-center">
                <Label htmlFor="region" className="text-[10px] uppercase font-bold opacity-70">
                  Region
                </Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="bg-background border-border h-12 w-full justify-center font-bold">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="na">NA</SelectItem>
                    <SelectItem value="eu">EU</SelectItem>
                    <SelectItem value="ap">AP</SelectItem>
                    <SelectItem value="kr">KR</SelectItem>
                    <SelectItem value="latam">LATAM</SelectItem>
                    <SelectItem value="br">BR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-destructive text-[10px] uppercase font-bold text-center bg-destructive/10 p-3 border border-destructive/20"
            >
              {error}
            </motion.div>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-[0.3em] h-14 text-lg valo-clip"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Initializing...
              </>
            ) : (
              "Analyze Profile"
            )}
          </Button>
        </form>

        {/* Footer info */}
        <div className="flex justify-center gap-8 opacity-30 text-[10px] uppercase font-bold tracking-[0.2em]">
          <span>v1.0.4</span>
          <span>Riot API Integrated</span>
          <span>Secure Protocol</span>
        </div>
      </motion.div>
    </div>
  );
}
