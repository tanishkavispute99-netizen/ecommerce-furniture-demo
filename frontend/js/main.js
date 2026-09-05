// Main Application Logic

// Load products on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
});

// Load and display products
async function loadProducts() {
    const products = await fetchProducts();
    const productList = document.getElementById('productList');
    
    if (products.length === 0) {
        productList.innerHTML = '<p>No products available</p>';
        return;
    }
    
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">🛋️</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button 
                    class="btn btn-secondary" 
                    onclick="addToCart({id: ${product.id}, name: '${product.name}', price: ${product.price}})"
                    ${!product.in_stock ? 'disabled' : ''}
                >
                    ${product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `).join('');
}

// Handle navigation
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add some fun - load a joke on page load (optional)
window.addEventListener('load', async () => {
    const joke = await fetchJoke();
    if (joke && joke.joke) {
        console.log('Today\'s joke: ' + joke.joke);
    }
});
