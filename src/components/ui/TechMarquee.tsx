import React from 'react';
import {
  SiKotlin, SiAndroid, SiJetpackcompose, SiFlutter, SiDart, SiCplusplus, SiTypescript,
  SiPython, SiNodedotjs, SiFirebase, SiMongodb, SiDocker, SiBurpsuite, SiWireshark, SiGit,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import type { IconType } from 'react-icons';

const TECH: { Icon: IconType; name: string }[] = [
  { Icon: SiKotlin, name: 'Kotlin' },
  { Icon: SiAndroid, name: 'Android' },
  { Icon: SiJetpackcompose, name: 'Jetpack Compose' },
  { Icon: SiFlutter, name: 'Flutter' },
  { Icon: SiDart, name: 'Dart' },
  { Icon: FaJava, name: 'Java' },
  { Icon: SiCplusplus, name: 'C++ / NDK' },
  { Icon: SiTypescript, name: 'TypeScript' },
  { Icon: SiPython, name: 'Python' },
  { Icon: SiNodedotjs, name: 'Node.js' },
  { Icon: SiFirebase, name: 'Firebase' },
  { Icon: SiMongodb, name: 'MongoDB' },
  { Icon: SiDocker, name: 'Docker' },
  { Icon: SiBurpsuite, name: 'Burp Suite' },
  { Icon: SiWireshark, name: 'Wireshark' },
  { Icon: SiGit, name: 'Git' },
];

const TechRow: React.FC<{ hidden: boolean }> = ({ hidden }) => (
  <ul className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={hidden}>
    {TECH.map(({ Icon, name }) => (
      <li key={name} className="group flex flex-col items-center gap-2 w-20">
        <Icon
          size={36}
          aria-hidden="true"
          className="text-gray-400 dark:text-dark-300 group-hover:text-primary-600 dark:group-hover:text-secondary-900 transition-colors"
        />
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{name}</span>
      </li>
    ))}
  </ul>
);

/** Seamless infinite marquee: the row is rendered twice and the track slides by exactly -50%. */
const TechMarquee: React.FC = () => (
  <section className="w-full py-12 overflow-hidden border-y border-gray-200 dark:border-dark-600 bg-white/50 dark:bg-dark-700/40">
    <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">
      Technologies &amp; tools
    </h2>
    <div className="relative">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        <TechRow hidden={false} />
        <TechRow hidden={true} />
      </div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 dark:from-dark-800 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 dark:from-dark-800 to-transparent pointer-events-none" />
    </div>
  </section>
);

export default TechMarquee;
