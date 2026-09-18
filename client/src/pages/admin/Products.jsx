import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Products = () => {
  // In a real app, fetch products from /api/products here.
  const mockProducts = [
    { id: 1, title: 'Vitamin C Serum', status: 'active', variant_count: 2, total_inventory: 150 },
    { id: 2, title: 'Hydrating Cream', status: 'draft', variant_count: 1, total_inventory: 0 }
  ];

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
            {mockProducts.map(product => (
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
                <td style={{ padding: '15px 20px' }}>{product.total_inventory} in stock</td>
                <td style={{ padding: '15px 20px' }}>{product.variant_count} variant(s)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
