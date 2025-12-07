// components/LoadingSpinner/LoadingSpinner.js
import React, { Component } from 'react';
import './LoadingSpinner.css';

class LoadingSpinner extends Component {
  render() {
    const { size = 'medium', color = 'gold' } = this.props;
    
    return (
      <div className={`loading-spinner ${size} ${color}`}>
        <div className="spinner"></div>
      </div>
    );
  }
}

export default LoadingSpinner;