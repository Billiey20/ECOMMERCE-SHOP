import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/analytics');
        const json = await res.json();
        if (json.success || json.mock) {
          setData(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading Dashboard...</div>;
  }

  if (!data) {
    return <div style={{ padding: '20px', color: 'red' }}>Failed to load dashboard data.</div>;
  }

  const { kpis, revenueByDay } = data;

  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Dashboard Overview</h1>
      
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Total Revenue</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#059669' }}>
            ${kpis?.total_revenue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Total Orders</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: 'bold' }}>
            {kpis?.total_orders?.toLocaleString()}
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Avg. Order Value</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: 'bold' }}>
            ${kpis?.avg_order_value?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Active Products</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '28px', fontWeight: 'bold', color: '#4f46e5' }}>
            {data?.topProducts?.length || 0} (Top)
          </p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>Revenue Last 30 Days</h3>
        <div style={{ width: '100%', height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} tickMargin={10} axisLine={false} tickLine={false} minTickGap={30} />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
                width={80}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Revenue']}
                labelStyle={{ color: '#111827', fontWeight: 'bold' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;

