const products = [
    {
        id: 1,
        title: "Leather Dog Collar",
        price: 6.90,
        image: "static/images/dogcollar.jpg",
    },
    {
        id: 2,
        title: "Color Cat Collar",
        price: 8.90,
        image: "static/images/catcollarcolor.png",
    },
    {
        id: 3,
        title: "Color Dog Collar",
        price: 6.90,
        image: "static/images/dogcollar2.png",
    },
    {
        id: 4,
        title: "Grey Cat Collar",
        price: 9.90,
        image: "static/images/catcollargrey.png",
    },
    {
        id: 5,
        title: "Black Dog Collar",
        price: 9.90,
        image: "static/images/dogcollarblack.png",
    },
    {
        id: 6,
        title: "Pink Dog Collar",
        price: 8.90,
        image: "static/images/dogcollarpink.png",
    },
    {
        id: 7,
        title: "Pearl Dog Collar",
        price: 5.90,
        image: "static/images/dogcollarpink2.png",
    },
    {
        id: 8,
        title: "Straw Ball",
        price: 3.90,
        image: "static/images/cattoy.png",
    },
    {
        id: 9,
        title: "Cat Toy",
        price: 15.90,
        image: "static/images/cattoy2.png",
    },
    {
        id: 10,
        title: "Cat Scratcher",
        price: 5.90,
        image: "static/images/cattoy3.png",
    },
    {
        id: 11,
        title: "Toy Set",
        price: 9.90,
        image: "static/images/toyset1.png",
    },
    {
        id: 12,
        title: "Cat Tunnel",
        price: 12.90,
        image: "static/images/cattoy4.png",
    },
    {
        id: 13,
        title: "Dog Hat",
        price: 4.90,
        image: "static/images/dogaccessorie.png",
    },
    {
        id: 14,
        title: "Ceramic Food Container",
        price: 18.90,
        image: "static/images/foodcontainer.png",
    },
    {
        id: 15,
        title: "Steel Food Container",
        price: 14.90,
        image: "static/images/foodcontainer2.png",
    },
    {
        id: 16,
        title: "Automatic Food Container",
        price: 24.90,
        image: "static/images/foodcontainer3.png",
    },
    
    
];


const productList = document.getElementById("productList");
const cartIcon = document.getElementById("cart-icon");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
    productList.innerHTML = products.map((product) => {
        const isProductInCart = cart.some((item) => item.id === product.id);
        const buttonText = isProductInCart ? "Added" : "Add to cart";

        return `
            <div class="product">
                <img src="${product.image}" alt="${product.title}" class="product-img">
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">€${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">${buttonText}</button>
                </div>
            </div>
        `;
    }).join("");

    const addToCartButtons = document.getElementsByClassName("add-to-cart");
    for (let i = 0; i < addToCartButtons.length; i++) {
        const addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener("click", addToCart);
    }

    const addedButtons = document.querySelectorAll(".add-to-cart[disabled]");
    for (let i = 0; i < addedButtons.length; i++) {
        const addedButton = addedButtons[i];
        addedButton.addEventListener("click", reAddToCart);
    }
}

function addToCart(event) {
    const productID = parseInt(event.target.dataset.id);
    const product = products.find(product => product.id === productID);

    if (product) {
        const existingItem = cart.find((item) => item.id === productID);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            };
            cart.push(cartItem);
        }

        event.target.textContent = "Added";
        event.target.disabled = true;

        updateCartIcon();
        saveToLocalStorage();
    }
}

function reAddToCart(event) {
    const productID = parseInt(event.target.dataset.id);
    const product = products.find(product => product.id === productID);

    if (product) {
        const existingItem = cart.find((item) => item.id === productID);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            };
            cart.push(cartItem);
        }

        updateCartIcon();
        saveToLocalStorage();
        renderProducts();
    }
}

function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function updateCartIcon() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartIcon.setAttribute("data-quantity", totalQuantity);
}


cartIcon.addEventListener("click", redirectToCartPage);

function redirectToCartPage() {
    saveToLocalStorage();
    
    window.location.href = "cart.html";
}


renderProducts();
updateCartIcon();