import React, { useState, useCallback } from "react"
import type {NewsArticle} from '@pages/HomePage/types/new.ts';
import LazyImage from '@components/LazyImage/LazyImage.tsx';


interface ArticleCardProps {
  article: NewsArticle
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }, [])

  const truncateText = useCallback((text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }, [])

  const handleReadMore = useCallback(() => {
    window.open(article.url, "_blank", "noopener,noreferrer")
  }, [article.url])

  return (
    <div className="news-card card h-100 position-relative">
      {article.trending && (
        <div className="trending-badge">
          <i className="fas fa-fire me-1"></i>
          Trending
        </div>
      )}

      <LazyImage
        src={article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop"}
        alt={article.title}
        className="card-img-top"
      />

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="source-badge">{article.source.name}</span>
          <small className="text-muted">
            <i className="fas fa-clock me-1"></i>
            {formatDate(article.publishedAt)}
          </small>
        </div>

        <h5 className="card-title fw-bold mb-3 lh-base">{article.title}</h5>

        {article.description && (
          <p className="card-text text-muted mb-3 flex-grow-1">
            {isExpanded ? article.description : truncateText(article.description, 120)}
            {article.description.length > 120 && (
              <button
                className="btn btn-link p-0 ms-1 text-decoration-none small"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </p>
        )}

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex align-items-center">
            {article.author && (
              <small className="text-muted">
                <i className="fas fa-user me-1"></i>
                {article.author}
              </small>
            )}
            {article.readTime && (
              <small className="text-muted ms-3">
                <i className="fas fa-book-open me-1"></i>
                {article.readTime} min read
              </small>
            )}
          </div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-gradient flex-fill" onClick={handleReadMore}>
            <i className="fas fa-external-link-alt me-2"></i>
            Read Full Story
          </button>
          <button className="btn btn-outline-secondary">
            <i className="fas fa-bookmark"></i>
          </button>
          <button className="btn btn-outline-secondary">
            <i className="fas fa-share"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ArticleCard)
