import React, { useState, useEffect } from 'react';
import { Tag, Plus, Check, Percent, DollarSign } from 'lucide-react';

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [form, setForm] = useState({ code: '', type: 'percentage', value: '' });

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/discounts');
        const data = await response.json();
        if (data.success) {
          setDiscounts(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch discounts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/discounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (data.success) {
        setDiscounts([{ id: data.discountId, ...form, is_active: 1 }, ...discounts]);
        setShowForm(false);
        setForm({ code: '', type: 'percentage', value: '' });
      } else {
        alert(data.error || 'Failed to create discount');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create discount code');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Discounts & Promotions</h1>
        <button 
          onClick={() => setShowForm(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}
        >
          <Plus size={16} /> Create Discount
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 8, border: '1px solid #e5e7eb', marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>New Discount Code</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 16, alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Promo Code</label>
              <input 
                type="text" 
                value={form.code} 
                onChange={e => setForm({...form, code: e.target.value.toUpperCase()})}
                required 
                placeholder="e.g. SUMMER20"
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Type</label>
              <select 
                value={form.type} 
                onChange={e => setForm({...form, type: e.target.value})}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 6 }}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Value</label>
              <input 
                type="number" 
                step="0.01"
                value={form.value} 
                onChange={e => setForm({...form, value: e.target.value})}
                required 
                placeholder={form.type === 'percentage' ? "20" : "15.00"}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '9px 16px', background: '#fff', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '9px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}>Save Code</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Code</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Type</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Value</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading discounts...</td></tr>
            ) : discounts.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>No discount codes created yet.</td></tr>
            ) : discounts.map(discount => (
              <tr key={discount.id || discount.code} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag size={16} color="#6b7280" /> {discount.code}
                </td>
                <td style={{ padding: '16px 20px', color: '#374151', textTransform: 'capitalize' }}>
                  {discount.type}
                </td>
                <td style={{ padding: '16px 20px', color: '#111827', fontWeight: 500 }}>
                  {discount.type === 'percentage' ? `${discount.value}%` : `$${Number(discount.value).toFixed(2)}`}
                </td>
                <td style={{ padding: '16px 20px' }}>
                  {discount.is_active ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 4, backgroundColor: '#d1fae5', color: '#059669', fontSize: 12, fontWeight: 600 }}>
                      <Check size={12} /> Active
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 4, backgroundColor: '#f3f4f6', color: '#6b7280', fontSize: 12, fontWeight: 600 }}>
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discounts;
