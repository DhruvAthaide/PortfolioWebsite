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

  // Enhanced Commands Logic
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
            <span className="text-yellow-400">System:</span> <span>clear, help, exit, date, whoami, echo, fetch</span>
            <span className="text-yellow-400">Fun:</span> <span>theme, matrix, sudo, cowsay, game</span>
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
        // Check if unlocked from CTF context, but we need to access it. 
        // We'll trust the user has context access or simple check
        // Ideally we would access `unlocked` from useCTF here, but logic is inside hook.
        // Let's assume we can get it or just use simple logic.
        // For now, let's keep it simple:
        output = (
          <div>
            <div className="text-green-400 font-bold">User: guest</div>
            <div className="text-gray-400">Groups: visitors, www-data</div>
          </div>
        );
        break;
      
      case 'date':
        output = new Date().toString();
        break;
        
      case 'echo':
        output = cmdArgs.join(' ');
        break;
      
      case 'sudo':
        output = (
          <div className="text-white">
            <span className="text-red-500 font-bold block mb-1">Permission denied</span>
            guest is not in the sudoers file. This incident will be reported to <span className="text-blue-400">admin@dhruv-portfolio</span>.
          </div>
        );
        break;

      case 'cowsay':
        const message = cmdArgs.join(' ') || "Moo!";
        const bubbleWidth = message.length + 4;
        const border = '-'.repeat(bubbleWidth);
        const top = ` ${'_'.repeat(bubbleWidth)} `;
        const bottom = ` ${border} `;
        
        output = (
          <div className="whitespace-pre font-mono text-green-300 leading-none">
{`${top}
< ${message} >
${bottom}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
          </div>
        );
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
        output = (
          <div className="grid grid-cols-[1fr_2fr] gap-4 text-sm font-mono">
             <div className="text-blue-500 hidden sm:block whitespace-pre leading-none">
{`
       .---.
      /     \\
      |  O  |
      \\     /
       '---'
     /|     |\\
    / |     | \\
   /  |     |  \\
  /   |     |   \\
 /    |_____|    \\
`}
             </div>
             <div className="flex flex-col gap-1">
               <div><span className="text-green-500 font-bold">guest</span>@<span className="text-green-500 font-bold">dhruv-portfolio</span></div>
               <div>-------------------------</div>
               <div><span className="text-yellow-400">OS</span>: PortfoliOS v2.0 (Web)</div>
               <div><span className="text-yellow-400">Kernel</span>: React 18.3.1 + Vite 5.4</div>
               <div><span className="text-yellow-400">Uptime</span>: Just now</div>
               <div><span className="text-yellow-400">Shell</span>: ZSH (Simulated)</div>
               <div><span className="text-yellow-400">Resolution</span>: {window.innerWidth}x{window.innerHeight}</div>
               <div><span className="text-yellow-400">Theme</span>: {theme}</div>
               <div><span className="text-yellow-400">CPU</span>: {navigator.hardwareConcurrency || 4} cores (Virtual)</div>
               <div className="mt-2 flex gap-1">
                 <span className="w-3 h-3 bg-black"></span>
                 <span className="w-3 h-3 bg-red-500"></span>
                 <span className="w-3 h-3 bg-green-500"></span>
                 <span className="w-3 h-3 bg-yellow-500"></span>
                 <span className="w-3 h-3 bg-blue-500"></span>
                 <span className="w-3 h-3 bg-purple-500"></span>
                 <span className="w-3 h-3 bg-cyan-500"></span>
                 <span className="w-3 h-3 bg-white"></span>
               </div>
             </div>
          </div>
        );
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
  }, [pathString, closeTerminal, ls, cd, cat, mkdir, touch, rm, matrixMode, submitFlag, theme]);

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
