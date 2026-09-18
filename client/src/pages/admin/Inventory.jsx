import React, { useState } from 'react';
import { AlertTriangle, XCircle, CheckCircle, History } from 'lucide-react';

const LOW_STOCK = 5;

// Mock inventory data — will be fetched from GET /api/inventory
const MOCK_INVENTORY = [
  { inventory_id: 1, product_title: 'Vitamin C Serum', variant_title: '30ml', sku: 'LUM-VITC-30', available: 15, reserved: 2, updated_at: '2026-09-15' },
  { inventory_id: 2, product_title: 'Vitamin C Serum', variant_title: '50ml', sku: 'LUM-VITC-50', available: 0,  reserved: 0, updated_at: '2026-09-14' },
  { inventory_id: 3, product_title: 'Hydrating Cream',  variant_title: '50ml', sku: 'LUM-HC-50',  available: 3,  reserved: 1, updated_at: '2026-09-15' },
  { inventory_id: 4, product_title: 'Hydrating Cream',  variant_title: '100ml', sku: 'LUM-HC-100', available: 22, reserved: 0, updated_at: '2026-09-10' },
  { inventory_id: 5, product_title: 'Gentle Cleanser',  variant_title: '150ml', sku: 'LUM-GC-150', available: 8,  reserved: 0, updated_at: '2026-09-12' },
  { inventory_id: 6, product_title: 'SPF 50 Sunscreen', variant_title: '50ml', sku: 'LUM-SPF-50', available: 4,  reserved: 0, updated_at: '2026-09-16' },
  { inventory_id: 7, product_title: 'Hyaluronic Acid',  variant_title: '30ml', sku: 'LUM-HA-30',  available: 20, reserved: 3, updated_at: '2026-09-16' },
];

const MOCK_HISTORY = [
  { id: 1, adjustment: +50, reason: 'Supplier Delivery', adjusted_by: 'Admin User', created_at: '2026-09-01' },
  { id: 2, adjustment: -3, reason: 'Order #10042', adjusted_by: 'System', created_at: '2026-09-05' },
  { id: 3, adjustment: -12, reason: 'Order #10071', adjusted_by: 'System', created_at: '2026-09-10' },
];

const StockBadge = ({ available }) => {
  if (available === 0) return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontSize: '13px', fontWeight: '600' }}>
      <XCircle size={14} /> Out of Stock
    </span>
  );
  if (available <= LOW_STOCK) return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '13px', fontWeight: '600' }}>
      <AlertTriangle size={14} /> Low Stock
    </span>
  );
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '13px', fontWeight: '600' }}>
      <CheckCircle size={14} /> In Stock
    </span>
  );
};

const Inventory = () => {
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [adjustTarget, setAdjustTarget] = useState(null);
  const [historyTarget, setHistoryTarget] = useState(null);
  const [adjValue, setAdjValue] = useState('');
  const [adjReason, setAdjReason] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'low' | 'out'

  const alerts = inventory.filter(i => i.available <= LOW_STOCK);

  const filtered = inventory.filter(i => {
    if (filter === 'low') return i.available > 0 && i.available <= LOW_STOCK;
    if (filter === 'out') return i.available === 0;
    return true;
  });

  const handleAdjust = (e) => {
    e.preventDefault();
    const val = parseInt(adjValue);
    // Would call PUT /api/inventory/:variantId/adjust in production
    setInventory(prev => prev.map(row =>
      row.inventory_id === adjustTarget.inventory_id
        ? { ...row, available: Math.max(0, row.available + val) }
        : row
    ));
    setAdjustTarget(null);
    setAdjValue('');
    setAdjReason('');
  };

  const cellStyle = { padding: '14px 16px', borderBottom: '1px solid var(--border-color)' };
  const headStyle = { ...cellStyle, backgroundColor: 'var(--secondary-color)', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Inventory</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'low', 'out'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '6px 14px', borderRadius: '4px', border: '1px solid var(--border-color)',
              backgroundColor: filter === f ? '#000' : '#fff', color: filter === f ? '#fff' : 'inherit', cursor: 'pointer'
            }}>
              {f === 'all' ? 'All' : f === 'low' ? `Low Stock (${alerts.filter(a => a.available > 0).length})` : `Out of Stock (${alerts.filter(a => a.available === 0).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Banner */}
      {alerts.length > 0 && (
        <div style={{ backgroundColor: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertTriangle size={18} color="#f59e0b" />
          <span style={{ fontWeight: '600' }}>{alerts.length} variant{alerts.length > 1 ? 's' : ''} need attention</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>— {alerts.filter(a => a.available === 0).length} out of stock, {alerts.filter(a => a.available > 0 && a.available <= LOW_STOCK).length} low stock</span>
        </div>
      )}

      {/* Inventory Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={headStyle}>Product / Variant</th>
              <th style={headStyle}>SKU</th>
              <th style={headStyle}>Available</th>
              <th style={headStyle}>Reserved</th>
              <th style={headStyle}>Status</th>
              <th style={headStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.inventory_id} style={{ backgroundColor: row.available === 0 ? '#fff5f5' : row.available <= LOW_STOCK ? '#fffbeb' : '#fff' }}>
                <td style={cellStyle}>
                  <div style={{ fontWeight: '500' }}>{row.product_title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{row.variant_title}</div>
                </td>
                <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: '13px' }}>{row.sku}</td>
                <td style={cellStyle}>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{row.available}</span>
                </td>
                <td style={{ ...cellStyle, color: 'var(--text-secondary)' }}>{row.reserved}</td>
                <td style={cellStyle}><StockBadge available={row.available} /></td>
                <td style={cellStyle}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setAdjustTarget(row); setAdjValue(''); setAdjReason(''); }} style={{ padding: '4px 10px', fontSize: '13px', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fff' }}>
                      Adjust
                    </button>
                    <button onClick={() => setHistoryTarget(row)} style={{ padding: '4px 8px', fontSize: '13px', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <History size={13} /> History
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Adjust Modal */}
      {adjustTarget && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="card" style={{ width: '420px' }}>
            <h3 style={{ marginTop: 0 }}>Adjust Inventory</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              <strong>{adjustTarget.product_title} — {adjustTarget.variant_title}</strong>
              <br />Current stock: <strong>{adjustTarget.available}</strong>
            </p>
            <form onSubmit={handleAdjust}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Adjustment <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>(use negative to reduce)</span>
              </label>
              <input
                type="number"
                required
                value={adjValue}
                onChange={e => setAdjValue(e.target.value)}
                placeholder="e.g. +50 or -10"
                style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '16px' }}
              />
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Reason</label>
              <input
                value={adjReason}
                onChange={e => setAdjReason(e.target.value)}
                placeholder="e.g. Supplier Delivery, Damage Write-off"
                style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              />
              {adjValue !== '' && (
                <p style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '14px' }}>
                  New stock will be: <strong>{Math.max(0, adjustTarget.available + parseInt(adjValue || 0))}</strong>
                  {parseInt(adjValue) < 0 && adjustTarget.available + parseInt(adjValue) < 0 && (
                    <span style={{ color: '#ef4444' }}> ⚠ Cannot go below 0</span>
                  )}
                </p>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                <button type="button" onClick={() => setAdjustTarget(null)} style={{ padding: '10px 20px', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fff' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {historyTarget && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="card" style={{ width: '520px', maxHeight: '80vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Inventory History — {historyTarget.variant_title}</h3>
              <button onClick={() => setHistoryTarget(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Adjustment</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Reason</th>
                  <th style={{ padding: '8px', textAlign: 'left' }}>By</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_HISTORY.map(h => (
                  <tr key={h.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{h.created_at}</td>
                    <td style={{ padding: '8px', fontWeight: 'bold', color: h.adjustment > 0 ? '#10b981' : '#ef4444' }}>
                      {h.adjustment > 0 ? '+' : ''}{h.adjustment}
                    </td>
                    <td style={{ padding: '8px' }}>{h.reason}</td>
                    <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{h.adjusted_by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
