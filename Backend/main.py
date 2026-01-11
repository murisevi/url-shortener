from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Url model
class Url(BaseModel):
    id: int
    original: str
    code: str

# In-memory database
Urls_db = []

@app.post("/Url/")
def generate_short_url_code(url: Url):
    number = random.randint(1, 99999)
    code = str(number)
    url.code = code
    Urls_db.append(url)
    return {"code": code}

@app.get("/Urls/")
def redirect_url(code: int):
    raise HTTPException(status_code=404, detail="URL not found")

