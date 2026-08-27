// marketplace.js
// Digital Krishi Officer - Marketplace
// Frontend ↔ FastAPI Backend Connection

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // FASTAPI BACKEND
    // ==========================================

    const API_BASE_URL = "";

    let allProducts = [];


    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

        anchor.addEventListener("click", function (e) {

            const targetEl = document.querySelector(
                this.getAttribute("href")
            );

            if (!targetEl) return;

            e.preventDefault();

            targetEl.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    // ==========================================
    // LOAD PRODUCTS FROM FASTAPI
    // ==========================================

    async function loadProducts() {

        try {

            console.log("Connecting to FastAPI...");

            const response = await fetch(
                `${API_BASE_URL}/api/products`
            );

            if (!response.ok) {

                throw new Error(
                    `Server returned ${response.status}`
                );

            }

            allProducts = await response.json();

            console.log(
                "Products received from backend:",
                allProducts
            );

            displayProducts(allProducts);

        } catch (error) {

            console.error(
                "Backend connection failed:",
                error
            );

            console.log(
                "Make sure FastAPI is running at:"
            );

            console.log(
                "http://127.0.0.1:8000"
            );

        }

    }


    // ==========================================
    // DISPLAY PRODUCTS
    // ==========================================

    function displayProducts(products) {

        const productCards = Array.from(
            document.querySelectorAll(".glass-card")
        ).filter(card =>
            card.querySelector(".add-to-cart-btn")
        );


        console.log(
            "Product cards found:",
            productCards.length
        );


        products.forEach((product, index) => {

            if (!productCards[index]) return;


            const card = productCards[index];


            // Store database ID
            card.dataset.productId = product.id;


            // --------------------------------------
            // PRODUCT NAME
            // --------------------------------------

            const nameElement =
                card.querySelector("h3");

            if (nameElement) {

                nameElement.textContent =
                    product.name;

            }


            // --------------------------------------
            // PRODUCT PRICE
            // --------------------------------------

            /*
             * Your existing HTML may not have
             * .product-price, so we search for
             * common price elements.
             */

            const priceElement =
                card.querySelector(".product-price") ||
                card.querySelector(
                    "span.font-headline-md"
                );


            if (priceElement) {

                priceElement.innerHTML =
                    `₹${product.price}
                     <span class="text-label-sm text-on-surface-variant font-normal">
                     / ${product.unit || "unit"}
                     </span>`;

            }


            // --------------------------------------
            // PRODUCT DESCRIPTION
            // --------------------------------------

            const paragraphs =
                card.querySelectorAll("p");

            if (paragraphs.length > 0) {

                /*
                 * Use the first descriptive paragraph.
                 */
                const description =
                    Array.from(paragraphs).find(
                        p =>
                            !p.classList.contains(
                                "text-label-sm"
                            )
                    );

                if (description) {

                    description.textContent =
                        product.description ||
                        "Quality agricultural product.";

                }

            }


            // --------------------------------------
            // CATEGORY
            // --------------------------------------

            card.dataset.category =
                product.category || "";


        });


        // Connect Add-to-Cart buttons
        setupCartButtons();

    }


    // ==========================================
    // CATEGORY FILTER
    // ==========================================

    const filterButtons =
        document.querySelectorAll(
            ".category-filter"
        );


    filterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                // Remove active state
                filterButtons.forEach((btn) => {

                    btn.classList.remove(
                        "active-filter"
                    );

                });


                // Add active state
                button.classList.add(
                    "active-filter"
                );


                const category =
                    button.dataset.category ||
                    "All Categories";


                // Show everything
                if (
                    category === "All Categories" ||
                    category === "All"
                ) {

                    displayProducts(
                        allProducts
                    );

                    return;

                }


                // Filter products
                const filteredProducts =
                    allProducts.filter(
                        product => {

                            if (!product.category) {
                                return false;
                            }

                            return (
                                product.category
                                    .toLowerCase()
                                    .includes(
                                        category.toLowerCase()
                                    )
                            );

                        }
                    );


                console.log(
                    "Filtered products:",
                    filteredProducts
                );


                displayProducts(
                    filteredProducts
                );

            }
        );

    });


    // ==========================================
    // ADD TO CART
    // ==========================================

    function setupCartButtons() {

        document
            .querySelectorAll(
                ".add-to-cart-btn"
            )
            .forEach((button) => {


                // Prevent duplicate listeners
                if (
                    button.dataset.cartReady === "true"
                ) {

                    return;

                }


                button.dataset.cartReady =
                    "true";


                button.addEventListener(
                    "click",
                    () => {


                        const card =
                            button.closest(
                                ".glass-card"
                            );


                        if (!card) return;


                        const productId =
                            card.dataset.productId;


                        const product =
                            allProducts.find(
                                item =>
                                    String(item.id) ===
                                    String(productId)
                            );


                        if (!product) {

                            console.warn(
                                "Product not found:",
                                productId
                            );

                            return;

                        }


                        // ----------------------------------
                        // LOCAL CART FOR NOW
                        // ----------------------------------

                        let cart =
                            JSON.parse(
                                localStorage.getItem(
                                    "farmtech_cart"
                                ) || "[]"
                            );


                        const existing =
                            cart.find(
                                item =>
                                    item.id ===
                                    product.id
                            );


                        if (existing) {

                            existing.quantity += 1;

                        } else {

                            cart.push({

                                id: product.id,

                                name: product.name,

                                price: product.price,

                                unit: product.unit,

                                quantity: 1

                            });

                        }


                        // Save cart
                        localStorage.setItem(
                            "farmtech_cart",
                            JSON.stringify(cart)
                        );


                        console.log(
                            "Added to cart:",
                            product
                        );


                        alert(
                            `${product.name} added to cart!`
                        );

                    }
                );

            });

    }


    // ==========================================
    // START MARKETPLACE
    // ==========================================

    loadProducts();

});