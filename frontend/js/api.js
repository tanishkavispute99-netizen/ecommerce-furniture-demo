// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch products from backend
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Fetch a single product
async function fetchProduct(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Add item to cart (backend)
async function addToCartAPI(productId, quantity) {
    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity
            })
        });
        if (!response.ok) throw new Error('Failed to add to cart');
        return await response.json();
    } catch (error) {
        console.error('Error adding to cart:', error);
        return null;
    }
}

// Create order
async function createOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw new Error('Failed to create order');
        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        return null;
    }
}

// Get random joke
async function fetchJoke() {
    try {
        const response = await fetch(`${API_BASE_URL}/joke`);
        if (!response.ok) throw new Error('Failed to fetch joke');
        return await response.json();
    } catch (error) {
        console.error('Error fetching joke:', error);
        return null;
    }
}
