import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StorefrontNav from '../../components/storefront/StorefrontNav';
import { getProductImage } from '../../utils/imageMapper';
import '../../styles/storefront.css';

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/storefront/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Take top 4 for the homepage
          setFeaturedProducts(data.data.slice(0, 4));
        }
      })
      .catch(err => console.error('Error fetching featured products:', err));
  }, []);

  return (
  <div>
    <StorefrontNav />

    {/* ── HERO ─────────────────────────────────── */}
    <section className="sf-hero">
      <div className="sf-hero-text">
        <p className="sf-hero-eyebrow">ShopFlow — Premium Commerce</p>
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

      <div className="sf-hero-image" style={{ overflow: 'hidden' }}>
        <img src="/images/serum.jpg" alt="ShopFlow Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        {featuredProducts.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="sf-product-card">
              <div className="sf-product-card-image" style={{ overflow: 'hidden' }}>
                <img src={getProductImage(p.product_type)} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <p className="sf-product-vendor">{p.vendor}</p>
              <h3 className="sf-product-title">{p.title}</h3>
              <p className="sf-product-price">From ${p.starting_price}</p>
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
        "Commerce shouldn't be complicated. We believe every routine should feel like a ritual."
      </p>
      <p style={{ marginTop: 24, color: 'var(--brand-muted)', letterSpacing: 2, textTransform: 'uppercase', fontSize: 12 }}>— ShopFlow</p>
    </section>

    {/* ── FOOTER ───────────────────────────────── */}
    <footer className="sf-footer">
      <p style={{ marginBottom: 8 }}><strong>SHOPFLOW</strong></p>
      <p>© 2026 ShopFlow. All rights reserved. · E-commerce Demo</p>
    </footer>
  </div>
  );
};

export default Homepage;
