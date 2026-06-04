# [VYRO](https://vero.jawadiftikhar.com) — Premium Multipage Creative Engineering & Digital Design Studio Theme

VYRO is a unified, multipage creative engineering, digital design, and brand architecture studio platform. Spanning distinct page templates—including a main landing Hub (**Home**), a curated editorial directory (**Blog**), and a structured historical register (**Blog Archive**)—this platform integrates a persistent, client-side light/dark design theme engine. VYRO uses advanced browser APIs, modular state tracking, and responsive container guidelines to deliver high-performance user experiences entirely framework-free.

Developed by [Jawad Iftikhar](https://jawadiftikhar.com).

---

## 🚀 Key Features & UX Modules

* **Cohesive Multipage Architecture:** Clean separation of structural page views including the master index landing page (`index.html`), editorial article listings (`blog.html`), and categorized archives (`blog-archive.html`).
* **Persistent Light/Dark Theme Switcher:** A site-wide theme engine that automatically serializes and reads user design preferences (`alabaster` vs. `obsidian`) from `localStorage` on page transitions to maintain visual consistency.
* **Interactive CSS 3D Geometry Canvas:** A hardware-accelerated, drag-and-rotate 3D prism cube built natively using CSS transforms (`preserve-3d`), completely avoiding WebGL library overhead.
* **Diagnostics Terminal Console:** An interactive command-line interface mimicking a real shell environment. Includes triggers to run audits, dump tokens, and verify coordinate matrices in real time.
* **Speed Telemetry Simulator:** A sandbox dashboard comparing legacy performance rates against Vyro's pre-rendered static edge CDN speeds, controlled by a simulated payload weight slider.
* **Custom Brief Planner Matrix:** An interactive vector grid that lets clients choose their industry sector and strategic intentions to dynamically render tailored scope descriptions.
* **Lighthouse Stat Counters:** Scroll-spy numerical meters that animate to final target metrics using lightweight, hardware-accelerated rendering intervals.
* **Localized Clock Arrays:** Client-side local clocks showing real-time hours for four global studio offices (Paris, New York, Tokyo, Sydney) based on international offset calculations.
* **Side-Drawer Case Study Viewer:** A space-saving slide-out details panel that loads high-fidelity case study archives, metrics, and blueprint specs.
* **Acoustics Resonance Lab:** An interactive soundwave emulator mimicking acoustic haptic feedback loops and dynamically altering wave-bar heights based on selected profiles.
* **Dynamic Typography Spec Sheet:** A font baseline scale controller letting users test dynamic viewport typography changes while protecting structural layout margins.
* **Alliance Exhibit Canvas:** A programmatically updated quote slider displaying client reviews, author bios, and performance metric charts.

---

## 📂 File & Directory Structure

To extend the multipage setup into a production-ready, modular repository, organize the project directories as follows:

```text
Vyro/
├── index.html                   # Core single-page landing layout (Home)
├── blog.html                    # Editorial articles & journal directory (Blog)
├── blog-archive.html            # Categorized listing of historical insights (Archive)
├── LICENSE                      # Mozilla Public License 2.0 (MPL-2.0)
├── README.md                    # Project documentation & descriptions
├── assets/                      # Static assets and media files
│   └── images/                  # Performance-optimized portfolio imagery (WebP/SVG)
├── styles/                      # Stylesheet directory
│   ├── design-system.css        # Roots & Design
│   └── main.css                 # Main CSS
└── scripts/                     # Vanilla JS application modules
    ├── config.js                # Configrations
    ├── core.js                  # Core Functionalities
    ├── filters.js               # Blog Archive filters and search queries
    ├── interactive.js           # Blog page interactions
    └── modules.js               # Modules & Utilities

🛠️ Codebase Architecture

1. Multipage Outline & Schema Structured Data

The template utilizes structured markup patterns across all pages to ensure
clean accessibility and metadata consistency:

  - Site-Wide Cohesion: The global header and footer are shared across the
    index.html, blog.html, and blog-archive.html layers, while layout links are
    mapped to clear structural entry points.
  - SEO Metadata & Open Graph Integration: Programmed with distinct meta
    descriptions, open graph tags, canonical links, and preconnection hints on
    all pages.
  - Dual JSON-LD Schema: Includes structured schema representations of a
    ProfessionalService and an active FAQPage to make questions, operating
    hours, and location services discoverable by search engine crawlers.

2. Variable Injection Mapping & Design Tokens

Theme colors and scale boundaries are mapped as custom CSS variables inside
Tailwind CSS's configuration:

:root {
  --bg-color: #faf9f6;
  --text-color: #121212;
  --border-color: #eae5dc;
  --card-color: #ffffff;
  --slate-color: #555555;
}

.theme-dark {
  --bg-color: #0e0e0e;
  --text-color: #faf9f6;
  --border-color: #1f1f1f;
  --card-color: #151515;
  --slate-color: #a3a3a3;
}

  - Dynamic Theme Switcher: Transitions between alabaster (light) and obsidian
    (dark) theme states occur instantly by toggling the .theme-dark class on the
    <body> element.
  - Persistent Sync: On load, the theme engine reads localStorage to check if a
    prior state is registered, preventing bright light flashes when loading
    pages.

3. JavaScript Execution Engine

Scripts are isolated in a self-executing modular closure (IIFE) that handles
state mutations securely and isolates variables:

(function () {
    "use strict";

    // Centralized Application State Scope
    const VyroState = {
        activeServiceIndex: 0,
        activeJobTitle: "Principal Spatial Developer",
        isDark: false
    };

    // Independent Module Registration Context
    const ModuleRegistry = {
        modules: {},
        register(name, initFn) {
            this.modules[name] = initFn;
        }
    };
})();

CSS 3D Coordinate Tracking

To track coordinates over mouse and touch movements, coordinates are translated
using the hardware-accelerated CSS compositor layers to avoid browser paint
delays:

cube3d.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

Event Delegation Pattern

Rather than attaching event listeners to individual items, interactive elements
use centralized event delegation bound to parent containers. This keeps memory
usage optimal and ensures dynamic elements are covered:

document.addEventListener("click", (e) => {
    const btnCmd = e.target.closest(".terminal-cmd-btn");
    if (btnCmd) {
        const cmd = btnCmd.getAttribute("data-cmd");
        executeTerminalProtocol(cmd);
    }
});

Safe Input Sanitation

The forms module secures custom inputs prior to processing by routing them
through a programmatic DOM text-escaping utility:

sanitizeInput(val) {
    const temp = document.createElement("div");
    temp.textContent = val;
    return temp.innerHTML;
}

💻 Getting Started & Local Setup

Installation

1.  Clone the repository to your local drive:
    git clone https://github.com/jawadiftikhar-dev/Vyro.git
    cd Vyro
2.  Run the project locally using a basic HTTP server. For example, using
    Python's built-in module:
    python -m http.server 8000
3.  Open your web browser and navigate to: http://localhost:8000

🎨 Customization Guide

Designing Custom Color Palettes

To modify the theme's branding and dark/light color variables, edit the primary
design tokens inside your CSS variables:

:root {
  --bg-color: #faf9f6;          /* Alabaster background (light theme) */
  --text-color: #121212;        /* Obsidian text */
  --border-color: #eae5dc;      /* Delicate structural dividing lines */
}

.theme-dark {
  --bg-color: #0e0e0e;          /* Obsidian background (dark theme) */
  --text-color: #faf9f6;        /* Alabaster text */
  --border-color: #1f1f1f;      /* Dark structural dividing lines */
}

Adjusting Timezone Clocks

To display different locations inside the clock row, update the target locations
and their corresponding formatTime timezone parameters inside the clock module:

// Example: Changing Sydney to Paris
const updateStudioClocks = () => {
    if (clockParis) clockParis.textContent = formatTime("Europe/Paris");
};

♿ Accessibility & Performance Details

Accessibility Standards

  - Contrast Compliance: Typography and accent colors are configured to meet
    WCAG AA contrast ratios against light alabaster and dark obsidian backdrops.
  - ARIA & Focus Overrides: Custom inputs, form components, and carousel slide
    triggers are styled with clear, keyboard-compliant focus outlines
    (:focus-visible) and include necessary accessibility labels.
  - Screen Reader Tabular Alternatives: Active graphical metric indicators
    include hidden, text-only tabular data arrays to remain readable by screen
    readers.

Performance Optimizations

  - Scroll Performance: Scroll handlers are configured as { passive: true } to
    keep viewport scrolling smooth and prevent main-thread blocking.
  - LCP Asset Optimizations: Preconnected Google Fonts and resource hints are
    configured to optimize Largest Contentful Paint (LCP) performance metrics.

