from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from config import Config

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Lists of products
pets_products = [
    {"id": 1, "title": "Leather Dog Collar", "price": 6.90, "image": "static/images/dogcollar.jpg"},
    {"id": 2, "title": "Color Cat Collar", "price": 8.90, "image": "static/images/catcollarcolor.png"},
    {"id": 3, "title": "Color Dog Collar", "price": 6.90, "image": "static/images/dogcollar2.png"},
    {"id": 4, "title": "Grey Cat Collar", "price": 9.90, "image": "static/images/catcollargrey.png"},
    {"id": 5, "title": "Black Dog Collar", "price": 9.90, "image": "static/images/dogcollarblack.png"},
    {"id": 6, "title": "Pink Dog Collar", "price": 8.90, "image": "static/images/dogcollarpink.png"},
    {"id": 7, "title": "Pearl Dog Collar", "price": 5.90, "image": "static/images/dogcollarpink2.png"},
]

toys_products = [
    {"id": 8, "title": "Straw Ball", "price": 3.90, "image": "static/images/cattoy.png"},
    {"id": 9, "title": "Cat Toy", "price": 15.90, "image": "static/images/cattoy2.png"},
    {"id": 10, "title": "Cat Scratcher", "price": 5.90, "image": "static/images/cattoy3.png"},
    {"id": 11, "title": "Toy Set", "price": 9.90, "image": "static/images/toyset1.png"},
    {"id": 12, "title": "Cat Tunnel", "price": 12.90, "image": "static/images/cattoy4.png"},
]

accessories_products = [
    {"id": 13, "title": "Dog Hat", "price": 4.90, "image": "static/images/dogaccessorie.png"},
    {"id": 14, "title": "Ceramic Food Container", "price": 18.90, "image": "static/images/foodcontainer.png"},
    {"id": 15, "title": "Steel Food Container", "price": 14.90, "image": "static/images/foodcontainer2.png"},
    {"id": 16, "title": "Automatic Food Container", "price": 24.90, "image": "static/images/foodcontainer3.png"},
]

def find_product(product_id):
    """Find a product by ID.

    Args:
        product_id (int): The ID of the product to find.

    Returns:
        dict or None: Returns the product dictionary if found, otherwise returns None.
    """
    for products_list in [pets_products, toys_products, accessories_products]:
        for product in products_list:
            if product['id'] == product_id:
                return product
    return None

@app.route('/product/<int:product_id>', methods=['GET', 'DELETE'])
def products(product_id):
    """
    Route to view or delete a product by its ID.

    GET Method:
        Retrieves details of a product specified by `product_id`.
        Returns JSON representation of the product if found.
        Returns a 404 error if the product is not found.

    DELETE Method:
        Deletes a product from the appropriate product list (pets, toys, accessories)
        specified by `product_id`.
        Returns a success message with status code 200 if deletion is successful.
        Returns a 404 error if the product is not found.
    """
    if request.method == 'GET':
        product = find_product(product_id)
        if product:
            return jsonify(product)
        return jsonify({'message': 'Product not found'}), 404
    elif request.method == 'DELETE':
        for products_list in [pets_products, toys_products, accessories_products]:
            for product in products_list:
                if product['id'] == product_id:
                    products_list.remove(product)
                    return jsonify({'message': 'Product deleted successfully'}), 200
        return jsonify({'message': 'Product not found'}), 404


@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    """
    Route to add a product to the shopping cart.

    POST Method:
        Adds a product to the user's shopping cart based on the `product_id`
        provided in the form data.
        Validates the `product_id` to ensure it is a valid integer.
        Redirects the user to the cart page (/cart.html) after adding the product.
        Returns a 404 error if the product is not found.

    Other Methods:
        Returns a 405 error if a method other than POST is used.
    """
    if request.method == 'POST':
        try:
            product_id = int(request.form['product_id'])
        except ValueError:
            return jsonify({'message': 'Invalid product ID'}), 400
        
        product = find_product(product_id)
        if product:
            session.setdefault('cart', []).append(product['id'])
            return redirect(url_for('cart'))  # Explicit redirection to /cart.html
        return jsonify({'message': 'Product not found'}), 404
    else:
        return jsonify({'message': 'Method not allowed'}), 405


# Other routes for rendering templates
@app.route('/')
@app.route('/index.html')
def index():
    """Route to render the home page (index.html)."""
    return render_template('index.html')

@app.route('/cart.html')
def cart():
    """Route to render the shopping cart (cart.html)."""
    cart_items = [find_product(product_id) for product_id in session.get('cart', [])]
    return render_template('cart.html', cart_items=cart_items)

@app.route('/pets.html')
def pets():
    """Route to render the pets products page (pets.html)."""
    return render_template('pets.html', products=pets_products)

@app.route('/toys.html')
def toys():
    """Route to render the toys page (toys.html)."""
    return render_template('toys.html', products=toys_products)

@app.route('/accessories.html')
def accessories():
    """Route to render the accessories page (accessories.html)."""
    return render_template('accessories.html', products=accessories_products)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8082)
