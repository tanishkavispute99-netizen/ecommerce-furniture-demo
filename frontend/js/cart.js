// Shopping Cart Management
let cart = [];
const cartModal = document.getElementById('cartModal');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.getElementById('cartCount');

// Open cart modal
cartIcon.addEventListener('click', () => {
    displayCart();
    cartModal.style.display = 'block';
});

// Close cart modal
function closeCart() {
    cartModal.style.display = 'none';
}

// Add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCart();
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Display cart items
function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        document.getElementById('cartTotal').textContent = '0.00';
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>Quantity: ${item.quantity}</p>
                    <p>$${item.price.toFixed(2)} each</p>
                </div>
                <div>
                    <p>$${itemTotal.toFixed(2)}</p>
                    <button class="btn btn-secondary" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartItemsDiv.innerHTML = cartHTML;
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Checkout
async function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const orderData = {
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    const result = await createOrder(orderData);
    
    if (result) {
        alert(`Order placed successfully!\nOrder ID: ${result.order_id}`);
        cart = [];
        updateCartCount();
        closeCart();
    } else {
        alert('Failed to place order. Please try again.');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        z-index: 2000;
        animation: slideIn 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        closeCart();
    }
});
