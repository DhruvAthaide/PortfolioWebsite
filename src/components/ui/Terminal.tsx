import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { useTerminal } from '../../context/TerminalContext';
import { useTerminalLogic, Theme } from '../../hooks/useTerminalLogic.tsx';
import { useSound } from '../../context/SoundContext';
import MatrixEffect from './MatrixEffect';
import TerminalGame from './TerminalGame';

const themeColors: Record<Theme, { bg: string; text: string; border: string }> = {
  default: { bg: 'bg-black/95', text: 'text-green-500', border: 'border-green-500/30' },
  ubuntu: { bg: 'bg-[#300a24]/95', text: 'text-white', border: 'border-orange-500/30' },
  cyberpunk: { bg: 'bg-[#0b0c15]/95', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  retro: { bg: 'bg-[#1a1a1a]/95', text: 'text-amber-500', border: 'border-amber-500/30' },
};

const Terminal: React.FC = () => {
  const { isOpen, closeTerminal } = useTerminal();
  const { playTyping } = useSound();
  const { 
    history, 
    currentInput, 
    setCurrentInput, 
    handleKeyDown, 
    pathString, 
    theme,
    matrixMode,
    gameMode,
    stopGame
  } = useTerminalLogic(closeTerminal);
  
  const [isMaximized, setIsMaximized] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const colors = themeColors[theme];

  // Auto-focus when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Maximize toggle
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Matrix Effect Overlay */}
          {matrixMode && <MatrixEffect />}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag={!isMaximized}
            dragMomentum={false}
            className={`fixed z-[9000] shadow-2xl overflow-hidden flex flex-col font-mono text-sm md:text-base backdrop-blur-md ${colors.bg} ${colors.border} border
            ${isMaximized 
              ? 'inset-2 rounded-lg' 
              : 'bottom-4 right-4 w-[90vw] md:w-[650px] h-[500px] rounded-xl'
            }`}
          >
             {/* CRT Scanline Overlay */}
             <div className="absolute inset-0 pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
             <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent to-black/10 background-size-[100%_4px]"></div>

            {/* Header */}
            <div 
              className={`flex items-center justify-between px-4 py-2 ${colors.border} border-b bg-white/5 handle cursor-move select-none`}
            >
              <div className={`flex items-center gap-2 ${colors.text}`}>
                <TerminalIcon size={16} />
                <span className="font-bold opacity-80">guest@dhruv-portfolio:{pathString}</span>
              </div>
              <div className="flex items-center gap-2 z-20">
                <button 
                  onClick={toggleMaximize}
                  className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors"
                >
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button 
                  onClick={closeTerminal}
                  className="p-1.5 hover:bg-red-500/20 rounded-md text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Content or Game */}
            {gameMode !== 'none' ? (
               <TerminalGame onExit={stopGame} />
            ) : (
                <div 
                  ref={scrollRef}
                  className={`flex-1 p-4 overflow-y-auto ${theme === 'ubuntu' ? 'selection:bg-orange-500/30' : 'selection:bg-green-500/30'} scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent`}
                  onClick={() => inputRef.current?.focus()}
                >
                  <div className="text-gray-400 mb-4 opacity-70">
                    Last login: {new Date().toLocaleString()}<br/>
                    Welcome to PortfoliOS v2.0. Type <span className={`${colors.text} font-bold`}>help</span> to begin.
                  </div>

                  {history.map((entry, i) => (
                    <div key={i} className="mb-2">
                      {entry.input && (
                        <div className={`flex gap-2 ${colors.text} font-bold opacity-90`}>
                          <span>➜</span>
                          <span>{entry.path}</span>
                          <span className={`${theme === 'default' ? 'text-white' : 'text-gray-100'} font-normal`}>{entry.input}</span>
                        </div>
                      )}
                      {entry.output && (
                        <div className="ml-5 mt-1 text-gray-300/90 break-words">
                          {entry.output}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className={`flex gap-2 ${colors.text} font-bold items-center`}>
                    <span>➜</span>
                    <span>{pathString}</span>
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => {
                          setCurrentInput(e.target.value);
                          playTyping();
                        }}
                        onKeyDown={(e) => {
                          playTyping();
                          handleKeyDown(e);
                        }}
                        className={`bg-transparent border-none outline-none w-full font-normal ${theme === 'default' ? 'text-white' : 'text-gray-100'} cursor-text`}
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
