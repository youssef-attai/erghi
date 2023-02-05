def hash_password(password: str) -> str:
    return f"hash({password})"


def verify_password(password: str, hashed_password: str):
    return hash_password(password) == hashed_password
