import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, Tag, BarChart2, Percent, BarChart3 } from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          SHOPFLOW
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
        <header className="topbar">
          <div className="topbar-user">
            Admin User
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
