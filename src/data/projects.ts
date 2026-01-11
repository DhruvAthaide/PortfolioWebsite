import { Project } from '../components/ui/ProjectCard';

export const projects: Project[] = [
  {
    id: 'dc-guardient',
    title: 'Guardient',
    description: 'A mobile threat defense Android app that detects risky applications using permission intelligence, heuristic risk scoring, and cloud-verified file scanning.',
    image: '/images/projects-dc-guardient.png',
    technologies: ['Kotlin','XML','Azure','Android Studio'],
    playstore: 'https://play.google.com/store/apps/details?id=com.deepcytes.guardient',
    status: 'completed',
    longDescription: 'Guardient is a mobile threat defense application developed for Deepcytes Cyber Labs (UK) that analyzes Android apps and files using permission-based heuristics instead of traditional signature-only detection. It performs SHA-256 cloud-verified file scanning and evaluates dangerous permission combinations to generate clear risk scores, while remaining lightweight and performance-efficient.',
    features: [
      'Cloud-verified file scanning using SHA-256 hashes',
      'Permission-based heuristic risk scoring',
      'Detection of dangerous permission combinations',
      'App source verification and secure app management'
    ],
    challenges: [
      'Scanning large file systems without impacting device performance.',
      'Identifying risky applications without relying on known malware signatures.',
      'Ensuring reliable background execution across different Android versions.'
    ],
    solutions: [
      'Implemented optimized background scanning using Kotlin Coroutines and Foreground Services.',
      'Designed a heuristic risk-scoring model based on permission combinations and app sources.',
      'Used intelligent caching with cloud-verified SHA-256 checks to reduce scan overhead.'
    ],
    category: 'Android'
  },
  {
    id: 'dc-nosurveil',
    title: 'NoSurveil',
    description: 'A privacy-first Android app that detects physical and digital tracking using heuristic location analysis and real-time Bluetooth scanning.',
    image: '/images/projects-dc-nosurveil.png',
    technologies: ['Kotlin','XML','Android Studio'],
    playstore: 'https://play.google.com/store/apps/details?id=com.deepcytes.nosurveil',
    status: 'completed',
    longDescription: 'NoSurveil is an advanced anti-surveillance Android application built for Deepcytes Cyber Labs (UK) and its built to identify physical stalking and covert tracking threats. It uses heuristic spatial-temporal analysis to correlate a user\'s movement with nearby devices, detecting persistent following patterns rather than simple proximity. The app combines real-time BLE scanning, local-first data processing, and visual threat reporting to surface potential trackers while preserving user privacy.',
    features: [
      'Heuristic following detection via movement correlation',
      'Real-time Bluetooth LE tracker scanning',
      'On-device PDF threat reports with visual analysis',
      'Local-first privacy architecture using Room'
    ],
    challenges: [
      'Differentiating stalking behavior from normal proximity',
      'Continuous scanning without excessive battery drain',
      'Making complex threat data easy to understand'
    ],
    solutions: [
      'Custom heuristic scoring using direction, distance, and time alignment',
      'Optimized Foreground Services with efficient scan intervals',
      'Visual, on-device intelligence reports for non-technical users'
    ],
    category: 'Android'
  },
  {
    id: 'dc-lockguard',
    title: 'LockGuard',
    description: 'A privacy-first Android security app that silently captures evidence of unauthorized device access while keeping all data fully local.',
    image: '/images/projects-dc-lockguard.png',
    technologies: ['Kotlin','XML','Android Studio'],
    playstore: 'https://play.google.com/store/apps/details?id=com.deepcytes.lockguard',
    status: 'completed',
    longDescription: 'LockGuard is a privacy-focused Android security application built for Deepcytes Cyber Labs (UK) that captures intruder photos during failed, and optionally successful unlock attempts. All data is encrypted and stored entirely on-device, with no cloud interaction, ensuring stealth operation and privacy-by-design.',
    features: [
      'Automatic intruder photo capture on failed unlock attempts',
      'Optional audit capture on successful unlocks',
      'Stealth operation with configurable alerts',
      'Fully encrypted, local-only evidence storage',
      'Smart background execution using WorkManager'
    ],
    challenges: [
      'Capturing camera input reliably from background services without user interaction.',
      'Detecting both failed and successful unlock events consistently across Android versions.',
      'Managing alerts and system resources without disrupting normal device behavior.',
      'Maintaining strict privacy despite requiring sensitive permissions.'
    ],
    solutions: [
      'Integrated CameraX within Foreground Services using a custom lifecycle handler.',
      'Leveraged Accessibility Services to observe unlock-related system events.',
      'Implemented controlled audio focus handling for alerts with immediate release.',
      'Designed a fully local, encrypted storage model with automated retention policies.'
    ],
    category: 'Android'
  },
  {
    id: 'android-webrtc-spyware',
    title: 'Android WebRTC Spyware',
    description: 'A proof-of-concept Android application demonstrating real-time remote device monitoring using WebRTC, presented through a benign wallpaper app interface.',
    image: '/images/projects-android-webrtc-spyware.png',
    technologies: ['Java','XML','Android Studio','Socket.IO','WebRTC'],
    github: 'https://github.com/DhruvAthaide/Android_WebRTC_Spyware',
    status: 'ongoing',
    longDescription: 'Android WebRTC Spyware is a research-focused Android project that explores real-time device monitoring using low-latency peer-to-peer communication. Disguised as a wallpaper customization app, it establishes a secure WebRTC connection to a web dashboard, enabling live camera and audio streaming alongside real-time device telemetry such as location and system events, highlighting the risks of permission abuse and covert persistence on Android.',
    features: [
      'Real-time front and back camera streaming',
      'Live audio and GPS location monitoring',
      'Remote access to SMS, call logs, and notifications',
      'Stealth background operation via Foreground Services',
      'Dynamic WebRTC signaling configuration'
    ],
    challenges: [
      'Synchronizing multiple real-time media streams',
      'Maintaining persistent background execution',
      'Handling sensitive permissions across Android versions'
    ],
    solutions: [
      'Custom WebRTC signaling using Socket.IO',
      'Foreground Services to prevent background termination',
      'Unified streaming service for media and system events'
    ],
    category: 'Android'
  },
  {
    id: 'vanguard',
    title: 'Vanguard',
    description: 'A secure, local-first executive dashboard for Red Team leads, combining encrypted mission control with real-time global cybersecurity intelligence.',
    image: '/images/projects-vanguard.png',
    technologies: ['Flutter','Dart','Android Studio'],
    github: 'https://github.com/DhruvAthaide/Vanguard',
    status: 'completed',
    longDescription: 'Vanguard is a local-first executive dashboard built for offensive security engineers and Red Team leads to manage operations and consume real-time cyber intelligence securely. It provides encrypted project orchestration, segmented intelligence feeds, and an interactive global threat map, all operating without tracking or external data storage. The application is secured using hardware-backed biometric authentication and an encrypted SQLCipher database to ensure confidentiality at every layer.',
    features: [
      'Real-Time Global Threat Map Visualization',
      'Privacy-First Intelligence Feeds (Zero Tracking)',
      'Encrypted Mission Control & Task Orchestration',
      'Offline-First Architecture with Secure Local Storage',
      'Biometric Authentication & Hardware-Backed Security'
    ],
    challenges: [
      'Handling high-volume intelligence feeds without UI lag',
      'Managing complex offline project hierarchies securely',
      'Rendering an interactive global threat map efficiently'
    ],
    solutions: [
      'Offloaded feed parsing and processing using Dart Isolates',
      'Used encrypted SQLCipher storage with structured relational models',
      'Implemented client-side intelligence aggregation and mapping'
      
    ],
    category: 'Android'
  },
  {
    id: 'exifly',
    title: 'Exifly',
    description: 'A privacy-focused Android app that removes sensitive EXIF metadata from photos before sharing, ensuring location and device anonymity.',
    image: '/images/projects-exifly.png',
    technologies: ['Java','XML','Android Studio'],
    github: 'https://github.com/DhruvAthaide/Exifly',
    status: 'completed',
    longDescription: 'Exifly is an offline-first Android privacy utility designed to prevent accidental metadata leaks when sharing images. It integrates directly with the Android share sheet to strip GPS data, device identifiers, and timestamps without affecting image quality, using robust metadata parsing and deep analysis techniques to detect hidden or non-standard EXIF fields.',
    features: [
      'Offline EXIF and metadata scrubbing (GPS, device, timestamps)',
      'Deep GPS detection for non-standard metadata fields',
      'Filename and date randomization for enhanced privacy',
      'One-tap share-to-clean workflow (single and batch)',
      'Modern glassmorphism UI with real-time analysis'
    ],
    challenges: [
      'Metadata removal without high memory usage',
      'Detecting hidden or malformed GPS data',
      'Preserving original image quality'
    ],
    solutions: [
      'Streaming-based EXIF rewriting to avoid full image decoding',
      'Custom deep-search logic for exhaustive GPS field detection',
      'Safe file handling via Android Storage Access Framework'
    ],
    category: 'Android'
  },
  {
    id: 'clipboard-canary',
    title: 'Clipboard Canary',
    description: 'Clipboard Canary is a cutting-edge mobile application designed to enhance user security by monitoring clipboard activity and providing real-time alerts for potential data breaches.',
    image: '/images/projects-clipboard-canary.png',
    technologies: ['Java','XML','Android Studio'],
    github: 'https://github.com/DhruvAthaide/ClipboardCanary',
    // demo: '',
    status: 'ongoing',
    category: 'Android'
  },
  {
    id: 'mobilesentinel',
    title: 'MobileSentinel',
    description: 'MobileSentinel is a mobile application designed to enhance cybersecurity awareness and provide real-time threat intelligence to users on Android Phones.',
    image: '/images/projects-mobilesentinel.jpeg',
    technologies: ['Java','XML','Python','Android Studio'],
    github: 'https://github.com/DhruvAthaide/MobileSentinel',
    // demo: '',
    status: 'ongoing',
    category: 'Android'
  },
  {
    id: 'stockmarket-financialdashboard',
    title: 'StockMarket Financial Dashboard',
    description: 'Stock Market Financial Dashboard is a comprehensive tool for analyzing stock market trends and financial data visualization.',
    image: '/images/projects-stockmarket-financialdashboard.jpg',
    technologies: ['Python','Bokeh'],
    github: 'https://github.com/DhruvAthaide/StockMarketFinancialDashboard',
    status: 'completed',
    category: 'Python'
  },
  {
    id: 'teckhack-2023',
    title: 'TeckHack 2023',
    description: 'This is a Smart Educational Website built for the TeckHack 2023 Hackathon conducted at Amity University Mumbai.',
    image: '/images/projects-teckhack-2023.jpg',
    technologies: ['React', 'Node.js', 'Firebase'],
    github: 'https://github.com/DhruvAthaide/EducationWallah',
    status: 'completed',
    category: 'Web'
  },
  {
    id: 'nirmaan-2023',
    title: 'Nirmaan 2023',
    description: 'This is a Smart Educational Website built for the Nirmaan 2023 Hackathon conducted at Amity University Mumbai.',
    image: '/images/projects-nirmaan-2023.png',
    technologies: ['HTML5', 'JavaScript', 'CSS3', 'PHP'],
    github: 'https://github.com/DhruvAthaide/WebWizards',
    status: 'completed',
    category: 'Web'
  },
  {
    id: 'stockmarket-analysis',
    title: 'StockMarket Analysis',
    description: 'Stock Market Analysis is a Python-based project that provides insights into stock market trends and performance analysis.',
    image: '/images/projects-stockmarket-analysis.jpg',
    technologies: ['Python'],
    github: 'https://github.com/DhruvAthaide/StockMarketAnalysis',
    status: 'completed',
    category: 'Python'
  },
  {
    id: 'instagram-messaging-automation',
    title: 'Instagram Messaging Automation',
    description: 'Automated Instagram messaging tool for sending bulk messages and managing interactions.',
    image: '/images/projects-instagram-messaging-automation.png',
    technologies: ['Python', 'Selenium'],
    github: 'https://github.com/DhruvAthaide/Instagram-Messaging-Automation',
    status: 'completed',
    category: 'Python'
  },
  {
    id: 'instagram-automated-followers-scraper',
    title: 'Instagram Automated Followers Scraper',
    description: 'Automated tool for scraping Instagram followers and extracting user data.',
    image: '/images/projects-instagram-automated-followers-scraper.png',
    technologies: ['Python', 'Selenium'],
    github: 'https://github.com/DhruvAthaide/Instagram-Automated-Followers-Scraper',
    status: 'completed',
    category: 'Python'
  },
  {
    id: 'facebook-messaging-automation',
    title: 'Facebook Messaging Automation',
    description: 'Automated Facebook messaging tool for sending bulk messages and managing interactions.',
    image: '/images/projects-facebook-messaging-automation.png',
    technologies: ['Python', 'Selenium'],
    github: 'https://github.com/DhruvAthaide/Facebook-Messaging-Automation',
    status: 'completed',
    category: 'Python'
  },
  {
    id: 'twitter-messaging-automation',
    title: 'Twitter Messaging Automation',
    description: 'Automated Twitter messaging tool for sending bulk messages and managing interactions.',
    image: '/images/projects-twitter-messaging-automation.jpg',
    technologies: ['Python', 'Selenium'],
    github: 'https://github.com/DhruvAthaide/Twitter-Messaging-Automation',
    status: 'completed',
    category: 'Python'
  },
  {
    id: 'weather-application',
    title: 'Weather Application',
    description: 'A weather application that provides real-time weather updates and forecasts using a third-party API.',
    image: '/images/projects-online-weather-application.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/DhruvAthaide/WeatherApplication-2.0',
    demo: 'https://weatherapp2-da.netlify.app/',
    status: 'completed',
    category: 'Web'
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'A simple QR code generator that allows users to create custom QR codes for URLs and text.',
    image: '/images/projects-qr-code-generator.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/DhruvAthaide/QR_Code_Generator',
    demo: 'https://qr-code-generator-da.netlify.app/',
    status: 'completed',
    category: 'Web'
  }
];