from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.auth import router as auth_router
app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get('/')
async def main():
	return {'message': 'Hello, FastAPI!'}
