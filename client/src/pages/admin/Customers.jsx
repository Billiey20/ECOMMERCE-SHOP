import React, { useState, useEffect } from 'react';
import { Users, DollarSign, ShoppingBag, Calendar } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers');
        const data = await response.json();
        if (data.success) {
          setCustomers(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Customers CRM</h1>
      </div>

      {/* KPI Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, fontWeight: 500 }}>Total Customers</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>{customers.length || 0}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, fontWeight: 500 }}>Avg Lifetime Value</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#10b981' }}>
            ${customers.length > 0 ? (customers.reduce((acc, c) => acc + Number(c.lifetime_value), 0) / customers.length).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Customer ID</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Email</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Registered</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Total Orders</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>LTV</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading customers...</td></tr>
            ) : customers.length === 0 ? (
              <tr><td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>No customers found.</td></tr>
            ) : customers.map(customer => (
              <tr key={customer.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: '#111827' }}>#{customer.id}</td>
                <td style={{ padding: '16px 20px', color: '#374151' }}>{customer.email}</td>
                <td style={{ padding: '16px 20px', color: '#6b7280', fontSize: 14 }}>{new Date(customer.registration_date).toLocaleDateString()}</td>
                <td style={{ padding: '16px 20px', color: '#374151', fontWeight: 500 }}>{customer.total_orders}</td>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: '#10b981' }}>${Number(customer.lifetime_value).toFixed(2)}</td>
                <td style={{ padding: '16px 20px' }}>
                  <button style={{ padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: 4, background: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#374151' }}>
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
