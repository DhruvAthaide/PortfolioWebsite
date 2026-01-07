import { Project } from '../components/ui/ProjectCard';

export const projects: Project[] = [
  {
    id: 'dc-guardient',
    title: 'Guardient',
    description: 'Developed for Deepcytes Cyber Labs UK, Guardient is a high-performance security suite featuring real-time app activity monitoring, deep-file malware scanning, and granular permission analytics.',
    image: '/images/projects-dc-guardient.png',
    technologies: ['Kotlin','XML','Azure','Android Studio'],
    playstore: 'https://play.google.com/store/apps/details?id=com.deepcytes.guardient',
    status: 'completed',
    longDescription: 'Guardient is a comprehensive mobile security suite developed for Deepcytes Cyber Labs. It was designed to bridge the gap between standard antivirus apps and enterprise-grade mobile threat defense. The app provides real-time monitoring of file systems, network activity, and application permissions, using advanced heuristics to detect zero-day threats.',
    features: [
      'Real-time Malware Scanning with Heuristics',
      'Deep File Inspection (PDF, APK, DEX)',
      'Network Traffic Analysis & Anomaly Detection',
      'Granular Permission Manager & Auditing'
    ],
    challenges: [
      'Scanning large files without freezing the UI thread.',
      'Monitoring network traffic without root access on modern Android versions.',
      'Minimizing battery drain while maintaining real-time protection.'
    ],
    solutions: [
      'Implemented Coroutines and WorkManager for efficient background processing.',
      'Utilized the Android VPNService API to inspect local traffic packets securely.',
      'Optimized scanning algorithms to run only on file system changes.'
    ]
  },
  {
    id: 'dc-lockguard',
    title: 'LockGuard',
    description: 'Developed for Deepcytes Cyber Labs UK, LockGuard provides an automated defense against snoopers by logging unlock events and capturing intruder selfies through a secure, offline-only interface.',
    image: '/images/projects-dc-lockguard.png',
    technologies: ['Kotlin','XML','Android Studio'],
    playstore: 'https://play.google.com/store/apps/details?id=com.deepcytes.lockguard',
    status: 'completed',
    longDescription: 'LockGuard is an anti-theft and intrusion detection system. It acts as a silent sentry for your device, automatically capturing photos of unauthorized users who attempt to unlock the phone with incorrect credentials. It operates completely offline to ensure user privacy.',
    features: [
      'Intruder Selfie Capture',
      'Failed Unlock Attempt Logging',
      'Offline-First Architecture',
      'Secure Local Storage of Evidence'
    ],
    challenges: [
      'Reliably detecting failed unlock attempts across different Android manufacturers.',
      'Accessing the camera silently in the background without user interaction.'
    ],
    solutions: [
      'Leveraged the DeviceAdminReceiver API to listen for precise system events.',
      'Implemented a background service that manages camera resources efficiently just for the capture moment.'
    ]
  },
  {
    id: 'android-webrtc-spyware',
    title: 'Android WebRTC Spyware',
    description: 'Android WebRTC Spyware is a security research project that explores vulnerabilities in WebRTC implementations on Android devices.',
    image: '/images/projects-android-webrtc-spyware.png',
    technologies: ['Python','Bokeh'],
    github: 'https://github.com/DhruvAthaide/Android_WebRTC_Spyware',
    status: 'ongoing'
  },
  {
    id: 'vanguard',
    title: 'Vanguard',
    description: 'A sophisticated, local-first executive command center for cybersecurity leaders and development teams',
    image: '/images/projects-vanguard.png',
    technologies: ['Flutter','Dart','Android Studio'],
    github: 'https://github.com/DhruvAthaide/Android_WebRTC_Spyware',
    status: 'completed',
    longDescription: 'Vanguard is a local-first executive command center. It visualizes complex cybersecurity data streams into an intuitive dashboard for decision-makers. It serves as the central nervous system for monitoring ongoing red team operations and defensive metrics.',
    features: [
      'Real-time Threat Visualization',
      'Kanban-style Operation Management',
      'Encrypted Local Database',
      'Interactive Data Charts'
    ],
    challenges: [
      'Rendering real-time data charts without performance lag.',
      ' syncing state across multiple dashboard widgets.'
    ],
    solutions: [
      'Optimized Flutter rendering pipeline and used isolate threads for heavy data processing.',
      'Implemented a robust Provider-based state management system.'
    ]
  },
  {
    id: 'exifly',
    title: 'Exifly',
    description: 'Exifly is a clean, modern, privacy-first Android app that removes hidden metadata from images.',
    image: '/images/projects-exifly.png',
    technologies: ['Java','XML','Android Studio'],
    github: 'https://github.com/DhruvAthaide/Android_WebRTC_Spyware',
    status: 'completed'
  },
  {
    id: 'clipboard-canary',
    title: 'Clipboard Canary',
    description: 'Clipboard Canary is a cutting-edge mobile application designed to enhance user security by monitoring clipboard activity and providing real-time alerts for potential data breaches.',
    image: '/images/projects-clipboard-canary.png',
    technologies: ['Java','XML','Android Studio'],
    github: 'https://github.com/DhruvAthaide/ClipboardCanary',
    // demo: '',
    status: 'ongoing'
  },
  {
    id: 'mobilesentinel',
    title: 'MobileSentinel',
    description: 'MobileSentinel is a mobile application designed to enhance cybersecurity awareness and provide real-time threat intelligence to users on Android Phones.',
    image: '/images/projects-mobilesentinel.jpeg',
    technologies: ['Java','XML','Python','Android Studio'],
    github: 'https://github.com/DhruvAthaide/MobileSentinel',
    // demo: '',
    status: 'ongoing'
  },
  {
    id: 'stockmarket-financialdashboard',
    title: 'StockMarket Financial Dashboard',
    description: 'Stock Market Financial Dashboard is a comprehensive tool for analyzing stock market trends and financial data visualization.',
    image: '/images/projects-stockmarket-financialdashboard.jpg',
    technologies: ['Python','Bokeh'],
    github: 'https://github.com/DhruvAthaide/StockMarketFinancialDashboard',
    status: 'completed'
  },
  {
    id: 'teckhack-2023',
    title: 'TeckHack 2023',
    description: 'This is a Smart Educational Website built for the TeckHack 2023 Hackathon conducted at Amity University Mumbai.',
    image: '/images/projects-teckhack-2023.jpg',
    technologies: ['React', 'Node.js', 'Firebase'],
    github: 'https://github.com/DhruvAthaide/EducationWallah',
    status: 'completed'
  },
  {
    id: 'nirmaan-2023',
    title: 'Nirmaan 2023',
    description: 'This is a Smart Educational Website built for the Nirmaan 2023 Hackathon conducted at Amity University Mumbai.',
    image: '/images/projects-nirmaan-2023.png',
    technologies: ['HTML5', 'JavaScript', 'CSS3', 'PHP'],
    github: 'https://github.com/DhruvAthaide/WebWizards',
    status: 'completed'
  },
  {
    id: 'stockmarket-analysis',
    title: 'StockMarket Analysis',
    description: 'Stock Market Analysis is a Python-based project that provides insights into stock market trends and performance analysis.',
    image: '/images/projects-stockmarket-analysis.jpg',
    technologies: ['Python'],
    github: 'https://github.com/DhruvAthaide/StockMarketAnalysis',
    status: 'completed'
  },
  {
    id: 'instagram-messaging-automation',
    title: 'Instagram Messaging Automation',
    description: 'Automated Instagram messaging tool for sending bulk messages and managing interactions.',
    image: '/images/projects-instagram-messaging-automation.png',
    technologies: ['Python', 'Selenium'],
    github: 'https://github.com/DhruvAthaide/Instagram-Messaging-Automation',
    status: 'completed'
  },
  {
    id: 'instagram-automated-followers-scraper',
    title: 'Instagram Automated Followers Scraper',
    description: 'Automated tool for scraping Instagram followers and extracting user data.',
    image: '/images/projects-instagram-automated-followers-scraper.png',
    technologies: ['Python', 'Selenium'],
    github: 'https://github.com/DhruvAthaide/Instagram-Automated-Followers-Scraper',
    status: 'completed'
  },
  {
    id: 'facebook-messaging-automation',
    title: 'Facebook Messaging Automation',
    description: 'Automated Facebook messaging tool for sending bulk messages and managing interactions.',
    image: '/images/projects-facebook-messaging-automation.png',
    technologies: ['Python', 'Selenium'],
    github: 'https://github.com/DhruvAthaide/Facebook-Messaging-Automation',
    status: 'completed'
  },
  {
    id: 'twitter-messaging-automation',
    title: 'Twitter Messaging Automation',
    description: 'Automated Twitter messaging tool for sending bulk messages and managing interactions.',
    image: '/images/projects-twitter-messaging-automation.jpg',
    technologies: ['Python', 'Selenium'],
    github: 'https://github.com/DhruvAthaide/Twitter-Messaging-Automation',
    status: 'completed'
  },
  {
    id: 'weather-application',
    title: 'Weather Application',
    description: 'A weather application that provides real-time weather updates and forecasts using a third-party API.',
    image: '/images/projects-online-weather-application.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/DhruvAthaide/WeatherApplication-2.0',
    demo: 'https://weatherapp2-da.netlify.app/',
    status: 'completed'
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'A simple QR code generator that allows users to create custom QR codes for URLs and text.',
    image: '/images/projects-qr-code-generator.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/DhruvAthaide/QR_Code_Generator',
    demo: 'https://qr-code-generator-da.netlify.app/',
    status: 'completed'
  },
];