import React from 'react';
import './StatusMessages.css';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="status-container">
      <div className="error-message">
        <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {message}
      </div>
    </div>
  );
};

const LoadingMessage = ({ message = "Loading weather data..." }) => {
  return (
    <div className="status-container">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">
          {message}
          <span className="loading-dots"></span>
        </div>
      </div>
    </div>
  );
};

export { ErrorMessage, LoadingMessage }; 