import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Products = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProducts();
  }, [token]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Products</h1>
        <Link to="/admin/products/new" style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          backgroundColor: 'var(--primary-color)', color: '#fff', 
          padding: '10px 15px', borderRadius: '4px', textDecoration: 'none'
        }}>
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--secondary-color)' }}>
              <th style={{ padding: '15px 20px', color: 'var(--text-secondary)' }}>Product</th>
              <th style={{ padding: '15px 20px', color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '15px 20px', color: 'var(--text-secondary)' }}>Inventory</th>
              <th style={{ padding: '15px 20px', color: 'var(--text-secondary)' }}>Variants</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>Loading products...</td></tr>
            ) : products.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '15px 20px', fontWeight: '500' }}>{product.title}</td>
                <td style={{ padding: '15px 20px' }}>
                  <span style={{ 
                    padding: '3px 8px', borderRadius: '12px', fontSize: '12px',
                    backgroundColor: product.status === 'active' ? '#d1fae5' : '#fef3c7',
                    color: product.status === 'active' ? '#065f46' : '#92400e'
                  }}>
                    {product.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '15px 20px' }}>{product.total_inventory || 0} in stock</td>
                <td style={{ padding: '15px 20px' }}>{product.variant_count || 0} variant(s)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
