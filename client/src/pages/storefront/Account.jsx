import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StorefrontNav from '../../components/storefront/StorefrontNav';
import { useAuth } from '../../context/AuthContext';

const Account = () => {
  const { user, token, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          // Temporarily filtering by user_id on client, though in production we should have an /api/orders/me endpoint
          const userOrders = data.data.filter(o => o.user_id === user?.id);
          setOrders(userOrders);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token, user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (authLoading || !user) {
    return <div style={{ padding: 100, textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div>
      <StorefrontNav />
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', minHeight: '60vh' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>
          Welcome back, {user.first_name}!
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '40px' }}>
          {/* Sidebar Nav */}
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '12px 0', borderBottom: '1px solid var(--brand-border)', fontWeight: 600, color: 'var(--brand-dark)' }}>Order History</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid var(--brand-border)', color: 'var(--brand-text)', cursor: 'pointer' }}>Profile Details</li>
              <li onClick={handleLogout} style={{ padding: '12px 0', color: '#ef4444', cursor: 'pointer', fontWeight: 500 }}>Sign Out</li>
            </ul>
          </div>

          {/* Main Content */}
          <div>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>Order History</h2>
            {loading ? (
              <p style={{ color: 'var(--brand-muted)' }}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p style={{ color: 'var(--brand-muted)' }}>You haven't placed any orders yet.</p>
            ) : (
              <div style={{ border: '1px solid var(--brand-border)', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: 'var(--brand-cream)', borderBottom: '1px solid var(--brand-border)' }}>
                    <tr>
                      <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px' }}>Order #</th>
                      <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px' }}>Date</th>
                      <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px' }}>Status</th>
                      <th style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} style={{ borderBottom: '1px solid var(--brand-border)' }}>
                        <td style={{ padding: '16px', fontWeight: 500 }}>#{order.id}</td>
                        <td style={{ padding: '16px', color: 'var(--brand-muted)' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                        <td style={{ padding: '16px', textTransform: 'capitalize' }}>
                          <span style={{ 
                            padding: '4px 8px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                            backgroundColor: order.status === 'delivered' ? '#d1fae5' : order.status === 'shipped' ? '#dbeafe' : '#fef3c7',
                            color: order.status === 'delivered' ? '#065f46' : order.status === 'shipped' ? '#1e40af' : '#92400e'
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px', fontWeight: 500 }}>${Number(order.total_amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="sf-footer" style={{ marginTop: '60px' }}>
        <p><strong>SHOPFLOW</strong> · © 2026 · E-commerce Demo</p>
      </footer>
    </div>
  );
};

export default Account;
