import React from "react"
const LoadingSpinner: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="glass-card p-5 text-center">
        <div className="spinner-border text-light mb-4" role="status" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="text-white mb-2">Loading Latest News</h4>
        <p className="text-white-50 mb-0">Fetching the most recent stories for you...</p>
      </div>
    </div>
  )
}

export default React.memo(LoadingSpinner)
