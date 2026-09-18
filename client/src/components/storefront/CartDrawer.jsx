import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ open, onClose }) => {
  const { items, removeItem, updateQty, subtotal, totalItems } = useCart();

  if (!open) return null;

  return (
    <>
      <div className="sf-cart-backdrop" onClick={onClose} />
      <div className="sf-cart-drawer">
        {/* Header */}
        <div className="sf-cart-header">
          <span>Your Cart ({totalItems})</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="sf-cart-items">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--brand-muted)' }}>
              <ShoppingBag size={40} style={{ marginBottom: '16px', opacity: 0.3 }} />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.variantId} className="sf-cart-item">
                <div className="sf-cart-item-image" />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, marginBottom: 4 }}>{item.title}</p>
                  <p style={{ fontSize: 13, color: 'var(--brand-muted)', marginBottom: 10 }}>
                    {item.variantTitle} · {item.sku}
                  </p>
                  {/* Qty controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button onClick={() => updateQty(item.variantId, item.quantity - 1)}
                      style={{ border: '1px solid var(--brand-border)', background: '#fff', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontWeight: 600, width: 24, textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQty(item.variantId, item.quantity + 1)}
                      style={{ border: '1px solid var(--brand-border)', background: '#fff', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeItem(item.variantId)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-muted)', fontSize: 12 }}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="sf-cart-footer">
            <div className="sf-cart-total">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--brand-muted)', marginBottom: 16 }}>
              Shipping calculated at checkout
            </p>
            <Link to="/checkout" onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
