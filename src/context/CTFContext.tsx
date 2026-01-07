import React, { createContext, useContext, useState, useEffect } from 'react';

interface CTFContextType {
  flagsFound: string[];
  submitFlag: (flag: string) => boolean;
  unlocked: boolean;
  secretHidden: boolean;
  hideSecret: () => void;
}

const CTFContext = createContext<CTFContextType | undefined>(undefined);

const FLAGS = {
  HTML: 'CTF{dom_explorer}',
  CONSOLE: 'CTF{console_ninja}',
  TERMINAL: 'CTF{terminal_master}'
};

export const CTFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flagsFound, setFlagsFound] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [secretHidden, setSecretHidden] = useState(false);

  useEffect(() => {
    // Load progress from local storage
    const savedFlags = localStorage.getItem('ctf_flags');
    if (savedFlags) {
      const parsed = JSON.parse(savedFlags);
      setFlagsFound(parsed);
      if (parsed.length === Object.keys(FLAGS).length) {
        setUnlocked(true);
      }
    }
    
    // Load hidden state
    const savedHidden = localStorage.getItem('ctf_secret_hidden');
    if (savedHidden === 'true') {
      setSecretHidden(true);
    }

    // Hide Flag 2: Console
    const consoleFlag = () => {
       console.log(
         '%c⚠️ WARNING: UNAUTHORIZED ACCESS DETECTED ⚠️', 
         'color: red; font-size: 20px; font-weight: bold;'
       );
       console.log(
         '%cJust kidding. Great job looking here! Here is your flag: CTF{console_ninja}', 
         'color: #00ff00; font-size: 14px;'
       );
    };
    
    // We want this to run once, but console can be noisy. 
    // Let's attach it to window so it's always there if they look
    (window as any).debug_ctf = consoleFlag;
    consoleFlag();

  }, []);

  const submitFlag = (flag: string) => {
    // Verify flag
    const validFlags = Object.values(FLAGS);
    if (validFlags.includes(flag) && !flagsFound.includes(flag)) {
      const newFlags = [...flagsFound, flag];
      setFlagsFound(newFlags);
      localStorage.setItem('ctf_flags', JSON.stringify(newFlags));
      
      if (newFlags.length === validFlags.length) {
        setUnlocked(true);
        // If they just unlocked it, make sure it's not hidden (in case they reset/re-did it)
        setSecretHidden(false);
        localStorage.setItem('ctf_secret_hidden', 'false');
        alert('🎉 CONGRATULATIONS! You have unlocked the Secret Project! Check the Projects page.');
      } else {
        alert(`🚩 Flag Captured! (${newFlags.length}/${validFlags.length})`);
      }
      return true;
    }
    return false;
  };
  
  const hideSecret = () => {
    setSecretHidden(true);
    localStorage.setItem('ctf_secret_hidden', 'true');
  };

  return (
    <CTFContext.Provider value={{ flagsFound, submitFlag, unlocked, secretHidden, hideSecret }}>
      {children}
    </CTFContext.Provider>
  );
};

export const useCTF = () => {
  const context = useContext(CTFContext);
  if (context === undefined) {
    throw new Error('useCTF must be used within a CTFProvider');
  }
  return context;
};
