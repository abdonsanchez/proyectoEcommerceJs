// document.addEventListener("DOMContentLoaded", () => {
//     const productGrid = document.getElementById("productGrid");

//     // Función para obtener productos desde la API
//     async function fetchProducts() {
//         try {
//             const response = await fetch("https://fakestoreapi.com/products");
//             const products = await response.json();
//             renderProducts(products);
//         } catch (error) {
//             console.error("Error al obtener los productos:", error);
//         }
//     }

//     // Renderizar productos en el DOM
//     function renderProducts(products) {
//         products.forEach(product => {
//             const card = document.createElement("div");
//             card.className = "product-card";
//             card.innerHTML = `
//                 <img src="${product.image}" alt="${product.title}" class="product-image">
//                 <h3>${product.title}</h3>
//                 <p>${product.price} USD</p>
//                 <button class="details-button" data-id="${product.id}">Ver detalles</button>
//             `;
//             productGrid.appendChild(card);
//         });
//     }

//     // Llamar a la función para obtener productos
//     fetchProducts();

//     // Validación del formulario de contacto
//     const contactForm = document.getElementById("contactForm");
//     contactForm.addEventListener("submit", (e) => {
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const message = document.getElementById("message").value;

//         if (!name || !email || !message) {
//             e.preventDefault();
//             console.log("Por favor completa todos los campos del formulario.");
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const cart = [];
    const cartContainer = document.getElementById("cartContainer");
    const totalAmount = document.getElementById("totalAmount");

    // Función para obtener productos desde la API
    async function fetchProducts() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }

    // Renderizar productos en el DOM
    function renderProducts(products) {
        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3>${product.title}</h3>
                <p>${product.price} USD</p>
                <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Añadir al carrito</button>
            `;
            productGrid.appendChild(card);
        });

        // Agregar eventos a los botones "Añadir al carrito"
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productId = button.getAttribute("data-id");
                const productTitle = button.getAttribute("data-title");
                const productPrice = parseFloat(button.getAttribute("data-price"));
                addToCart({ id: productId, title: productTitle, price: productPrice });
            });
        });
    }

    // Añadir producto al carrito
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }

    // Eliminar producto del carrito
    function removeFromCart(productId) {
        const productIndex = cart.findIndex(item => item.id === productId);
        if (productIndex > -1) {
            cart.splice(productIndex, 1);
        }
        renderCart();
    }

    // Renderizar carrito
    function renderCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach(product => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <span>${product.title} (x${product.quantity})</span>
                <span>${(product.price * product.quantity).toFixed(2)} USD</span>
                <button class="remove-from-cart" data-id="${product.id}">Eliminar</button>
            `;
            cartContainer.appendChild(cartItem);

            total += product.price * product.quantity;
        });

        totalAmount.textContent = `Total: ${total.toFixed(2)} USD`;

        // Agregar eventos a los botones "Eliminar"
        const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
        removeFromCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productId = button.getAttribute("data-id");
                removeFromCart(productId);
            });
        });
    }

    // Llamar a la función para obtener productos
    fetchProducts();

    // Validación del formulario de contacto
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", (e) => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (!name || !email || !message) {
            e.preventDefault();
            console.log("Por favor completa todos los campos del formulario.");
        }
    });
});
