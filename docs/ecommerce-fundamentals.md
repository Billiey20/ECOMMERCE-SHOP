# Shopify & Ecommerce Fundamentals (Phase 0)

Before writing any code, it is critical to understand the architecture and operational concepts behind a major ecommerce platform like Shopify. 

## 1. The Two Sides of Ecommerce
Every ecommerce platform consists of two main interfaces:
- **The Storefront:** What the customer sees. The product pages, collections, cart, and checkout.
- **The Admin Panel:** What the operations team sees. Where products are managed, orders are fulfilled, and analytics are reviewed.

## 2. Core Concepts & Terminology

### Products, Variants, and SKUs
- **Product:** A parent entity (e.g., "Vitamin C Serum").
- **Variant:** A specific version of a product (e.g., "30ml" vs "50ml").
- **SKU (Stock Keeping Unit):** A unique identifier for every variant used for inventory tracking.

### Inventory
Inventory is tracked at the *variant* level, not the product level. Operations managers must handle:
- **Available Stock:** What can be purchased.
- **Reserved Stock:** Items in carts or processing orders.
- **Out of Stock:** Items that cannot currently be purchased.

### Collections & Merchandising
Collections group products together to make them easier to discover.
- **Manual Collections:** Products are hand-picked (e.g., "Summer Highlights").
- **Automated Collections:** Products are included based on rules (e.g., "Price > $50" or "Tag = Skincare").

### Orders & Fulfillment
An order goes through a specific lifecycle:
1. **Processing:** The customer has paid; the warehouse is notified.
2. **Packed:** Items are boxed and ready for a shipping label.
3. **Shipped:** The carrier has picked up the package.
4. **Delivered:** The customer has received the package.
5. **Returns:** If an item is sent back, inventory must be adjusted and a refund issued.

### PDP (Product Detail Page)
The PDP is the most critical page for conversion. It must include:
- High-quality images
- Clear pricing and variant selection
- Stock status
- An undeniable "Add to Cart" button
- Detailed descriptions and reviews

## 3. The Goal of "ShopFlow"
In building ShopFlow, we are creating a customized clone of these core concepts. We will not build every Shopify feature, but we will build a system capable of managing the full lifecycle of a direct-to-consumer brand like **Lumora Skin**.
