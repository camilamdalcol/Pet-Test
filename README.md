Pet Test Project - Camila Miranda Dal Col
This project is a demonstration of a web application built with Flask, showcasing pet products and shopping cart functionality.

Project Overview
The Pet Test Project provides a simple web interface where users can browse and purchase various pet products. The application includes features like viewing different categories of products (pets, toys, accessories), adding products to a shopping cart, and viewing the contents of the shopping cart.

Installation
To run this project locally, follow these steps:

Clone the repository:

git clone https://github.com/camilamdalcol/Pet-Test.git
cd Pet-Test

Set up a virtual environment (optional but recommended):
python -m venv venv
source venv/bin/activate  # For Windows, use venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt
Running the Application
Using Flask (Development)
Ensure Flask is running on localhost:8082:

python app.py
Access the application at http://localhost:8082.

Using Gunicorn (Production)
Deploy using Gunicorn on localhost:8000:

gunicorn -b 0.0.0.0:8000 app:app
Access the application at http://localhost:8000.

Contributing
Contributions are welcome! If you find a bug or have a suggestion for improvement, please open an issue or submit a pull request.
