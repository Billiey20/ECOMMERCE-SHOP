import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vendor: 'Lumora Skin',
    product_type: 'Skincare',
    status: 'draft',
    variants: [
      { title: 'Default Title', sku: '', price: '', inventory: 0 }
    ]
  });

  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { title: '', sku: '', price: '', inventory: 0 }]
    });
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData({ ...formData, variants: newVariants });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to POST /api/products
    console.log('Submitting:', formData);
    // On success:
    navigate('/admin/products');
  };

  const inputStyle = { width: '100%', padding: '10px', margin: '5px 0 15px', borderRadius: '4px', border: '1px solid var(--border-color)' };

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Add Product</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3>Basic Details</h3>
          <label>Title</label>
          <input 
            style={inputStyle} 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required 
            placeholder="e.g. Vitamin C Serum" 
          />
          
          <label>Description</label>
          <textarea 
            style={{...inputStyle, height: '100px'}} 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
          />

          <label>Status</label>
          <select style={inputStyle} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
          </select>
        </div>

        <div className="card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Variants & Inventory</h3>
            <button type="button" onClick={handleAddVariant} style={{ padding: '5px 10px' }}>+ Add Variant</button>
          </div>
          
          {formData.variants.map((variant, index) => (
            <div key={index} style={{ border: '1px dashed var(--border-color)', padding: '15px', marginTop: '15px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label>Variant Title (e.g. 30ml)</label>
                  <input style={inputStyle} value={variant.title} onChange={e => handleVariantChange(index, 'title', e.target.value)} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label>SKU</label>
                  <input style={inputStyle} value={variant.sku} onChange={e => handleVariantChange(index, 'sku', e.target.value)} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Price</label>
                  <input type="number" step="0.01" style={inputStyle} value={variant.price} onChange={e => handleVariantChange(index, 'price', e.target.value)} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Initial Inventory</label>
                  <input type="number" style={inputStyle} value={variant.inventory} onChange={e => handleVariantChange(index, 'inventory', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
