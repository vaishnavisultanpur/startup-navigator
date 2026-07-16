from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import models, schemas, auth, rag_engine
from ..database import get_db

router = APIRouter(prefix="/api/search", tags=["search"])


@router.post("", response_model=schemas.SearchResult)
def ai_search(
    search_in: schemas.SearchQuery,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    articles = db.query(models.Article).all()
    answer, sources, ai_generated = rag_engine.answer_query(search_in.query, articles)

    history_entry = models.SearchHistory(
        user_id=current_user.id,
        query=search_in.query,
        answer=answer,
        matched_article_ids=",".join(str(a.id) for a in sources),
    )
    db.add(history_entry)
    db.commit()

    return {"answer": answer, "sources": sources, "ai_generated": ai_generated}


@router.get("/history", response_model=list[schemas.SearchHistoryOut])
def get_history(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return (
        db.query(models.SearchHistory)
        .filter(models.SearchHistory.user_id == current_user.id)
        .order_by(models.SearchHistory.created_at.desc())
        .limit(50)
        .all()
    )
