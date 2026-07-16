import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from . import models
from .database import engine, SessionLocal
from .routers import auth, articles, search, dashboard
from .seed_data import seed_database

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Startup Navigator API", version="1.0.0")

origins = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(articles.router)
app.include_router(search.router)
app.include_router(dashboard.router)


@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()


@app.get("/")
def root():
    return {"status": "ok", "service": "Startup Navigator API"}


@app.get("/api/health")
def health():
    return {"status": "healthy"}
