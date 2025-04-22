// Array to store products
let cart = [];

// Add Product function
function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const quantity = parseInt(document.getElementById("product-quantity").value);

    if (!name || isNaN(price) || isNaN(quantity) || price < 0 || quantity < 1) {
        alert("Please enter valid product details!");
        return;
    }

    cart.push({ productName: name, price, quantity });
    updateCart();
}

// Calculate Total Cost
function calculateTotal() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

// Remove Product function
const removeProduct = (name) => {
    cart = cart.filter(product => product.productName !== name);
    updateCart();
};

// Update Cart Display
function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalCost = document.getElementById("total-cost");

    cartList.innerHTML = "";
    cart.forEach(product => {
        const { productName, price, quantity } = product;

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>Product: ${productName}, Price: $${price.toFixed(2)}, Quantity: ${quantity}</span>
            <button onclick="removeProduct('${productName}')">Remove</button>
        `;
        cartList.appendChild(listItem);
    });

    totalCost.textContent = `Total Cost: $${calculateTotal().toFixed(2)}`;
}

// Add Event Listener
document.getElementById("add-product-btn").addEventListener("click", addProduct);
