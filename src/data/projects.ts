import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "dc-torch",
    title: "Torch - Remote Detonation Platform",
    description:
      "A tactical Android application and C2 dashboard designed for secure remote data destruction, device neutralization, and real-time intelligence tracking.",
    image: "/images/projects-dc-torch.png",
    technologies: ["Kotlin", "Jetpack Compose", "React", "Node.js", "MongoDB"],
    website: "https://torchdetonation.centralindia.cloudapp.azure.com",
    status: "ongoing",
    longDescription:
      "Remote Detonation Torch is the gold standard for secure remote data destruction built for Deepcytes Cyber Labs (UK). It protects sensitive information and neutralizes compromised handsets instantly from any location. The platform features an Android application operating under a tactical stealth mode disguised as a utility app, paired with a comprehensive Command and Control (C2) web dashboard. Operatives can perform remote detonations to securely wipe SD cards and internal storage, trigger system-wide factory resets, and monitor live high-frequency GPS tracking telemetry.",
    featured: true,
    features: [
      "Remote Detonation and secure data wiping",
      "Real-time Intel Tracking with continuous GPS reporting",
      "Tactical Stealth Mode concealing operational UI",
      "Self-Destruct Triggers with SIM-Guard protection",
      "Centralized C2 Command Center with Role-Based Access Control (RBAC)",
      "Hardware Hardening designed to prevent forensic extraction",
    ],
    challenges: [
      "Ensuring complete data destruction against forensic extraction methods",
      "Maintaining a covert presence on the device without alerting unauthorized users",
      "Guaranteeing reliable Command and Control (C2) connectivity even after reboots",
    ],
    solutions: [
      "Multi-pass secure deletion protocols covering internal storage and SD cards",
      "Obfuscated user interface built to perfectly mimic a functional Flashlight utility",
      "Boot-resistant background service architecture for immediate C2 re-establishment",
    ],
    category: ["Android", "Security", "Web"],
  },
  {
    id: "dc-nosurveil",
    title: "NoSurveil",
    description:
      "A privacy-first Android app that detects physical and digital tracking using heuristic location analysis and real-time Bluetooth scanning.",
    image: "/images/projects-dc-nosurveil.png",
    technologies: ["Kotlin", "XML", "Room API", "Android Studio"],
    website: "https://www.deepcytes.io/nosurveil",
    playstore:
      "https://play.google.com/store/apps/details?id=com.deepcytes.nosurveil",
    status: "completed",
    longDescription:
      "NoSurveil is an advanced anti-surveillance Android application built for Deepcytes Cyber Labs (UK), designed to identify physical stalking and covert tracking threats. It uses heuristic spatial-temporal analysis to correlate a user's movement with nearby devices, detecting persistent following patterns rather than simple proximity. The app combines real-time BLE scanning, local-first data processing, and visual threat reporting to surface potential trackers while strictly preserving user privacy.",
    featured: true,
    features: [
      "Heuristic following detection via movement correlation",
      "Real-time Bluetooth LE (BLE) tracker scanning",
      "On-device PDF threat reports with visual analysis",
      "Local-first privacy architecture using Room Database",
    ],
    challenges: [
      "Differentiating malicious stalking behavior from incidental, normal proximity",
      "Maintaining continuous background scanning without excessive battery drain",
      "Translating complex spatial-temporal threat data into intuitive insights",
    ],
    solutions: [
      "Implemented custom heuristic scoring using direction, distance, and time alignment",
      "Optimized Android Foreground Services with dynamic, efficient scan intervals",
      "Generated visual, on-device intelligence reports tailored for non-technical users",
    ],
    category: ["Android", "Security"],
  },
  {
    id: "dc-lockguard",
    title: "LockGuard+",
    description:
      "A privacy-first Android security app that silently captures evidence of unauthorized device access, now featuring optional secure email alerts and Premium functionalities.",
    image: "/images/projects-dc-lockguard.png",
    technologies: [
      "Kotlin",
      "XML",
      "Android Studio",
      "Azure API",
      "Google Play Billing",
    ],
    website: "https://www.deepcytes.io/lockguard",
    playstore:
      "https://play.google.com/store/apps/details?id=com.deepcytes.lockguardplus",
    status: "completed",
    longDescription:
      "LockGuard+ is a privacy-focused Android security application built for Deepcytes Cyber Labs (UK) that captures intruder photos during failed, and optionally successful unlock attempts. The latest updates introduce a Premium subscription model, automated evidence retention policies, custom alarm sounds, and secure email alerts with photo attachments. All core data remains strictly encrypted and stored on-device, ensuring stealth operation and privacy-by-design.",
    features: [
      "Automatic intruder photo capture on failed unlock attempts",
      "Optional audit capture on successful unlocks via Accessibility Service",
      "Secure email alerts with intruder photo attachments via Azure",
      "Premium subscriptions powered by Google Play Billing",
      "Customizable alert sounds (default sirens or custom audio files)",
      "Fully encrypted, local-only evidence storage with automated retention policies",
      "Smart background execution and evidence cleanup using WorkManager",
    ],
    challenges: [
      "Capturing camera input reliably from background services without user interaction.",
      "Routing email alerts with sensitive photos securely without exposing server-side API keys in the client.",
      "Integrating seamless premium subscriptions while complying with Android Accessibility and Device Admin policies.",
      "Detecting both failed and successful unlock events consistently across Android versions.",
      "Handling media playback and system resources without disrupting normal device behavior.",
    ],
    solutions: [
      "Integrated CameraX within Foreground Services using a custom lifecycle handler.",
      "Built a secure Azure Email network layer using obfuscated signature headers to dispatch alerts safely.",
      "Integrated Google Play Billing to seamlessly unlock premium functionality (emails, custom sounds).",
      "Leveraged Accessibility Services to observe unlock-related system events accurately.",
      "Designed an encrypted storage model paired with WorkManager-driven automated cleanup tasks.",
      "Provided a comprehensive Settings UI managing privileges gracefully.",
    ],
    category: ["Android", "Security"],
  },
  {
    id: "dc-guardient",
    title: "Guardient",
    description:
      "A privacy-centric Android security platform that dynamically classifies application risk through advanced heuristics, sensitive permission analysis, and interactive visual dashboards.",
    image: "/images/projects-dc-guardient.png",
    technologies: ["Kotlin", "Android SDK", "Coroutines"],
    website: "https://www.deepcytes.io/guardient",
    playstore:
      "https://play.google.com/store/apps/details?id=com.deepcytes.guardient",
    status: "completed",
    longDescription:
      "Guardient is a cutting-edge mobile privacy application developed for Deepcytes Cyber Labs (UK). Evolving beyond traditional malware scanning, the app performs instantaneous, localized deep package inspection to detect hidden privacy threats without relying on cloud backends. By analyzing granted permissions, installation origins, and dangerous behavioral combos, Guardient generates dynamic risk scores. All insights and metrics are presented through a highly interactive, custom-engineered dashboard, ensuring users can instantly visualize and manage their device's security posture.",
    features: [
      "Interactive threat dashboard visualizing app risk scores, types, and installation origins",
      "Advanced heuristic risk scoring based on sensitive permission combinations",
      "Deep package inspection to detect side-loaded applications and untrusted installers",
      "Real-time monitoring of system-level privileges (Device Admin, Accessibility, Overlays)",
      "Instantaneous, offline device evaluation with zero cloud dependency",
    ],
    challenges: [
      "Processing hundreds of installed applications and their permissions efficiently without blocking the main UI thread.",
      "Distilling complex application security data into readable, actionable insights for average users.",
      "Identifying truly risky apps strictly through heuristic behavioral logic rather than relying on external virus signatures.",
    ],
    solutions: [
      "Leveraged Kotlin Coroutines for asynchronous, non-blocking background data fetching with periodic yielding to maintain UI responsiveness.",
      "Engineered dynamic visual components to simplify complex risk intelligence into an intuitive, visually stunning dashboard design.",
      "Implemented a robust scoring mechanism mapping requested versus granted permissions to quantify application safety dynamically.",
    ],
    category: ["Android", "Security"],
  },

  {
    id: "android-webrtc-spyware",
    title: "Android WebRTC Spyware",
    description:
      "A proof-of-concept Android application demonstrating real-time remote device monitoring using WebRTC, presented through a benign wallpaper app interface.",
    image: "/images/projects-android-webrtc-spyware.png",
    technologies: ["Java", "XML", "Android Studio", "Socket.IO", "WebRTC"],
    github: "https://github.com/DhruvAthaide/Android_WebRTC_Spyware",
    status: "completed",
    longDescription:
      "Android WebRTC Spyware is a research-focused Android project that explores real-time device monitoring using low-latency peer-to-peer communication. Disguised as a wallpaper customization app, it establishes a secure WebRTC connection to a web dashboard, enabling live camera and audio streaming alongside real-time device telemetry such as location and system events, highlighting the risks of permission abuse and covert persistence on Android.",
    features: [
      "Real-time front and back camera streaming",
      "Live audio and GPS location monitoring",
      "Remote access to SMS, call logs, and notifications",
      "Stealth background operation via Foreground Services",
      "Dynamic WebRTC signaling configuration",
    ],
    challenges: [
      "Synchronizing multiple real-time media streams",
      "Maintaining persistent background execution",
      "Handling sensitive permissions across Android versions",
    ],
    solutions: [
      "Custom WebRTC signaling using Socket.IO",
      "Foreground Services to prevent background termination",
      "Unified streaming service for media and system events",
    ],
    category: ["Android", "Security"],
  },
  {
    id: "gridly",
    title: "Gridly",
    description:
      "The ultimate F1 companion app featuring real-time telemetry, race insights, and a modern Material 3 design.",
    image: "/images/projects-gridly.png",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Room",
      "Ktor",
      "MPAndroidChart",
      "Jetpack Glance",
    ],
    github: "https://github.com/DhruvAthaide/Gridly",
    status: "ongoing",
    longDescription:
      "Gridly is a cutting-edge Android application designed for Formula 1 enthusiasts who demand deeper insights than standard broadcast graphics. It provides real-time telemetry comparison, tire strategy analysis, and live race updates in a sleek, modern interface. Built entirely with Kotlin and Jetpack Compose, it features an offline-first architecture to ensure access to historical data even without connectivity.",
    features: [
      "Real-time telemetry comparison between drivers",
      "Interactive tire strategy and pit stop analysis",
      "Home screen race countdown widget via Jetpack Glance",
      "Offline-first architecture using Room Database",
    ],
    challenges: [
      "Handling strict API rate limits while polling live race data",
      "Synchronizing telemetry data streams for accurate driver comparisons",
      "Optimizing complex chart rendering for smooth scrolling performance",
    ],
    solutions: [
      "Implemented smart polling with local data filtering to reduce API calls by 50%",
      "Custom exponential backoff algorithm for robust network error handling",
      "Efficient caching layer ensuring instant load times for revisited sessions",
    ],
    category: ["Android"],
  },
  {
    id: "vanguard",
    title: "Vanguard",
    description:
      "A secure, local-first executive dashboard for Red Team leads, combining encrypted mission control with real-time global cybersecurity intelligence.",
    image: "/images/projects-vanguard.png",
    technologies: ["Flutter", "Dart", "Android Studio"],
    github: "https://github.com/DhruvAthaide/Vanguard",
    status: "completed",
    longDescription:
      "Vanguard is a local-first executive dashboard built for offensive security engineers and Red Team leads to manage operations and consume real-time cyber intelligence securely. It provides encrypted project orchestration, segmented intelligence feeds, and an interactive global threat map, all operating without tracking or external data storage. The application is secured using hardware-backed biometric authentication and an encrypted SQLCipher database to ensure confidentiality at every layer.",
    features: [
      "Real-Time Global Threat Map Visualization",
      "Privacy-First Intelligence Feeds (Zero Tracking)",
      "Encrypted Mission Control & Task Orchestration",
      "Offline-First Architecture with Secure Local Storage",
      "Biometric Authentication & Hardware-Backed Security",
    ],
    challenges: [
      "Handling high-volume intelligence feeds without UI lag",
      "Managing complex offline project hierarchies securely",
      "Rendering an interactive global threat map efficiently",
    ],
    solutions: [
      "Offloaded feed parsing and processing using Dart Isolates",
      "Used encrypted SQLCipher storage with structured relational models",
      "Implemented client-side intelligence aggregation and mapping",
    ],
    category: ["Android"],
  },
  {
    id: "tiltlock",
    title: "TiltLock",
    description:
      "A secure vault application that reimagines authentication using gyroscope-based tilt gestures and military-grade encryption.",
    image: "/images/projects-tiltlock.png",
    technologies: [
      "Kotlin",
      "XML",
      "Android Keystore",
      "SensorManager",
      "MVVM",
    ],
    github: "https://github.com/DhruvAthaide/TiltLock",
    status: "completed",
    longDescription:
      'TiltLock is a privacy-focused Android application that replaces traditional PINs and patterns with "invisible" motion gestures. By leveraging the device\'s gyroscope, users create custom tilt sequences (e.g., Tilt Left -> Right -> Up) to unlock a secure vault. This motion-based authentication is naturally resistant to shoulder surfing. Under the hood, the app utilizes the Android Keystore system to fully encrypt files, ensuring that photos and documents remain inaccessible to other apps. It also features a "Break-In Monitor" that logs failed attempts and provides haptic feedback with a unique "Glitch" aesthetic for enhanced user feedback.',
    features: [
      "Motion-based authentication using raw gyroscope data",
      "AES-256 encrypted secure vault for files and photos",
      "Break-in attempt logging with timestamp tracking",
      "Adaptive sensitivity settings for gesture detection",
      "Dynamic parallax UI effects based on device orientation",
    ],
    challenges: [
      "Distinguishing intentional gestures from natural hand tremors and noise.",
      "Preventing accidental re-triggering of gestures while the device is still tilted.",
      "Implementing secure file encryption without compromising read/write performance.",
    ],
    solutions: [
      'Built a custom `TiltSensorManager` with a "Neutral-Reset" state machine and configurable thresholds.',
      "Implemented on-the-fly stream encryption using `AES/GCM/NoPadding` to handle large files efficiently.",
      "Designed a reactive UI with `ObjectAnimator` that provides real-time visual and haptic feedback to guide the user.",
    ],
    category: ["Android", "Security"],
  },
  {
    id: "exifly",
    title: "Exifly",
    description:
      "A privacy-focused Android app that removes sensitive EXIF metadata from photos before sharing, ensuring location and device anonymity.",
    image: "/images/projects-exifly.png",
    technologies: ["Java", "XML", "Android Studio"],
    github: "https://github.com/DhruvAthaide/Exifly",
    status: "completed",
    longDescription:
      "Exifly is an offline-first Android privacy utility designed to prevent accidental metadata leaks when sharing images. It integrates directly with the Android share sheet to strip GPS data, device identifiers, and timestamps without affecting image quality, using robust metadata parsing and deep analysis techniques to detect hidden or non-standard EXIF fields.",
    features: [
      "Offline EXIF and metadata scrubbing (GPS, device, timestamps)",
      "Deep GPS detection for non-standard metadata fields",
      "Filename and date randomization for enhanced privacy",
      "One-tap share-to-clean workflow (single and batch)",
      "Modern glassmorphism UI with real-time analysis",
    ],
    challenges: [
      "Metadata removal without high memory usage",
      "Detecting hidden or malformed GPS data",
      "Preserving original image quality",
    ],
    solutions: [
      "Streaming-based EXIF rewriting to avoid full image decoding",
      "Custom deep-search logic for exhaustive GPS field detection",
      "Safe file handling via Android Storage Access Framework",
    ],
    category: ["Android"],
  },
  {
    id: "clipboard-canary",
    title: "Clipboard Canary",
    description:
      "Clipboard Canary is a cutting-edge mobile application designed to enhance user security by monitoring clipboard activity and providing real-time alerts for potential data breaches.",
    image: "/images/projects-clipboard-canary.png",
    technologies: ["Java", "XML", "Android Studio"],
    github: "https://github.com/DhruvAthaide/ClipboardCanary",
    // demo: '',
    status: "ongoing",
    category: ["Android"],
  },
  {
    id: "mobilesentinel",
    title: "MobileSentinel",
    description:
      "MobileSentinel is a mobile application designed to enhance cybersecurity awareness and provide real-time threat intelligence to users on Android Phones.",
    image: "/images/projects-mobilesentinel.jpeg",
    technologies: ["Java", "XML", "Python", "Android Studio"],
    github: "https://github.com/DhruvAthaide/MobileSentinel",
    // demo: '',
    status: "ongoing",
    category: ["Android"],
  },
  {
    id: "stockmarket-financialdashboard",
    title: "StockMarket Financial Dashboard",
    description:
      "Stock Market Financial Dashboard is a comprehensive tool for analyzing stock market trends and financial data visualization.",
    image: "/images/projects-stockmarket-financialdashboard.jpg",
    technologies: ["Python", "Bokeh"],
    github: "https://github.com/DhruvAthaide/StockMarketFinancialDashboard",
    status: "completed",
    category: ["Python"],
  },
  {
    id: "teckhack-2023",
    title: "TeckHack 2023",
    description:
      "This is a Smart Educational Website built for the TeckHack 2023 Hackathon conducted at Amity University Mumbai.",
    image: "/images/projects-teckhack-2023.jpg",
    technologies: ["React", "Node.js", "Firebase"],
    github: "https://github.com/DhruvAthaide/EducationWallah",
    status: "completed",
    category: ["Web"],
  },
  {
    id: "nirmaan-2023",
    title: "Nirmaan 2023",
    description:
      "This is a Smart Educational Website built for the Nirmaan 2023 Hackathon conducted at Amity University Mumbai.",
    image: "/images/projects-nirmaan-2023.png",
    technologies: ["HTML5", "JavaScript", "CSS3", "PHP"],
    github: "https://github.com/DhruvAthaide/WebWizards",
    status: "completed",
    category: ["Web"],
  },
  {
    id: "stockmarket-analysis",
    title: "StockMarket Analysis",
    description:
      "Stock Market Analysis is a Python-based project that provides insights into stock market trends and performance analysis.",
    image: "/images/projects-stockmarket-analysis.jpg",
    technologies: ["Python"],
    github: "https://github.com/DhruvAthaide/StockMarketAnalysis",
    status: "completed",
    category: ["Python"],
  },
  {
    id: "instagram-messaging-automation",
    title: "Instagram Messaging Automation",
    description:
      "Automated Instagram messaging tool for sending bulk messages and managing interactions.",
    image: "/images/projects-instagram-messaging-automation.png",
    technologies: ["Python", "Selenium"],
    github: "https://github.com/DhruvAthaide/Instagram-Messaging-Automation",
    status: "completed",
    category: ["Python"],
  },
  {
    id: "instagram-automated-followers-scraper",
    title: "Instagram Automated Followers Scraper",
    description:
      "Automated tool for scraping Instagram followers and extracting user data.",
    image: "/images/projects-instagram-automated-followers-scraper.png",
    technologies: ["Python", "Selenium"],
    github:
      "https://github.com/DhruvAthaide/Instagram-Automated-Followers-Scraper",
    status: "completed",
    category: ["Python"],
  },
  {
    id: "facebook-messaging-automation",
    title: "Facebook Messaging Automation",
    description:
      "Automated Facebook messaging tool for sending bulk messages and managing interactions.",
    image: "/images/projects-facebook-messaging-automation.png",
    technologies: ["Python", "Selenium"],
    github: "https://github.com/DhruvAthaide/Facebook-Messaging-Automation",
    status: "completed",
    category: ["Python"],
  },
  {
    id: "twitter-messaging-automation",
    title: "Twitter Messaging Automation",
    description:
      "Automated Twitter messaging tool for sending bulk messages and managing interactions.",
    image: "/images/projects-twitter-messaging-automation.jpg",
    technologies: ["Python", "Selenium"],
    github: "https://github.com/DhruvAthaide/Twitter-Messaging-Automation",
    status: "completed",
    category: ["Python"],
  },
];
