from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_CONNECTION_URL = os.environ.get('MONGODB_CONNECTION_URL')