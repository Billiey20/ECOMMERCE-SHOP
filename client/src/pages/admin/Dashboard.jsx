import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Total Revenue</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>$0.00</p>
        </div>
        <div className="card">
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Orders</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>0</p>
        </div>
        <div className="card">
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Customers</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>0</p>
        </div>
        <div className="card">
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Conversion Rate</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>0%</p>
        </div>
      </div>

      <div className="card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Revenue Chart Placeholder (To be built in Phase 17)</p>
      </div>
    </div>
  );
};

export default Dashboard;
