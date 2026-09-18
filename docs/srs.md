# Software Requirements Specification (SRS)

## Project: SHOPFLOW (Ecommerce Operations Platform)
**Business Entity:** Lumora Skin (Fictional DTC beauty/wellness brand)

### 1. Introduction
ShopFlow is a custom-built, production-style ecommerce operations platform designed to simulate and manage a direct-to-consumer (DTC) storefront and backend admin. The system covers everything from product and inventory management to order fulfillment, customer experience, and analytics.

### 2. The Business: Lumora Skin
Lumora Skin sells premium skincare products.
**Initial Product Catalog:**
- Vitamin C Serum (30ml, 50ml)
- Hydrating Cream (50ml, 100ml)
- Gentle Cleanser (150ml)
- SPF 50 Sunscreen (50ml)
- Hyaluronic Acid Serum (30ml)

### 3. User Roles & Permissions

#### 3.1 Admin
- **Access:** Full system access.
- **Capabilities:** Can manage users, edit products, adjust inventory, process orders, view all analytics, configure storefront settings.

#### 3.2 Operations Manager
- **Access:** Products, Inventory, Orders, Customers, Analytics.
- **Capabilities:** Manages the product catalog, monitors and updates stock levels, oversees the order fulfillment pipeline, and reviews operations analytics.

#### 3.3 Customer Service (CS)
- **Access:** Orders, Customers, Returns, Support Tickets.
- **Capabilities:** Views order status, processes refunds/returns, manages customer support inquiries. Cannot edit products or inventory directly.

#### 3.4 Customer
- **Access:** Storefront, Personal Account.
- **Capabilities:** Browses products, adds items to cart, checks out, tracks personal order history.

### 4. Core Modules & System Workflow

#### 4.1 Product & Inventory Management
- Products have details (title, description, price, SKU) and multiple Variants (e.g., sizes).
- Inventory is tracked per variant. System prevents purchase if out of stock.

#### 4.2 Merchandising
- Manual and automated Collections (e.g., "Best Sellers", "Skincare").
- Dynamic sorting and product visibility rules.

#### 4.3 Checkout & Orders
- Cart simulation leading to simulated payment processing.
- Order states: Processing -> Packed -> Fulfilled -> Shipped -> Delivered.

#### 4.4 Customer Experience & Returns
- Centralized customer profiles (Lifetime value, order history).
- Ticket system for refunds, returns, and support. Return workflows that restock inventory.

#### 4.5 Analytics
- Tracking of Conversion Rate, Add-to-cart rate, Average Order Value (AOV), and Return Rate.

### 5. Non-Functional Requirements
- **Stack:** React (Frontend), Node.js/Express (Backend), MySQL (Database).
- **Security:** JWT Authentication, Role-based Access Control (RBAC).
- **Performance:** Fast PDP loads, responsive mobile design, and robust API error handling.
