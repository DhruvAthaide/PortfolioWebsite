import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface SoundContextType {
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
  playTyping: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextReff = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction to handle autoplay policies
    const initAudio = () => {
      if (!audioContextReff.current) {
        audioContextReff.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  const playTone = (frequency: number, type: OscillatorType, duration: number, volume: number = 0.1) => {
    if (isMuted || !audioContextReff.current) return;

    const ctx = audioContextReff.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playClick = () => {
    // High pitched short beep
    playTone(1200, 'sine', 0.05, 0.05);
  };

  const playHover = () => {
    // Very subtle rapid blip
    playTone(800, 'sine', 0.03, 0.02);
  };

  const playTyping = () => {
    // Mechanical click sound simulation
    if (isMuted || !audioContextReff.current) return;
    
    // Use filtered noise for a "clack" sound
    const ctx = audioContextReff.current;
    if (ctx.state === 'suspended') ctx.resume();

    const t = ctx.currentTime;

    // Create noise buffer
    const bufferSize = ctx.sampleRate * 0.05; // 50ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start();
  };

  const playSuccess = () => {
    // Ascending arpeggio
    if (isMuted || !audioContextReff.current) return;
    const ctx = audioContextReff.current;
    const now = ctx.currentTime;
    
    [440, 554, 659, 880].forEach((freq, i) => {
        setTimeout(() => playTone(freq, 'square', 0.2, 0.1), i * 50);
    });
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <SoundContext.Provider value={{ playClick, playHover, playSuccess, playTyping, isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
