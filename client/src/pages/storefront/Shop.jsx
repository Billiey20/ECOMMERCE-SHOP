import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StorefrontNav from '../../components/storefront/StorefrontNav';

const SORT_OPTIONS = [
  { label: 'Best Selling', value: 'best_selling' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Newest', value: 'newest' },
];

const Shop = () => {
  const [sort, setSort] = useState('best_selling');
  const [activeCollection, setActiveCollection] = useState('all');

  const collections = [
    { id: 'all', title: 'All Products' },
    { id: 1, title: 'Best Sellers' },
    { id: 2, title: 'New Arrivals' },
    { id: 3, title: 'Skincare Essentials' },
  ];

  // Mock product grid — will be hydrated from API
  const products = [
    { id: 1, title: 'Vitamin C Serum', vendor: 'Lumora Skin', starting_price: '29.99', total_inventory: 15 },
    { id: 2, title: 'Hydrating Cream', vendor: 'Lumora Skin', starting_price: '34.99', total_inventory: 8 },
    { id: 3, title: 'Gentle Cleanser', vendor: 'Lumora Skin', starting_price: '22.00', total_inventory: 0 },
    { id: 4, title: 'SPF 50 Sunscreen', vendor: 'Lumora Skin', starting_price: '28.00', total_inventory: 5 },
    { id: 5, title: 'Hyaluronic Acid Serum', vendor: 'Lumora Skin', starting_price: '39.99', total_inventory: 20 },
  ];

  return (
    <div>
      <StorefrontNav />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ marginBottom: '10px', fontFamily: "'Playfair Display', serif" }}>Shop</h1>

        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Sidebar: Collection Filters */}
          <aside style={{ width: '200px', flexShrink: 0 }}>
            <p style={{ fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', color: 'var(--brand-muted)' }}>Collections</p>
            {collections.map(col => (
              <button
                key={col.id}
                onClick={() => setActiveCollection(col.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px',
                  marginBottom: '4px', borderRadius: '4px', border: 'none',
                  backgroundColor: activeCollection === col.id ? 'var(--brand-dark)' : 'transparent',
                  color: activeCollection === col.id ? '#fff' : 'var(--brand-text)',
                  cursor: 'pointer', fontWeight: activeCollection === col.id ? '600' : '400'
                }}
              >
                {col.title}
              </button>
            ))}
          </aside>

          {/* Product Grid */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--brand-border)', backgroundColor: '#fff', fontFamily: 'Inter, sans-serif' }}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
              {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ border: '1px solid var(--brand-border)', borderRadius: '8px', overflow: 'hidden', transition: 'box-shadow 0.2s', backgroundColor: '#fff' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    {/* Product Image Placeholder */}
                    <div style={{ height: '220px', backgroundColor: 'var(--brand-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'var(--brand-mid)', fontFamily: "'Playfair Display', serif" }}>LUMORA</span>
                    </div>

                    <div style={{ padding: '15px' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '11px', color: 'var(--brand-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.vendor}</p>
                      <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600 }}>{product.title}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>From ${product.starting_price}</span>
                        {product.total_inventory === 0 && (
                          <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>Sold Out</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="sf-footer" style={{ marginTop: '60px' }}>
        <p><strong>LUMORA SKIN</strong> · © 2026 · Demo by ShopFlow</p>
      </footer>
    </div>
  );
};

export default Shop;
