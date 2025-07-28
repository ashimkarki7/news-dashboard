import React, { useState, useEffect } from "react"
const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100

      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div
        id={'scrollProgress'}
      className="position-fixed top-0 start-0 bg-primary"
      style={{
        height: "4px",
        width: `${scrollProgress}%`,
        zIndex: 9999,
        transition: "width 0.1s ease-out",
      }}
    />
  )
}

export default React.memo(ScrollProgress)
