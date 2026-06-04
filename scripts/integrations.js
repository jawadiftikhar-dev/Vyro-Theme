(function () {
    "use strict";

    // Helper to safely refresh dynamic SVG icons on state updates
    const refreshLocalIcons = () => {
        if (typeof lucide !== "undefined" && lucide.createIcons) {
            try {
                lucide.createIcons();
            } catch (err) {
                console.warn("[VYRO CORE] Local Lucide rendering warning:", err);
            }
        }
    };

    // INTERACTION MODULE 1: COPY TO CLIPBOARD HANDLER
    const initCodeClipboard = () => {
        const copyBtn = document.getElementById("copy-code-btn");
        const codeSnippet = document.getElementById("code-snippet-block");

        if (!copyBtn || !codeSnippet) return;

        copyBtn.addEventListener("click", async () => {
            try {
                const codeElement = codeSnippet.querySelector("code");
                if (!codeElement) return;

                const codeText = codeElement.textContent;
                await navigator.clipboard.writeText(codeText);

                // Temporarily update visual feedback
                copyBtn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Code Copied`;
                refreshLocalIcons();

                setTimeout(() => {
                    copyBtn.innerHTML = `<i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Code`;
                    refreshLocalIcons();
                }, 2000);
            } catch (err) {
                console.warn("[VYRO CORE] Clipboard access declined:", err);
            }
        });
    };

    // INTERACTION MODULE 2: DYNAMIC SIDEBAR DATA CALCULATOR
    const initSidebarTelemetry = () => {
        const payloadSlider = document.getElementById("payload-slider");
        const payloadValDisplay = document.getElementById("payload-display-val");
        const rotX = document.getElementById("telemetry-rot-x");
        const rotY = document.getElementById("telemetry-rot-y");
        const bundle = document.getElementById("telemetry-bundle");

        if (!payloadSlider) return;

        // Bind listener for simulated rendering coordinate calculation updates
        payloadSlider.addEventListener("input", (e) => {
            const scale = parseInt(e.target.value, 10) || 24;
            const computedKb = (scale * 0.2).toFixed(1);

            // Update UI text values
            if (payloadValDisplay) payloadValDisplay.textContent = `${computedKb} KB`;
            if (bundle) bundle.textContent = `${computedKb} KB`;

            // Generate simulated trigonometric variables based on slider value scale
            const mockX = (15 + (scale * 0.15)).toFixed(1);
            const mockY = (35 + (scale * 0.3)).toFixed(1);

            if (rotX) rotX.textContent = `${mockX}°`;
            if (rotY) rotY.textContent = `${mockY}°`;
        });
    };

    // Execute local, non-duplicate features on document readiness
    window.addEventListener("DOMContentLoaded", () => {
        initCodeClipboard();
        initSidebarTelemetry();
    });
})();