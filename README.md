# Startup Navigator 🚀

An AI-powered full-stack web application that helps entrepreneurs navigate startup journeys — including company registration, funding, legal compliance, hiring, branding, marketing, taxation, fundraising, AI tools, and business growth strategies.

The platform uses a lightweight **RAG (Retrieval-Augmented Generation)** approach to provide AI-powered answers grounded in a curated startup knowledge base.

---

## 🌐 Live Demo

### Frontend Application
https://darling-lollipop-b6af30.netlify.app

### Backend API
https://startup-navigator.onrender.com

### API Documentation (Swagger)
https://startup-navigator.onrender.com/docs

### GitHub Repository
https://github.com/vaishnavisultanpur/startup-navigator

---

# Architecture

```
                 HTTPS / JSON

┌──────────────────────┐
│ React + Vite         │
│ Tailwind CSS         │
│ Netlify Hosting      │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ FastAPI Backend      │
│ JWT Authentication   │
│ REST APIs            │
│ Render Hosting       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ SQLite Database      │
│ Users                │
│ Articles             │
│ Search History       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ RAG Search Engine    │
│ TF-IDF Retrieval     │
│ Gemini API           │
│ AI Response Layer    │
└──────────────────────┘
```

---

# Features

## Authentication

- JWT-based authentication
- Secure password hashing using PBKDF2-SHA256
- User registration and login
- Protected routes
- Admin role authorization

## AI-powered Search

- RAG-based startup knowledge assistant
- Retrieves relevant articles using TF-IDF similarity
- Generates contextual responses using Gemini API
- Provides fallback extractive answers when AI service is unavailable
- Stores user search history

## Knowledge Management

Admin users can:

- Create startup articles
- Update existing content
- Delete articles
- Manage startup categories

## User Dashboard

Users can:

- View search history
- Track activity statistics
- Access startup learning resources

## Responsive UI

Built with:

- React
- Vite
- Tailwind CSS
- React Router

Optimized for:

- Desktop
- Tablet
- Mobile devices

---

# Backend Structure

```
backend/
│
└── app/
    │
    ├── main.py
    │   FastAPI application setup,
    │   CORS configuration
    │
    ├── database.py
    │   SQLAlchemy database connection
    │
    ├── models.py
    │   Database models
    │
    ├── schemas.py
    │   Pydantic request/response schemas
    │
    ├── auth.py
    │   JWT authentication,
    │   password hashing,
    │   role management
    │
    ├── rag_engine.py
    │   TF-IDF retrieval
    │   AI response generation
    │
    ├── seed_data.py
    │   Initial articles and demo users
    │
    └── routers/
        │
        ├── auth.py
        ├── articles.py
        ├── search.py
        └── dashboard.py
```

---

# AI Integration

## RAG Pipeline

The AI Search system follows this flow:

```
User Question

      ↓

FastAPI Search Endpoint

      ↓

TF-IDF Similarity Retrieval

      ↓

Relevant Startup Articles

      ↓

Gemini API Generation

      ↓

Grounded AI Response

      ↓

Search History Storage
```

### Why TF-IDF Retrieval?

Instead of using expensive vector databases, TF-IDF provides:

- Low latency
- No embedding API cost
- Simple deployment
- Suitable for a small curated knowledge base

For larger datasets, the architecture can be extended with:

- FAISS
- Pinecone
- pgvector

---

# AI Tools Used

## Gemini API

Used for:

- Generating startup guidance responses
- Improving AI search quality
- Producing contextual answers from retrieved documents


## AI-assisted Development

AI tools were used for:

- FastAPI backend scaffolding
- JWT authentication implementation
- RAG pipeline development
- React UI component creation
- Debugging deployment issues
- Dependency compatibility fixes

All AI-generated code was reviewed, modified, tested, and integrated manually.

---

# Example AI Prompts Used

## Backend Architecture Prompt

```
Design a FastAPI backend for a startup knowledge platform
with JWT authentication, admin roles, article CRUD,
AI search, SQLite database, and modular router structure.
```

## RAG Implementation Prompt

```
Implement a lightweight RAG system that retrieves
relevant startup articles using TF-IDF cosine similarity
and generates grounded responses using an AI model.
Include fallback handling when AI APIs are unavailable.
```

## Frontend Design Prompt

```
Create a modern responsive React interface for an
entrepreneurship knowledge platform with startup themes,
navigation, dashboards, and AI search experience.
```

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- JavaScript

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

## Database

- SQLite

## AI / ML

- Gemini API
- Scikit-learn
- TF-IDF Vector Retrieval

## Deployment

- Netlify (Frontend)
- Render (Backend)

---

# Deployment Process

## Backend Deployment (Render)

Steps:

1. Connected GitHub repository with Render
2. Configured Python 3.12 runtime
3. Installed dependencies from requirements.txt
4. Added environment variables:

```
SECRET_KEY
GEMINI_API_KEY
FRONTEND_ORIGIN
PYTHON_VERSION
```

5. Started FastAPI server:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Backend URL:

```
https://startup-navigator.onrender.com
```

---

## Frontend Deployment (Netlify)

Steps:

1. Connected GitHub repository
2. Configured:

Base directory:

```
frontend
```

Build command:

```bash
npm run build
```

Publish directory:

```
frontend/dist
```

Frontend URL:

```
https://darling-lollipop-b6af30.netlify.app
```

---

# Security Implementation

Implemented:

- JWT authentication
- Password hashing
- Protected admin routes
- Environment variable based secrets
- Pydantic validation
- CORS configuration
- Role-based authorization

---

# Testing Performed

Completed end-to-end testing:

✅ User registration  
✅ User login  
✅ JWT authentication  
✅ Protected routes  
✅ AI Search functionality  
✅ Search history tracking  
✅ Dashboard statistics  
✅ Admin article CRUD operations  
✅ Frontend production build  
✅ Responsive UI testing  

---

# Challenges & Solutions

## Python Dependency Compatibility

### Problem

Deployment failed due to Python 3.14 compatibility issues with:

- NumPy
- SciPy
- Scikit-learn

### Solution

- Migrated deployment runtime to Python 3.12
- Updated compatible ML package versions


## Password Hashing Compatibility

### Problem

bcrypt compatibility issues with newer versions.

### Solution

Switched authentication hashing to:

```
PBKDF2-SHA256
```

using Passlib.


## Frontend-Backend Communication

### Problem

Cross-origin requests between Netlify and Render.

### Solution

Configured FastAPI CORS middleware with production frontend URL.

---

# Future Improvements

Possible enhancements:

- PostgreSQL migration for production scaling
- Vector database integration
- Document upload and custom knowledge ingestion
- Startup funding API integration
- AI recommendation engine
- Automated CI/CD pipeline
- Advanced analytics dashboard

---

# Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@startupnavigator.com | Admin@123 |
| User | user@startupnavigator.com | User@123 |

---

## Project Status

✅ Frontend deployed  
✅ Backend deployed  
✅ AI Search operational  
✅ Authentication working  
✅ Admin dashboard working  
✅ Production build verified  
