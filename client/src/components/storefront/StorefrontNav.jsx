import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartDrawer from './CartDrawer';

const StorefrontNav = () => {
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="sf-nav">
        <Link to="/" className="sf-nav-logo">SHOPFLOW</Link>

        <div className="sf-nav-links">
          <Link to="/shop">Shop All</Link>
          <Link to="/shop">Oils</Link>
          <Link to="/shop">Skincare</Link>
          <Link to="/shop">Body & Bath</Link>
        </div>

        <div className="sf-nav-actions">
          <button className="sf-cart-btn" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={22} />
            {totalItems > 0 && <span className="sf-cart-count">{totalItems}</span>}
          </button>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default StorefrontNav;
