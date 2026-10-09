import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, Tag, BarChart2, Percent, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, token, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || (user.role !== 'Admin' && user.role !== 'Operations Manager'))) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div style={{ padding: 100, textAlign: 'center' }}>Loading Admin...</div>;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          SHOPFLOW Admin
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="sidebar-link">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/admin/products" className="sidebar-link">
            <Package size={20} />
            Products
          </Link>
          <Link to="/admin/collections" className="sidebar-link">
            <Tag size={20} />
            Collections
          </Link>
          <Link to="/admin/inventory" className="sidebar-link">
            <BarChart2 size={20} />
            Inventory
          </Link>
          <Link to="/admin/orders" className="sidebar-link">
            <ShoppingBag size={20} />
            Orders
          </Link>
          <Link to="/admin/customers" className="sidebar-link">
            <Users size={20} />
            Customers
          </Link>
          <Link to="/admin/discounts" className="sidebar-link">
            <Percent size={20} />
            Discounts
          </Link>
          <Link to="/admin/analytics" className="sidebar-link">
            <BarChart3 size={20} />
            Analytics
          </Link>
          <Link to="/admin/settings" className="sidebar-link">
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar" style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 20px', alignItems: 'center' }}>
          <div className="topbar-user" style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <span style={{ fontWeight: 500 }}>{user.first_name} {user.last_name}</span>
            <button onClick={() => { logout(); navigate('/login'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
