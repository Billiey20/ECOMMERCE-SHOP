import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);

  // Mock fetching orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      // In production: fetch from /api/orders?status=filter
      // Mocking response for now
      setTimeout(() => {
        setOrders([
          { id: 1042, user_id: 2, total_amount: 114.98, status: 'processing', payment_status: 'paid', created_at: new Date().toISOString(), shipping_address: '123 Fake St, London, UK' },
          { id: 1041, user_id: 3, total_amount: 34.99, status: 'packed', payment_status: 'paid', created_at: new Date(Date.now() - 86400000).toISOString(), shipping_address: '456 Test Ave, New York, USA' },
          { id: 1040, user_id: 4, total_amount: 65.00, status: 'shipped', payment_status: 'paid', created_at: new Date(Date.now() - 172800000).toISOString(), shipping_address: '789 Demo Blvd, Sydney, AUS' },
          { id: 1039, user_id: 5, total_amount: 29.99, status: 'delivered', payment_status: 'paid', created_at: new Date(Date.now() - 345600000).toISOString(), shipping_address: '321 Real Rd, Toronto, CAN' },
          { id: 1038, user_id: 6, total_amount: 89.00, status: 'refunded', payment_status: 'refunded', created_at: new Date(Date.now() - 400000000).toISOString(), shipping_address: '111 Fake Ave, Austin, TX' },
        ]);
        setLoading(false);
      }, 500);
    };
    fetchOrders();
  }, [filter]);

  const handleRefund = async (orderId) => {
    if (!window.confirm(`Are you sure you want to process a return and refund order #${orderId}? This will restock inventory.`)) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/refund`, { method: 'POST' });
      const data = await res.json();
      if (data.success || data.mock) { // mock handled if DB is down
         setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'refunded', payment_status: 'refunded' } : o));
         setSelectedOrder(null);
      }
    } catch (err) {
      console.error(err);
      // Fallback update for mock UI
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'refunded', payment_status: 'refunded' } : o));
      setSelectedOrder(null);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const StatusBadge = ({ status }) => {
    const styles = {
      processing: { bg: '#fef3c7', text: '#d97706', icon: <Clock size={14} /> },
      packed: { bg: '#e0e7ff', text: '#4f46e5', icon: <Package size={14} /> },
      shipped: { bg: '#dbeafe', text: '#2563eb', icon: <Truck size={14} /> },
      delivered: { bg: '#d1fae5', text: '#059669', icon: <CheckCircle size={14} /> },
      cancelled: { bg: '#fee2e2', text: '#dc2626', icon: <XCircle size={14} /> },
      refunded: { bg: '#f3f4f6', text: '#4b5563', icon: <XCircle size={14} /> },
    };
    const s = styles[status] || styles.processing;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, backgroundColor: s.bg, color: s.text, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>
        {s.icon} {status}
      </span>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Orders & Fulfillment</h1>
      </div>

      {/* KPI Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, fontWeight: 500 }}>Total Orders</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>1,284</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, fontWeight: 500 }}>Pending Fulfillment</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#d97706' }}>42</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, fontWeight: 500 }}>Ready to Ship</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#4f46e5' }}>18</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, fontWeight: 500 }}>Total Revenue</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#059669' }}>$48,290</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {/* Filters */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: 16 }}>
          {['all', 'processing', 'packed', 'shipped', 'delivered', 'cancelled', 'refunded'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: 'none', border: 'none', padding: '6px 12px', borderRadius: 20,
                fontSize: 13, fontWeight: filter === f ? 600 : 500,
                backgroundColor: filter === f ? '#f3f4f6' : 'transparent',
                color: filter === f ? '#111827' : '#6b7280',
                cursor: 'pointer', textTransform: 'capitalize'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Order</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Total</th>
              <th style={{ padding: '12px 20px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading orders...</td></tr>
            ) : filteredOrders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px 20px', fontWeight: 600, color: '#111827' }}>#{order.id}</td>
                <td style={{ padding: '16px 20px', color: '#6b7280', fontSize: 14 }}>{new Date(order.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '16px 20px' }}><StatusBadge status={order.status} /></td>
                <td style={{ padding: '16px 20px', fontWeight: 500 }}>${order.total_amount.toFixed(2)}</td>
                <td style={{ padding: '16px 20px' }}>
                  <button 
                    style={{ padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: 4, background: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#374151' }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fulfillment Modal (simplified for now) */}
      {selectedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', width: 600, borderRadius: 8, padding: 32, position: 'relative' }}>
            <button 
              onClick={() => setSelectedOrder(null)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#9ca3af' }}
            >×</button>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>Manage Order #{selectedOrder.id}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Shipping Details</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
                  {selectedOrder.shipping_address.split(', ').map((l, i) => <React.Fragment key={i}>{l}<br/></React.Fragment>)}
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Current Status</h3>
                <StatusBadge status={selectedOrder.status} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 24 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 16 }}>Fulfillment Actions</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                {selectedOrder.status === 'processing' && (
                  <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: 4, background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
                    Mark as Packed
                  </button>
                )}
                {selectedOrder.status === 'packed' && (
                  <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: 4, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer' }}>
                    Enter Tracking & Ship
                  </button>
                )}
                {selectedOrder.status === 'delivered' && (
                  <button 
                    onClick={() => handleRefund(selectedOrder.id)}
                    disabled={actionLoading}
                    style={{ padding: '8px 16px', borderRadius: 4, background: '#dc2626', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer', opacity: actionLoading ? 0.7 : 1 }}
                  >
                    {actionLoading ? 'Processing...' : 'Process Return & Refund'}
                  </button>
                )}
                {(selectedOrder.status === 'processing' || selectedOrder.status === 'packed') && (
                  <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontWeight: 500, cursor: 'pointer' }}>
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
