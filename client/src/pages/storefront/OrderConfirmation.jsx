import React from 'react';
import { useParams, Link } from 'react-router-dom';
import StorefrontNav from '../../components/storefront/StorefrontNav';
import '../../styles/storefront.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div>
      <StorefrontNav />
      <div style={{ maxWidth: 620, margin: '80px auto', padding: '0 40px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, background: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: 32 }}>
          ✓
        </div>
        <p style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--brand-rose)', marginBottom: 10 }}>Order Confirmed</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: 'var(--brand-dark)', marginBottom: 16 }}>
          Thank You!
        </h1>
        <p style={{ color: 'var(--brand-muted)', lineHeight: 1.7, marginBottom: 8 }}>
          Your order <strong style={{ color: 'var(--brand-text)' }}>#{orderId}</strong> has been placed successfully.
        </p>
        <p style={{ color: 'var(--brand-muted)', lineHeight: 1.7, marginBottom: 32 }}>
          You'll receive a confirmation email shortly. Your order is now <strong style={{ color: 'var(--brand-text)' }}>Processing</strong> and will be packed and shipped within 1–2 business days.
        </p>

        {/* Order lifecycle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 40 }}>
          {['Processing', 'Packed', 'Shipped', 'Delivered'].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', margin: '0 auto 6px',
                  background: i === 0 ? 'var(--brand-dark)' : 'var(--brand-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i === 0 ? '#fff' : 'var(--brand-muted)', fontSize: 12, fontWeight: 700
                }}>{i + 1}</div>
                <p style={{ fontSize: 11, color: i === 0 ? 'var(--brand-dark)' : 'var(--brand-muted)', fontWeight: i === 0 ? 700 : 400 }}>{s}</p>
              </div>
              {i < 3 && <div style={{ width: 40, height: 2, background: i === 0 ? 'var(--brand-dark)' : 'var(--brand-border)', margin: '0 4px', marginBottom: 24 }} />}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
          <Link to="/account/orders" className="btn-outline">View Orders</Link>
        </div>
      </div>

      <footer className="sf-footer" style={{ marginTop: 80 }}>
        <p><strong>LUMORA SKIN</strong> · © 2026 · Demo by ShopFlow</p>
      </footer>
    </div>
  );
};

export default OrderConfirmation;
