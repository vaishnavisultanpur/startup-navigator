from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List


# ---------- Auth ----------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    is_admin: bool

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ---------- Articles ----------
class ArticleBase(BaseModel):
    title: str
    category: str
    content: str
    summary: Optional[str] = None


class ArticleCreate(ArticleBase):
    pass


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    content: Optional[str] = None
    summary: Optional[str] = None


class ArticleOut(ArticleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ---------- Search ----------
class SearchQuery(BaseModel):
    query: str


class SearchResult(BaseModel):
    answer: str
    sources: List[ArticleOut]
    ai_generated: bool


class SearchHistoryOut(BaseModel):
    id: int
    query: str
    answer: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- Dashboard ----------
class DashboardStats(BaseModel):
    total_searches: int
    total_articles: int
    total_users: int
    top_categories: List[dict]
    recent_searches: List[SearchHistoryOut]
