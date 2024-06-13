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
    }
]


const cartItemsElement = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");


let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function renderCartItems() {
    
    cartItemsElement.innerHTML = "";

    
    cart.forEach(item => {
        const product = products.find(product => product.id === item.id);
        if (product) {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}" />
                <div class="cart-item-info">
                    <h2 class="cart-item-title">${product.title}</h2>
                    <p class="cart-item-price">€${product.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
                    </div>
                </div>
                <button class="remove-from-cart" onclick="removeFromCart(${product.id})">Remove</button>
            `;
            cartItemsElement.appendChild(cartItem);
        }
    });

    updateCartIcon();
    calculateCartTotal();
}


function calculateCartTotal() {
    const total = cart.reduce((acc, item) => {
        const product = products.find(product => product.id === item.id);
        return acc + (product ? product.price * item.quantity : 0);
    }, 0);
    cartTotalElement.textContent = `Total: €${total.toFixed(2)}`;
}


function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }
        saveToLocalStorage();
        renderCartItems();
    }
}

const cartIcon = document.getElementById("cart-icon");

function updateCartIcon() {
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartIcon.setAttribute("data-quantity", totalQuantity);
}


function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveToLocalStorage();
    renderCartItems();
    updateCartIcon();
}


function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveToLocalStorage();
        renderCartItems();
        updateCartIcon();
    }
}


function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        saveToLocalStorage();
        renderCartItems();
        updateCartIcon();
    }
}

renderCartItems();
