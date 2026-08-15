import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "dc-cib",
    title: "Cyber Investigator Battlegrounds (CIB)",
    description:
      "An immersive cyber-forensics investigation and battleground platform featuring real-time evidence correlation, interactive forensic mini-games and dynamic suspicion branching.",
    image: "/images/projects-dc-cib.png",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase Auth",
      "Cloud Firestore",
      "Dio (REST API / Interceptors)",
      "Flutter Secure Storage",
      "SharedPreferences",
    ],
    website: "https://webstore.centralindia.cloudapp.azure.com/cib",
    playstore:
      "https://play.google.com/store/apps/details?id=com.deepcytes.cib",
    status: "ongoing",
    stat: "65 Case Files",
    longDescription:
      "Cyber Investigator Battlegrounds (CIB) is an advanced cybersecurity investigation and digital forensics platform designed to train and challenge cyber operatives. Players act as lead investigators inspecting digital crime scenes, analyzing compromised logs, parsing network traffic, and uncovering insider threats across 65 multi-tier case files. Built on a custom dark-obsidian cyber terminal design system, the application features an interactive Crime Board pinboard, dynamic link graph visualization, and 22 specialized cyber-forensic mini-games (including Windows registry persistence navigation, process tree hierarchy inspection, IP tracing, and voice activity spectrum scanning). CIB seamlessly integrates with the DeepCytes Security WebStore API for enterprise session authentication, automatic rolling JWT token refresh, offline grace management, and real-time global and per-case leaderboard synchronization.",
    featured: true,
    features: [
      "Interactive Crime Board & Evidence Chain Graph dynamically linking evidence files, suspect profiles, and timeline events",
      "Specialized cyber-forensic mini-games spanning process tree inspection, Windows registry navigation, Caesar ciphers, IP tracing, and hash validation and many more",
      "Dynamic Evidence & Suspicion Engine recalculating threat levels and suspect risk metrics based on branching investigation choices",
      "Enterprise Licensing & Session Refresh Architecture integrating DeepCytes WebStore API with silent JWT rolling refresh and a 72-hour offline grace period",
      "Cloud Firestore & Batched Local Sync providing real-time per-case speed/accuracy leaderboards, operative ranks, and persistent player stats",
      "Custom Dark Ops Cyber Terminal Design System built with neon glow tokens, scanlines, Matrix rain animations, and background audio management",
    ],
    challenges: [
      "Rendering complex, multi-node evidence pinboards and dynamic connection graphs seamlessly without frame drops on lower-end mobile hardware",
      "Maintaining uninterrupted enterprise user sessions during network drops using silent JWT refresh interceptors and cache-first offline state validation",
      "Designing a flexible, scalable case parsing and suspicion-branching engine supporting 65+ multi-tier JSON case files with rotatable culprits",
    ],
    solutions: [
      "Leveraging Flutter CustomPainters, RepaintBoundaries, and O(1) pre-computed lookup maps within domain models to optimize layout render passes",
      "Constructing a Dio HTTP interceptor coupled with FlutterSecureStorage and LicenseManager state machines for silent 401 token refresh and grace enforcement",
      "Engineered a decoupled CaseEngine and BranchingLogic architecture with AssetManifest concurrent JSON loading and lenient fallback parsing",
    ],
    category: ["Android"],
  },
  {
    id: "dc-deepcloak",
    title: "DeepCloak",
    description:
      "A comprehensive mobile system diagnostic and security auditing platform featuring hardware sensor testing, live performance benchmarking, network inspection tools, floating monitor overlays, and a real-time cybersecurity feed.",
    image: "/images/projects-dc-deepcloak.png",
    technologies: ["Flutter", "Dart", "Kotlin", "Android Native Services"],
    website: "https://webstore.centralindia.cloudapp.azure.com/deepcloak",
    status: "completed",
    longDescription:
      "DeepCloak is an advanced mobile security auditing, hardware diagnostic, and real-time performance monitoring suite designed to provide granular visibility into Android device architecture. Built with native Kotlin system integrations and a sleek Flutter UI, DeepCloak offers an extensive array of diagnostic capabilities—ranging from hardware sensor and display matrix testing to live CPU/RAM/Battery telemetry and multi-core benchmark stress testing. The platform also equips security enthusiasts and sysadmins with a localized network intelligence toolkit (ICMP Ping, DNS Lookup, TCP Port Scanner, and SSL/TLS Inspector), floating system monitor overlays for real-time tracking, and a live cybersecurity feed delivering instant CVE updates and threat advisories.",
    featured: false,
    features: [
      "Comprehensive hardware diagnostic matrix for sensor verification, camera, microphone, battery, and display pixel testing",
      "Live device telemetry and performance benchmarks with multi-core CPU stress testing and interactive memory charts",
      "Localized network intelligence suite featuring ICMP Ping, DNS resolver, TCP port scanner, and SSL/TLS certificate inspector",
      "Floating system monitor overlays providing real-time hardware telemetry on top of other Android applications",
      "Integrated cybersecurity intelligence feed and RSS ticker delivering real-time CVE advisories and safety advisories",
    ],
    challenges: [
      "Bridging high-frequency native Android hardware APIs with Flutter's UI thread without causing micro-stutter during benchmark stress tests",
      "Extracting low-level CPU core frequencies, thermal states, and RAM breakdown across diverse Android OEM vendor builds",
      "Managing persistent floating system overlay windows with real-time hardware metrics under strict modern Android background execution limits",
    ],
    solutions: [
      "Architecting optimized Platform Channels and low-overhead reactive state management using Provider to decouple background polling from rendering",
      "Implementing a custom Kotlin native hardware service to query system sysfs nodes and native memory management interfaces directly",
      "Utilizing Android WindowManager overlay services combined with compact reactive UI painters for minimal background resource consumption",
    ],
    category: ["Android", "Security"],
  },
  {
    id: "dc-blackout",
    title: "Blackout Mode - Anti-Surveillance Platform",
    description:
      "A high-security mobile privacy agent designed to harden Android hardware, suppress stealth surveillance vectors, and safeguard visual and network-level data.",
    image: "/images/projects-dc-blackoutmode.png",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Room",
      "DataStore Preferences",
      "AndroidX Crypto",
    ],
    website: "https://webstore.centralindia.cloudapp.azure.com/blackoutmode",
    status: "completed",
    longDescription:
      "Blackout Mode is an advanced mobile security and anti-surveillance application engineered to protect high-risk individuals from unauthorized device monitoring and physical data compromise. The platform instantly implements a system-wide security hardening state that locks down device hardware by preemptively capturing and blocking background camera and microphone access. To defend against digital and physical tracking, the application orchestrates a localized DNS-over-VPN system to intercept tracking queries completely on-device, actively suppresses incoming notifications to prevent lockscreen visual eavesdropping, and hosts a biometric-secured 'Quantum Vault' that utilizes high-performance local encryption to safeguard sensitive documents from forensic extraction.",
    featured: false,
    features: [
      "Stealth hardware hardening to actively block unauthorized background camera and microphone usage",
      "Localized DNS VPN architecture preventing network-level tracking without routing traffic off-device",
      "Real-time visual privacy shield via automated, persistent sensitive notification suppression",
      "Biometric-secured Quantum Vault featuring highly secure, local cryptographic file encryption",
      "Customizable application Whitelisting allowing verified exceptions for trusted utility software",
      "Secure file destruction protocols to permanently wipe documents from local disk storage",
    ],
    challenges: [
      "Acquiring and retaining persistent locks on hardware sensors without triggering Android OS resource depletion crashes",
      "Establishing a fully self-contained local DNS VPN that avoids routing private operational traffic through external servers",
      "Designing a high-performance local encryption and decryption pipeline for the Quantum Vault without causing UI lag",
    ],
    solutions: [
      "Utilizing priority foreground service architectures to aggressively maintain low-overhead, preemptive camera and microphone resource ownership",
      "Implementing a custom local Android VpnService that intercept, parses, and drops DNS tracking requests entirely on-device",
      "Integrating AndroidX Security libraries and Room Database to construct a secure vault utilizing AES-256 equivalent local encryption",
    ],
    category: ["Android", "Security"],
  },
  {
    id: "dc-flash",
    title: "Flash - Remote Detonation & Corporate Data Sanitization Platform",
    description:
      "An enterprise-grade Android remote detonation and device hygiene agent built for instant emergency data destruction, fleet lease enforcement, and hardware anti-tamper protection.",
    image: "/images/projects-dc-flash.png",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Android NDK / C++ (JNI)",
      "Device Policy Manager",
      "Firebase FCM / Auth",
      "WorkManager",
      "Node.js / Express",
      "MongoDB",
    ],
    website: "https://flash.deepcytes.io",
    status: "completed",
    longDescription:
      "Flash is an ultra-secure corporate fleet management and remote data sanitization platform engineered to protect enterprise assets from physical capture, unauthorized data extraction, and insider threats. The platform allows administrators to remotely execute immediate device sanitization, system-wide factory resets, and high-performance background file encryption. Whether triggered via real-time cloud commands or automated threshold protections, Flash ensures sensitive operational data is rendered completely inaccessible or permanently wiped from the target hardware.",
    features: [
      "Instant remote data detonation providing permanent storage zeroization and SD card wiping upon emergency command",
      "Full hardware factory reset execution leveraging Android Device Policy Manager APIs to wipe the entire device OS state",
      "High-performance background file encryption engine to rapidly lock and scramble sensitive corporate files and directories",
      "Secure file decryption pipeline allowing authorized users to safely unlock and restore encrypted data upon identity verification",
    ],
    challenges: [
      "Ensuring rapid, failure-proof execution of file destruction and factory resets during network isolation or app termination",
      "Maintaining persistent, low-overhead background telemetry and lease validation without triggering Android OS background execution limits",
      "Preventing Man-in-the-Middle (MitM) attacks and CA migration breakages across diverse Android OS versions ranging from Android 6.0 to Android 15+",
    ],
    solutions: [
      "Utilizing Android WorkManager, foreground service architectures, and persistent Android DevicePolicyManager APIs for absolute execution priority",
      "Implementing an optimized OkHttp singleton with connection pooling, exponential backoff retries, and cached Firebase ID token verification",
      "Orchestrating a dual-layer TLS trust strategy combining system/raw CA trust anchors with dynamic fallback X509TrustManagers and multi-hash CertificatePinner rules",
    ],
    category: ["Android", "Security", "Web"],
  },
  {
    id: "dc-torch",
    title: "Torch - Remote Detonation Platform",
    description:
      "A tactical Android application and C2 dashboard designed for secure remote data destruction, device neutralization, and real-time intelligence tracking.",
    image: "/images/projects-dc-torch.png",
    technologies: ["Kotlin", "Jetpack Compose", "React", "Node.js", "MongoDB"],
    website: "https://torch.deepcytes.io",
    status: "completed",
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
    website: "https://webstore.centralindia.cloudapp.azure.com/nosurveil",
    playstore:
      "https://play.google.com/store/apps/details?id=com.deepcytes.nosurveil",
    status: "completed",
    stat: "Live on Play Store",
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
    website: "https://webstore.centralindia.cloudapp.azure.com/lockguardplus",
    playstore:
      "https://play.google.com/store/apps/details?id=com.deepcytes.lockguardplus",
    status: "completed",
    stat: "Live on Play Store",
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
    website: "https://webstore.centralindia.cloudapp.azure.com/guardient",
    playstore:
      "https://play.google.com/store/apps/details?id=com.deepcytes.guardient",
    status: "completed",
    stat: "Live on Play Store",
    featured: true,
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
    technologies: [
      "Java",
      "Kotlin",
      "WebRTC",
      "Socket.IO",
      "Node.js",
      "Express",
      "Android Studio",
      "Firebase",
    ],
    github: "https://github.com/DhruvAthaide/Android_WebRTC_Spyware",
    status: "completed",
    longDescription:
      "Android WebRTC Spyware is a research-focused Android application and web control dashboard exploring real-time remote device monitoring via low-latency peer-to-peer WebRTC connections. Concealed within an aesthetic wallpaper wallpaper application UI, the app runs a high-priority foreground streaming service that connects to a glassmorphic Node.js control room. It provides live dual-camera video feeds, two-way audio intercom, ambient sensor graphing, remote file system access, and system telemetry to study permission abuse and stealth persistence on Android.",
    features: [
      "Dual-camera live video streaming with dynamic resolution switching & snapshot capture",
      "Two-way WebRTC audio intercom (Walkie-Talkie mode) with hardware audio routing",
      "Real-time ambient light and accelerometer sensor tracking with HTML5 Canvas charts",
      "Remote file system browser with 64KB chunked drag-and-drop file uploads and downloads",
      "Remote hardware control (brightness, volume sliders, flashlight toggle, and Text-To-Speech)",
      "Comprehensive diagnostics (battery health/temperature, WiFi RSSI, GPS mapping, SMS, & notifications)",
      "Remote app launcher and bidirectionally synchronized clipboard manager",
    ],
    challenges: [
      "Synchronizing concurrent low-latency media streams alongside high-frequency telemetry data",
      "Maintaining stable background execution across modern Android power-saving restrictions",
      "Managing hardware APIs (Camera2, AudioRecord, sensors) across varying Android API levels",
      "Implementing reliable chunked binary file transfers over WebRTC and Socket.IO data channels",
    ],
    solutions: [
      "Built a persistent foreground service with Kotlin helper modules for thread-safe hardware access",
      "Designed a custom WebRTC signaling protocol using Socket.IO with automated ICE/STUN handling",
      "Configured bidirectional WebRTC audio transceivers linked to Android AudioManager in communication mode",
      "Engineered a responsive glassmorphic web dashboard with canvas-based real-time telemetry rendering",
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
    stat: "50% Fewer API Calls",
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
    id: "mobilesentinel",
    title: "MobileSentinel",
    description:
      "MobileSentinel is a mobile application designed to enhance cybersecurity awareness and provide real-time threat intelligence to users on Android Phones.",
    image: "/images/projects-mobilesentinel.jpeg",
    technologies: ["Java", "XML", "Python", "Android Studio"],
    github: "https://github.com/DhruvAthaide/MobileSentinel",
    // demo: '',
    status: "completed",
    challenges: [
      "Correlating live threat intelligence feeds with on-device context without overwhelming the user with alerts",
    ],
    solutions: [
      "Built a filtering and prioritization layer so the app surfaces only relevant, actionable threat advisories",
    ],
    category: ["Android"],
    earlyWork: true,
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
    challenges: [
      "Rendering interactive charts over large historical datasets without freezing the browser",
    ],
    solutions: [
      "Used Bokeh's server-side rendering and data downsampling to keep interactive charts responsive at scale",
    ],
    category: ["Python"],
    earlyWork: true,
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
    challenges: [
      "Shipping a full-stack educational platform with authentication and live content updates inside a 24-hour hackathon window",
    ],
    solutions: [
      "Used Firebase Auth and Firestore to skip custom backend infrastructure and focus build time on the React front-end experience",
    ],
    category: ["Web"],
    earlyWork: true,
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
    challenges: [
      "Building a responsive, database-backed educational site from scratch under hackathon time constraints",
    ],
    solutions: [
      "Used a lightweight PHP/MySQL backend paired with vanilla JS to ship core features fast without a heavy framework",
    ],
    category: ["Web"],
    earlyWork: true,
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
    challenges: [
      "Cleaning and normalizing noisy historical market data before it could be used for trend analysis",
    ],
    solutions: [
      "Built a Pandas-based preprocessing pipeline to handle missing data and normalize price series for consistent analysis",
    ],
    category: ["Python"],
    earlyWork: true,
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
    challenges: [
      "Keeping automated browser interactions reliable against a frequently changing DOM and anti-automation measures",
    ],
    solutions: [
      "Used explicit Selenium waits and resilient element selectors, with configurable delays to mimic human interaction patterns",
    ],
    category: ["Python"],
    earlyWork: true,
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
    challenges: [
      "Extracting follower data at scale without triggering rate limits or account restrictions",
    ],
    solutions: [
      "Implemented throttled scraping with randomized delays and session management to stay within safe usage patterns",
    ],
    category: ["Python"],
    earlyWork: true,
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
    challenges: [
      "Automating message delivery reliably across a frequently changing web UI",
    ],
    solutions: [
      "Built resilient Selenium selectors and retry logic to keep the automation working across minor UI changes",
    ],
    category: ["Python"],
    earlyWork: true,
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
    challenges: [
      "Automating direct message delivery reliably without tripping platform spam detection",
    ],
    solutions: [
      "Added human-like interaction timing and session throttling to keep automated messaging within safe limits",
    ],
    category: ["Python"],
    earlyWork: true,
  },
];
