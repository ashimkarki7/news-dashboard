import React, { useState, useRef, useEffect } from "react"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, style }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  return (
    <div ref={imgRef} className={`position-relative ${className || ""}`} style={style}>
      {!isInView && (
        <div className="d-flex align-items-center justify-content-center shimmer" style={{ height: "220px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {isInView && !hasError && (
        <>
          {!isLoaded && (
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center shimmer"
              style={{ zIndex: 1 }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className={`${className || ""} ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              height: "220px",
              width: "100%",
              objectFit: "cover",
              transition: "opacity 0.3s ease-in-out",
            }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </>
      )}

      {hasError && (
        <div
          className="d-flex align-items-center justify-content-center bg-light text-muted"
          style={{ height: "220px" }}
        >
          <div className="text-center">
            <i className="fas fa-image display-4 mb-2"></i>
            <small>Image not available</small>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(LazyImage)
