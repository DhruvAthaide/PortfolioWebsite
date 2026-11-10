import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import { resumes } from '../../data/resumes';

interface ResumeMenuProps {
  buttonClassName: string;
  children: ReactNode;
  align: 'left' | 'right';
}

/** Button that opens a small menu letting the visitor pick which CV to open. */
const ResumeMenu = ({ buttonClassName, children, align }: ResumeMenuProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        className={buttonClassName}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {children}
        <ChevronDown size={16} className={`ml-1.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-72 z-50 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 shadow-lg p-1.5`}
        >
          {resumes.map((resume) => (
            <a
              key={resume.id}
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 rounded-md px-3 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-dark-600 focus:bg-gray-100 dark:focus:bg-dark-600 outline-none transition-colors"
            >
              <FileText size={18} className="mt-0.5 shrink-0 text-primary-600 dark:text-secondary-900" />
              <span>
                <span className="block text-sm font-semibold text-dark-900 dark:text-white">{resume.label} CV</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">{resume.focus}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeMenu;
