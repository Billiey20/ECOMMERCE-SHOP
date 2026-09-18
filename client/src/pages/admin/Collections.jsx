import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Tag } from 'lucide-react';

const Collections = () => {
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Mock data — will be replaced with real API fetch
  const [collections, setCollections] = useState([
    { id: 1, title: 'Best Sellers', description: 'Our most popular products', product_count: 3 },
    { id: 2, title: 'New Arrivals', description: 'Latest additions to our lineup', product_count: 1 },
    { id: 3, title: 'Skincare Essentials', description: 'Daily skincare must-haves', product_count: 4 },
  ]);

  const handleCreate = (e) => {
    e.preventDefault();
    // Would call POST /api/collections in real implementation
    setCollections([
      ...collections,
      { id: Date.now(), title: newTitle, description: newDesc, product_count: 0 }
    ]);
    setNewTitle('');
    setNewDesc('');
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Collections</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#000', color: '#fff', padding: '10px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
        >
          <Plus size={16} /> New Collection
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0 }}>Create Collection</h3>
          <form onSubmit={handleCreate}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              placeholder="e.g. Summer Glow"
            />
            <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
            <textarea
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid var(--border-color)', height: '80px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fff' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {collections.map(col => (
          <div key={col.id} className="card" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Tag size={20} style={{ color: 'var(--accent-color)' }} />
              <h3 style={{ margin: 0 }}>{col.title}</h3>
            </div>
            <p style={{ margin: '0 0 15px', color: 'var(--text-secondary)', fontSize: '14px' }}>
              {col.description || 'No description'}
            </p>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
              {col.product_count} product{col.product_count !== 1 ? 's' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
