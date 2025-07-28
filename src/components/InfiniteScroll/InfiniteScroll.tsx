import React, { useEffect, useRef, useCallback } from "react"
import type {NewsArticle} from '@pages/HomePage/types/new.ts';

interface InfiniteScrollProps {
  children: React.ReactNode
  newsLoading?: boolean
  hasMore: boolean;
  loadMore: () => Promise<void>;
  articles: NewsArticle[]
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ children,loadMore,newsLoading,articles,hasMore }) => {

  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries

      if (entry.isIntersecting && !newsLoading && hasMore && !loadingRef.current && articles?.length > 0) {
        loadingRef.current = true
        loadMore().finally(() => {
          loadingRef.current = false
        })
      }
    },
    [newsLoading, hasMore, articles?.length, loadMore],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "200px",
    })

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => {
      observer.disconnect()
      loadingRef.current = false
    }
  }, [handleIntersection])

  return (
    <>
      {children}
      {newsLoading && articles?.length > 0 && (
        <div className="text-center py-5">
          <div className="glass-card p-4 d-inline-block">
              <div className="d-flex align-items-center">
                <div className="spinner-border text-light me-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="text-white fw-semibold">Loading more articles...</span>
              </div>
            </div>
          </div>
        )}


        <div ref={sentinelRef} className="py-4" style={{ minHeight: "20px" }} />


        {!hasMore && articles?.length > 0 && (
          <div className="text-center py-5">
            <div className="glass-card p-4 d-inline-block">
              <div className="text-white">
                <i className="fas fa-check-circle me-2 text-success"></i>
                <span className="fw-semibold">You've reached the end!</span>
                <div className="small text-white-50 mt-2">Showing all {articles?.length} articles</div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  export default React.memo(InfiniteScroll)
