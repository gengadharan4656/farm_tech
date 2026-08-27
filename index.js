// index.js
// Digital Krishi Officer - Multilingual Landing Page

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // EXISTING COUNTER ANIMATION
    // =========================================================

    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const target = entry.target;
            const countTo =
                parseInt(target.getAttribute("data-target"), 10);

            const duration = 2000;
            const start = 0;
            let startTime = null;

            const animation = (currentTime) => {

                if (!startTime) {
                    startTime = currentTime;
                }

                const progress =
                    Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                const currentCount =
                    Math.floor(
                        progress * (countTo - start) + start
                    );

                if (countTo >= 1000) {

                    target.innerText =
                        (currentCount / 1000).toFixed(1) + "k+";

                } else if (countTo === 95) {

                    target.innerText =
                        currentCount + "%";

                } else {

                    target.innerText =
                        currentCount + "+";
                }

                if (progress < 1) {

                    requestAnimationFrame(animation);

                } else {

                    if (countTo >= 1000) {

                        target.innerText =
                            (countTo / 1000) + "k+";

                    } else if (countTo === 95) {

                        target.innerText = "95%";

                    } else {

                        target.innerText =
                            countTo + "+";
                    }
                }
            };

            requestAnimationFrame(animation);

            observer.unobserve(target);
        });

    }, observerOptions);


    document
        .querySelectorAll(".counter-value")
        .forEach((counter) => {

            observer.observe(counter);

        });


    // =========================================================
    // GLASS CARD EFFECT
    // =========================================================

    document
        .querySelectorAll(".glass-card")
        .forEach((card) => {

            card.addEventListener("mousemove", (e) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            });

        });


    // =========================================================
    // MULTILINGUAL SYSTEM
    // =========================================================

    const translations = {

        en: {

            marketplace: "Marketplace",
            advisor: "AI Advisor",
            dashboard: "Dashboard",
            signIn: "Sign In",

            future: "The Future of Farming",

            heroTitle:
                "AI-Powered Farmer Advisory and Smart Agricultural Marketplace",

            heroText:
                "Empowering farmers with precision insights, real-time disease detection, and a direct-to-consumer marketplace. Cultivating success through intelligence.",

            talkAI:
                "Talk with AI",

            explore:
                "Explore Marketplace",

            farmers:
                "Join 10,000+ farmers thriving today",

            diagnostic:
                "AI Diagnostic",

            riceBlast:
                "Rice Blast Detected (95.4% Confidence)",

            microClimate:
                "Micro-Climate",

            farmersEmpowered:
                "Farmers Empowered",

            villages:
                "Digital Villages",

            accuracy:
                "AI Diagnostic Accuracy",

            toolsTitle:
                "Precision Tools for Modern Agriculture",

            toolsText:
                "Our integrated platform provides every resource a farmer needs, from predictive intelligence to global market access.",

            advisorTitle:
                "AI Krishi Advisor",

            advisorText:
                "24/7 multilingual support for all your farming queries. From soil health to harvest cycles, our AI understands local conditions and speaks your language.",

            tryAdvisor:
                "Try Advisor",

            weather:
                "Hyperlocal Weather",

            weatherText:
                "Get precise, farm-level weather forecasts and timely alerts to protect your crops from sudden climatic shifts.",

            disease:
                "Pest & Disease ID",

            diseaseText:
                "Snap a photo and get instant identification and treatment protocols for over 400 common crop diseases.",

            schemes:
                "Government Schemes",

            schemesText:
                "Never miss out on subsidies or financial support. Our platform matches your profile with eligible central and state government schemes automatically.",

            mission:
                "Our Mission: Digitizing Every Acre",

            missionText1:
                "AgriPulse Precision was born from the belief that technology should not be a luxury, but a basic tool for every farmer. We bridge the gap between traditional wisdom and modern data science.",

            missionText2:
                "By integrating artificial intelligence with deep agricultural expertise, we help reduce waste, increase yield, and ensure that the people who feed the world are rewarded fairly for their labor.",

            sustainable:
                "Sustainable Precision Agriculture",

            pricing:
                "Transparent Marketplace Pricing",

            climate:
                "Climate-Resilient Advisory",

            learn:
                "Learn More About Us",

            product:
                "Product",

            company:
                "Company",

            newsletter:
                "Newsletter",

            newsletterText:
                "Get the latest insights on precision farming.",

            email:
                "Email",

            terms:
                "Terms of Service",

            privacy:
                "Privacy Policy",

            footer:
                "Cultivating precision and prosperity for the global agricultural ecosystem."
        },


        ta: {

            marketplace: "சந்தை",

            advisor: "AI ஆலோசகர்",

            dashboard: "டாஷ்போர்டு",

            signIn: "உள்நுழைக",

            future:
                "விவசாயத்தின் எதிர்காலம்",

            heroTitle:
                "AI அடிப்படையிலான விவசாயி ஆலோசனை மற்றும் ஸ்மார்ட் வேளாண் சந்தை",

            heroText:
                "துல்லியமான தகவல்கள், நிகழ்நேர நோய் கண்டறிதல் மற்றும் நேரடி சந்தை வசதி மூலம் விவசாயிகளுக்கு உதவுகிறோம்.",

            talkAI:
                "AI உடன் பேசுங்கள்",

            explore:
                "சந்தையைப் பாருங்கள்",

            farmers:
                "10,000+ விவசாயிகள் இன்று பயன்பெறுகின்றனர்",

            diagnostic:
                "AI நோய் கண்டறிதல்",

            riceBlast:
                "நெல் குலை நோய் கண்டறியப்பட்டது (95.4% நம்பகத்தன்மை)",

            microClimate:
                "நுண்ணிய காலநிலை",

            farmersEmpowered:
                "விவசாயிகள் பயன்பெற்றனர்",

            villages:
                "டிஜிட்டல் கிராமங்கள்",

            accuracy:
                "AI நோய் கண்டறிதல் துல்லியம்",

            toolsTitle:
                "நவீன விவசாயத்திற்கான துல்லியமான கருவிகள்",

            toolsText:
                "முன்கணிப்பு தகவல்கள் முதல் சந்தை அணுகல் வரை விவசாயிகளுக்குத் தேவையான அனைத்து வசதிகளையும் எங்கள் தளம் வழங்குகிறது.",

            advisorTitle:
                "AI விவசாய ஆலோசகர்",

            advisorText:
                "விவசாயம் தொடர்பான கேள்விகளுக்கு 24/7 பலமொழி ஆதரவு. மண் ஆரோக்கியம் முதல் அறுவடை வரை AI உள்ளூர் நிலைமைகளைப் புரிந்துகொண்டு உங்கள் மொழியில் பதிலளிக்கும்.",

            tryAdvisor:
                "ஆலோசகரைப் பயன்படுத்துங்கள்",

            weather:
                "உள்ளூர் வானிலை",

            weatherText:
                "பயிர்களைப் பாதுகாக்க துல்லியமான வானிலை முன்னறிவிப்புகள் மற்றும் சரியான நேர எச்சரிக்கைகளைப் பெறுங்கள்.",

            disease:
                "பூச்சி மற்றும் நோய் கண்டறிதல்",

            diseaseText:
                "பயிரின் புகைப்படத்தைப் பதிவேற்றி நோய் மற்றும் சிகிச்சை முறைகளை உடனடியாக அறியுங்கள்.",

            schemes:
                "அரசுத் திட்டங்கள்",

            schemesText:
                "மானியங்கள் மற்றும் நிதி உதவிகளைத் தவறவிடாதீர்கள். தகுதியான அரசு திட்டங்களை உங்கள் சுயவிவரத்தின் அடிப்படையில் கண்டறியலாம்.",

            mission:
                "எங்கள் நோக்கம்: ஒவ்வொரு ஏக்கரையும் டிஜிட்டல் மயமாக்குதல்",

            missionText1:
                "தொழில்நுட்பம் ஒரு ஆடம்பரம் அல்ல, ஒவ்வொரு விவசாயிக்கும் தேவையான அடிப்படை கருவியாக இருக்க வேண்டும் என்பதே எங்கள் நோக்கம்.",

            missionText2:
                "செயற்கை நுண்ணறிவையும் வேளாண் அறிவையும் இணைத்து வீணாக்கத்தைக் குறைத்து, விளைச்சலை அதிகரித்து விவசாயிகளுக்கு சிறந்த வருமானத்தை உருவாக்க உதவுகிறோம்.",

            sustainable:
                "நிலையான துல்லிய விவசாயம்",

            pricing:
                "வெளிப்படையான சந்தை விலை",

            climate:
                "காலநிலை சார்ந்த ஆலோசனை",

            learn:
                "எங்களைப் பற்றி மேலும் அறிக",

            product:
                "தயாரிப்புகள்",

            company:
                "நிறுவனம்",

            newsletter:
                "செய்திமடல்",

            newsletterText:
                "துல்லியமான விவசாயம் தொடர்பான சமீபத்திய தகவல்களைப் பெறுங்கள்.",

            email:
                "மின்னஞ்சல்",

            terms:
                "சேவை விதிமுறைகள்",

            privacy:
                "தனியுரிமைக் கொள்கை",

            footer:
                "உலகளாவிய வேளாண் சூழலுக்கு துல்லியத்தையும் வளர்ச்சியையும் உருவாக்குகிறோம்."
        },


        hi: {

            marketplace: "कृषि बाज़ार",

            advisor: "AI सलाहकार",

            dashboard: "डैशबोर्ड",

            signIn: "साइन इन",

            future:
                "कृषि का भविष्य",

            heroTitle:
                "AI आधारित किसान सलाह और स्मार्ट कृषि बाज़ार",

            heroText:
                "सटीक जानकारी, तुरंत रोग पहचान और सीधे कृषि बाज़ार के माध्यम से किसानों को सशक्त बनाना।",

            talkAI:
                "AI से बात करें",

            explore:
                "कृषि बाज़ार देखें",

            farmers:
                "10,000+ किसान आज लाभ उठा रहे हैं",

            diagnostic:
                "AI रोग पहचान",

            riceBlast:
                "धान में ब्लास्ट रोग पाया गया (95.4% विश्वास)",

            microClimate:
                "सूक्ष्म जलवायु",

            farmersEmpowered:
                "सशक्त किसान",

            villages:
                "डिजिटल गाँव",

            accuracy:
                "AI रोग पहचान सटीकता",

            toolsTitle:
                "आधुनिक कृषि के लिए स्मार्ट उपकरण",

            toolsText:
                "हमारा प्लेटफॉर्म किसानों को पूर्वानुमान जानकारी से लेकर बाज़ार तक आवश्यक सुविधाएँ प्रदान करता है।",

            advisorTitle:
                "AI कृषि सलाहकार",

            advisorText:
                "कृषि संबंधी प्रश्नों के लिए 24/7 बहुभाषी सहायता। हमारा AI स्थानीय परिस्थितियों को समझता है और आपकी भाषा में जवाब देता है।",

            tryAdvisor:
                "सलाहकार आज़माएँ",

            weather:
                "स्थानीय मौसम",

            weatherText:
                "अपनी फसल को अचानक मौसम परिवर्तन से बचाने के लिए सटीक मौसम पूर्वानुमान और चेतावनी प्राप्त करें।",

            disease:
                "कीट और रोग पहचान",

            diseaseText:
                "फसल की तस्वीर अपलोड करें और तुरंत रोग की पहचान तथा उपचार की जानकारी प्राप्त करें।",

            schemes:
                "सरकारी योजनाएँ",

            schemesText:
                "सब्सिडी और सरकारी सहायता से न चूकें। हमारा प्लेटफॉर्म आपकी प्रोफ़ाइल के अनुसार योग्य योजनाएँ खोजता है।",

            mission:
                "हमारा मिशन: हर एकड़ को डिजिटल बनाना",

            missionText1:
                "हमारा मानना है कि तकनीक विलासिता नहीं बल्कि हर किसान के लिए आवश्यक उपकरण होनी चाहिए।",

            missionText2:
                "कृत्रिम बुद्धिमत्ता और कृषि विशेषज्ञता को जोड़कर हम बर्बादी कम करने, उत्पादन बढ़ाने और किसानों की आय सुधारने में सहायता करते हैं।",

            sustainable:
                "सतत सटीक कृषि",

            pricing:
                "पारदर्शी बाज़ार मूल्य",

            climate:
                "जलवायु आधारित सलाह",

            learn:
                "हमारे बारे में अधिक जानें",

            product:
                "उत्पाद",

            company:
                "कंपनी",

            newsletter:
                "न्यूज़लेटर",

            newsletterText:
                "सटीक कृषि की नवीनतम जानकारी प्राप्त करें।",

            email:
                "ईमेल",

            terms:
                "सेवा की शर्तें",

            privacy:
                "गोपनीयता नीति",

            footer:
                "वैश्विक कृषि प्रणाली के लिए सटीकता और समृद्धि का निर्माण।"
        }

    };


    // =========================================================
    // LANGUAGE SELECTOR
    // =========================================================

    const languageIcon =
        document.querySelector(
            ".material-symbols-outlined"
        );

    // Create language dropdown
    const languageContainer =
        document.createElement("div");

    languageContainer.className =
        "fixed top-20 right-6 z-[100] hidden bg-white shadow-xl rounded-xl p-3 w-52";

    languageContainer.innerHTML = `

        <p class="font-bold text-primary mb-2">
            🌐 Select Language
        </p>

        <button data-lang="en"
            class="language-option w-full text-left p-2 rounded-lg hover:bg-gray-100">
            English
        </button>

        <button data-lang="ta"
            class="language-option w-full text-left p-2 rounded-lg hover:bg-gray-100">
            தமிழ்
        </button>

        <button data-lang="hi"
            class="language-option w-full text-left p-2 rounded-lg hover:bg-gray-100">
            हिन्दी
        </button>

    `;

    document.body.appendChild(languageContainer);


    // Find language icon specifically
    const languageButtons =
        document.querySelectorAll(
            'span.material-symbols-outlined'
        );

    let languageButton = null;

    languageButtons.forEach((icon) => {

        if (
            icon.textContent.trim() ===
            "language"
        ) {

            languageButton = icon;

        }

    });


    if (languageButton) {

        languageButton.addEventListener(
            "click",
            () => {

                languageContainer.classList.toggle(
                    "hidden"
                );

            }
        );

    }


    // =========================================================
    // TRANSLATION MAP
    // =========================================================

    const translationMap = {

        "Marketplace": "marketplace",

        "AI Advisor": "advisor",

        "Dashboard": "dashboard",

        "Sign In": "signIn",

        "The Future of Farming": "future",

        "AI-Powered Farmer Advisory and Smart Agricultural Marketplace":
            "heroTitle",

        "Empowering farmers with precision insights, real-time disease detection, and a direct-to-consumer marketplace. Cultivating success through intelligence.":
            "heroText",

        "Talk with AI": "talkAI",

        "Explore Marketplace": "explore",

        "Join 10,000+ farmers thriving today":
            "farmers",

        "AI Diagnostic": "diagnostic",

        "Rice Blast Detected (95.4% Confidence)":
            "riceBlast",

        "Micro-Climate": "microClimate",

        "Farmers Empowered":
            "farmersEmpowered",

        "Digital Villages":
            "villages",

        "AI Diagnostic Accuracy":
            "accuracy",

        "Precision Tools for Modern Agriculture":
            "toolsTitle",

        "AI Krishi Advisor":
            "advisorTitle",

        "Hyperlocal Weather":
            "weather",

        "Pest & Disease ID":
            "disease",

        "Government Schemes":
            "schemes",

        "Our Mission: Digitizing Every Acre":
            "mission",

        "Sustainable Precision Agriculture":
            "sustainable",

        "Transparent Marketplace Pricing":
            "pricing",

        "Climate-Resilient Advisory":
            "climate",

        "Learn More About Us":
            "learn",

        "Product":
            "product",

        "Company":
            "company",

        "Newsletter":
            "newsletter",

        "Email":
            "email",

        "Terms of Service":
            "terms",

        "Privacy Policy":
            "privacy"

    };


    // =========================================================
    // APPLY LANGUAGE
    // =========================================================

    function changeLanguage(language) {

        const selected =
            translations[language];

        if (!selected) return;


        // Change HTML language
        document.documentElement.lang =
            language;


        // Find text nodes and replace
        const walker =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT
            );


        const nodes = [];

        let node;

        while (
            node =
            walker.nextNode()
        ) {

            nodes.push(node);

        }


        nodes.forEach((textNode) => {

            const original =
                textNode.textContent.trim();

            if (!original) return;

            const key =
                translationMap[original];

            if (
                key &&
                selected[key]
            ) {

                textNode.textContent =
                    textNode.textContent.replace(
                        original,
                        selected[key]
                    );

            }

        });


        // Save language
        localStorage.setItem(
            "krishiLanguage",
            language
        );


        // Close dropdown
        languageContainer.classList.add(
            "hidden"
        );


        console.log(
            "Language changed to:",
            language
        );

    }


    // =========================================================
    // LANGUAGE BUTTON EVENTS
    // =========================================================

    document
        .querySelectorAll(".language-option")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const language =
                        button.dataset.lang;

                    changeLanguage(
                        language
                    );

                }
            );

        });


    // =========================================================
    // LOAD SAVED LANGUAGE
    // =========================================================

    const savedLanguage =
        localStorage.getItem(
            "krishiLanguage"
        );


    if (savedLanguage &&
        translations[savedLanguage]) {

        changeLanguage(
            savedLanguage
        );

    }

});