// dashboard.js
// Digital Krishi Officer - Farmer Dashboard
// FastAPI Backend Integration

document.addEventListener("DOMContentLoaded", () => {

    const API_BASE_URL = "http://127.0.0.1:8000";


    // ==========================================
    // SIDEBAR NAVIGATION
    // ==========================================

    const navLinks =
        document.querySelectorAll("aside nav a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.forEach((l) => {
                l.classList.remove(
                    "sidebar-active",
                    "bg-primary-container",
                    "text-white"
                );
            });

            link.classList.add("sidebar-active");

        });

    });


    // ==========================================
    // LOAD ALL DASHBOARD DATA
    // ==========================================

    async function loadDashboardData() {

        console.log(
            "Connecting Digital Krishi Officer Dashboard to FastAPI..."
        );

        try {

           const results =
    await Promise.allSettled([

        // Weather is now static — no weather API
        Promise.resolve({
            ok: true,
            json: async () => ({
                location: "Kariapatti, Virudhunagar",
                temperature: 32,
                condition: "Partly Cloudy",
                humidity: 65,
                rain_probability: 20,
                wind_speed: 14
            })
        }),

        fetch(
            `${API_BASE_URL}/api/ai-insights`
        ),

        fetch(
            `${API_BASE_URL}/api/orders`
        )

    ]);

            // ======================================
            // WEATHER
            // ======================================

            if (
                results[0].status === "fulfilled" &&
                results[0].value.ok
            ) {

                const weather =
                    await results[0].value.json();

                console.log(
                    "Weather API:",
                    weather
                );

                updateWeather(weather);

            } else {

                console.warn(
                    "Weather API unavailable."
                );

            }


            // ======================================
            // AI INSIGHTS
            // ======================================

            if (
                results[1].status === "fulfilled" &&
                results[1].value.ok
            ) {

                const insights =
                    await results[1].value.json();

                console.log(
                    "AI Insights API:",
                    insights
                );

                updateAIInsights(insights);

            } else {

                console.warn(
                    "AI Insights API unavailable."
                );

            }


            // ======================================
            // ORDERS
            // ======================================

            if (
                results[2].status === "fulfilled" &&
                results[2].value.ok
            ) {

                const orders =
                    await results[2].value.json();

                console.log(
                    "Orders API:",
                    orders
                );

                updateOrders(orders);

            } else {

                console.log(
                    "Orders API not available yet."
                );

            }


            console.log(
                "Dashboard API loading completed."
            );


        } catch (error) {

            console.error(
                "Dashboard connection error:",
                error
            );

        }

    }


    // ==========================================
    // UPDATE WEATHER
    // ==========================================

    function updateWeather(weather) {

        if (!weather) return;


        /*
         * Find the weather card from the
         * existing dashboard HTML.
         */

        const weatherCard =
            document.querySelector(
                ".md\\:col-span-4.glass-card"
            );


        if (!weatherCard) {

            console.warn(
                "Weather card not found."
            );

            return;

        }


        // --------------------------------------
        // LOCATION
        // --------------------------------------

        const location =
            weatherCard.querySelector("h3");


        if (
            location &&
            weather.location
        ) {

            location.textContent =
                weather.location;

        }


        // --------------------------------------
        // TEMPERATURE
        // --------------------------------------

        const temperature =
            weatherCard.querySelector(
                ".text-5xl"
            );


        if (
            temperature &&
            weather.temperature !== undefined
        ) {

            temperature.textContent =
                `${weather.temperature}°`;

        }


        // --------------------------------------
        // WEATHER CONDITION
        // --------------------------------------

        const condition =
            weatherCard.querySelector(
                ".text-leaf-vibrant"
            );


        if (
            condition &&
            weather.condition
        ) {

            condition.textContent =
                weather.condition;

        }


        // --------------------------------------
        // HUMIDITY / RAIN / WIND
        // --------------------------------------

        const weatherValues =
            weatherCard.querySelectorAll(
                ".font-bold.text-primary"
            );


        if (weatherValues.length >= 3) {

            // Humidity
            if (
                weather.humidity !== undefined
            ) {

                weatherValues[0]
                    .textContent =
                    `${weather.humidity}%`;

            }


            // Rain probability
            if (
                weather.rain_probability !== undefined
            ) {

                weatherValues[1]
                    .textContent =
                    `${weather.rain_probability}%`;

            }


            // Wind
            if (
                weather.wind_speed !== undefined
            ) {

                weatherValues[2]
                    .textContent =
                    `${weather.wind_speed} km/h`;

            }

        }


        console.log(
            "Weather card updated successfully."
        );

    }


    // ==========================================
    // UPDATE AI INSIGHTS
    // ==========================================

    function updateAIInsights(data) {

        if (!data) return;


        let insights = [];


        /*
         * Backend format:
         *
         * {
         *   "status": "success",
         *   "alerts": 3,
         *   "insights": [
         *      {
         *        "type": "irrigation",
         *        "title": "...",
         *        "message": "..."
         *      }
         *   ]
         * }
         */


        if (
            Array.isArray(data.insights)
        ) {

            insights =
                data.insights;

        }


        if (insights.length === 0) {

            console.warn(
                "No AI insights received."
            );

            return;

        }


        // --------------------------------------
        // FIND AI INSIGHTS SECTION
        // --------------------------------------

        const heading =
            Array.from(
                document.querySelectorAll("h3")
            ).find(
                (element) =>
                    element.textContent
                        .trim()
                        .toLowerCase() ===
                    "ai insights"
            );


        if (!heading) {

            console.warn(
                "AI Insights heading not found."
            );

            return;

        }


        const container =
            heading.closest(
                ".glass-card"
            );


        if (!container) {

            console.warn(
                "AI Insights container not found."
            );

            return;

        }


        // --------------------------------------
        // FIND INSIGHT CARDS
        // --------------------------------------

        const insightCards =
            container.querySelectorAll(
                ".space-y-4 > div"
            );


        insights.forEach(
            (insight, index) => {

                if (
                    !insightCards[index]
                ) {

                    return;

                }


                const card =
                    insightCards[index];


                const paragraphs =
                    card.querySelectorAll(
                        "p"
                    );


                // --------------------------------
                // TITLE
                // --------------------------------

                if (
                    paragraphs.length >= 1 &&
                    insight.title
                ) {

                    paragraphs[0]
                        .textContent =
                        insight.title;

                }


                // --------------------------------
                // MESSAGE
                // --------------------------------

                if (
                    paragraphs.length >= 2 &&
                    insight.message
                ) {

                    paragraphs[1]
                        .textContent =
                        insight.message;

                }

            }
        );


        // --------------------------------------
        // UPDATE ALERT COUNT
        // --------------------------------------

        const alertElements =
            container.querySelectorAll(
                "span"
            );


        alertElements.forEach(
            (element) => {

                if (
                    element.textContent
                        .includes(
                            "New Alerts"
                        )
                ) {

                    element.textContent =
                        `${insights.length} New Alerts`;

                }

            }
        );


        console.log(
            "AI Insights updated successfully."
        );

    }


    // ==========================================
    // UPDATE ORDERS
    // ==========================================

    function updateOrders(orders) {

        if (!orders) return;


        /*
         * Orders API is optional at this stage.
         *
         * Marketplace is already working.
         * We will connect the complete order
         * system later.
         */


        console.log(
            "Orders received:",
            orders
        );

    }


    // ==========================================
    // AUTO REFRESH
    // ==========================================

    /*
     * Refresh dashboard information every
     * 5 minutes.
     */

    setInterval(
        loadDashboardData,
        5 * 60 * 1000
    );


    // ==========================================
    // START DASHBOARD
    // ==========================================

    loadDashboardData();

});