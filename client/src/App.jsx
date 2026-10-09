import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import ProductForm from './pages/admin/ProductForm';
import Collections from './pages/admin/Collections';
import Inventory from './pages/admin/Inventory';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Discounts from './pages/admin/Discounts';
import Analytics from './pages/admin/Analytics';

import Storefront from './pages/storefront/Storefront';
import ProductDetail from './pages/storefront/ProductDetail';
import Shop from './pages/storefront/Shop';
import Checkout from './pages/storefront/Checkout';
import OrderConfirmation from './pages/storefront/OrderConfirmation';
import Account from './pages/storefront/Account';
import Login from './pages/storefront/Login';
import Register from './pages/storefront/Register';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Storefront Routes */}
            <Route path="/" element={<Storefront />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="collections" element={<Collections />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
