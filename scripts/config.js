tailwind.config = {
    theme: {
        extend: {
            colors: {
                agency: {
                    bg: "var(--bg-color)" /* Luxury Sand <-> Obsidian */,
                    dark: "var(--text-color)" /* Deep Obsidian <-> Pure Alabaster */,
                    accent: "#C5A880" /* Muted Champagne Gold */,
                    accentDark: "#A3855E",
                    accentLight:
                        "rgba(197, 168, 128, 0.12)" /* Off-white warm gold transparency */,
                    border:
                        "var(--border-color)" /* Delicate structural dividing lines */,
                    card: "var(--card-color)" /* Container depth separation */,
                    slate: "var(--slate-color)" /* Soft body text contrast */,
                },
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', "sans-serif"],
                serif: ['"Playfair Display"', "serif"],
            },
            animation: {
                "marquee-slow": "marquee 35s linear infinite",
                float: "float 6s ease-in-out infinite",
                "spin-slow": "spin 15s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
            },
        },
    },
};
