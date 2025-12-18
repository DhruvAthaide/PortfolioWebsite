import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTerminal } from '../../context/TerminalContext';

interface Command {
  input: string;
  output: React.ReactNode;
}

const Terminal: React.FC = () => {
  const { isOpen, closeTerminal } = useTerminal();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([
    { input: '', output: 'Welcome to the interactive terminal. Type "help" to see available commands.' }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const command = args[0];
    
    let output: React.ReactNode = '';

    switch (command) {
      case 'help':
        output = (
          <div className="space-y-1 text-green-400">
            <p>Available commands:</p>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span>help</span> <span>Show this help message</span>
              <span>clear</span> <span>Clear the terminal</span>
              <span>ls</span> <span>List available pages/directories</span>
              <span>cd [page]</span> <span>Navigate to a page</span>
              <span>whoami</span> <span>Display current user info</span>
              <span>cat [file]</span> <span>Read a file</span>
              <span>exit</span> <span>Close the terminal</span>
            </div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'ls':
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-blue-400">
            <span>home/</span>
            <span>about/</span>
            <span>projects/</span>
            <span>contact/</span>
            <span className="text-gray-400">skills.txt</span>
            <span className="text-gray-400">contact.txt</span>
          </div>
        );
        break;
      case 'cd':
        if (args[1]) {
          const path = args[1].replace('/', '');
          if (['home', 'about', 'projects', 'contact'].includes(path)) {
            navigate(path === 'home' ? '/' : `/${path}`);
            output = `Navigating to /${path}...`;
          } else if (path === '..') {
            navigate(-1);
            output = 'Navigating back...';
          } else {
            output = <span className="text-red-400">Directory not found: {args[1]}</span>;
          }
        } else {
          navigate('/');
          output = 'Navigating to home...';
        }
        break;
      case 'whoami':
        output = 'guest@dhruv-portfolio';
        break;
      case 'cat':
        if (args[1] === 'skills.txt') {
          output = (
            <div className="text-yellow-400">
              <p>Red Team Analysis, Penetration Testing, Python, React, Android Security...</p>
            </div>
          );
        } else if (args[1] === 'contact.txt') {
          output = (
            <div className="text-yellow-400">
              <p>Email: athaidedhruv@gmail.com</p>
              <p>Location: Mumbai, India</p>
            </div>
          );
        } else if (!args[1]) {
          output = <span className="text-red-400">Usage: cat [filename]</span>;
        } else {
          output = <span className="text-red-400">File not found: {args[1]}</span>;
        }
        break;
      case 'exit':
        closeTerminal();
        return;
      case '':
        output = '';
        break;
      default:
        output = <span className="text-red-400">Command not found: {command}. Type "help" for assistance.</span>;
    }

    setHistory(prev => [...prev, { input: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed z-50 bg-black/90 border border-green-500/30 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col font-mono text-sm md:text-base ${
            isMaximized 
              ? 'inset-4 rounded-lg' 
              : 'bottom-4 right-4 w-[90vw] md:w-[600px] h-[400px] rounded-lg'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-green-500/20 handle cursor-move">
            <div className="flex items-center gap-2 text-green-500">
              <TerminalIcon size={16} />
              <span className="font-bold">guest@dhruv-portfolio:~</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
              >
                {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button 
                onClick={closeTerminal}
                className="p-1 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto text-gray-300 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, i) => (
              <div key={i} className="mb-2">
                {entry.input && (
                  <div className="flex gap-2 text-green-500">
                    <span>$</span>
                    <span className="text-white">{entry.input}</span>
                  </div>
                )}
                <div className="ml-4 mt-1">{entry.output}</div>
              </div>
            ))}
            
            <div className="flex gap-2 text-green-500 items-center">
              <span>$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-white flex-1 min-w-0"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="w-2 h-4 bg-green-500 animate-pulse"></span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
