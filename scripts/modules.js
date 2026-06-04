// modules.js
(function () {
    "use strict";

    // Retrieve core internals (set by core.js)
    const {
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
    } = window.__VYRO;

    // ---------- MODULE 1: PRELOADER UTILITY ----------
    ModuleRegistry.register("Preloader", () => {
        const preloader = document.getElementById("preloader");
        const preloadText = document.getElementById("preload-text");
        const progress = document.getElementById("preload-progress");
        const numVal = document.getElementById("preload-num");

        if (!preloader) return;

        if (preloadText) {
            setTimeout(() => preloadText.classList.remove("translate-y-full"), 200);
        }

        if (progress && numVal) {
            setTimeout(() => {
                progress.style.width = "100%";
                let count = 0;
                const counter = setInterval(() => {
                    count += 5;
                    if (count > 100) {
                        clearInterval(counter);
                        preloader.classList.add("-translate-y-full");
                        setTimeout(() => (preloader.style.display = "none"), 1000);
                    } else {
                        numVal.textContent = (count < 10 ? "0" : "") + count + "%";
                    }
                }, 80);
            }, 300);
        } else {
            preloader.style.display = "none";
        }
    });

    // ---------- MODULE 2: HEADER NAVIGATION & BACK-TO-TOP CONTROL ----------
    ModuleRegistry.register("HeaderScrollAndTop", () => {
        const header = document.getElementById("main-header");
        const bttBtn = document.getElementById("back-to-top-btn");

        if (!header && !bttBtn) return;

        const handleScrollEffects = throttle(() => {
            const currentScroll = window.scrollY;

            if (header) {
                if (currentScroll > 50) {
                    header.classList.add("bg-agency-bg/90", "backdrop-blur-md", "shadow-md", "border-agency-border");
                    header.classList.remove("border-transparent");
                } else {
                    header.classList.remove("bg-agency-bg/90", "backdrop-blur-md", "shadow-md", "border-agency-border");
                    header.classList.add("border-transparent");
                }
            }

            if (bttBtn) {
                if (currentScroll > 500) {
                    bttBtn.classList.remove("opacity-0", "translate-y-6", "pointer-events-none");
                    bttBtn.classList.add("opacity-100", "translate-y-0");
                } else {
                    bttBtn.classList.add("opacity-0", "translate-y-6", "pointer-events-none");
                    bttBtn.classList.remove("opacity-100", "translate-y-0");
                }
            }
        }, 50);

        window.addEventListener("scroll", handleScrollEffects, { passive: true });

        if (bttBtn) {
            bttBtn.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    });

    // ---------- MODULE 3: HAMBURGER RESPONSIVE MENU PANEL ----------
    ModuleRegistry.register("HamburgerNavigation", () => {
        const menuBtn = document.getElementById("menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");
        const bar1 = document.getElementById("bar1");
        const bar2 = document.getElementById("bar2");
        const bar3 = document.getElementById("bar3");
        const links = document.querySelectorAll(".mobile-nav-link");

        if (!menuBtn || !mobileMenu) return;

        let isMenuOpen = false;

        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            menuBtn.setAttribute("aria-expanded", isMenuOpen);
            mobileMenu.setAttribute("aria-hidden", !isMenuOpen);

            if (isMenuOpen) {
                mobileMenu.classList.remove("-translate-y-full");
                if (bar1) bar1.classList.add("rotate-45", "translate-y-2");
                if (bar2) bar2.classList.add("opacity-0");
                if (bar3) bar3.classList.add("-rotate-45", "-translate-y-[10px]");
            } else {
                mobileMenu.classList.add("-translate-y-full");
                if (bar1) bar1.classList.remove("rotate-45", "translate-y-2");
                if (bar2) bar2.classList.remove("opacity-0");
                if (bar3) bar3.classList.remove("-rotate-45", "-translate-y-[10px]");
            }
        };

        menuBtn.addEventListener("click", toggleMenu);

        links.forEach((link) => {
            link.addEventListener("click", () => {
                if (isMenuOpen) toggleMenu();
            });
        });
    });

    // ---------- MODULE 4: INTERSECTION SCROLL REVEALS ----------
    ModuleRegistry.register("ScrollReveal", () => {
        const revealElements = document.querySelectorAll(".reveal-on-scroll");
        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        revealElements.forEach((el) => revealObserver.observe(el));
    });

    // ---------- MODULE 5: DYNAMIC THEME ENGINE ----------
    ModuleRegistry.register("ThemeSwitcher", () => {
        const themeBtn = document.getElementById("theme-switcher");
        const mobileThemeBtn = document.getElementById("mobile-theme-switcher");
        const themeIcon = document.getElementById("theme-icon");

        if (!themeBtn && !mobileThemeBtn) return;

        const toggleTheme = () => {
            VyroState.isDark = !VyroState.isDark;
            document.body.classList.toggle("theme-dark", VyroState.isDark);
            if (themeIcon) {
                themeIcon.setAttribute("data-lucide", VyroState.isDark ? "sun" : "moon");
            }
            safeCreateIcons();
        };

        if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
        if (mobileThemeBtn) {
            mobileThemeBtn.addEventListener("click", () => {
                toggleTheme();
                const mobileMenu = document.getElementById("mobile-menu");
                if (mobileMenu && !mobileMenu.classList.contains("-translate-y-full")) {
                    const menuBtn = document.getElementById("menu-btn");
                    if (menuBtn) menuBtn.click();
                }
            });
        }
    });

    // ---------- MODULE 6: BLUEPRINT LABORATORY TOKENS ----------
    ModuleRegistry.register("BlueprintLab", () => {
        const geomBtns = document.querySelectorAll(".token-geom-btn");
        const themeBtns = document.querySelectorAll(".token-theme-btn");
        const spaceBtns = document.querySelectorAll(".token-space-btn");
        const blueprintCard = document.getElementById("interactive-card");
        const blueprintCardBadge = document.getElementById("interactive-card-badge");
        const blueprintCardBtn = document.getElementById("interactive-card-btn");
        const codeOutput = document.getElementById("code-output-block");
        const copyBtn = document.getElementById("copy-blueprint-code");

        if (!blueprintCard && !codeOutput) return;

        let currentRoundedClass = "rounded-none";
        let currentThemeClass = "gold";
        let currentPaddingClass = "p-8";

        const updateBlueprintOutput = () => {
            if (blueprintCard) {
                blueprintCard.className = `bg-agency-card border border-agency-border shadow-lg transition-all duration-500 w-full max-w-sm ${currentRoundedClass} ${currentPaddingClass}`;
            }

            let computedBtnClass = `w-full py-3 transition-colors font-semibold text-xs uppercase tracking-widest ${currentRoundedClass}`;

            if (currentThemeClass === "gold") {
                if (blueprintCardBadge) {
                    blueprintCardBadge.className = "text-[9px] uppercase tracking-widest px-2.5 py-1 bg-agency-accent/20 text-[#121212] font-mono font-bold rounded-none";
                }
                computedBtnClass += " bg-agency-dark text-agency-bg hover:bg-agency-accent hover:text-[#121212]";
            } else if (currentThemeClass === "dark") {
                if (blueprintCardBadge) {
                    blueprintCardBadge.className = "text-[9px] uppercase tracking-widest px-2.5 py-1 bg-[#121212] text-white font-mono font-bold rounded-none";
                }
                computedBtnClass += " bg-agency-accent text-[#121212] hover:bg-agency-dark hover:text-white";
            } else {
                if (blueprintCardBadge) {
                    blueprintCardBadge.className = "text-[9px] uppercase tracking-widest px-2.5 py-1 border border-agency-border text-agency-dark font-mono rounded-none";
                }
                computedBtnClass += " bg-transparent border border-agency-border text-agency-dark hover:border-agency-accent hover:text-agency-accent";
            }

            if (blueprintCardBtn) {
                blueprintCardBtn.className = computedBtnClass;
            }

            if (codeOutput) {
                codeOutput.textContent = `<div class="${currentRoundedClass} bg-card ${currentPaddingClass}">
  <span class="bg-accent/20 text-text ${currentRoundedClass}">Landmark</span>
  <h3 class="font-serif font-bold mt-4 font-serif">Dynamic Architecture</h3>
  <button class="w-full ${currentRoundedClass}">Sequence</button>
</div>`;
            }
        };

        geomBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                geomBtns.forEach((b) => (b.className = "token-geom-btn px-4 py-2 text-xs font-mono border border-agency-border text-agency-slate hover:border-agency-accent transition-all"));
                btn.className = "token-geom-btn px-4 py-2 text-xs font-mono border border-agency-dark bg-agency-dark text-agency-bg transition-all";
                currentRoundedClass = btn.getAttribute("data-rounded") || "rounded-none";
                updateBlueprintOutput();
            });
        });

        themeBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                themeBtns.forEach((b) => (b.className = "token-theme-btn px-4 py-2 text-xs font-mono border border-agency-border text-agency-slate hover:border-agency-accent transition-all"));
                btn.className = "token-theme-btn px-4 py-2 text-xs font-mono border border-agency-dark bg-agency-dark text-agency-bg transition-all";
                currentThemeClass = btn.getAttribute("data-theme") || "gold";
                updateBlueprintOutput();
            });
        });

        spaceBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                spaceBtns.forEach((b) => (b.className = "token-space-btn px-4 py-2 text-xs font-mono border border-agency-border text-agency-slate hover:border-agency-accent transition-all"));
                btn.className = "token-space-btn px-4 py-2 text-xs font-mono border border-agency-dark bg-agency-dark text-agency-bg transition-all";
                currentPaddingClass = btn.getAttribute("data-padding") || "p-8";
                updateBlueprintOutput();
            });
        });

        if (copyBtn && codeOutput) {
            copyBtn.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(codeOutput.textContent);
                    copyBtn.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-500"></i> Copied To Clipboard`;
                    safeCreateIcons();
                    setTimeout(() => {
                        copyBtn.innerHTML = `<i data-lucide="copy" class="w-3 h-3"></i> Copy Token Markup`;
                        safeCreateIcons();
                    }, 2000);
                } catch (err) {
                    console.warn("[VYRO CORE] Clipboard permission denied:", err);
                }
            });
        }

        updateBlueprintOutput();
    });

    // ---------- MODULE 7: ACOUSTICS RESONANCE SENSORY PROFILE ----------
    ModuleRegistry.register("ResonanceSensory", () => {
        const acousticsProfileBtns = document.querySelectorAll(".acoustics-profile-btn");
        const acousticsActiveTag = document.getElementById("acoustics-active-tag");
        const acousticsWaveContainer = document.getElementById("soundwave-container");
        const triggerHapticBtn = document.getElementById("trigger-haptic-sound");

        if (!acousticsWaveContainer) return;

        let activeAcousticsProfile = "muted";

        const updateAcousticWaves = () => {
            const profile = acousticsProfiles[activeAcousticsProfile];
            if (!profile) return;

            const multiplier = profile.waveMultiplier;
            const bars = acousticsWaveContainer.querySelectorAll("div");

            bars.forEach((bar) => {
                const calculatedHeight = Math.round((20 + Math.random() * 60) * multiplier);
                bar.style.height = `${Math.min(calculatedHeight, 120)}px`;
                bar.className = "w-2.5 bg-agency-accent rounded-full transition-all duration-300";
            });
        };

        acousticsProfileBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                acousticsProfileBtns.forEach((b) => {
                    b.className = "acoustics-profile-btn px-4 py-2 text-xs font-mono border border-agency-border text-agency-slate hover:border-agency-dark transition-all";
                });
                btn.className = "acoustics-profile-btn px-4 py-2 text-xs font-mono border border-agency-dark bg-agency-dark text-agency-bg transition-all";

                activeAcousticsProfile = btn.getAttribute("data-profile") || "muted";
                if (acousticsActiveTag) {
                    acousticsActiveTag.textContent = acousticsProfiles[activeAcousticsProfile].name;
                }
                updateAcousticWaves();
            });
        });

        if (triggerHapticBtn) {
            triggerHapticBtn.addEventListener("click", () => {
                let runs = 0;
                const interval = setInterval(() => {
                    updateAcousticWaves();
                    runs++;
                    if (runs > 8) {
                        clearInterval(interval);
                        const bars = acousticsWaveContainer.querySelectorAll("div");
                        bars.forEach((bar, i) => {
                            bar.style.height = `${(i + 1) * 12}px`;
                            bar.className = "w-2.5 bg-agency-border rounded-full transition-all duration-300";
                        });
                    }
                }, 150);
            });
        }
    });

    // ---------- MODULE 8: SERVICES TAB ENGINE ----------
    ModuleRegistry.register("ServicesTabEngine", () => {
        const tabBtns = document.querySelectorAll(".tab-btn");
        const panelContent = document.getElementById("panel-content");

        if (!panelContent || tabBtns.length === 0) return;

        const updateServicePanel = (index) => {
            panelContent.classList.add("opacity-0");
            setTimeout(() => {
                const data = servicesData[index];
                if (!data) return;

                let itemsListHtml = "";
                data.items.forEach((item) => {
                    itemsListHtml += `<li class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-agency-accent"></span> ${item}</li>`;
                });

                panelContent.innerHTML = `
                    <span class="text-xs font-mono text-agency-accent uppercase tracking-widest block mb-4">${data.focus}</span>
                    <h3 class="font-serif text-3xl font-bold mb-6 text-agency-dark font-serif">${data.title}</h3>
                    <p class="text-agency-slate font-light leading-relaxed mb-8">${data.desc}</p>
                    <ul class="space-y-3 font-medium text-sm text-agency-dark mb-10">
                        ${itemsListHtml}
                    </ul>
                `;
                panelContent.classList.remove("opacity-0");
            }, 300);

            tabBtns.forEach((btn, i) => {
                const isSelected = i === index;
                btn.setAttribute("aria-selected", isSelected);
                btn.setAttribute("tabindex", isSelected ? "0" : "-1");

                const titleText = btn.querySelector("span");
                if (titleText) {
                    if (isSelected) {
                        titleText.classList.remove("text-agency-dark/70");
                        titleText.classList.add("text-agency-dark", "font-bold");
                    } else {
                        titleText.classList.remove("text-agency-dark", "font-bold");
                        titleText.classList.add("text-agency-dark/70");
                    }
                }
            });
        };

        tabBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                VyroState.activeServiceIndex = index;
                updateServicePanel(index);
            });
        });

        updateServicePanel(VyroState.activeServiceIndex);
    });

    // ---------- MODULE 9: SHARP 3D GEOMETRY CANVAS LAB ----------
    ModuleRegistry.register("SpatialGeometryCanvas", () => {
        const spatialZone = document.getElementById("spatial-render-zone");
        const cube3d = document.getElementById("cube3d");
        const coordDisplay = document.getElementById("coord-display");

        if (!spatialZone || !cube3d) return;

        let rotX = 20;
        let rotY = 45;
        let targetRotX = 20;
        let targetRotY = 45;
        let isDragging = false;
        let prevMouseX = 0;
        let prevMouseY = 0;
        let lastInteractionTime = Date.now();

        function autoRotateCube() {
            if (!isDragging && Date.now() - lastInteractionTime > 3000) {
                targetRotY += 0.3;
                targetRotX = 20 + Math.sin(Date.now() / 1500) * 10;
            }

            rotX += (targetRotX - rotX) * 0.1;
            rotY += (targetRotY - rotY) * 0.1;

            cube3d.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            if (coordDisplay) {
                coordDisplay.textContent = `X: ${Math.round(rotX)}° Y: ${Math.round(rotY)}°`;
            }

            requestAnimationFrame(autoRotateCube);
        }

        const onDragStart = (clientX, clientY) => {
            isDragging = true;
            prevMouseX = clientX;
            prevMouseY = clientY;
            lastInteractionTime = Date.now();
        };

        const onDragMove = (clientX, clientY) => {
            if (!isDragging) return;
            const deltaX = clientX - prevMouseX;
            const deltaY = clientY - prevMouseY;

            targetRotY += deltaX * 0.5;
            targetRotX -= deltaY * 0.5;
            targetRotX = Math.max(-80, Math.min(80, targetRotX));

            prevMouseX = clientX;
            prevMouseY = clientY;
            lastInteractionTime = Date.now();
        };

        spatialZone.addEventListener("mousedown", (e) => onDragStart(e.clientX, e.clientY));
        window.addEventListener("mousemove", (e) => onDragMove(e.clientX, e.clientY));
        window.addEventListener("mouseup", () => (isDragging = false));

        spatialZone.addEventListener(
            "touchstart",
            (e) => {
                if (e.touches.length === 1) {
                    onDragStart(e.touches[0].clientX, e.touches[0].clientY);
                }
            },
            { passive: true }
        );

        window.addEventListener(
            "touchmove",
            (e) => {
                if (e.touches.length === 1) {
                    onDragMove(e.touches[0].clientX, e.touches[0].clientY);
                }
            },
            { passive: true }
        );

        window.addEventListener("touchend", () => (isDragging = false));

        autoRotateCube();
    });

    // ---------- MODULE 10: INTERACTIVE TYPOGRAPHY SPEC MATRIX ----------
    ModuleRegistry.register("TypographySpec", () => {
        const fontScaleSlider = document.getElementById("font-scale-slider");
        const sliderValDisplay = document.getElementById("slider-val");
        const sizeIndicator = document.getElementById("font-size-indicator");
        const sampleSerif = document.getElementById("sample-serif");
        const sampleSans = document.getElementById("sample-sans");

        if (!fontScaleSlider) return;

        fontScaleSlider.addEventListener("input", (e) => {
            const scale = parseInt(e.target.value, 10) || 100;
            if (sliderValDisplay) sliderValDisplay.textContent = `${scale}%`;

            const basePxSerif = 32;
            const basePxSans = 16;
            const scaledSerif = (basePxSerif * (scale / 100)).toFixed(0);
            const scaledSans = (basePxSans * (scale / 100)).toFixed(0);

            if (sampleSerif) sampleSerif.style.fontSize = `${scaledSerif}px`;
            if (sampleSans) sampleSans.style.fontSize = `${scaledSans}px`;
            if (sizeIndicator) {
                sizeIndicator.textContent = `Serif: ${scaledSerif}px | Sans: ${scaledSans}px`;
            }
        });
    });

    // ---------- MODULE 11: SHOWREEL VIDEO INLINE CONTROLLER ----------
    ModuleRegistry.register("ShowreelVideo", () => {
        const studioVideoInline = document.getElementById("studio-video-inline");
        const videoPosterLayer = document.getElementById("video-poster-layer");
        const showreelPlayBtnInline = document.getElementById("showreel-play-btn-inline");

        if (!showreelPlayBtnInline || !studioVideoInline || !videoPosterLayer) return;

        showreelPlayBtnInline.addEventListener("click", () => {
            videoPosterLayer.classList.add("opacity-0", "pointer-events-none");
            videoPosterLayer.classList.remove("pointer-events-auto");
            studioVideoInline.classList.remove("hidden");

            studioVideoInline.muted = false;
            studioVideoInline.play().catch((err) => {
                console.warn("[VYRO CORE] Video playback failed: Requires user action interface validation.", err);
            });
        });
    });

    // ---------- MODULE 12: SPEED TELEMETRY SIMULATOR ----------
    ModuleRegistry.register("SpeedTelemetry", () => {
        const payloadSlider = document.getElementById("slider-payload");
        const sliderPayloadVal = document.getElementById("slider-payload-val");
        const telemetryCacheBtns = document.querySelectorAll(".telemetry-cache-btn");

        const legacyScoreText = document.getElementById("telemetry-legacy-score");
        const legacyBar = document.getElementById("telemetry-legacy-bar");
        const legacyLabel = document.getElementById("telemetry-legacy-label");

        const VyroScoreText = document.getElementById("telemetry-Vyro-score");
        const VyroBar = document.getElementById("telemetry-Vyro-bar");
        const VyroLabel = document.getElementById("telemetry-Vyro-label");

        const carbonVal = document.getElementById("telemetry-carbon-val");
        const seoVal = document.getElementById("telemetry-seo-val");
        const ttfbVal = document.getElementById("telemetry-ttfb-val");

        if (!payloadSlider) return;

        let cacheState = "active";

        const calculateSpeedTelemetry = () => {
            const payloadValue = parseInt(payloadSlider.value, 10) || 5000;
            if (sliderPayloadVal) {
                sliderPayloadVal.textContent = (payloadValue / 1000).toFixed(1) + " MB";
            }

            let legacyBaseDelay = (payloadValue / 1000) * 1.5;
            if (legacyBaseDelay < 1.2) legacyBaseDelay = 1.2;
            const legacyScore = Math.max(12, Math.round(95 - legacyBaseDelay * 16));

            if (legacyScoreText) legacyScoreText.textContent = `${legacyScore}% SCORE`;
            if (legacyBar) {
                legacyBar.style.width = `${legacyScore}%`;
                legacyBar.className = legacyScore < 45
                    ? "absolute left-0 top-0 h-full bg-red-400/30 transition-all duration-300"
                    : "absolute left-0 top-0 h-full bg-yellow-500/30 transition-all duration-300";
            }
            if (legacyLabel) {
                legacyLabel.textContent = `Load latency: ${legacyBaseDelay.toFixed(1)}s | Core Web Vitals: FAIL`;
            }

            let VyroBaseDelay = 0.2 + (payloadValue / 12000) * 0.3;
            if (cacheState === "bypass") VyroBaseDelay += 0.5;

            const VyroScore = Math.max(78, Math.round(100 - VyroBaseDelay * 12));

            if (VyroScoreText) VyroScoreText.textContent = `${VyroScore}% SCORE`;
            if (VyroBar) {
                VyroBar.style.width = `${VyroScore}%`;
                VyroBar.className = VyroScore >= 90
                    ? "absolute left-0 top-0 h-full bg-emerald-500/20 transition-all duration-300"
                    : "absolute left-0 top-0 h-full bg-yellow-500/20 transition-all duration-300";
            }
            if (VyroLabel) {
                VyroLabel.textContent = `Load latency: ${VyroBaseDelay.toFixed(2)}s | Core Web Vitals: PASS`;
            }

            const carbonSaving = Math.round(92 - (payloadValue / 12000) * 20);
            if (carbonVal) carbonVal.textContent = `-${carbonSaving}% CO2`;

            const estimatedRoiBoost = Math.round(42 - VyroBaseDelay * 20);
            if (seoVal) seoVal.textContent = `+${estimatedRoiBoost}% ROI`;

            if (ttfbVal) {
                if (VyroBaseDelay < 0.4) {
                    ttfbVal.textContent = "EXCELLENT";
                    ttfbVal.className = "font-serif text-lg font-bold text-emerald-500";
                } else {
                    ttfbVal.textContent = "STABLE";
                    ttfbVal.className = "font-serif text-lg font-bold text-[#A3855E]";
                }
            }
        };

        payloadSlider.addEventListener("input", calculateSpeedTelemetry);

        telemetryCacheBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                telemetryCacheBtns.forEach((b) => {
                    b.className = "telemetry-cache-btn px-4 py-2 text-xs font-mono border border-agency-border text-agency-slate hover:border-agency-accent transition-all";
                });
                btn.className = "telemetry-cache-btn px-4 py-2 text-xs font-mono border border-agency-dark bg-agency-dark text-agency-bg transition-all";
                cacheState = btn.getAttribute("data-cache") || "active";
                calculateSpeedTelemetry();
            });
        });

        calculateSpeedTelemetry();
    });

    // ---------- MODULE 13: TESTIMONIALS ALLIANCE EXHIBIT ----------
    ModuleRegistry.register("AllianceExhibit", () => {
        const exhibitButtons = document.querySelectorAll(".exhibit-nav-btn");
        const exhibitQuote = document.getElementById("exhibit-quote");
        const exhibitAuthor = document.getElementById("exhibit-author");
        const exhibitTitle = document.getElementById("exhibit-title");
        const exhibitMetric = document.getElementById("exhibit-metric");

        if (exhibitButtons.length === 0) return;

        exhibitButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                exhibitButtons.forEach((b) => {
                    b.className = "exhibit-nav-btn p-6 border border-agency-border bg-agency-bg hover:border-agency-accent text-left transition-all duration-300 rounded-none group flex justify-between items-center";
                    const spanName = b.querySelector("span:first-child");
                    if (spanName) {
                        spanName.className = "block font-serif text-lg font-bold text-agency-dark transition-colors";
                    }
                });

                btn.className = "exhibit-nav-btn p-6 border border-agency-dark bg-agency-dark text-left transition-all duration-300 rounded-none group flex justify-between items-center";
                const activeSpanName = btn.querySelector("span:first-child");
                if (activeSpanName) {
                    activeSpanName.className = "block font-serif text-lg font-bold text-agency-bg transition-colors";
                }

                const index = parseInt(btn.getAttribute("data-client-index"), 10) || 0;
                const data = testimonialsExhibitData[index];

                if (data && exhibitQuote) {
                    exhibitQuote.classList.add("opacity-0");
                    setTimeout(() => {
                        exhibitQuote.textContent = `"${data.quote}"`;
                        if (exhibitAuthor) exhibitAuthor.textContent = data.author;
                        if (exhibitTitle) exhibitTitle.textContent = data.title;
                        if (exhibitMetric) exhibitMetric.textContent = data.metric;
                        exhibitQuote.classList.remove("opacity-0");
                    }, 200);
                }
            });
        });
    });

    // ---------- MODULE 14: PORTFOLIO FILTER & SLIDE-DRAWER SYSTEM ----------
    ModuleRegistry.register("PortfolioDrawer", () => {
        const filterBtns = document.querySelectorAll(".filter-btn");
        const portfolioItems = document.querySelectorAll(".portfolio-item");
        const drawer = document.getElementById("case-drawer");
        const drawerOverlay = document.getElementById("drawer-overlay");
        const closeDrawerBtn = document.getElementById("close-drawer-btn");
        const drawerContent = document.getElementById("drawer-dynamic-content");

        if (filterBtns.length === 0 && portfolioItems.length === 0 && !drawer) return;

        filterBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterBtns.forEach((b) => {
                    b.classList.remove("active", "bg-agency-dark", "text-agency-bg");
                    b.classList.add("text-agency-dark/70", "bg-agency-card", "border-agency-border");
                });
                btn.classList.add("active", "bg-agency-dark", "text-agency-bg");
                btn.classList.remove("text-agency-dark/70", "bg-agency-card", "border-agency-border");

                const targetFilter = btn.getAttribute("data-filter") || "all";

                portfolioItems.forEach((item) => {
                    const itemCat = item.getAttribute("data-category");
                    if (targetFilter === "all" || itemCat === targetFilter) {
                        item.classList.remove("hidden");
                        setTimeout(() => item.classList.remove("scale-95", "opacity-0"), 50);
                    } else {
                        item.classList.add("scale-95", "opacity-0");
                        setTimeout(() => item.classList.add("hidden"), 300);
                    }
                });
            });
        });

        const openCaseDrawer = (index) => {
            const data = caseStudiesData[index];
            if (!data || !drawer || !drawerContent || !drawerOverlay) return;

            drawerContent.innerHTML = `
                <div class="space-y-6">
                    <span class="text-xs font-mono text-agency-accent font-bold uppercase tracking-widest">${data.tag}</span>
                    <h3 class="font-serif text-4xl font-bold text-agency-dark font-serif">${data.title}</h3>
                    <div class="aspect-video w-full bg-neutral-900 border border-agency-border relative overflow-hidden">
                        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${data.image}')"></div>
                    </div>
                    <p class="text-agency-slate font-light leading-relaxed text-base">${data.intro}</p>
                    
                    <div class="grid grid-cols-3 gap-4 border-y border-agency-border py-6 my-6 bg-agency-card p-4">
                        <div class="text-center border-r border-agency-border font-mono">
                            <span class="block text-2xl font-serif font-bold text-agency-dark font-serif">${data.stats.score}</span>
                            <span class="text-[9px] text-agency-slate font-mono uppercase tracking-wide">SYSTEM SCORE</span>
                        </div>
                        <div class="text-center border-r border-agency-border font-mono">
                            <span class="block text-2xl font-serif font-bold text-[#A3855E] font-serif">${data.stats.latency}</span>
                            <span class="text-[9px] text-agency-slate font-mono uppercase tracking-wide">DATA SPEED</span>
                        </div>
                        <div class="text-center font-mono">
                            <span class="block text-2xl font-serif font-bold text-emerald-500 font-serif">${data.stats.conversion}</span>
                            <span class="text-[9px] text-agency-slate font-mono uppercase tracking-wide">CONVERSION ROI</span>
                        </div>
                    </div>

                    <div class="space-y-3 p-6 bg-agency-card border border-agency-border">
                        <h4 class="font-serif text-lg font-bold text-agency-dark font-mono">Architecture Blueprints</h4>
                        <p class="text-xs text-agency-slate leading-relaxed font-light">${data.blueprintDesc}</p>
                    </div>
                </div>
            `;
            drawer.classList.remove("translate-x-full");
            drawerOverlay.classList.remove("opacity-0", "pointer-events-none");
            document.body.classList.add("overflow-hidden");
        };

        const closeCaseDrawer = () => {
            if (drawer) drawer.classList.add("translate-x-full");
            if (drawerOverlay) drawerOverlay.classList.add("opacity-0", "pointer-events-none");
            document.body.classList.remove("overflow-hidden");
        };

        portfolioItems.forEach((item) => {
            item.addEventListener("click", () => {
                const idx = parseInt(item.getAttribute("data-index"), 10) || 0;
                openCaseDrawer(idx);
            });
        });

        if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeCaseDrawer);
        if (drawerOverlay) drawerOverlay.addEventListener("click", closeCaseDrawer);

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && drawer && !drawer.classList.contains("translate-x-full")) {
                closeCaseDrawer();
            }
        });
    });

    // ---------- MODULE 15: SCROLL COUNT-UP ENGINE ----------
    ModuleRegistry.register("ScrollCountUp", () => {
        const countElements = document.querySelectorAll(".count-up");
        if (countElements.length === 0) return;

        const countObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const targetNum = parseInt(el.getAttribute("data-target"), 10) || 0;
                        let currentNum = 0;
                        const duration = 1500;
                        const steps = 50;
                        const increment = targetNum / steps;
                        const stepDuration = duration / steps;

                        const counterTimer = setInterval(() => {
                            currentNum += increment;
                            if (currentNum >= targetNum) {
                                el.textContent = targetNum;
                                clearInterval(counterTimer);
                            } else {
                                el.textContent = Math.ceil(currentNum);
                            }
                        }, stepDuration);

                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );

        countElements.forEach((el) => countObserver.observe(el));
    });

    // ---------- MODULE 16: DYNAMIC SCHEMAS BLUEPRINT SYSTEM ----------
    ModuleRegistry.register("SchemasBlueprint", () => {
        const schemaSelectBtns = document.querySelectorAll(".schema-select-btn");
        const schemaTypeBadge = document.getElementById("schema-type-badge");
        const schemaTitleText = document.getElementById("schema-title-text");
        const schemaDescText = document.getElementById("schema-desc-text");
        const schemaMetric1 = document.getElementById("schema-metric-1");
        const schemaMetric2 = document.getElementById("schema-metric-2");
        const schemaMetric3 = document.getElementById("schema-metric-3");
        const schemaLogBox = document.getElementById("schema-log-box");

        if (schemaSelectBtns.length === 0) return;

        schemaSelectBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                schemaSelectBtns.forEach((b) => {
                    b.className = "schema-select-btn p-4 border border-agency-border bg-agency-card text-agency-dark hover:border-agency-accent text-left transition-all duration-300 rounded-none font-mono text-sm";
                });
                btn.className = "schema-select-btn p-4 border border-agency-dark bg-agency-dark text-agency-bg text-left transition-all duration-300 rounded-none font-mono text-sm";

                const key = btn.getAttribute("data-schema");
                const data = schemasCatalogData[key];

                if (data) {
                    if (schemaTypeBadge) schemaTypeBadge.textContent = data.badge;
                    if (schemaTitleText) schemaTitleText.textContent = data.title;
                    if (schemaDescText) schemaDescText.textContent = data.desc;
                    if (schemaMetric1) schemaMetric1.textContent = data.metric1;
                    if (schemaMetric2) schemaMetric2.textContent = data.metric2;
                    if (schemaMetric3) schemaMetric3.textContent = data.metric3;

                    if (schemaLogBox) {
                        const logLine = document.createElement("div");
                        logLine.className = "text-agency-accent";
                        logLine.textContent = `> ${data.log}`;
                        schemaLogBox.appendChild(logLine);
                        schemaLogBox.scrollTop = schemaLogBox.scrollHeight;
                    }
                }
            });
        });
    });

    // ---------- MODULE 17: SCOPE, COST, TIMELINE, & CONVERSION ROI ESTIMATOR ----------
    ModuleRegistry.register("RoiEstimator", () => {
        const calcChecks = document.querySelectorAll(".calc-check");
        const calcRadios = document.querySelectorAll(".calc-radio");
        const trafficSlider = document.getElementById("slider-traffic");
        const sliderTrafficVal = document.getElementById("slider-traffic-value");
        const calcResultPrice = document.getElementById("calc-result-price");
        const calcResultTime = document.getElementById("calc-result-time");
        const calcRoiYield = document.getElementById("calc-roi-yield");

        if (!trafficSlider && calcChecks.length === 0 && calcRadios.length === 0) return;

        const calculateScopeCosts = () => {
            let basePrice = 0;
            let totalWeeks = 0;
            let conversionImprovement = 0;

            calcChecks.forEach((check) => {
                if (check.checked) {
                    basePrice += parseInt(check.getAttribute("data-price"), 10) || 0;
                    totalWeeks += parseInt(check.getAttribute("data-weeks"), 10) || 0;
                    conversionImprovement += parseInt(check.getAttribute("data-roi"), 10) || 0;
                }
            });

            let multiplier = 1.0;
            let activeRadioValue = "standard";
            calcRadios.forEach((radio) => {
                if (radio.checked) activeRadioValue = radio.value;
            });

            if (activeRadioValue === "custom") {
                multiplier = 1.35;
                totalWeeks = Math.ceil(totalWeeks * 1.25);
                conversionImprovement += 5;
            } else if (activeRadioValue === "enterprise") {
                multiplier = 1.85;
                totalWeeks = Math.ceil(totalWeeks * 1.55);
                conversionImprovement += 10;
            }

            if (trafficSlider) {
                const trafficVolume = parseInt(trafficSlider.value, 10) || 10000;
                if (sliderTrafficVal) {
                    sliderTrafficVal.textContent = trafficVolume.toLocaleString() + " / mo";
                }
            }

            const finalPrice = Math.round(basePrice * multiplier);
            const conversionMetric = Math.round(conversionImprovement);

            if (calcResultPrice) calcResultPrice.textContent = `$${finalPrice.toLocaleString()}`;
            if (calcResultTime) calcResultTime.textContent = `${totalWeeks}–${totalWeeks + 2} Weeks`;
            if (calcRoiYield) calcRoiYield.textContent = `+${conversionMetric}% Conversion Index`;
        };

        calcChecks.forEach((el) => el.addEventListener("change", calculateScopeCosts));
        calcRadios.forEach((el) => el.addEventListener("change", calculateScopeCosts));
        if (trafficSlider) trafficSlider.addEventListener("input", calculateScopeCosts);

        calculateScopeCosts();
    });

    // ---------- MODULE 18: CLIENT PORTAL LIVE METRICS GENERATOR ----------
    ModuleRegistry.register("ClientPortalMetrics", () => {
        const statCache = document.getElementById("stat-cache");
        const statLatency = document.getElementById("stat-latency");
        const statCdn = document.getElementById("stat-cdn");
        const graphBars = [
            document.getElementById("bar-graph-1"),
            document.getElementById("bar-graph-2"),
            document.getElementById("bar-graph-3"),
            document.getElementById("bar-graph-4"),
            document.getElementById("bar-graph-5"),
            document.getElementById("bar-graph-6"),
            document.getElementById("bar-graph-7"),
            document.getElementById("bar-graph-8"),
        ];

        const activeBars = graphBars.filter((bar) => bar !== null);
        if (!statCache && !statLatency && !statCdn && activeBars.length === 0) return;

        const simulateClientPortalAnalytics = () => {
            const randomCache = (98.5 + Math.random() * 1.4).toFixed(2);
            const randomLatency = Math.round(8 + Math.random() * 12);
            const randomCdn = (3.5 + Math.random() * 1.8).toFixed(1);

            if (statCache) statCache.textContent = `${randomCache}%`;
            if (statLatency) statLatency.textContent = `${randomLatency}ms`;
            if (statCdn) statCdn.textContent = `${randomCdn} GB/s`;

            activeBars.forEach((bar) => {
                const randomHeight = Math.round(35 + Math.random() * 60);
                bar.style.height = `${randomHeight}%`;
            });
        };

        simulateClientPortalAnalytics();
        setInterval(simulateClientPortalAnalytics, 1500);
    });

    // ---------- MODULE 19: SYSTEM DIAGNOSTICS TERMINAL SCRIPT ENGINE ----------
    ModuleRegistry.register("DiagnosticsTerminal", () => {
        const termScreen = document.getElementById("terminal-screen");
        const cmdButtons = document.querySelectorAll(".terminal-cmd-btn");

        if (!termScreen || cmdButtons.length === 0) return;

        const writeTerminalLine = (text, type = "normal") => {
            const line = document.createElement("div");
            if (type === "error") {
                line.className = "text-red-500";
            } else if (type === "success") {
                line.className = "text-emerald-500";
            } else if (type === "accent") {
                line.className = "text-agency-accent";
            } else {
                line.className = "text-neutral-300";
            }
            line.textContent = text;
            termScreen.appendChild(line);
            termScreen.scrollTop = termScreen.scrollHeight;
        };

        const executeTerminalProtocol = (cmd) => {
            writeTerminalLine(`VYRO_STUDIO_SHELL $ ./${cmd}.sh`, "accent");

            if (cmd === "CLEAR_LOGS") {
                termScreen.innerHTML = `
                    <div class="text-neutral-500"># Logs flushed securely. Terminal context restored.</div>
                    <div class="text-agency-accent">VYRO_STUDIO_SHELL $ <span class="animate-pulse">_</span></div>
                `;
                return;
            }

            setTimeout(() => {
                if (cmd === "AUDIT_SYS") {
                    writeTerminalLine("=> Initiating multi-node lighthouse simulation criteria...");
                    setTimeout(() => {
                        writeTerminalLine("=> [OK] First Contentful Paint: 0.4s");
                        writeTerminalLine("=> [OK] Cumulative Layout Shift: 0.00");
                        writeTerminalLine("=> [SUCCESS] Cumulative system score calculated: 100/100", "success");
                    }, 500);
                } else if (cmd === "PRINT_TOKENS") {
                    writeTerminalLine("=> Querying design parameters JSON mapping...");
                    setTimeout(() => {
                        writeTerminalLine('{ "theme": "alabaster_obsidian", "tokens": { "accent": "#C5A880", "fonts": ["Playfair Display", "Plus Jakarta Sans"] } }');
                        writeTerminalLine("=> System variables dumped securely.", "success");
                    }, 500);
                } else if (cmd === "SPATIAL_CALC") {
                    writeTerminalLine("=> Tracing real-time projection vertices...");
                    setTimeout(() => {
                        writeTerminalLine(`=> Perspective anchor established at: 800px`);
                        writeTerminalLine(`=> Transform matrix active bounds target: SUCCESS`, "success");
                    }, 500);
                }
            }, 300);
        };

        cmdButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const cmd = btn.getAttribute("data-cmd");
                if (cmd) executeTerminalProtocol(cmd);
            });
        });
    });

    // ---------- MODULE 20: LIVE WORLD CLOCKS ----------
    ModuleRegistry.register("WorldClocks", () => {
        const clockParis = document.getElementById("clock-paris");
        const clockNy = document.getElementById("clock-ny");
        const clockTokyo = document.getElementById("clock-tokyo");
        const clockSydney = document.getElementById("clock-sydney");

        if (!clockParis && !clockNy && !clockTokyo && !clockSydney) return;

        const formatTime = (tz) => {
            try {
                return new Intl.DateTimeFormat("en-US", {
                    timeZone: tz,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                }).format(new Date());
            } catch (err) {
                return "--:--:--";
            }
        };

        const updateStudioClocks = () => {
            if (clockParis) clockParis.textContent = formatTime("Europe/Paris");
            if (clockNy) clockNy.textContent = formatTime("America/New_York");
            if (clockTokyo) clockTokyo.textContent = formatTime("Asia/Tokyo");
            if (clockSydney) clockSydney.textContent = formatTime("Australia/Sydney");
        };

        updateStudioClocks();
        setInterval(updateStudioClocks, 1000);
    });

    // ---------- MODULE 21: FAQ INTERACTIVE ACCORDION ----------
    ModuleRegistry.register("FaqAccordion", () => {
        const faqBtns = document.querySelectorAll(".faq-btn");
        if (faqBtns.length === 0) return;

        faqBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const answerId = btn.getAttribute("aria-controls");
                const answerPanel = document.getElementById(answerId);
                if (!answerPanel) return;

                const isExpanded = btn.getAttribute("aria-expanded") === "true";

                faqBtns.forEach((otherBtn) => {
                    if (otherBtn !== btn) {
                        otherBtn.setAttribute("aria-expanded", "false");
                        const otherAnsId = otherBtn.getAttribute("aria-controls");
                        const otherAns = document.getElementById(otherAnsId);
                        if (otherAns) otherAns.style.maxHeight = "0px";

                        const otherIcon = otherBtn.querySelector("i");
                        if (otherIcon) {
                            otherIcon.style.transform = "rotate(0deg)";
                            otherIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
                        }
                    }
                });

                btn.setAttribute("aria-expanded", !isExpanded);
                const icon = btn.querySelector("i");

                if (!isExpanded) {
                    answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                    if (icon) {
                        icon.style.transform = "rotate(45deg)";
                        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
                    }
                } else {
                    answerPanel.style.maxHeight = "0px";
                    if (icon) {
                        icon.style.transform = "rotate(0deg)";
                        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
                    }
                }
            });
        });
    });

    // ---------- MODULE 22: ACCESSIBLE FORM AND DIALOG OVERLAY ENGINE ----------
    ModuleRegistry.register("FormAndModalEngine", () => {
        const modal = document.getElementById("apply-modal");
        const openModalBtns = document.querySelectorAll(".open-modal-btn");
        const closeModalBtn = document.getElementById("close-modal-btn");
        const modalOverlay = document.getElementById("modal-overlay");
        const activePositionText = document.getElementById("active-position-text");
        const careerForm = document.getElementById("career-form");
        const applyFeedback = document.getElementById("apply-feedback");

        const mainContactForm = document.getElementById("main-contact-form");
        const contactFeedback = document.getElementById("contact-feedback");

        const newsletterForm = document.getElementById("newsletter-form");
        const newsletterFeedback = document.getElementById("newsletter-feedback");

        // Careers Dialog Modal
        if (modal) {
            const openModal = (positionName) => {
                VyroState.activeJobTitle = positionName;
                if (activePositionText) activePositionText.textContent = `Applying for: ${positionName}`;
                modal.classList.remove("hidden");
                document.body.classList.add("overflow-hidden");
                if (closeModalBtn) closeModalBtn.focus();
            };

            const closeModal = () => {
                modal.classList.add("hidden");
                document.body.classList.remove("overflow-hidden");
                if (careerForm) careerForm.reset();
                if (applyFeedback) applyFeedback.classList.add("hidden");
            };

            openModalBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const pos = btn.getAttribute("data-position") || "Principal Spatial Developer";
                    openModal(pos);
                });
            });

            if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
            if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && !modal.classList.contains("hidden")) {
                    closeModal();
                }
            });

            if (careerForm) {
                careerForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    if (applyFeedback) {
                        applyFeedback.classList.remove("hidden", "text-red-600", "text-green-600");
                        applyFeedback.textContent = "Processing details securely...";
                    }

                    setTimeout(() => {
                        if (applyFeedback) {
                            applyFeedback.classList.add("text-green-600");
                            applyFeedback.textContent = "Candidacy successfully captured. Marcus will contact you.";
                        }
                        setTimeout(() => closeModal(), 2000);
                    }, 1200);
                });
            }
        }

        // Standard Contact Form Submission Handler
        if (mainContactForm) {
            mainContactForm.addEventListener("submit", (e) => {
                e.preventDefault();
                if (contactFeedback) {
                    contactFeedback.classList.remove("hidden", "text-red-500", "text-emerald-600");
                    contactFeedback.classList.add("text-neutral-500");
                    contactFeedback.textContent = "Establishing security handshake and routing...";
                }

                setTimeout(() => {
                    if (contactFeedback) {
                        contactFeedback.classList.remove("text-neutral-500");
                        contactFeedback.classList.add("text-emerald-600");
                        contactFeedback.textContent = "Brief details captured. Our team will connect within 12 hours.";
                    }
                    mainContactForm.reset();
                }, 1500);
            });
        }

        // Newsletter Registration Handler
        if (newsletterForm) {
            newsletterForm.addEventListener("submit", (e) => {
                e.preventDefault();
                if (newsletterFeedback) {
                    newsletterFeedback.classList.remove("hidden", "text-red-500", "text-emerald-600");
                    newsletterFeedback.classList.add("text-neutral-500");
                    newsletterFeedback.textContent = "Transmitting registration request...";
                }

                setTimeout(() => {
                    if (newsletterFeedback) {
                        newsletterFeedback.classList.remove("text-neutral-500");
                        newsletterFeedback.classList.add("text-emerald-600");
                        newsletterFeedback.textContent = "Confirmed. Welcome to the Vyro Intelligence circle.";
                    }
                    newsletterForm.reset();
                }, 1000);
            });
        }
    });

    // ---------- MODULE 23: CORE TECH STACK INTERACTION ----------
    ModuleRegistry.register("CoreTechStack", () => {
        const techNodes = document.querySelectorAll(".tech-node");
        const techCategory = document.getElementById("tech-category");
        const techTitle = document.getElementById("tech-title");
        const techDesc = document.getElementById("tech-desc");
        const techMetric1 = document.getElementById("tech-metric-1");
        const techMetric2 = document.getElementById("tech-metric-2");

        if (techNodes.length === 0) return;

        const updateTechDisplay = (key) => {
            const data = techData[key];
            if (!data) return;

            techNodes.forEach((node) => {
                if (node.getAttribute("data-tech") === key) {
                    node.classList.add("border-agency-accent", "bg-agency-accentLight");
                } else {
                    node.classList.remove("border-agency-accent", "bg-agency-accentLight");
                }
            });

            if (techCategory) techCategory.textContent = data.category;
            if (techTitle) techTitle.textContent = data.title;
            if (techDesc) techDesc.textContent = data.desc;
            if (techMetric1) techMetric1.textContent = data.metric1;
            if (techMetric2) techMetric2.textContent = data.metric2;
        };

        techNodes.forEach((node) => {
            const processInteractions = () => {
                const key = node.getAttribute("data-tech");
                if (key) updateTechDisplay(key);
            };
            node.addEventListener("mouseenter", processInteractions);
            node.addEventListener("click", processInteractions);
        });

        updateTechDisplay("nextjs");
    });

    // ---------- MODULE 24: BRIEF PLANNER MATRIX ----------
    ModuleRegistry.register("BriefPlanner", () => {
        const plannerBtns = document.querySelectorAll(".planner-btn");
        const previewSector = document.getElementById("preview-sector");
        const previewGoal = document.getElementById("preview-goal");
        const previewSpecDesc = document.getElementById("preview-spec-desc");

        if (plannerBtns.length === 0) return;

        const plannerState = {
            sector: "luxury",
            goal: "conversion",
        };

        const updatePlannerDisplay = () => {
            plannerBtns.forEach((btn) => {
                const vec = btn.getAttribute("data-vector");
                const val = btn.getAttribute("data-val");
                if (plannerState[vec] === val) {
                    btn.classList.add("border-agency-accent", "bg-agency-accentLight");
                } else {
                    btn.classList.remove("border-agency-accent", "bg-agency-accentLight");
                }
            });

            if (previewSector) previewSector.textContent = plannerData.sector[plannerState.sector];
            if (previewGoal) previewGoal.textContent = plannerData.goal[plannerState.goal];

            const comboKey = `${plannerState.sector}-${plannerState.goal}`;
            if (previewSpecDesc) {
                previewSpecDesc.textContent = plannerData.spec[comboKey] || "Custom validation parameters scheduled for brief formulation.";
            }
        };

        plannerBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const vec = btn.getAttribute("data-vector");
                const val = btn.getAttribute("data-val");
                if (vec && val) {
                    plannerState[vec] = val;
                    updatePlannerDisplay();
                }
            });
        });

        updatePlannerDisplay();
    });

    // ---------- EXECUTE REGISTRY HANDSHAKE ON DOM CONTENT READINESS ----------
    window.addEventListener("DOMContentLoaded", () => {
        safeCreateIcons();
        ModuleRegistry.initializeAll();
    });

    // Clean up the temporary global bridge (no longer needed)
    delete window.__VYRO;
})();