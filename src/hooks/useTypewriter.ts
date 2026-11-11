import { useEffect, useState } from 'react';

interface TypewriterTiming {
  typeMs: number;
  deleteMs: number;
  holdMs: number;
}

/**
 * Cycles through `phrases`, typing and deleting one character at a time.
 * Returns the full first phrase immediately (no animation) when the user prefers reduced motion.
 */
export function useTypewriter(phrases: readonly string[], timing: TypewriterTiming): string {
  const [reducedMotion] = useState<boolean>(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return;
    const phrase = phrases[index];

    if (!deleting && length === phrase.length) {
      const hold = setTimeout(() => setDeleting(true), timing.holdMs);
      return () => clearTimeout(hold);
    }
    if (deleting && length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const step = setTimeout(
      () => setLength((l) => l + (deleting ? -1 : 1)),
      deleting ? timing.deleteMs : timing.typeMs,
    );
    return () => clearTimeout(step);
  }, [reducedMotion, phrases, index, length, deleting, timing.typeMs, timing.deleteMs, timing.holdMs]);

  if (phrases.length === 0) return '';
  return reducedMotion ? phrases[0] : phrases[index].slice(0, length);
}
