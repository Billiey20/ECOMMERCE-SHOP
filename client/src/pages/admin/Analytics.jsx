import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, ShoppingBag, DollarSign, Users } from 'lucide-react';

const STATUS_COLORS = {
  delivered: '#10b981',
  shipped: '#3b82f6',
  processing: '#f59e0b',
  packed: '#8b5cf6',
  refunded: '#6b7280',
  cancelled: '#ef4444',
};

const formatCurrency = (v) => `$${Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '12px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 13 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ fontSize: 13, color: p.color, margin: '2px 0' }}>
          {p.name}: {p.name === 'Revenue' ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

const KpiCard = ({ icon: Icon, label, value, color, subtext }) => (
  <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 12, border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={22} color={color} />
    </div>
    <div>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4, fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: 24, fontWeight: 700, color: '#111827', lineHeight: 1 }}>{value}</p>
      {subtext && <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{subtext}</p>}
    </div>
  </div>
);

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revenueMode, setRevenueMode] = useState('revenue'); // 'revenue' | 'orders'

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/analytics');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Failed to load analytics, using mock data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#6b7280' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#111827', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p>Loading analytics…</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <p style={{ color: '#ef4444', padding: 20 }}>Failed to load analytics data.</p>;
  }

  const { revenueByDay, topProducts, statusBreakdown, kpis } = data;
  const pieData = statusBreakdown.map(s => ({ name: s.status, value: Number(s.count) }));
  const totalRevenue30d = revenueByDay.reduce((acc, d) => acc + d.revenue, 0);
  const totalOrders30d = revenueByDay.reduce((acc, d) => acc + d.orders, 0);

  return (
    <div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>Analytics</h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>Last 30 days · Lumora Skin</p>
        </div>
        <div style={{ fontSize: 13, color: '#6b7280', background: '#f3f4f6', padding: '6px 14px', borderRadius: 20 }}>
          {new Date(Date.now() - 29 * 86400000).toLocaleDateString()} → {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
        <KpiCard icon={DollarSign} label="Total Revenue (All Time)" value={formatCurrency(kpis.total_revenue)} color="#10b981" subtext={`Avg. order: ${formatCurrency(kpis.avg_order_value)}`} />
        <KpiCard icon={ShoppingBag} label="Total Orders (All Time)" value={Number(kpis.total_orders).toLocaleString()} color="#3b82f6" subtext="Excl. cancelled & refunded" />
        <KpiCard icon={TrendingUp} label="Revenue (Last 30 Days)" value={formatCurrency(totalRevenue30d)} color="#8b5cf6" subtext={`${totalOrders30d} orders placed`} />
        <KpiCard icon={Users} label="Avg. Orders / Day" value={(totalOrders30d / 30).toFixed(1)} color="#f59e0b" subtext="Last 30-day period" />
      </div>

      {/* Revenue Chart */}
      <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>Revenue & Orders — Last 30 Days</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setRevenueMode('revenue')}
              style={{ padding: '6px 14px', borderRadius: 20, border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', background: revenueMode === 'revenue' ? '#111827' : '#f3f4f6', color: revenueMode === 'revenue' ? '#fff' : '#6b7280' }}
            >Revenue</button>
            <button
              onClick={() => setRevenueMode('orders')}
              style={{ padding: '6px 14px', borderRadius: 20, border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', background: revenueMode === 'orders' ? '#111827' : '#f3f4f6', color: revenueMode === 'orders' ? '#fff' : '#6b7280' }}
            >Orders</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueByDay} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false}
              tickFormatter={revenueMode === 'revenue' ? (v) => `$${(v / 1000).toFixed(1)}k` : undefined} />
            <Tooltip content={<CustomTooltip />} />
            {revenueMode === 'revenue' ? (
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2} fill="url(#colorRevenue)" dot={false} activeDot={{ r: 5, fill: '#10b981' }} />
            ) : (
              <Area type="monotone" dataKey="orders" name="Orders" stroke="#3b82f6" strokeWidth={2} fill="url(#colorOrders)" dot={false} activeDot={{ r: 5, fill: '#3b82f6' }} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row: Top Products + Order Status Pie */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24 }}>

        {/* Top Products Bar Chart */}
        <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 20 }}>Top Products by Units Sold</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="product_title" width={160} tick={{ fontSize: 12, fill: '#374151' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="units_sold" name="Units Sold" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie */}
        <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 20 }}>Orders by Status</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#6b7280'} />
                ))}
              </Pie>
              <Tooltip formatter={(v, name) => [v, name.charAt(0).toUpperCase() + name.slice(1)]} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 12 }}>
            {pieData.map(entry => (
              <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: STATUS_COLORS[entry.name] || '#6b7280' }} />
                <span style={{ color: '#374151', textTransform: 'capitalize' }}>{entry.name}</span>
                <span style={{ color: '#9ca3af', fontWeight: 600 }}>({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
