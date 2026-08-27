// ============================================================
// DIGITAL KRISHI OFFICER
// AI DISEASE DETECTION + KRISHI AI CHAT
// English + Tamil + Hindi
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // API
    // ========================================================
const API_BASE_URL = "";


    // ========================================================
    // LANGUAGE
    // ========================================================

    let currentLanguage =
        localStorage.getItem("selectedLanguage") || "en";

    if (!["en", "ta", "hi"].includes(currentLanguage)) {
        currentLanguage = "en";
    }


    // ========================================================
    // TRANSLATIONS
    // ========================================================

    const translations = {

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
                "Hello! I'm Krishi. Ask me about crops, irrigation, diseases, fertilizers, weather or farming.",

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
                "Sorry, Krishi AI is unreachable right now. Please make sure the backend server is running.",

            diseaseError:
                "Unable to analyze the image right now. Please try again.",

            noResponse:
                "No response received."
        },


        ta: {

            language: "தமிழ்",

            marketplace: "சந்தை",
            advisor: "AI ஆலோசகர்",
            dashboard: "டாஷ்போர்டு",

            advanced: "மேம்பட்ட நோய் கண்டறிதல்",
            aiDisease: "AI பயிர் நோய் கண்டறிதல்",

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
                "வணக்கம்! நான் கிருஷி. பயிர்கள், பாசனம், நோய்கள், உரங்கள், வானிலை அல்லது விவசாயம் பற்றி என்னிடம் கேளுங்கள்.",

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
                "மன்னிக்கவும், கிருஷி AI தற்போது கிடைக்கவில்லை. Backend server இயங்குகிறதா என்பதை சரிபார்க்கவும்.",

            diseaseError:
                "படத்தை தற்போது ஆய்வு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",

            noResponse:
                "பதில் எதுவும் கிடைக்கவில்லை."
        },


        hi: {

            language: "हिन्दी",

            marketplace: "बाज़ार",
            advisor: "AI सलाहकार",
            dashboard: "डैशबोर्ड",

            advanced: "उन्नत रोग पहचान",
            aiDisease: "AI फसल रोग पहचान",

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
                "माफ़ कीजिए, कृषि AI अभी उपलब्ध नहीं है। Backend server चल रहा है या नहीं जांचें।",

            diseaseError:
                "अभी चित्र का विश्लेषण नहीं किया जा सका। कृपया फिर से प्रयास करें।",

            noResponse:
                "कोई उत्तर प्राप्त नहीं हुआ।"
        }
    };


    // ========================================================
    // TRANSLATION HELPER
    // ========================================================

    function t(key) {

        return (
            translations[currentLanguage]?.[key] ||
            translations.en[key] ||
            key
        );
    }


    // ========================================================
    // SAFE TEXT
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

        const tr =
            translations[currentLanguage];


        // Navigation

        setText(
            "#nav-marketplace",
            tr.marketplace
        );

        setText(
            "#nav-advisor",
            tr.advisor
        );

        setText(
            "#nav-dashboard",
            tr.dashboard
        );


        // Language

        setText(
            "#current-language",
            tr.language
        );


        // Header

        setText(
            "#advanced-title",
            tr.advanced
        );

        setText(
            "#ai-disease-title",
            tr.aiDisease
        );

        setText(
            "#header-description",
            tr.headerDescription
        );


        // Upload

        setText(
            "#upload-title",
            tr.upload
        );

        setText(
            "#upload-description",
            tr.uploadDescription
        );

        setText(
            "#capture-btn-text",
            tr.capture
        );

        setText(
            "#choose-file-text",
            tr.choose
        );


        // Diagnosis

        setText(
            "#diagnosis-title",
            tr.diagnosis
        );

        setText(
            "#active-scan-text",
            tr.activeScan
        );

        setText(
            "#identified-disease-label",
            tr.identifiedDisease
        );

        setText(
            "#confidence-label",
            tr.confidence
        );


        // Treatment

        setText(
            "#treatment-title",
            tr.treatment
        );


        // Krishi AI

        setText(
            "#krishi-ai-title",
            tr.krishiAI
        );

        setText(
            "#krishi-status",
            tr.status
        );

        setText(
            "#welcome-message",
            tr.welcome
        );


        const chatInput =
            document.querySelector(
                "#krishi-chat-input"
            );

        if (chatInput) {

            chatInput.placeholder =
                tr.ask;
        }


        // Officers

        setText(
            "#officer-title",
            tr.nearby
        );

        setText(
            "#officer-distance",
            tr.officer
        );

        setText(
            "#video-consult-text",
            tr.video
        );


        // Footer

        setText(
            "#footer-description",
            tr.footer
        );

        setText(
            "#footer-resources",
            tr.resources
        );

        setText(
            "#footer-legal",
            tr.legal
        );

        setText(
            "#footer-subscribe",
            tr.subscribe
        );


        const emailInput =
            document.querySelector(
                "#subscribe-email"
            );

        if (emailInput) {

            emailInput.placeholder =
                tr.email;
        }
    }


    // ========================================================
    // LANGUAGE MENU
    // ========================================================

    const languageBtn =
        document.querySelector(
            "#language-btn"
        );

    const languageMenu =
        document.querySelector(
            "#language-menu"
        );


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
            .querySelectorAll(
                ".language-option"
            )
            .forEach(option => {

                option.addEventListener(
                    "click",
                    () => {

                        const selected =
                            option.getAttribute(
                                "data-lang"
                            );

                        if (
                            ["en", "ta", "hi"]
                                .includes(selected)
                        ) {

                            applyLanguage(
                                selected
                            );
                        }

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

    const conversationHistory = [];
    const MAX_CHAT_HISTORY = 12;


    // ========================================================
    // ADD CHAT MESSAGE
    // ========================================================

    function appendMessage(
        text,
        fromUser = false
    ) {

        if (!chatMessages) {
            return;
        }

        const bubble =
            document.createElement(
                "div"
            );

        bubble.className =
            fromUser
                ? "chat-user"
                : "chat-ai";


        const paragraph =
            document.createElement(
                "p"
            );

        paragraph.className =
            "leading-relaxed";

        paragraph.textContent =
            text;


        bubble.appendChild(
            paragraph
        );

        chatMessages.appendChild(
            bubble
        );


        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }


    // ========================================================
    // LOADING MESSAGE
    // ========================================================

    function addLoadingMessage() {

        const bubble =
            document.createElement(
                "div"
            );

        bubble.id =
            "chat-loading";

        bubble.className =
            "chat-ai loading";


        const paragraph =
            document.createElement(
                "p"
            );

        paragraph.textContent =
            currentLanguage === "ta"
                ? "கிருஷி பதில் அளிக்கிறார்..."
                : currentLanguage === "hi"
                    ? "कृषि AI जवाब दे रहा है..."
                    : "Krishi AI is thinking...";


        bubble.appendChild(
            paragraph
        );

        chatMessages.appendChild(
            bubble
        );


        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }


    // ========================================================
    // REMOVE LOADING
    // ========================================================

    function removeLoadingMessage() {

        const loading =
            document.querySelector(
                "#chat-loading"
            );

        if (loading) {
            loading.remove();
        }
    }


    // ========================================================
    // SEND CHAT
    // ========================================================

    async function sendChatMessage() {

        if (!chatInput) {
            return;
        }


        const message =
            chatInput.value.trim();


        if (!message) {
            return;
        }


        appendMessage(
            message,
            true
        );


        chatInput.value = "";


        addLoadingMessage();


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
                            message:
                                message,

                            history:
                                conversationHistory.slice(-MAX_CHAT_HISTORY)
                        })
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Chat API HTTP ${response.status}`
                );
            }


            const data =
                await response.json();


            removeLoadingMessage();


            const reply =
                data.reply ||
                data.response ||
                data.message ||
                data.answer;


            if (reply) {

                appendMessage(
                    reply,
                    false
                );

                conversationHistory.push(
                    { role: "user", content: message },
                    { role: "assistant", content: reply }
                );

                if (conversationHistory.length > MAX_CHAT_HISTORY) {
                    conversationHistory.splice(
                        0,
                        conversationHistory.length - MAX_CHAT_HISTORY
                    );
                }

            } else {

                appendMessage(
                    t("noResponse"),
                    false
                );
            }


        } catch (error) {

            console.error(
                "Chat API Error:",
                error
            );


            removeLoadingMessage();


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
            (event) => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

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

    const captureBtn =
        document.querySelector(
            "#capture-btn"
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
    // CAPTURE
    // ========================================================

    if (captureBtn) {

        captureBtn.addEventListener(
            "click",
            () => {

                if (!fileInput) {
                    return;
                }

                // Opens camera/file chooser on supported devices.
                fileInput.setAttribute(
                    "capture",
                    "environment"
                );

                fileInput.click();
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


                console.log(
                    "Selected image:",
                    selectedFile.name
                );


                // Validate image

                if (
                    !selectedFile.type.startsWith(
                        "image/"
                    )
                ) {

                    alert(
                        "Please select an image file."
                    );

                    return;
                }


                // Show selected file

                appendMessage(
                    t("imageUploaded"),
                    false
                );


                // FormData

                const formData =
                    new FormData();


                formData.append(
                    "image",
                    selectedFile
                );


                formData.append(
                    "language",
                    currentLanguage
                );


                // Update UI

                const diseaseResult =
                    document.querySelector(
                        "#disease-result"
                    );

                if (diseaseResult) {

                    diseaseResult.textContent =
                        currentLanguage === "ta"
                            ? "ஆய்வு செய்கிறது..."
                            : currentLanguage === "hi"
                                ? "विश्लेषण हो रहा है..."
                                : "Analyzing...";
                }


                const confidenceResult =
                    document.querySelector(
                        "#confidence-result"
                    );

                if (confidenceResult) {

                    confidenceResult.textContent =
                        "0%";
                }


                const confidenceBar =
                    document.querySelector(
                        "#confidence-bar"
                    );

                if (confidenceBar) {

                    confidenceBar.style.width =
                        "0%";
                }


                try {

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
                            `Disease API HTTP ${response.status}`
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


                } catch (error) {

                    console.error(
                        "Disease Detection Error:",
                        error
                    );


                    if (diseaseResult) {

                        diseaseResult.textContent =
                            t("awaiting");
                    }


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

        if (!result) {
            return;
        }


        console.log(
            "Updating diagnosis:",
            result
        );


        // Disease

        const diseaseName =
            document.querySelector(
                "#disease-result"
            );


        const disease =
            result.disease ||
            result.prediction ||
            result.label ||
            result.class_name ||
            result.name;


        if (
            diseaseName &&
            disease
        ) {

            diseaseName.textContent =
                disease;
        }


        // Confidence

        const confidence =
            Number(
                result.confidence ??
                result.confidence_score ??
                result.score ??
                0
            );


        const safeConfidence =
            Math.max(
                0,
                Math.min(
                    100,
                    confidence
                )
            );


        const confidenceElement =
            document.querySelector(
                "#confidence-result"
            );


        if (confidenceElement) {

            confidenceElement.textContent =
                `${safeConfidence}%`;
        }


        // Progress

        const progressBar =
            document.querySelector(
                "#confidence-bar"
            );


        if (progressBar) {

            progressBar.style.width =
                `${safeConfidence}%`;
        }


        // Treatment

        const treatmentList =
            document.querySelector(
                "#treatment-list"
            );


        const advice =
            result.advice ||
            result.treatment ||
            result.recommendation ||
            result.recommendations;


        if (
            treatmentList &&
            advice
        ) {

            treatmentList.innerHTML = "";


            const li =
                document.createElement(
                    "li"
                );

            li.className =
                "flex gap-3";


            const icon =
                document.createElement(
                    "span"
                );

            icon.className =
                "text-[#25895d] flex-shrink-0";


            icon.innerHTML = `
                <svg
                    style="width:24px;height:24px"
                    viewBox="0 0 24 24"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="9"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                    />
                    <path
                        d="m8 12 2.5 2.5L16 9"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            `;


            const p =
                document.createElement(
                    "p"
                );

            p.className =
                "text-gray-600 leading-relaxed";

            p.textContent =
                advice;


            li.appendChild(
                icon
            );

            li.appendChild(
                p
            );


            treatmentList.appendChild(
                li
            );
        }


        // Diagnosis notification

        appendMessage(
            `${t("diagnosisCompleted")} ${disease || ""}`,
            false
        );
    }


    // ========================================================
    // MIC BUTTON
    // ========================================================

    const micBtn =
        document.querySelector(
            "#mic-btn"
        );


    if (
        micBtn &&
        "webkitSpeechRecognition" in window
    ) {

        micBtn.addEventListener(
            "click",
            () => {

                const Recognition =
                    window.webkitSpeechRecognition;


                const recognition =
                    new Recognition();


                recognition.lang =
                    currentLanguage === "ta"
                        ? "ta-IN"
                        : currentLanguage === "hi"
                            ? "hi-IN"
                            : "en-IN";


                recognition.interimResults =
                    false;


                recognition.maxAlternatives =
                    1;


                recognition.start();


                recognition.onresult =
                    (event) => {

                        const transcript =
                            event.results[0][0]
                                .transcript;


                        chatInput.value =
                            transcript;
                    };


                recognition.onerror =
                    (error) => {

                        console.error(
                            "Voice recognition error:",
                            error
                        );
                    };
            }
        );

    } else if (micBtn) {

        micBtn.addEventListener(
            "click",
            () => {

                alert(
                    "Voice input is not supported in this browser."
                );
            }
        );
    }


    // ========================================================
    // VIDEO CONSULT
    // ========================================================

    const videoBtn =
        document.querySelector(
            "#video-consult-btn"
        );


    if (videoBtn) {

        videoBtn.addEventListener(
            "click",
            () => {

                alert(
                    currentLanguage === "ta"
                        ? "வீடியோ ஆலோசனை வசதி விரைவில் கிடைக்கும்."
                        : currentLanguage === "hi"
                            ? "वीडियो परामर्श सुविधा जल्द उपलब्ध होगी।"
                            : "Video consultation will be available soon."
                );
            }
        );
    }


    // ========================================================
    // SUBSCRIBE
    // ========================================================

    const subscribeBtn =
        document.querySelector(
            "#subscribe-btn"
        );


    if (subscribeBtn) {

        subscribeBtn.addEventListener(
            "click",
            () => {

                const email =
                    document.querySelector(
                        "#subscribe-email"
                    )?.value.trim();


                if (!email) {

                    alert(
                        "Please enter your email address."
                    );

                    return;
                }


                alert(
                    "Thank you for subscribing!"
                );
            }
        );
    }


    // ========================================================
    // INITIAL LANGUAGE
    // ========================================================

    applyLanguage(
        currentLanguage
    );


    // ========================================================
    // STARTUP
    // ========================================================

    console.log(
        "===================================="
    );

    console.log(
        "Digital Krishi Officer loaded."
    );

    console.log(
        "API:",
        API_BASE_URL
    );

    console.log(
        "Language:",
        currentLanguage
    );

    console.log(
        "===================================="
    );

});
