-- -----------------------------------------------------
-- SHOPFLOW Ecommerce Database Schema (Phase 3)
-- -----------------------------------------------------

CREATE DATABASE IF NOT EXISTS shopflow;
USE shopflow;

-- -----------------------------------------------------
-- USERS & ROLES
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- 'Admin', 'Operations', 'CustomerService', 'Customer'
    description TEXT
);

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(id)
);

-- -----------------------------------------------------
-- CATALOG: Products & Variants
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    vendor VARCHAR(100),
    product_type VARCHAR(100),
    status ENUM('active', 'draft', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    sku VARCHAR(100) UNIQUE,
    title VARCHAR(100), -- e.g., '30ml', '50ml'
    price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    weight_grams INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- INVENTORY
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    variant_id INT NOT NULL UNIQUE,
    available INT DEFAULT 0,
    reserved INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (variant_id) REFERENCES Variants(id) ON DELETE CASCADE
);

-- Audit log: every inventory change is recorded here
CREATE TABLE IF NOT EXISTS Inventory_History (
    id INT AUTO_INCREMENT PRIMARY KEY,
    variant_id INT NOT NULL,
    adjustment INT NOT NULL,        -- positive = stock added, negative = stock removed
    reason VARCHAR(255),            -- e.g. 'Manual Adjustment', 'Order #1042', 'Return #22'
    adjusted_by_user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (variant_id) REFERENCES Variants(id) ON DELETE CASCADE,
    FOREIGN KEY (adjusted_by_user_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- -----------------------------------------------------
-- MERCHANDISING: Collections
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Collections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_automated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Collection_Products (
    collection_id INT,
    product_id INT,
    PRIMARY KEY (collection_id, product_id),
    FOREIGN KEY (collection_id) REFERENCES Collections(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- ORDERS & CUSTOMERS
-- -----------------------------------------------------
-- For simplicity in this project, 'Customers' can just be a subset of 'Users' 
-- but we often separate them or use the Users table for auth.

CREATE TABLE IF NOT EXISTS Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Can be NULL for guest checkout, but we'll enforce accounts usually
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'packed', 'fulfilled', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'paid', 'refunded', 'failed') DEFAULT 'unpaid',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Order_Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    variant_id INT, -- if variant is deleted, we shouldn't lose order data, set null
    product_title VARCHAR(255), -- Snapshot of product title at time of order
    variant_title VARCHAR(100), -- Snapshot of variant title at time of order
    sku VARCHAR(100),
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
    FOREIGN KEY (variant_id) REFERENCES Variants(id) ON DELETE SET NULL
);

-- -----------------------------------------------------
-- CX & DISCOUNTS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Discounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    min_order_value DECIMAL(10, 2) DEFAULT 0,
    valid_from DATETIME,
    valid_until DATETIME,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Support_Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_id INT,
    subject VARCHAR(255) NOT NULL,
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (order_id) REFERENCES Orders(id)
);
