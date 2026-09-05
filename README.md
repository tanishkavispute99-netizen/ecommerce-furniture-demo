# E-Commerce Furniture Website Demo

A full-stack ecommerce furniture website with HTML/CSS/JavaScript frontend and Python Flask backend.

## Features

- 🛋️ Browse furniture products
- 🛒 Shopping cart functionality
- 💳 Checkout process
- 👤 User authentication
- 📦 Order management
- 📱 Responsive design
- 😄 Random joke generator (bonus feature)

## Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Python 3.8+
- Flask
- SQLite (database)

## Project Structure

```
ecommerce-furniture-demo/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── styles.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── cart.js
│   │   └── api.js
│   └── assets/
│       └── images/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── models/
│   ├── routes/
│   └── database/
├── joke-generator/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask app:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   python -m http.server 8000
   ```

Then visit `http://localhost:8000`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/<id>` - Get product by ID
- `POST /api/cart` - Add to cart
- `POST /api/order` - Create order
- `GET /api/joke` - Get random joke

## License

MIT License
