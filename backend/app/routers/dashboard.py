from collections import Counter
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("", response_model=schemas.DashboardStats)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    is_admin = current_user.is_admin

    search_query = db.query(models.SearchHistory)
    if not is_admin:
        search_query = search_query.filter(models.SearchHistory.user_id == current_user.id)

    all_searches = search_query.all()
    total_searches = len(all_searches)
    total_articles = db.query(models.Article).count()
    total_users = db.query(models.User).count()

    # Top categories based on matched article ids in search history
    article_map = {a.id: a.category for a in db.query(models.Article).all()}
    category_counter = Counter()
    for s in all_searches:
        if s.matched_article_ids:
            for aid in s.matched_article_ids.split(","):
                if aid and int(aid) in article_map:
                    category_counter[article_map[int(aid)]] += 1

    top_categories = [{"category": c, "count": n} for c, n in category_counter.most_common(5)]

    recent = (
        search_query.order_by(models.SearchHistory.created_at.desc()).limit(10).all()
    )

    return {
        "total_searches": total_searches,
        "total_articles": total_articles,
        "total_users": total_users,
        "top_categories": top_categories,
        "recent_searches": recent,
    }
