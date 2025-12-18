import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TerminalContextType {
  isOpen: boolean;
  toggleTerminal: () => void;
  closeTerminal: () => void;
  openTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTerminal = () => setIsOpen(prev => !prev);
  const closeTerminal = () => setIsOpen(false);
  const openTerminal = () => setIsOpen(true);

  return (
    <TerminalContext.Provider value={{ isOpen, toggleTerminal, closeTerminal, openTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};
