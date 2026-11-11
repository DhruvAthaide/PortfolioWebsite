import React from 'react';
import { m } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay: number;
  className?: string;
}

/** Fades and lifts its content into view once, the first time it scrolls into the viewport. */
const Reveal: React.FC<RevealProps> = ({ children, delay, className }) => (
  <m.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </m.div>
);

export default Reveal;
