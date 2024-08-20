// Load cart from localStorage or initialize it as an empty object
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Function to add items to the cart
function addToCart(food, price) {
    if (cart[food]) {
        cart[food].quantity += 1;  // Increase quantity if the item exists
    } else {
        cart[food] = { price: price, quantity: 1 };  // Add new item with price and quantity
    }
    localStorage.setItem('cart', JSON.stringify(cart));  // Save the cart to localStorage
}

// Function to remove items from the cart
function removeFromCart(food) {
    if (cart[food]) {
        cart[food].quantity -= 1;  // Decrease quantity
        if (cart[food].quantity === 0) {
            delete cart[food];  // Remove item from the cart if the quantity is 0
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));  // Update the cart in localStorage
}

// Function to update the cart display on the cart page
function displayCart() {
    const cartElement = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');
    cartElement.innerHTML = '';

    let total = 0;

    for (let item in cart) {
        const listItem = document.createElement('li');
        const itemTotalPrice = cart[item].price * cart[item].quantity;
        listItem.textContent = `${item} (${cart[item].quantity}) - Rs${itemTotalPrice}`;
        cartElement.appendChild(listItem);
        total += itemTotalPrice;
    }

    totalPriceElement.textContent = total;
}

// Function to handle payment and clear the cart
function makePayment() {
    alert("Payment successful!Your Order Confirmed.");
    localStorage.removeItem('cart');  // Clear the cart from localStorage
    location.reload();  // Reload the page to reset the cart display
}

// Automatically display the cart if on the cart page
if (document.getElementById('cart')) {
    displayCart();
}
