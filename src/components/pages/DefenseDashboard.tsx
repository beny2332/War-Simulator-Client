import React from 'react';

export default function DefenseDashboard() {
  return (
    <div className="defense-dashboard">
      <header className="dashboard-header">
        <h1>Defense Dashboard</h1>
        <div className="user-info">
          <span>IDF - South</span>
          <button className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <div className="left-panel">
          <div className="alerts-section">
            <h2>Alerts</h2>
            <div className="alerts-list">
              {/* Alerts will be mapped here */}
            </div>
          </div>
        </div>
        
        <div className="main-panel">
          <div className="map-container">
            {/* Map component will go here */}
          </div>
        </div>
        
        <div className="right-panel">
          <div className="resources-section">
            <h2>Resources</h2>
            <div className="resources-list">
              {/* Resources will be mapped here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
