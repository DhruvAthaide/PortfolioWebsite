import { WorkExperience, SkillGroup, EducationItem, Credential } from '../types';

// Kept in line with the two CVs in public/documents. Update both together.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Mobile Engineering',
    skills: [
      'Kotlin', 'Java', 'Dart', 'C++ (NDK/JNI)', 'Jetpack Compose', 'Flutter', 'Android SDK',
      'Coroutines & Flow', 'Room', 'WorkManager', 'CameraX', 'Hilt', 'Retrofit / OkHttp',
      'MVVM & Clean Architecture',
    ],
  },
  {
    title: 'Application Security',
    skills: [
      'Mobile VAPT', 'OWASP MASVS / MASTG', 'OWASP Mobile Top 10', 'Threat Modeling (STRIDE)',
      'Secure SDLC', 'Secure Code Review', 'SAST / DAST', 'SCA', 'CWE / CVSS',
      'Reverse Engineering', 'AOSP & SELinux Hardening', 'Native Anti-Tamper',
    ],
  },
  {
    title: 'Cryptography',
    skills: [
      'AES-256-GCM', 'ChaCha20-Poly1305', 'X3DH & Double Ratchet', 'End-to-End Encryption',
      'ECDSA / Ed25519', 'SQLCipher', 'Hardware-backed Keystore',
    ],
  },
  {
    title: 'Backend & Tooling',
    skills: [
      'TypeScript', 'Python', 'SQL', 'Node.js', 'Express / Fastify', 'Firebase', 'MongoDB',
      'Docker', 'Azure', 'Git', 'CI/CD', 'Burp Suite', 'Frida', 'Ghidra', 'Nmap', 'Wireshark',
    ],
  },
];

export const workExperience: WorkExperience[] = [
  {
    title: 'Cyber Analyst, Mobile & Application Security',
    organization: 'DeepCytes Cyber Labs UK',
    location: 'Mumbai, India',
    period: 'Aug 2025 - Present',
    description: [
      'Own mobile application security end to end for a line of Android apps on Google Play, as sole or lead developer in Kotlin, Flutter and C++. That covers threat modeling, secure code review, pre-release security gating and native C++/NDK anti-tamper hardening.',
      'Conduct mobile VAPT and secure-design reviews against OWASP MASVS/MASTG, identifying access-control, insecure-storage and crypto-misuse findings (CWE-mapped) and driving remediation to closure on retest.',
      'Build offensive Android tooling for red team engagements mapped to MITRE ATT&CK Mobile (covert telemetry, permission analysis, threat intelligence), and contribute to a hardened AOSP distribution with custom kernel modifications for high-assurance (HNI / government) builds.',
      'Define secure-SDLC practice (code review, dependency/SCA checks, release gating) and mentor junior engineers across the mobile line.',
    ],
    logo: '/images/company-deepcytescyberlabs.png',
  },
  {
    title: 'Red Team & Mobile Dev Team Lead (Internship)',
    organization: 'DeepCytes Cyber Labs UK',
    location: 'Mumbai, India',
    period: 'Jul 2024 - Jun 2025',
    description: [
      'Led a cross-functional team across penetration testing, threat intelligence and vulnerability research.',
      'Delivered four enterprise platforms (including an LMS and a SaaS product) and drove the initial architecture of the Torch remote-wipe platform.',
    ],
    certificate: '/documents/DeepcytesJuly24-June25_Internship_CompletionLetter.pdf',
    logo: '/images/company-deepcytescyberlabs.png',
  },
  {
    title: 'Production & Software Testing Intern',
    organization: 'TruBoard Partners',
    location: 'Mumbai, India',
    period: 'Jun 2024 - Aug 2024',
    description: [
      'Fine-tuned a financial covenant detection ML model, improving business process efficiency by 10%.',
      'Built a real-time asset monitoring solution for ride-sharing services.',
    ],
    certificate: '/documents/TruBoard_Internship_CompletionLetter.pdf',
    logo: '/images/company-truboardpartners.png',
  },
  {
    title: 'AI R&D Team Lead (Internship)',
    organization: 'DeepCytes Cyber Labs UK',
    location: 'Remote',
    period: 'Jan 2024 - Jun 2024',
    description: [
      "Conducted applied research on AI's role in cybersecurity, identifying new integration points for the organisation.",
      'Led the Digital Twin project lifecycle from concept through implementation.',
    ],
    certificate: '/documents/DeepcytesJan-July24_Internship_CompletionLetter.pdf',
    logo: '/images/company-deepcytescyberlabs.png',
  },
  {
    title: 'Cyber Security Intern',
    organization: 'DeepCytes Cyber Labs UK',
    location: 'Mumbai, India',
    period: 'Jul 2023 - Dec 2023',
    description: [
      'Contributed to cyber-intelligence research alongside the AI R&D and Deep Web teams.',
      'Researched deep-web threat-actor behaviour to inform organisational security research priorities.',
    ],
    certificate: '/documents/DeepcytesJuly-Dec23_Internship_CompletionLetter.pdf',
    logo: '/images/company-deepcytescyberlabs.png',
  },
];

export const education: EducationItem[] = [
  // Hidden for now. Uncomment to show again.
  // {
  //   title: 'M.S. in Computer Science & Data Analytics',
  //   organization: 'Indian Institute of Technology Patna',
  //   period: 'Aug 2026 - Jul 2028',
  //   description: 'Currently enrolled.',
  // },
  {
    title: 'Bachelor of Computer Applications (BCA)',
    organization: 'Amity University Mumbai',
    period: 'Jul 2022 - Jun 2025',
    description: 'Silver medalist, CGPA 9.69 / 10. Focus on information technology and cybersecurity.',
  },
];

export const publication: Credential = {
  title: 'Design of Comprehensive Mobile Device Vulnerability Checking Application',
  issuer: 'Book chapter 6, IGI Global, 2026. Peer-reviewed, co-author.',
  href: 'https://doi.org/10.4018/979-8-2600-0747-1.ch006',
};

export const orcidUrl = 'https://orcid.org/0009-0000-3554-9798';

export const certifications: Credential[] = [
  {
    title: 'Google Cloud Computing Foundations',
    issuer: 'Google Cloud, via Credly',
    href: 'https://www.credly.com/earner/earned/badge/025b7a41-b223-4269-ba57-ea02f0b86353',
  },
  {
    title: 'Web Developer',
    issuer: 'Google Developer Student Club',
  },
];
