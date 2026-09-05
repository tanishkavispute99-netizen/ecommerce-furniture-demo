from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Sample product data
PRODUCTS = [
    {
        'id': 1,
        'name': 'Modern Sofa',
        'description': 'Comfortable modern sofa perfect for any living room',
        'price': 599.99,
        'image': 'sofa.jpg',
        'category': 'Sofas',
        'in_stock': True
    },
    {
        'id': 2,
        'name': 'Wooden Dining Table',
        'description': 'Elegant wooden dining table for 6 people',
        'price': 399.99,
        'image': 'dining-table.jpg',
        'category': 'Tables',
        'in_stock': True
    },
    {
        'id': 3,
        'name': 'Leather Office Chair',
        'description': 'Professional leather office chair with lumbar support',
        'price': 299.99,
        'image': 'office-chair.jpg',
        'category': 'Chairs',
        'in_stock': True
    },
    {
        'id': 4,
        'name': 'Bed Frame Queen Size',
        'description': 'Sturdy queen size bed frame with storage',
        'price': 449.99,
        'image': 'bed-frame.jpg',
        'category': 'Beds',
        'in_stock': True
    },
    {
        'id': 5,
        'name': 'Coffee Table',
        'description': 'Modern minimalist coffee table',
        'price': 149.99,
        'image': 'coffee-table.jpg',
        'category': 'Tables',
        'in_stock': True
    }
]

# Routes
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'message': 'Welcome to Furniture E-Commerce API',
        'version': '1.0.0'
    })

@app.route('/api/products', methods=['GET'])
def get_products():
    """Get all products"""
    return jsonify(PRODUCTS)

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a specific product by ID"""
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    """Add item to cart"""
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    return jsonify({
        'message': 'Item added to cart',
        'product': product,
        'quantity': quantity,
        'total': product['price'] * quantity
    })

@app.route('/api/order', methods=['POST'])
def create_order():
    """Create an order"""
    data = request.get_json()
    
    return jsonify({
        'message': 'Order created successfully',
        'order_id': f'ORD-{datetime.now().strftime("%Y%m%d%H%M%S")}',
        'status': 'pending',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/joke', methods=['GET'])
def get_joke():
    """Get a random joke from JokeAPI"""
    try:
        response = requests.get('https://v2.jokeapi.dev/joke/Any?type=single')
        joke_data = response.json()
        return jsonify(joke_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Route not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
