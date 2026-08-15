import { useEffect, useState } from 'react';

const QUERY = '(pointer: fine)';

function getIsFinePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches;
}

// True for mouse/trackpad input, false for touch-only devices.
// Used to skip the custom cursor where it can't work correctly.
export function useFinePointer(): boolean {
  const [isFinePointer, setIsFinePointer] = useState(getIsFinePointer);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = (event: MediaQueryListEvent) => setIsFinePointer(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isFinePointer;
}
