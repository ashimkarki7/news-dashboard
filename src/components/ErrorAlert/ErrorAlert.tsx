import React from "react"
import ErrorStyles from './Error.module.css';

interface ErrorAlertProps {
  message: string
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className={`${ErrorStyles?.glass_card} p-4 text-center`} >
      <div className="text-danger mb-3">
        <i className="fas fa-exclamation-triangle fs-1"></i>
      </div>
      <h5 className="text-white mb-2">Oops! Something went wrong</h5>
      <p className="text-white-50 mb-0">{message}</p>
    </div>
  )
}

export default React.memo(ErrorAlert)
