// ============================================================
// DIGITAL KRISHI OFFICER
// MULTI-LANGUAGE: ENGLISH + TAMIL + HINDI
// CHAT + AI DISEASE DIAGNOSIS
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // BACKEND
    // ========================================================

    const API_BASE_URL = "http://127.0.0.1:8000";


    // ========================================================
    // CURRENT LANGUAGE
    // ========================================================

    let currentLanguage =
        localStorage.getItem("selectedLanguage") || "en";


    // ========================================================
    // TRANSLATIONS
    // ========================================================

    const translations = {

        // ====================================================
        // ENGLISH
        // ====================================================

        en: {

            language: "English",

            marketplace: "Marketplace",
            advisor: "AI Advisor",
            dashboard: "Dashboard",

            advanced: "Advanced Diagnostics",
            aiDisease: "AI Disease Detection",

            headerDescription:
                "Identify crop infections with AI and receive treatment advice.",

            upload:
                "Upload or Capture Image",

            uploadDescription:
                "Scan affected leaves or fruits for instant AI identification and treatment advice.",

            capture:
                "Capture Live",

            choose:
                "Choose File",

            diagnosis:
                "Diagnosis",

            activeScan:
                "Active Scan",

            identifiedDisease:
                "Identified Disease",

            awaiting:
                "Awaiting Image",

            confidence:
                "Confidence Score",

            treatment:
                "Treatment Plan",

            defaultTreatment:
                "Upload a crop image to receive treatment advice.",

            krishiAI:
                "Krishi AI",

            status:
                "Virtual Agronomist • Online",

            welcome:
                "Hello! I'm Krishi AI. Ask me about crops, irrigation, diseases, fertilizers, weather or farming.",

            ask:
                "Ask Krishi AI...",

            nearby:
                "Nearby Officers",

            officer:
                "District Agriculture Officer • Nearby",

            video:
                "Immediate Video Consult",

            footer:
                "Revolutionizing agriculture through precision AI and real-time field data.",

            resources:
                "Resources",

            legal:
                "Legal",

            subscribe:
                "Subscribe to Insights",

            email:
                "Email address",

            imageUploaded:
                "Image uploaded. Analyzing the crop...",

            diagnosisCompleted:
                "Diagnosis completed:",

            apiError:
                "Sorry, Krishi AI is unreachable right now.",

            diseaseError:
                "Unable to analyze the image right now. Please try again.",

            noResponse:
                "No response received."

        },


        // ====================================================
        // TAMIL
        // ====================================================

        ta: {

            language: "தமிழ்",

            marketplace: "சந்தை",
            advisor: "AI ஆலோசகர்",
            dashboard: "டாஷ்போர்டு",

            advanced: "மேம்பட்ட நோய் கண்டறிதல்",

            aiDisease:
                "AI பயிர் நோய் கண்டறிதல்",

            headerDescription:
                "AI மூலம் பயிர் நோய்களை கண்டறிந்து சிகிச்சை ஆலோசனைகளைப் பெறுங்கள்.",

            upload:
                "படத்தை பதிவேற்றவும் அல்லது படம் எடுக்கவும்",

            uploadDescription:
                "பாதிக்கப்பட்ட இலைகள் அல்லது பழங்களை ஸ்கேன் செய்து உடனடி AI அடையாளம் மற்றும் சிகிச்சை ஆலோசனையைப் பெறுங்கள்.",

            capture:
                "நேரடி படம்",

            choose:
                "கோப்பை தேர்வு செய்க",

            diagnosis:
                "நோய் கண்டறிதல்",

            activeScan:
                "ஸ்கேன் செயலில் உள்ளது",

            identifiedDisease:
                "கண்டறியப்பட்ட நோய்",

            awaiting:
                "படத்திற்காக காத்திருக்கிறது",

            confidence:
                "நம்பகத்தன்மை மதிப்பெண்",

            treatment:
                "சிகிச்சை திட்டம்",

            defaultTreatment:
                "சிகிச்சை ஆலோசனை பெற பயிரின் படத்தை பதிவேற்றவும்.",

            krishiAI:
                "கிருஷி AI",

            status:
                "மெய்நிகர் வேளாண் ஆலோசகர் • ஆன்லைன்",

            welcome:
                "வணக்கம்! நான் கிருஷி AI. பயிர்கள், பாசனம், நோய்கள், உரங்கள், வானிலை அல்லது விவசாயம் பற்றி என்னிடம் கேளுங்கள்.",

            ask:
                "கிருஷி AI-யிடம் கேளுங்கள்...",

            nearby:
                "அருகிலுள்ள வேளாண் அதிகாரிகள்",

            officer:
                "மாவட்ட வேளாண் அதிகாரி • அருகில்",

            video:
                "உடனடி வீடியோ ஆலோசனை",

            footer:
                "AI மற்றும் நிகழ்நேர விவசாய தரவுகள் மூலம் விவசாயத்தை மேம்படுத்துகிறது.",

            resources:
                "வளங்கள்",

            legal:
                "சட்டம்",

            subscribe:
                "தகவல்களுக்கு பதிவு செய்யுங்கள்",

            email:
                "மின்னஞ்சல் முகவரி",

            imageUploaded:
                "படம் பதிவேற்றப்பட்டது. பயிரை ஆய்வு செய்கிறேன்...",

            diagnosisCompleted:
                "நோய் கண்டறிதல் முடிந்தது:",

            apiError:
                "மன்னிக்கவும், கிருஷி AI தற்போது கிடைக்கவில்லை.",

            diseaseError:
                "படத்தை தற்போது ஆய்வு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

            noResponse:
                "பதில் கிடைக்கவில்லை."

        },


        // ====================================================
        // HINDI
        // ====================================================

        hi: {

            language: "हिन्दी",

            marketplace: "बाज़ार",
            advisor: "AI सलाहकार",
            dashboard: "डैशबोर्ड",

            advanced: "उन्नत रोग पहचान",

            aiDisease:
                "AI फसल रोग पहचान",

            headerDescription:
                "AI की मदद से फसल के रोग पहचानें और उपचार की सलाह प्राप्त करें।",

            upload:
                "चित्र अपलोड करें या फोटो लें",

            uploadDescription:
                "प्रभावित पत्तियों या फलों को स्कैन करके तुरंत AI पहचान और उपचार सलाह प्राप्त करें।",

            capture:
                "लाइव फोटो",

            choose:
                "फाइल चुनें",

            diagnosis:
                "रोग पहचान",

            activeScan:
                "स्कैन सक्रिय है",

            identifiedDisease:
                "पहचाना गया रोग",

            awaiting:
                "चित्र की प्रतीक्षा है",

            confidence:
                "विश्वसनीयता स्कोर",

            treatment:
                "उपचार योजना",

            defaultTreatment:
                "उपचार की सलाह प्राप्त करने के लिए फसल की तस्वीर अपलोड करें।",

            krishiAI:
                "कृषि AI",

            status:
                "वर्चुअल कृषि सलाहकार • ऑनलाइन",

            welcome:
                "नमस्ते! मैं कृषि AI हूँ। फसल, सिंचाई, रोग, उर्वरक, मौसम या खेती के बारे में मुझसे पूछें।",

            ask:
                "कृषि AI से पूछें...",

            nearby:
                "नज़दीकी कृषि अधिकारी",

            officer:
                "जिला कृषि अधिकारी • पास में",

            video:
                "तुरंत वीडियो परामर्श",

            footer:
                "AI और वास्तविक समय के कृषि डेटा के माध्यम से खेती को बेहतर बनाना।",

            resources:
                "संसाधन",

            legal:
                "कानूनी",

            subscribe:
                "जानकारी के लिए सदस्यता लें",

            email:
                "ईमेल पता",

            imageUploaded:
                "चित्र अपलोड हो गया है। फसल का विश्लेषण किया जा रहा है...",

            diagnosisCompleted:
                "रोग पहचान पूरी हुई:",

            apiError:
                "माफ़ कीजिए, कृषि AI अभी उपलब्ध नहीं है।",

            diseaseError:
                "अभी चित्र का विश्लेषण नहीं किया जा सका। कृपया फिर से प्रयास करें।",

            noResponse:
                "कोई उत्तर प्राप्त नहीं हुआ।"

        }

    };


    // ========================================================
    // TRANSLATION FUNCTION
    // ========================================================

    function t(key) {

        return (
            translations[currentLanguage]?.[key] ||
            translations.en[key] ||
            key
        );

    }


    // ========================================================
    // SET TEXT
    // ========================================================

    function setText(selector, text) {

        const element =
            document.querySelector(selector);

        if (element) {

            element.textContent = text;

        }

    }


    // ========================================================
    // APPLY LANGUAGE
    // ========================================================

    function applyLanguage(lang) {

        if (!translations[lang]) {

            lang = "en";

        }

        currentLanguage = lang;

        localStorage.setItem(
            "selectedLanguage",
            currentLanguage
        );

        document.documentElement.lang =
            currentLanguage;


        const translation =
            translations[currentLanguage];


        // ----------------------------------------------------
        // NAVIGATION
        // ----------------------------------------------------

        setText(
            "#nav-marketplace",
            translation.marketplace
        );

        setText(
            "#nav-advisor",
            translation.advisor
        );

        setText(
            "#nav-dashboard",
            translation.dashboard
        );


        // ----------------------------------------------------
        // LANGUAGE
        // ----------------------------------------------------

        setText(
            "#current-language",
            translation.language
        );


        // ----------------------------------------------------
        // HEADER
        // ----------------------------------------------------

        setText(
            "#advanced-title",
            translation.advanced
        );

        setText(
            "#ai-disease-title",
            translation.aiDisease
        );

        setText(
            "#header-description",
            translation.headerDescription
        );


        // ----------------------------------------------------
        // UPLOAD
        // ----------------------------------------------------

        setText(
            "#upload-title",
            translation.upload
        );

        setText(
            "#upload-description",
            translation.uploadDescription
        );

        setText(
            "#capture-btn",
            translation.capture
        );

        setText(
            "#choose-file-text",
            translation.choose
        );


        // ----------------------------------------------------
        // DIAGNOSIS
        // ----------------------------------------------------

        setText(
            "#diagnosis-title",
            translation.diagnosis
        );

        setText(
            "#active-scan-text",
            translation.activeScan
        );

        setText(
            "#identified-disease-label",
            translation.identifiedDisease
        );

        setText(
            "#confidence-label",
            translation.confidence
        );


        // ----------------------------------------------------
        // TREATMENT
        // ----------------------------------------------------

        setText(
            "#treatment-title",
            translation.treatment
        );


        // ----------------------------------------------------
        // CHAT
        // ----------------------------------------------------

        setText(
            "#krishi-ai-title",
            translation.krishiAI
        );

        setText(
            "#krishi-status",
            translation.status
        );

        setText(
            "#welcome-message",
            translation.welcome
        );


        const input =
            document.querySelector(
                "#krishi-chat-input"
            );

        if (input) {

            input.placeholder =
                translation.ask;

        }


        // ----------------------------------------------------
        // OFFICERS
        // ----------------------------------------------------

        setText(
            "#officer-title",
            translation.nearby
        );

        setText(
            "#officer-distance",
            translation.officer
        );

        setText(
            "#video-consult-text",
            translation.video
        );


        // ----------------------------------------------------
        // FOOTER
        // ----------------------------------------------------

        setText(
            "#footer-description",
            translation.footer
        );

        setText(
            "#footer-resources",
            translation.resources
        );

        setText(
            "#footer-legal",
            translation.legal
        );

        setText(
            "#footer-subscribe",
            translation.subscribe
        );

    }


    // ========================================================
    // LANGUAGE MENU
    // ========================================================

    const languageBtn =
        document.querySelector("#language-btn");

    const languageMenu =
        document.querySelector("#language-menu");


    if (languageBtn && languageMenu) {

        languageBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                languageMenu.classList.toggle(
                    "hidden"
                );

            }
        );


        document
            .querySelectorAll(".language-option")
            .forEach(option => {

                option.addEventListener(
                    "click",
                    () => {

                        const lang =
                            option.getAttribute(
                                "data-lang"
                            );

                        applyLanguage(lang);

                        languageMenu.classList.add(
                            "hidden"
                        );

                    }
                );

            });


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !languageBtn.contains(
                        event.target
                    ) &&
                    !languageMenu.contains(
                        event.target
                    )
                ) {

                    languageMenu.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }


    // ========================================================
    // CHAT ELEMENTS
    // ========================================================

    const chatInput =
        document.querySelector(
            "#krishi-chat-input"
        );

    const chatSendBtn =
        document.querySelector(
            "#krishi-chat-send"
        );

    const chatMessages =
        document.querySelector(
            "#krishi-chat-messages"
        );


    // ========================================================
    // ADD MESSAGE
    // ========================================================

    function appendMessage(
        text,
        fromUser = false
    ) {

        if (!chatMessages) return;


        const bubble =
            document.createElement("div");


        bubble.className = fromUser

            ? "bg-primary/5 border border-primary/10 p-4 rounded-2xl rounded-tr-none ml-auto max-w-[85%]"

            : "bg-surface-container-low p-4 rounded-2xl rounded-tl-none max-w-[85%]";


        const paragraph =
            document.createElement("p");


        paragraph.className = fromUser

            ? "font-body-md text-primary"

            : "font-body-md text-on-surface";


        paragraph.textContent = text;


        bubble.appendChild(paragraph);

        chatMessages.appendChild(bubble);


        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }


    // ========================================================
    // SEND CHAT
    // ========================================================

    async function sendChatMessage() {

        if (
            !chatInput ||
            !chatInput.value.trim()
        ) {

            return;

        }


        const message =
            chatInput.value.trim();


        appendMessage(
            message,
            true
        );


        chatInput.value = "";


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/chat`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            message: message,

                            language:
                                currentLanguage

                        })

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Chat API failed"
                );

            }


            const data =
                await response.json();


            if (data.reply) {

                appendMessage(
                    data.reply,
                    false
                );

            }

            else {

                appendMessage(
                    t("noResponse"),
                    false
                );

            }

        }

        catch (error) {

            console.error(
                "Chat API Error:",
                error
            );


            appendMessage(
                t("apiError"),
                false
            );

        }

    }


    // ========================================================
    // CHAT BUTTON
    // ========================================================

    if (chatSendBtn) {

        chatSendBtn.addEventListener(
            "click",
            sendChatMessage
        );

    }


    // ========================================================
    // ENTER KEY
    // ========================================================

    if (chatInput) {

        chatInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    sendChatMessage();

                }

            }
        );

    }


    // ========================================================
    // FILE ELEMENTS
    // ========================================================

    const fileInput =
        document.querySelector(
            "#leaf-image-input"
        );

    const chooseFileBtn =
        document.querySelector(
            "#choose-file-btn"
        );


    // ========================================================
    // CHOOSE FILE
    // ========================================================

    if (chooseFileBtn) {

        chooseFileBtn.addEventListener(
            "click",
            () => {

                if (fileInput) {

                    fileInput.click();

                }

            }
        );

    }


    // ========================================================
    // IMAGE DIAGNOSIS
    // ========================================================

    if (fileInput) {

        fileInput.addEventListener(
            "change",
            async () => {

                if (
                    !fileInput.files ||
                    !fileInput.files[0]
                ) {

                    return;

                }


                const selectedFile =
                    fileInput.files[0];


                const formData =
                    new FormData();


                // IMAGE

                formData.append(
                    "image",
                    selectedFile
                );


                // IMPORTANT:
                // SEND CURRENT LANGUAGE TO BACKEND

                formData.append(
                    "language",
                    currentLanguage
                );


                try {

                    appendMessage(
                        t("imageUploaded"),
                        false
                    );


                    const response =
                        await fetch(
                            `${API_BASE_URL}/api/diagnose`,
                            {

                                method: "POST",

                                body: formData

                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Disease API failed"
                        );

                    }


                    const result =
                        await response.json();


                    console.log(
                        "Diagnosis result:",
                        result
                    );


                    updateDiagnosis(
                        result
                    );

                }

                catch (error) {

                    console.error(
                        "Disease Detection Error:",
                        error
                    );


                    appendMessage(
                        t("diseaseError"),
                        false
                    );

                }

            }
        );

    }


    // ========================================================
    // UPDATE DIAGNOSIS
    // ========================================================

    function updateDiagnosis(result) {

        if (!result) return;


        // ----------------------------------------------------
        // DISEASE
        // ----------------------------------------------------

        const diseaseName =
            document.querySelector(
                "#disease-result"
            );


        if (
            diseaseName &&
            result.disease
        ) {

            diseaseName.textContent =
                result.disease;

        }


        // ----------------------------------------------------
        // CONFIDENCE
        // ----------------------------------------------------

        const confidence =
            document.querySelector(
                "#confidence-result"
            );


        if (
            confidence &&
            result.confidence !== undefined
        ) {

            confidence.textContent =
                `${result.confidence}%`;

        }


        // ----------------------------------------------------
        // CONFIDENCE BAR
        // ----------------------------------------------------

        const progressBar =
            document.querySelector(
                "#confidence-bar"
            );


        if (
            progressBar &&
            result.confidence !== undefined
        ) {

            progressBar.style.width =
                `${result.confidence}%`;

        }


        // ----------------------------------------------------
        // TREATMENT
        // ----------------------------------------------------

        const treatmentList =
            document.querySelector(
                "#treatment-list"
            );


        if (
            treatmentList &&
            result.advice
        ) {

            treatmentList.innerHTML = "";


            const li =
                document.createElement("li");


            li.className =
                "flex gap-3";


            const icon =
                document.createElement("span");

            icon.className =
                "material-symbols-outlined text-leaf-vibrant flex-shrink-0";

            icon.textContent =
                "check_circle";


            const paragraph =
                document.createElement("p");

            paragraph.className =
                "font-body-md text-on-surface-variant";

            paragraph.textContent =
                result.advice;


            li.appendChild(icon);

            li.appendChild(paragraph);

            treatmentList.appendChild(li);

        }


        // ----------------------------------------------------
        // CHAT NOTIFICATION
        // ----------------------------------------------------

        appendMessage(

            `${t("diagnosisCompleted")} ${result.disease || ""}`,

            false

        );

    }


    // ========================================================
    // CAPTURE BUTTON
    // ========================================================

    const captureBtn =
        document.querySelector(
            "#capture-btn"
        );


    if (captureBtn) {

        captureBtn.addEventListener(
            "click",
            () => {

                if (fileInput) {

                    fileInput.click();

                }

            }
        );

    }


    // ========================================================
    // INITIAL LANGUAGE
    // ========================================================

    applyLanguage(
        currentLanguage
    );


    console.log(
        "Digital Krishi Officer loaded."
    );

    console.log(
        "Current language:",
        currentLanguage
    );

});