import { SiPython, SiKotlin, SiFlutter, SiDart, SiJavascript, SiCplusplus, SiGnubash, SiMysql, SiKalilinux, SiWireshark, SiDocker, SiGit } from 'react-icons/si';
import { FaJava, FaNetworkWired, FaUserSecret, FaBug, FaKey, FaShieldAlt } from 'react-icons/fa';
import { GiSpiderWeb } from 'react-icons/gi';
import { WorkExperience } from '../types';

export const technicalSkills = [
  { name: 'Network Security', percentage: 50, icon: FaNetworkWired },
  { name: 'Web Application Security', percentage: 90, icon: GiSpiderWeb },
  { name: 'Penetration Testing', percentage: 85, icon: FaUserSecret },
  { name: 'Vulnerability Assessment', percentage: 88, icon: FaBug },
  { name: 'Cryptography', percentage: 35, icon: FaKey },
  { name: 'Security Monitoring', percentage: 60, icon: FaShieldAlt }
];

export const programmingSkills = [
  { name: 'Python', percentage: 95, icon: SiPython },
  { name: 'Java', percentage: 90, icon: FaJava },
  { name: 'Kotlin', percentage: 80, icon: SiKotlin },
  { name: 'Flutter', percentage: 70, icon: SiFlutter },
  { name: 'Dart', percentage: 70, icon: SiDart },
  { name: 'JavaScript/TypeScript', percentage: 88, icon: SiJavascript },
  { name: 'C/C++', percentage: 85, icon: SiCplusplus },
  { name: 'Bash Scripting', percentage: 80, icon: SiGnubash },
  { name: 'SQL', percentage: 78, icon: SiMysql }
];

export const toolsSkills = [
  { name: 'Kali Linux', percentage: 90, icon: SiKalilinux },
  { name: 'Wireshark', percentage: 80, icon: SiWireshark },
  { name: 'Metasploit', percentage: 50, icon: FaBug },
  { name: 'Burp Suite', percentage: 50, icon: FaBug },
  { name: 'Docker', percentage: 76, icon: SiDocker },
  { name: 'Git', percentage: 95, icon: SiGit }
];

export const workExperience: WorkExperience[] = [
  {
    title: 'Cyber Analyst - Red Team & Mobile Security',
    organization: 'DeepCytes Cyber Labs UK',
    location: 'Mumbai, Maharashtra',
    period: 'August 2025 - Present',
    description: [
      'Spearheaded red team engagements across 10+ client environments, architecting a modular Android offensive toolkit aligned with the MITRE ATT&CK Mobile framework, improving simulation fidelity by 40%.',
      'Architected a covert Android telemetry platform with real-time, multi-channel data streaming and sub-100ms latency, using STUN/TURN NAT traversal and custom signalling.',
      'Designed a production-grade mobile threat intelligence engine, reducing permission analysis latency by 30% through parallelised traversal and Kotlin Coroutines concurrency handling.',
      'Built a BLE anti-stalking detection system, reducing false positives by 35% across 10,000+ device samples using RSSI modelling and spatial-temporal correlation.',
    ],
    logo: '/images/company-deepcytescyberlabs.png'
  },
  {
    title: 'Red Team & Mobile Dev Team Lead (Internship)',
    organization: 'DeepCytes Cyber Labs UK',
    location: 'Mumbai, Maharashtra',
    period: 'July 2024 - June 2025',
    description: [
      'Led a cross-functional team of 60+ specialists across penetration testing, threat intelligence, and vulnerability research, lifting project completion rates 15% and delivery timelines 25%.',
      'Delivered 4 enterprise-grade platforms, including an LMS and SaaS product, lifting client engagement 35%.',
      'Spearheaded a hardened AOSP distribution with custom kernel-level modifications and hardware security module integration, reducing OS attack surface by 65%.',
    ],
    certificate: '/documents/DeepcytesJuly24-June25_Internship_CompletionLetter.pdf',
    logo: '/images/company-deepcytescyberlabs.png'
  },
  {
    title: 'Production & Software Testing Intern',
    organization: 'TruBoard Partners',
    location: 'Mumbai, Maharashtra',
    period: 'June 2024 - August 2024',
    description: [
      'Fine-tuned a financial covenant detection ML model, improving business process efficiency by 10%.',
      'Built a real-time asset monitoring solution for ride-sharing services, targeting a reduction in operational costs.',
    ],
    certificate: '/documents/TruBoard_Internship_CompletionLetter.pdf',
    logo: '/images/company-truboardpartners.png'
  },
  {
    title: 'AI R&D Team Lead (Internship)',
    organization: 'DeepCytes Cyber Labs UK',
    location: 'Remote',
    period: 'January 2024 - June 2024',
    description: [
      "Conducted applied research on AI's role in cybersecurity, identifying new integration points and improving organizational AI literacy.",
      'Led the Digital Twin project lifecycle from concept through implementation.',
    ],
    certificate: '/documents/DeepcytesJan-July24_Internship_CompletionLetter.pdf',
    logo: '/images/company-deepcytescyberlabs.png'
  },
  {
    title: 'Cyber Security Intern',
    organization: 'DeepCytes Cyber Labs UK',
    location: 'Mumbai, Maharashtra',
    period: 'July 2023 - December 2023',
    description: [
      'Contributed to cyber intelligence research alongside AI R&D and Deep Web teams, improving threat intelligence capabilities by 10%.',
      'Conducted independent research into deep web threat actor behavior, informing organizational security research priorities.',
    ],
    certificate: '/documents/DeepcytesJuly-Dec23_Internship_CompletionLetter.pdf',
    logo: '/images/company-deepcytescyberlabs.png'
  }
];

export const education = [
  {
    title: 'Bachelor of Computer Applications (BCA)',
    organization: 'Amity University Mumbai',
    period: '2022 - 2025',
    description: 'Silver medalist with a CGPA of 9.67/10. Completed my degree with a personal focus on Information Technology and Cybersecurity, gaining a strong foundation in software development and security principles.'
  },
  // {
  //   title: 'Certified Ethical Hacker (CEH)',
  //   organization: 'EC-Council',
  //   period: '2019',
  //   description: 'Professional certification in ethical hacking methodologies and penetration testing techniques.'
  // },
];