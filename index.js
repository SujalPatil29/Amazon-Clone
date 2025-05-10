// Sample product data
const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
];

// Cart array to store added products
let cart = [];

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({ ...product, quantity: 1 }); // Store quantity as 1 initially
        displayCart();
    }
}

// Function to remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    displayCart();
}

// Function to update product quantity in cart
function updateProductQuantity(productId, quantity) {
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity = quantity;
        displayCart();
    }
}

// Function to display cart contents with quantity update
function displayCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.textContent = `${product.name} - $${product.price}`;
        
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = product.quantity;
        quantityInput.min = 1;
        quantityInput.onchange = (e) => updateProductQuantity(product.id, parseInt(e.target.value));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(product.id);

        productElement.appendChild(quantityInput);
        productElement.appendChild(removeButton);
        cartContainer.appendChild(productElement);
    });

    const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const totalElement = document.createElement('div');
    totalElement.id = 'total';
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartContainer.appendChild(totalElement);
}

// Function to clear the cart
function clearCart() {
    cart = [];
    displayCart();
}

// Function to save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        displayCart();
    }
}

// Function to apply discount code
function applyDiscount(code) {
    const discountCodes = {
        'DISCOUNT10': 0.1,
        'DISCOUNT20': 0.2,
        'DISCOUNT30': 0.3
    };

    const discount = discountCodes[code];
    if (discount) {
        const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        const discountedTotal = total - (total * discount);
        const totalElement = document.getElementById('total');
        totalElement.textContent = `Total after discount: $${discountedTotal.toFixed(2)}`;
    } else {
        alert('Invalid discount code');
    }
}

// Function to initialize discount code input
function initializeDiscountCode() {
    const discountContainer = document.getElementById('discount');
    const discountInput = document.createElement('input');
    discountInput.type = 'text';
    discountInput.placeholder = 'Enter discount code';
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply';
    applyButton.onclick = () => applyDiscount(discountInput.value);
    discountContainer.appendChild(discountInput);
    discountContainer.appendChild(applyButton);
}

// Function to initialize clear cart button
function initializeClearCartButton() {
    const clearCartContainer = document.getElementById('clear-cart');
    const clearCartButton = document.createElement('button');
    clearCartButton.textContent = 'Clear Cart';
    clearCartButton.onclick = clearCart;
    clearCartContainer.appendChild(clearCartButton);
}

// Function to handle checkout process
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    alert(`Your total is $${total.toFixed(2)}. Thank you for your purchase!`);
    clearCart();
}

// Function to initialize checkout button
function initializeCheckoutButton() {
    const checkoutContainer = document.getElementById('checkout');
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.onclick = checkout;
    checkoutContainer.appendChild(checkoutButton);
}

// Initialize the cart from local storage on page load
window.onload = () => {
    initializeProducts();
    loadCart();
    initializeDiscountCode();
    initializeClearCartButton();
    initializeCheckoutButton();
};

// Initialize product list
function initializeProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.textContent = `${product.name} - $${product.price}`;
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.onclick = () => addToCart(product.id);
        productElement.appendChild(addButton);
        productsContainer.appendChild(productElement);
    });
}
