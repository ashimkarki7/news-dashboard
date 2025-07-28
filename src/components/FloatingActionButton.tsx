import React, { useState, useEffect } from "react"

const FloatingActionButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <button
            className={`btn btn-primary rounded-circle position-fixed ${isVisible ? "d-block" : "d-none"}`}
            onClick={scrollToTop}
            title="Back to top"
            style={{
                bottom: "30px",
                right: "30px",
                width: "60px",
                height: "60px",
                fontSize: "24px",
                zIndex: 1000,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
        >
            <i className="fas fa-arrow-up"></i>
        </button>
    )
}

export default React.memo(FloatingActionButton)
