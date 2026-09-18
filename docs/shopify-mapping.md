# Shopify API Integration & Architecture Mapping

As ShopFlow scales or potentially migrates to a managed platform, it is critical to understand how our custom architecture maps to the Shopify ecosystem. This document outlines the conceptual mappings between the ShopFlow Database/API and the Shopify Admin REST/GraphQL APIs.

## 1. Product & Catalog Mapping

### ShopFlow Architecture
- **Products:** Stored in the `Products` table (id, title, description, vendor, type).
- **Variants:** Stored in the `Variants` table (id, product_id, sku, price, size, color).
- **Collections:** Stored in `Collections` and mapped via `Product_Collections` junction table.

### Shopify Equivalents
- **Product API:** Maps directly to Shopify's `Product` resource. Shopify uses a parent `Product` object which contains an array of `Variants`.
- **Variant API:** Maps to Shopify's `ProductVariant` resource. In Shopify, inventory and pricing are managed at the Variant level (similar to ShopFlow).
- **Custom Collections:** Maps to Shopify's `CustomCollection` API.
- **Smart Collections:** Maps to Shopify's `SmartCollection` API (automated rules).

## 2. Order & Fulfillment Mapping

### ShopFlow Architecture
- **Orders:** `Orders` table with a `status` field (Processing, Packed, Shipped, Delivered).
- **Order Items:** `OrderItems` table linking the Order to specific Variants.

### Shopify Equivalents
- **Order API:** Maps to Shopify's `Order` resource. Note that Shopify separates financial status (paid, pending) from fulfillment status.
- **Fulfillment API:** In Shopify, creating an order does not mean it is shipped. To move an order from "Processing" to "Shipped", a `Fulfillment` object must be created via the Fulfillment API, containing tracking information and specifying which line items are fulfilled.

## 3. Inventory Mapping

### ShopFlow Architecture
- **Inventory:** Tracked as a `stock_quantity` integer on the `Variants` table (or a separate `Inventory` table).

### Shopify Equivalents
- **InventoryItem API:** Shopify splits the physical characteristics (SKU, cost) into an `InventoryItem`.
- **InventoryLevel API:** The actual stock count at a specific warehouse is managed via the `InventoryLevel` API, which connects an `InventoryItem` to a `Location`.

## 4. Webhooks & Data Sync Strategy

If ShopFlow is used as a headless frontend or a middleware system syncing with Shopify, we would implement the following Webhook strategy:
1. **Products:** Subscribe to `products/create` and `products/update` to sync catalog data to ShopFlow.
2. **Orders:** Subscribe to `orders/create` to ingest new orders placed on Shopify into the ShopFlow analytics system.
3. **Inventory:** Subscribe to `inventory_levels/update` to ensure the ShopFlow frontend does not oversell items.
