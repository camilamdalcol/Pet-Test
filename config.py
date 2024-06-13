import secrets
import string

def generate_secret_key(length=16):
    """
    Generate a secure random secret key.

    Args:
        length (int, optional): Length of the secret key (default is 16).

    Returns:
        str: Randomly generated secret key consisting of ASCII letters, digits, and punctuation.

    """
    alphabet = string.ascii_letters + string.digits + string.punctuation
    secret_key = ''.join(secrets.choice(alphabet) for _ in range(length))
    return secret_key

class Config:
    """
    Configuration class for storing application settings.

    Attributes:
        SECRET_KEY (str): Secret key used for cryptographic operations.

    """
    SECRET_KEY = generate_secret_key()
