import requests

# URL base do seu servidor
BASE_URL = "http://localhost:8082"

def test_get_product(product_id):
    response = requests.get(f"{BASE_URL}/product/{product_id}")
    if response.status_code == 200:
        print(f"Product {product_id} details: {response.json()}")
    else:
        print(f"Failed to get product {product_id}. Status code: {response.status_code}, Response: {response.text}")

def test_delete_product(product_id):
    response = requests.delete(f"{BASE_URL}/product/{product_id}")
    if response.status_code == 200:
        print(f"Product {product_id} deleted successfully.")
    else:
        print(f"Failed to delete product {product_id}. Status code: {response.status_code}, Response: {response.text}")

def main():
    print("Testing GET /product/1")
    test_get_product(1)

    print("\nTesting DELETE /product/1")
    test_delete_product(1)

    print("\nTesting GET /product/1 again to ensure it was deleted")
    test_get_product(1)

if __name__ == "__main__":
    main()
import requests

# Base URL of your server
BASE_URL = "http://localhost:8082"

def test_get_product(product_id):
    """
    Test GET request to retrieve product details by ID.

    Args:
        product_id (int): The ID of the product to fetch.

    Prints:
        If successful, prints the product details.
        If unsuccessful, prints a failure message with the status code and response.

    """
    response = requests.get(f"{BASE_URL}/product/{product_id}")
    if response.status_code == 200:
        print(f"Product {product_id} details: {response.json()}")
    else:
        print(f"Failed to get product {product_id}. Status code: {response.status_code}, Response: {response.text}")

def test_delete_product(product_id):
    """
    Test DELETE request to delete a product by ID.

    Args:
        product_id (int): The ID of the product to delete.

    Prints:
        If successful, prints a success message.
        If unsuccessful, prints a failure message with the status code and response.

    """
    response = requests.delete(f"{BASE_URL}/product/{product_id}")
    if response.status_code == 200:
        print(f"Product {product_id} deleted successfully.")
    else:
        print(f"Failed to delete product {product_id}. Status code: {response.status_code}, Response: {response.text}")

def main():
    """
    Main function to run the tests.

    Executes three tests:
    1. GET /product/1: Tests fetching details of product with ID 1.
    2. DELETE /product/1: Tests deleting the product with ID 1.
    3. GET /product/1 again: Tests fetching details again to ensure it was deleted.

    """
    print("Testing GET /product/1")
    test_get_product(1)

    print("\nTesting DELETE /product/1")
    test_delete_product(1)

    print("\nTesting GET /product/1 again to ensure it was deleted")
    test_get_product(1)

if __name__ == "__main__":
    main()
