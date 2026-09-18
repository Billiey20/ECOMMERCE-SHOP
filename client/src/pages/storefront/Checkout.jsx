import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StorefrontNav from '../../components/storefront/StorefrontNav';
import { useCart } from '../../context/CartContext';
import '../../styles/storefront.css';

const STEPS = ['Contact', 'Shipping', 'Payment'];

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    email: '', first_name: '', last_name: '',
    address: '', city: '', country: 'United Kingdom', postcode: '',
    card_number: '4242 4242 4242 4242', card_expiry: '12/28', card_cvc: '123',
  });

  const shipping = subtotal > 60 ? 0 : 4.99;
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(null); // { code, type, value }
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const discount = promoApplied
    ? promoApplied.type === 'percentage'
      ? subtotal * (promoApplied.value / 100)
      : Math.min(promoApplied.value, subtotal)
    : 0;
  const total = subtotal + shipping - discount;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError('');
    try {
      const res = await fetch('http://localhost:5000/api/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode })
      });
      const data = await res.json();
      if (data.success) {
        setPromoApplied(data.data);
        setPromoError('');
      } else {
        setPromoError(data.error || 'Invalid code');
        setPromoApplied(null);
      }
    } catch (err) {
      setPromoError('Could not validate code. Try WELCOME10.');
      setPromoApplied(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 2) { setStep(s => s + 1); return; }

    // Simulate payment processing & API call
    setProcessing(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: items,
          shipping: shipping,
          subtotal: subtotal,
          discount: discount,
          promoCode: promoApplied?.code,
          total: total
        })
      });

      const data = await response.json();
      
      // If we don't have a backend running, fallback to a mock ID
      const orderId = data.success ? data.orderId : Math.floor(10000 + Math.random() * 90000);
      
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      console.error(err);
      // Fallback for demo without backend
      const mockOrderId = Math.floor(10000 + Math.random() * 90000);
      clearCart();
      navigate(`/order-confirmation/${mockOrderId}`);
    }
  };

  if (items.length === 0 && !processing) {
    return (
      <div>
        <StorefrontNav />
        <div style={{ textAlign: 'center', padding: '100px 40px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>Your cart is empty</h2>
          <a href="/shop" className="btn-primary">Continue Shopping</a>
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '1px solid var(--brand-border)',
    borderRadius: 2, fontSize: 14, marginBottom: 14, outline: 'none',
    fontFamily: 'Inter, sans-serif',
  };

  return (
    <div>
      <StorefrontNav />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '50px 40px', display: 'flex', gap: 50 }}>

        {/* Left: Form */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 30 }}>Checkout</h1>

          {/* Step progress */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <span style={{ fontSize: 13, fontWeight: i <= step ? 700 : 400, color: i <= step ? 'var(--brand-rose)' : 'var(--brand-muted)', cursor: i < step ? 'pointer' : 'default' }}
                  onClick={() => { if (i < step) setStep(i); }}>
                  {s}
                </span>
                {i < STEPS.length - 1 && <span style={{ margin: '0 12px', color: 'var(--brand-border)' }}>›</span>}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 0: Contact */}
            {step === 0 && (
              <div>
                <h3 style={{ marginBottom: 16 }}>Contact Information</h3>
                <input style={inputStyle} type="email" placeholder="Email address" value={form.email} onChange={e => set('email', e.target.value)} required />
                <div style={{ display: 'flex', gap: 12 }}>
                  <input style={inputStyle} placeholder="First name" value={form.first_name} onChange={e => set('first_name', e.target.value)} required />
                  <input style={inputStyle} placeholder="Last name" value={form.last_name} onChange={e => set('last_name', e.target.value)} required />
                </div>
              </div>
            )}

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div>
                <h3 style={{ marginBottom: 16 }}>Shipping Address</h3>
                <input style={inputStyle} placeholder="Address" value={form.address} onChange={e => set('address', e.target.value)} required />
                <div style={{ display: 'flex', gap: 12 }}>
                  <input style={inputStyle} placeholder="City" value={form.city} onChange={e => set('city', e.target.value)} required />
                  <input style={inputStyle} placeholder="Postcode" value={form.postcode} onChange={e => set('postcode', e.target.value)} required />
                </div>
                <select style={inputStyle} value={form.country} onChange={e => set('country', e.target.value)}>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Australia</option>
                  <option>Canada</option>
                </select>
                <div style={{ padding: 14, background: 'var(--brand-cream)', borderRadius: 4, fontSize: 14, color: 'var(--brand-muted)', marginBottom: 14 }}>
                  🚚 {shipping === 0 ? 'Free shipping applied!' : `Standard shipping: £${shipping.toFixed(2)}`}
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div>
                <h3 style={{ marginBottom: 8 }}>Payment</h3>
                <p style={{ color: 'var(--brand-muted)', fontSize: 13, marginBottom: 16 }}>🔒 Simulated payment — no real charge</p>
                <input style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: 2 }} placeholder="Card number" value={form.card_number} onChange={e => set('card_number', e.target.value)} />
                <div style={{ display: 'flex', gap: 12 }}>
                  <input style={inputStyle} placeholder="MM/YY" value={form.card_expiry} onChange={e => set('card_expiry', e.target.value)} />
                  <input style={inputStyle} placeholder="CVC" value={form.card_cvc} onChange={e => set('card_cvc', e.target.value)} />
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontSize: 15 }}
              disabled={processing}>
              {processing ? 'Processing…' : step < 2 ? `Continue to ${STEPS[step + 1]}` : `Pay £${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div style={{ width: 340, flexShrink: 0 }}>
          <div style={{ background: 'var(--brand-cream)', borderRadius: 8, padding: 24 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 20 }}>Order Summary</h3>
            {items.map(item => (
              <div key={item.variantId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
                <div>
                  <span style={{ fontWeight: 500 }}>{item.title}</span>
                  <span style={{ color: 'var(--brand-muted)' }}> × {item.quantity}</span>
                  <div style={{ fontSize: 12, color: 'var(--brand-muted)' }}>{item.variantTitle}</div>
                </div>
                <span style={{ fontWeight: 600 }}>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--brand-border)', marginTop: 16, paddingTop: 16 }}>
              {/* Promo code input */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoApplied(null); setPromoError(''); }}
                    placeholder="Promo code"
                    style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--brand-border)', borderRadius: 4, fontSize: 13, fontFamily: 'monospace' }}
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    disabled={promoLoading}
                    style={{ padding: '8px 14px', background: 'var(--brand-dark)', color: '#fff', border: 'none', borderRadius: 4, fontSize: 13, cursor: 'pointer', fontWeight: 500 }}
                  >
                    {promoLoading ? '...' : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <p style={{ marginTop: 6, fontSize: 12, color: '#10b981', fontWeight: 600 }}>
                    ✓ {promoApplied.code} applied!
                  </p>
                )}
                {promoError && (
                  <p style={{ marginTop: 6, fontSize: 12, color: '#ef4444' }}>{promoError}</p>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: 'var(--brand-muted)' }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8, color: '#10b981' }}>
                  <span>Discount ({promoApplied.code})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 16 }}>
                <span style={{ color: 'var(--brand-muted)' }}>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18 }}>
                <span>Total</span>
                <span style={{ color: 'var(--brand-rose)' }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
