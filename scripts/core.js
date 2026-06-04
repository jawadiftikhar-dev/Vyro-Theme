// core.js
(function () {
    "use strict";

    // ---------- Global App State Scope ----------
    const VyroState = {
        activeServiceIndex: 0,
        activeJobTitle: "Principal Spatial Developer",
        isDark: false,
    };

    // ---------- System Static Configurations & Catalogs ----------
    const servicesData = [
        {
            focus: "Core Focus A",
            title: "Premium Brand Engineering",
            desc: "We position modern operations within elegant online formats, combining deep market strategy with immaculate artistic direction to turn users into design loyalists.",
            items: [
                "Premium Identity Systems",
                "High-Fidelity Prototyping",
                "Multi-Channel Narrative Design",
            ],
        },
        {
            focus: "Core Focus B",
            title: "Spatial Interfaces & 3D WebGL",
            desc: "Bringing desktop performance to standard web platforms. We craft highly interactive 3D elements that run seamlessly without standard GPU lags.",
            items: [
                "Immersive Three.js Integration",
                "Responsive Physics Systems",
                "WebGL Digital Landmarks Architecture",
            ],
        },
        {
            focus: "Core Focus C",
            title: "Headless Performance Development",
            desc: "Deploying rapid architecture stacks that score maximum performance targets. Secure backend systems connected with absolute serverless speed.",
            items: [
                "Lightning-Fast Headless API",
                "Zero-Latency Payload Transfer",
                "Rigorous Performance Auditing Protocol",
            ],
        },
        {
            focus: "Core Focus D",
            title: "Design Systems Architecture",
            desc: "Building structured styles, component parameters, typography variables, and accessible design frameworks so internal teams execute seamlessly.",
            items: [
                "Tokenized Theme Architecture",
                "Strict WCAG Accessibility Compliance",
                "Fluid Responsive Guidelines Systems",
            ],
        },
    ];

    const caseStudiesData = [
        {
            title: "Aeris Spatial Identity",
            tag: "Spatial 3D / WebGL",
            image: "./assets/selected-project-1.webp",
            intro: "A bespoke spatial exhibition catalog built for Aeris, presenting complex architectural forms as light, render-free models running dynamically on standard consumer browsers.",
            stats: { score: "100%", latency: "14ms", conversion: "+145%" },
            blueprintDesc: "Constructed using structured React Three Fiber topologies integrated over optimized serverless CDN distribution networks.",
        },
        {
            title: "Vanguard Brand Blueprint",
            tag: "Branding Identity",
            image: "./assets/selected-project-2.webp",
            intro: "A deep branding execution defining layout, token hierarchy, typographical scale, and responsive grid parameters for Vanguard's global operations.",
            stats: { score: "99%", latency: "20ms", conversion: "+85%" },
            blueprintDesc: "Leveraged precise layout constraints and CSS variable distribution, ensuring consistent layout render metrics.",
        },
        {
            title: "Lumina Headless Architecture",
            tag: "Headless Web",
            image: "./assets/selected-project-3.webp",
            intro: "Next-generation structural performance layer designed to feed lightning-fast transaction payloads to Lumina customers globally.",
            stats: { score: "100%", latency: "9ms", conversion: "+210%" },
            blueprintDesc: "Configured using customized Next.js server actions optimized via server-side static generation parameters.",
        },
    ];

    const testimonialsExhibitData = [
        {
            client: "Aeris Spatial Corp",
            author: "Christian Vance",
            title: "VP of Product, Aeris",
            metric: "METRIC: +145% Conversion",
            quote: "The engineering capability Vyro demonstrated surpassed traditional web agencies. They transformed our slow visual systems into high-speed architectural landscapes within weeks.",
        },
        {
            client: "Lumina Brand House",
            author: "Soraya Miller",
            title: "Co-Founder, Lumina Group",
            metric: "METRIC: 9ms Database Speed",
            quote: "Every interaction from strategy formulation to system code deployment felt deliberate. We recorded a profound elevation of visual branding and a massive bounce rate decline.",
        },
        {
            client: "Horizon Digital Group",
            author: "Tariq Al-Sabah",
            title: "Lead Web Strategist, Horizon",
            metric: "METRIC: 100% PageSpeed Index",
            quote: "Their headless framework structure is incredibly streamlined. Architectural, fast, and completely intuitive for our publishing team. Vyro's engineering is built to last.",
        },
    ];

    const schemasCatalogData = {
        federated: {
            badge: "Topology Node A",
            title: "Federated Edge Layers",
            desc: "Distributed routing structures pre-caching asset configurations across 28 global network edge node terminals. Reduces operational handshakes to low milliseconds.",
            metric1: "12ms Target",
            metric2: "0.24 KB",
            metric3: "100% Paint",
            log: "[OK] Federated edge layers active on distributed CDN servers.",
        },
        reactive: {
            badge: "Topology Node B",
            title: "Dynamic State Reducers",
            desc: "Real-time state validation processes translating haptic mouse input values into immediate WebGL animation vectors. Bypasses classic render frame lag indices completely.",
            metric1: "60 FPS Fixed",
            metric2: "0.45 MB",
            metric3: "Zero Jitter",
            log: "[OK] Reducer telemetry monitoring is operating at 60Hz intervals.",
        },
        hybrid: {
            badge: "Topology Node C",
            title: "Unified Token Graph",
            desc: "A centralized theme coordinate tree dynamically linking raw layout attributes with Tailwind components. Eliminates style conflicts and CSS variable overhead.",
            metric1: "Sub-1ms Sync",
            metric2: "4.8 KB",
            metric3: "W3C Compliant",
            log: "[OK] Token variables mapped to alabaster and obsidian theme trees.",
        },
    };

    const acousticsProfiles = {
        muted: {
            name: "PROFILE: MUTED WHISPER",
            waveMultiplier: 0.4,
        },
        orchestral: {
            name: "PROFILE: ORCHESTRAL ECHO",
            waveMultiplier: 1.2,
        },
        spatial: {
            name: "PROFILE: SPATIAL SUB-BASS",
            waveMultiplier: 1.9,
        },
    };

    const techData = {
        nextjs: {
            category: "Rendering Framework",
            title: "Next.js 15 Serverless",
            desc: "Every viewport layout is pre-rendered at distributed edge CDN nodes. This completely bypasses backend database delays and guarantees instant layout paints.",
            metric1: "0.4s FCP",
            metric2: "99.8% Hit Rate",
        },
        webgl: {
            category: "Spatial Optimization",
            title: "Three.js & Custom WebGL",
            desc: "We build 3D matrices containing ultra-optimized geometric vertices. Perfect structural pipelines ensure 60fps animations on normal mobile processors without burning device power.",
            metric1: "60 FPS Active",
            metric2: "Zero CPU Lags",
        },
        headless: {
            category: "Database Integration",
            title: "Headless GraphQL API",
            desc: "We interface directly with high-performance content networks using encrypted, static query parameters. Real-time updates occur with zero layout shift.",
            metric1: "12ms Handshake",
            metric2: "SLA Guaranteed",
        },
        tailwind: {
            category: "Visual Architecture",
            title: "Tokenized Tailwind CSS",
            desc: "Utility tokens are compiled strictly to minimize file payloads. Dynamic style shifts occur with zero transition lag or browser layout computations.",
            metric1: "4KB Compressed",
            metric2: "W3C Approved",
        },
    };

    const plannerData = {
        sector: {
            luxury: "Luxury Retail",
            realestate: "Real Estate",
            art: "Fine Art",
            technology: "Tech & Web3",
        },
        goal: {
            conversion: "Conversion ROI",
            spatial: "Immersive 3D",
            rebrand: "Rebranding",
            portal: "Custom Portal",
        },
        spec: {
            "luxury-conversion": "Deploying static pre-rendered landing interfaces optimized for luxury conversion yields, maintaining pristine layout metrics.",
            "luxury-spatial": "Fusing immersive, lightweight 3D structural model matrices inside high-performance e-commerce catalog pipelines.",
            "luxury-rebrand": "Architecting deep high-end brand asset libraries, typography systems, and tokenized custom stylesheets.",
            "luxury-portal": "Securing robust, serverless transaction portals for private client portfolios.",
            "realestate-conversion": "Building conversion-focused showcases to turn site visitors into highly qualified high-ticket investment leads.",
            "realestate-spatial": "Creating lightweight, drag-to-rotate interactive geometric visualizer models for modern commercial structures.",
            "realestate-rebrand": "Polishing luxury branding variables, structural guidelines, and color parameters for elite developer brands.",
            "realestate-portal": "Engineering secure portal gateways allowing investors to inspect property assets.",
            "art-conversion": "Polishing museum-grade presentation catalogs designed to drive organic auction inquiries.",
            "art-spatial": "Deploying 3D virtual web canvas galleries with clean spatial physics models.",
            "art-rebrand": "Curation of pristine typographies, thin structural lines, and classical proportions.",
            "art-portal": "Confidential collector databases linked directly via headless GraphQL API structures.",
            "technology-conversion": "Optimizing API caching architectures and content delivery speeds to prevent layout shifts and drive signups.",
            "technology-spatial": "Fusing advanced browser geometric systems with high-speed rendering pipelines.",
            "technology-rebrand": "Forging futuristic, high-level developer interfaces featuring deep obsidian/neon color tokens.",
            "technology-portal": "Deploying serverless dashboard metrics simulations and high-scale node frameworks.",
        },
    };

    // ---------- Performance Utilities ----------
    const throttle = (func, limit) => {
        let inThrottle;
        return function (...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    };

    const safeCreateIcons = () => {
        if (typeof lucide !== "undefined" && lucide.createIcons) {
            try {
                lucide.createIcons();
            } catch (err) {
                console.warn("[VYRO CORE] Lucide dynamic icon render warning:", err);
            }
        }
    };

    // ---------- Module Registry ----------
    const ModuleRegistry = {
        modules: {},
        register(name, initFn) {
            this.modules[name] = initFn;
        },
        initializeAll() {
            Object.entries(this.modules).forEach(([name, initFn]) => {
                try {
                    initFn();
                } catch (error) {
                    console.error(`[VYRO CORE] Module "${name}" failed initialization sequence:`, error);
                }
            });
        },
    };

    // ---------- Global Year Footer ----------
    const targetYearEl = document.getElementById("year-target");
    if (targetYearEl) {
        targetYearEl.textContent = new Date().getFullYear();
    }

    // ---------- Expose internals to the modules script ----------
    window.__VYRO = {
        VyroState,
        servicesData,
        caseStudiesData,
        testimonialsExhibitData,
        schemasCatalogData,
        acousticsProfiles,
        techData,
        plannerData,
        throttle,
        safeCreateIcons,
        ModuleRegistry,
    };
})();