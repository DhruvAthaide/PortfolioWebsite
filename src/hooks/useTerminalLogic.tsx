import { useState, useCallback } from 'react';
import { useFileSystem } from './useFileSystem';
import { useCTF } from '../context/CTFContext';

interface CommandEntry {
  input: string;
  output: React.ReactNode;
  path: string;
}

export type Theme = 'default' | 'ubuntu' | 'cyberpunk' | 'retro';

export const useTerminalLogic = (closeTerminal: () => void) => {
  const { currentPath, ls, cd, cat, mkdir, touch, rm } = useFileSystem();
  const { submitFlag } = useCTF();
  
  const [history, setHistory] = useState<CommandEntry[]>([
    { 
      input: '', 
      output: 'Welcome to the system. Type "help" for valid commands.',
      path: '~'
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState('');
  const [tempInput, setTempInput] = useState(''); // Stores input before history navigation
  
  const [theme, setTheme] = useState<Theme>('default');
  const [matrixMode, setMatrixMode] = useState(false);

  const pathString = currentPath.length === 2 && currentPath[0] === 'home' && currentPath[1] === 'guest' 
    ? '~' 
    : '/' + currentPath.join('/');

  const executeCommand = useCallback((cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { input: '', output: '', path: pathString }]);
      return;
    }

    // Split by space but respect quotes (simplified)
    const args = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g)?.map(arg => arg.replace(/^"|"$/g, '')) || [];
    const cmd = args[0]?.toLowerCase();
    const cmdArgs = args.slice(1);

    let output: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-[120px_1fr] gap-2 text-sm">
            <span className="text-yellow-400">File System:</span> <span>ls, cd, cat, mkdir, touch, rm, pwd</span>
            <span className="text-yellow-400">System:</span> <span>clear, help, exit, date, whoami, echo</span>
            <span className="text-yellow-400">Fun:</span> <span>theme, matrix, sudo, fetch, game</span>
            <span className="text-yellow-400">CTF:</span> <span>submit-flag</span>
          </div>
        );
        break;
      
      case 'clear':
        setHistory([]);
        return;
      
      case 'exit':
        closeTerminal();
        return;

      case 'ls': {
        const items = ls();
        // Easter egg for CTF
        if (currentPath.includes('secrets')) {
           output = (
             <div>
               <div className="text-red-500 font-bold mb-2">TOP SECRET // CLASSIFIED</div>
               <div className="text-gray-300">Flag 3: CTF{'{terminal_master}'}</div>
             </div>
           );
        } else {
            output = (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {items.map(item => (
                  <span key={item.name} className={item.type === 'directory' ? 'text-blue-400 font-bold' : 'text-gray-300'}>
                    {item.name}{item.type === 'directory' ? '/' : ''}
                  </span>
                ))}
            </div>
            );
        }
        break;
      }

      case 'cd': {
        const target = cmdArgs[0];
        if (!target) {
           const res = cd('~');
           if (res) output = res;
        } else {
           const res = cd(target);
           if (res) output = <span className="text-red-400">{res}</span>;
        }
        break;
      }

      case 'cat': {
        const target = cmdArgs[0];
        if (!target) output = <span className="text-red-400">Usage: cat [filename]</span>;
        else {
          const content = cat(target);
          if (content.startsWith('Error') || content.startsWith('cat:')) {
            output = <span className="text-red-400">{content}</span>;
          } else {
            output = <div className="whitespace-pre-wrap text-gray-300">{content}</div>;
          }
        }
        break;
      }
      
      case 'mkdir': {
         const target = cmdArgs[0];
         if (!target) output = <span className="text-red-400">Usage: mkdir [dirname]</span>;
         else mkdir(target);
         break;
      }
      
      case 'touch': {
         const target = cmdArgs[0];
         if (!target) output = <span className="text-red-400">Usage: touch [filename]</span>;
         else touch(target);
         break;
      }

      case 'rm': {
         const target = cmdArgs[0];
         if (!target) output = <span className="text-red-400">Usage: rm [filename]</span>;
         else {
            const res = rm(target);
            if (res) output = <span className="text-red-400">{res}</span>;
         }
         break;
      }
      
      case 'pwd':
        output = pathString;
        break;

      case 'whoami':
        output = 'guest';
        break;
      
      case 'date':
        output = new Date().toString();
        break;
        
      case 'echo':
        output = cmdArgs.join(' ');
        break;
      
      case 'sudo':
        output = <span className="text-red-500 font-bold">Permission denied: You are not root. Nice try.</span>;
        break;
      
      case 'matrix':
        setMatrixMode(prev => !prev);
        output = <span className="text-green-500">Matrix mode {matrixMode ? 'deactivated' : 'activated'}.</span>;
        break;
        
      case 'theme': {
        const newTheme = cmdArgs[0] as Theme;
        if (['default', 'ubuntu', 'cyberpunk', 'retro'].includes(newTheme)) {
          setTheme(newTheme);
          output = `Theme set to ${newTheme}`;
        } else {
          output = (
            <div>
              <p>Available themes:</p>
              <div className="flex gap-2">default, ubuntu, cyberpunk, retro</div>
            </div>
          );
        }
        break;
      }
      
      case 'fetch': {
        output = <span className="animate-pulse">Fetching system data... [Error: Connection Refused]</span>;
        break;
      }
      
      case 'game': {
         output = 'Starting game...';
         // We might want to set a short timeout or just set mode immediately
         startGame('snake');
         break;
      }

      case 'submit-flag': {
         const flag = cmdArgs[0];
         if (!flag) {
           output = <span className="text-yellow-400">Usage: submit-flag CTF{'{...}'}</span>;
         } else {
           const success = submitFlag(flag);
           if (success) {
             output = <span className="text-green-500 font-bold">Flag Accepted! Access Level Increased.</span>;
           } else {
             output = <span className="text-red-500">Invalid Flag. This incident will be reported.</span>;
           }
         }
         break;
      }

      default:
        output = <span className="text-red-400">Command not found: {cmd}</span>;
    }

    setHistory(prev => [...prev, { input: cmdString, output, path: pathString }]);
    setHistoryIndex(-1); // Reset history index
  }, [pathString, closeTerminal, ls, cd, cat, mkdir, touch, rm, matrixMode, submitFlag]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
      setTempInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      
      const newIndex = historyIndex + 1;
      if (newIndex < history.length) {
        if (historyIndex === -1) setTempInput(currentInput); // Save current input
        setHistoryIndex(newIndex);
        // History is stored oldest first, but we want to traverse newest first
        // So index 0 is the newest command in our "access logic" but last in array
        const cmd = history[history.length - 1 - newIndex].input;
        setCurrentInput(cmd);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const cmd = history[history.length - 1 - newIndex].input;
        setCurrentInput(cmd);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput(tempInput); // Restore temp input
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const args = currentInput.split(' ');
      const lastArg = args[args.length - 1];
      
      // Command Autocomplete (first word)
      if (args.length === 1) {
        const commands = ['help', 'clear', 'exit', 'ls', 'cd', 'cat', 'mkdir', 'touch', 'rm', 'pwd', 'whoami', 'date', 'echo', 'sudo', 'matrix', 'theme', 'fetch', 'game'];
        const matches = commands.filter(c => c.startsWith(lastArg));
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
        }
      } 
      // File/Folder Autocomplete (subsequent words)
      else if (args.length > 1) {
        const currentFiles = ls().map(item => item.name);
        const matches = currentFiles.filter(f => f.startsWith(lastArg));
        if (matches.length === 1) {
          // Replace the last argument with the match
          args[args.length - 1] = matches[0];
          setCurrentInput(args.join(' '));
        } else if (matches.length > 1) {
          // Optional: Show possibilities? For now, just simplistic autocomplete
        }
      }
    }
  };

  const [gameMode, setGameMode] = useState<'none' | 'snake' | 'cyber'>('none');

  const startGame = (mode: 'snake' | 'cyber') => {
    setGameMode(mode);
  };

  const stopGame = () => {
    setGameMode('none');
    setHistory(prev => [...prev, { input: '', output: 'Game Session Terminated.', path: pathString }]);
  };

  return {
    history,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    pathString,
    theme,
    matrixMode,
    executeCommand,
    gameMode,
    startGame,
    stopGame
  };
};
