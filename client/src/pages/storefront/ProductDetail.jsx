import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StorefrontNav from '../../components/storefront/StorefrontNav';
import { useCart } from '../../context/CartContext';
import { getProductImage } from '../../utils/imageMapper';
import '../../styles/storefront.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/storefront/products/${id}`);
        const data = await res.json();
        
        if (data.success && data.data) {
          setProduct(data.data);
          if (data.data.variants && data.data.variants.length > 0) {
            setSelectedVariant(data.data.variants[0]);
          }
        } else {
          console.error('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.available === 0) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      sku: selectedVariant.sku,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <div style={{ padding: 80, textAlign: 'center' }}>Loading…</div>;

  return (
    <div>
      <StorefrontNav />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 40px', display: 'flex', gap: 60, alignItems: 'flex-start' }}>
        
        {/* Image */}
        <div style={{ flex: 1, minHeight: 500, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={getProductImage(product.product_type)} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--brand-muted)', marginBottom: 8 }}>{product.vendor}</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: 'var(--brand-dark)', marginBottom: 16, lineHeight: 1.3 }}>{product.title}</h1>

          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--brand-rose)', marginBottom: 32 }}>
            ${selectedVariant?.price}
          </p>

          {/* Variant selector */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontWeight: 600, marginBottom: 12, fontSize: 14, letterSpacing: 0.5 }}>Size</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {product.variants.map(v => (
                <button key={v.id} onClick={() => setSelectedVariant(v)}
                  style={{
                    padding: '10px 22px', border: `2px solid ${selectedVariant?.id === v.id ? 'var(--brand-dark)' : 'var(--brand-border)'}`,
                    backgroundColor: selectedVariant?.id === v.id ? 'var(--brand-dark)' : '#fff',
                    color: selectedVariant?.id === v.id ? '#fff' : 'var(--brand-text)',
                    cursor: v.available === 0 ? 'not-allowed' : 'pointer',
                    borderRadius: 2, fontWeight: 600,
                    opacity: v.available === 0 ? 0.45 : 1,
                    position: 'relative',
                  }}>
                  {v.title}
                  {v.available === 0 && <span style={{ position: 'absolute', bottom: -1, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 1, background: '#999' }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Stock status */}
          <div style={{ marginBottom: 28 }}>
            {selectedVariant?.available > 0 ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', fontSize: 14, fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                In Stock · {selectedVariant.available} units available
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ef4444', fontSize: 14, fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                Out of Stock
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <button onClick={handleAddToCart}
            disabled={selectedVariant?.available === 0}
            className="btn-primary"
            style={{
              width: '100%', justifyContent: 'center', marginBottom: 16, fontSize: 15,
              backgroundColor: added ? '#10b981' : selectedVariant?.available === 0 ? '#ccc' : undefined,
              cursor: selectedVariant?.available === 0 ? 'not-allowed' : 'pointer',
              transition: 'background-color .3s',
            }}>
            {added ? '✓ Added to Cart' : selectedVariant?.available === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>

          {/* Description */}
          <div style={{ borderTop: '1px solid var(--brand-border)', paddingTop: 28, marginTop: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: 12 }}>Description</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--brand-muted)', fontSize: 15 }}>{product.description}</p>
          </div>

          <div style={{ borderTop: '1px solid var(--brand-border)', paddingTop: 16, marginTop: 24, display: 'flex', gap: 24, fontSize: 13, color: 'var(--brand-muted)' }}>
            <span>🚚 Free shipping over $60</span>
            <span>↩ 30-day returns</span>
            <span>✦ Cruelty free</span>
          </div>
        </div>
      </div>

      <footer className="sf-footer">
        <p><strong>SHOPFLOW</strong> · © 2026 · E-commerce Demo</p>
      </footer>
    </div>
  );
};

export default ProductDetail;
