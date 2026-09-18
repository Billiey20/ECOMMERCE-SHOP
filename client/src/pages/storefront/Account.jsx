import React, { useState, useEffect } from 'react';
import StorefrontNav from '../../components/storefront/StorefrontNav';

const Account = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user orders (in a real app, you'd fetch /api/customers/:id/orders using JWT)
    setTimeout(() => {
      setOrders([
        { id: 1042, date: '2026-09-17', status: 'processing', total: 114.98 },
        { id: 981, date: '2026-08-10', status: 'delivered', total: 45.00 },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div>
      <StorefrontNav />
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', minHeight: '60vh' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>My Account</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '40px' }}>
          {/* Sidebar Nav */}
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '12px 0', borderBottom: '1px solid var(--brand-border)', fontWeight: 600, color: 'var(--brand-dark)' }}>Order History</li>
              <li style={{ padding: '12px 0', borderBottom: '1px solid var(--brand-border)', color: 'var(--brand-text)', cursor: 'pointer' }}>Profile Details</li>
              <li style={{ padding: '12px 0', color: 'var(--brand-text)', cursor: 'pointer' }}>Sign Out</li>
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
                        <td style={{ padding: '16px', color: 'var(--brand-muted)' }}>{order.date}</td>
                        <td style={{ padding: '16px', textTransform: 'capitalize' }}>{order.status}</td>
                        <td style={{ padding: '16px', fontWeight: 500 }}>${order.total.toFixed(2)}</td>
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
        <p><strong>LUMORA SKIN</strong> · © 2026 · Demo by ShopFlow</p>
      </footer>
    </div>
  );
};

export default Account;
