(function () {
    "use strict";

    // 1. Initialize local state to track standard filters and search queries
    const VyroState = {
        currentFilter: "all",
        searchQuery: "",
    };

    // 2. Wrap execution in DOMContentLoaded to ensure elements are parsed by the browser
    window.addEventListener("DOMContentLoaded", () => {
        const searchInput = document.getElementById("journal-search");
        const filterBtns = document.querySelectorAll(".filter-btn");
        const cards = document.querySelectorAll(".journal-card");
        const zeroState = document.getElementById("search-zero-state");

        // Fail-safe exit if selectors are not found
        if (!searchInput && filterBtns.length === 0) return;

        const evaluateFiltersAndQuery = () => {
            let matchesCount = 0;

            cards.forEach((card) => {
                // Safeguard elements to prevent script crashes if a card lacks standard tags
                const titleNode = card.querySelector("h3");
                const descNode = card.querySelector("p");

                const title = titleNode ? titleNode.textContent.toLowerCase() : "";
                const desc = descNode ? descNode.textContent.toLowerCase() : "";
                const category = card.getAttribute("data-category") || "";

                const matchesCategory = VyroState.currentFilter === "all" || category === VyroState.currentFilter;
                const matchesSearch = title.includes(VyroState.searchQuery) || desc.includes(VyroState.searchQuery);

                if (matchesCategory && matchesSearch) {
                    card.classList.remove("hidden");

                    // Support standard UI opacity/scaling transition classes
                    setTimeout(() => card.classList.remove("scale-95", "opacity-0"), 50);
                    matchesCount++;
                } else {
                    card.classList.add("scale-95", "opacity-0");
                    setTimeout(() => card.classList.add("hidden"), 300);
                }
            });

            // Toggle zero state element if no matching cards exist
            if (zeroState) {
                if (matchesCount === 0) {
                    zeroState.classList.remove("hidden");
                } else {
                    zeroState.classList.add("hidden");
                }
            }
        };

        // Bind standard search text input listener
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                VyroState.searchQuery = e.target.value.toLowerCase().trim();
                evaluateFiltersAndQuery();
            });
        }

        // Bind standard click event listeners on filter buttons
        filterBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                // Clean layout styles across other buttons
                filterBtns.forEach((b) => {
                    b.classList.remove("active", "bg-agency-dark", "text-agency-bg");
                    b.classList.add("text-agency-dark/70", "bg-agency-bg", "border-agency-border");
                });

                // Apply active UI styles to selected filter
                btn.classList.add("active", "bg-agency-dark", "text-agency-bg");
                btn.classList.remove("text-agency-dark/70", "bg-agency-bg", "border-agency-border");

                VyroState.currentFilter = btn.getAttribute("data-filter") || "all";
                evaluateFiltersAndQuery();
            });
        });
    });
})();