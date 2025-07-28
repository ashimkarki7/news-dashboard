
import React from "react"

import type {NewsArticle} from '@pages/HomePage/types/new.ts';
import ArticleCard from '@components/ArticleCard/ArticleCard.tsx';

interface ArticleGridProps {
  articles: NewsArticle[]
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="glass-card p-5 mx-auto" style={{ maxWidth: "500px" }}>
          <i className="fas fa-newspaper display-1 text-white mb-4"></i>
          <h3 className="text-white mb-3">No Articles Found</h3>
          <p className="text-white-50">
            Try adjusting your search terms or browse different categories to discover more news.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-white mb-0">
          <i className="fas fa-list me-2"></i>
          Latest Articles
        </h4>
        <span className="badge bg-light text-dark px-3 py-2">{articles.length} articles loaded</span>
      </div>


      <div className="row g-4">
        {articles?.length > 0 && articles?.map((article, index) => (
          <div key={`${article.url}-${index}`} className="col-12 col-md-6 col-lg-4">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </>
  )
}

export default React.memo(ArticleGrid)
