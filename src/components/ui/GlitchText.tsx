import React from 'react';

interface GlitchTextProps {
  text: string;
}

/** Text with offset red/cyan copies that split apart on hover. The copies are hidden from screen readers. */
const GlitchText: React.FC<GlitchTextProps> = ({ text }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{text}</span>
    <span
      aria-hidden="true"
      className="absolute inset-0 -z-10 text-rose-500 opacity-0 select-none transition-[opacity,transform] duration-100 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:translate-y-[2px]"
    >
      {text}
    </span>
    <span
      aria-hidden="true"
      className="absolute inset-0 -z-10 text-sky-500 opacity-0 select-none transition-[opacity,transform] duration-100 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]"
    >
      {text}
    </span>
  </span>
);

export default GlitchText;
