import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontNav from '../../components/storefront/StorefrontNav';
import '../../styles/storefront.css';

const FEATURED_PRODUCTS = [
  { id: 1, title: 'Vitamin C Serum',       variant: '30ml', price: '29.99', badge: 'Best Seller' },
  { id: 2, title: 'Hydrating Cream',        variant: '50ml', price: '34.99', badge: 'New' },
  { id: 3, title: 'Hyaluronic Acid Serum',  variant: '30ml', price: '39.99', badge: null },
  { id: 4, title: 'SPF 50 Sunscreen',       variant: '50ml', price: '28.00', badge: null },
];

const Homepage = () => (
  <div>
    <StorefrontNav />

    {/* ── HERO ─────────────────────────────────── */}
    <section className="sf-hero">
      <div className="sf-hero-text">
        <p className="sf-hero-eyebrow">Lumora Skin — Premium Skincare</p>
        <h1 className="sf-hero-title">
          Glow From<br />
          <em>Within</em>
        </h1>
        <p className="sf-hero-subtitle">
          Science-backed formulas crafted for visible results.
          Nourish, protect, and radiate — every single day.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/shop" className="btn-primary">Shop the Collection</Link>
          <Link to="/shop" className="btn-outline">Learn More</Link>
        </div>
      </div>

      <div className="sf-hero-image">
        LUMORA SKIN
      </div>
    </section>

    {/* ── FEATURES BANNER ──────────────────────── */}
    <div className="sf-features">
      {[
        { icon: '✦', title: 'Dermatologist Tested', sub: 'Clinically validated formulas' },
        { icon: '✦', title: 'Clean Ingredients',    sub: 'Free from parabens & sulphates' },
        { icon: '✦', title: 'Cruelty Free',         sub: 'Never tested on animals' },
        { icon: '✦', title: 'Sustainable',           sub: 'Eco-conscious packaging' },
      ].map(f => (
        <div key={f.title} className="sf-feature-item">
          <h4>{f.icon} {f.title}</h4>
          <p>{f.sub}</p>
        </div>
      ))}
    </div>

    {/* ── FEATURED PRODUCTS ────────────────────── */}
    <section className="sf-section">
      <div className="sf-section-header">
        <p className="sf-section-eyebrow">Best Sellers</p>
        <h2 className="sf-section-title">Shop Our Favourites</h2>
      </div>

      <div className="sf-product-grid">
        {FEATURED_PRODUCTS.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sf-product-card">
              <div className="sf-product-card-image">
                {p.badge && <span className="sf-product-badge">{p.badge}</span>}
                <span style={{ opacity: 0.4 }}>Image</span>
              </div>
              <p className="sf-product-vendor">Lumora Skin</p>
              <h3 className="sf-product-title">{p.title}</h3>
              <p className="sf-product-price">From ${p.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/shop" className="btn-outline">View All Products</Link>
      </div>
    </section>

    {/* ── BRAND STRIP ──────────────────────────── */}
    <section style={{ background: 'var(--brand-cream)', padding: '80px 40px', textAlign: 'center' }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--brand-dark)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6, fontStyle: 'italic' }}>
        "Skincare shouldn't be complicated. We believe every routine should feel like a ritual."
      </p>
      <p style={{ marginTop: 24, color: 'var(--brand-muted)', letterSpacing: 2, textTransform: 'uppercase', fontSize: 12 }}>— Lumora Skin</p>
    </section>

    {/* ── FOOTER ───────────────────────────────── */}
    <footer className="sf-footer">
      <p style={{ marginBottom: 8 }}><strong>LUMORA SKIN</strong></p>
      <p>© 2026 Lumora Skin. All rights reserved. · Demo by ShopFlow</p>
    </footer>
  </div>
);

export default Homepage;
