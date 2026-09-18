# TikTok Shop & Social Commerce Concepts

Social commerce represents a significant revenue stream for modern DTC brands. Integrating a custom platform like ShopFlow with channels like TikTok Shop requires robust data synchronization and webhook handling.

## 1. Omnichannel Inventory Management

The biggest risk in social commerce is **overselling**. If a viral video drives thousands of sales on TikTok Shop, the ShopFlow database must update instantly to prevent customers on the main storefront from buying out-of-stock items.

### Strategy
- **Centralized Source of Truth:** The ShopFlow database must act as the central authority.
- **Buffer Stock:** Implement a buffer (e.g., reserving 10 units) for high-velocity items to account for API sync delays between TikTok Shop and ShopFlow.
- **Real-time Syncing:** When a sale occurs on the main storefront, an API call (or message queue event) must immediately push the updated inventory level to the TikTok Shop API.

## 2. Order Ingestion (Webhooks)

Orders placed natively inside the TikTok app bypass the ShopFlow checkout. We must ingest these orders for fulfillment and analytics.

### Architecture
1. **Webhook Endpoint:** ShopFlow requires a dedicated endpoint (e.g., `POST /api/webhooks/tiktok/orders`).
2. **Signature Verification:** The endpoint must cryptographically verify the webhook payload using the TikTok app secret to prevent spoofing.
3. **Data Normalization:** The TikTok order payload is transformed into the standard ShopFlow `Order` schema. The `source` field is marked as `tiktok`.
4. **Fulfillment Push:** When the operations team fulfills the order in ShopFlow, a call is made to the TikTok Shop API to provide the tracking number and mark the order as shipped on the user's TikTok app.

## 3. Promotions and Affiliate Tracking

TikTok relies heavily on creator affiliates.
- **Attribution:** Orders ingested from TikTok must retain creator attribution data (e.g., affiliate IDs).
- **Discount Parity:** If a 20% off flash sale is run on ShopFlow, the merchandising team must ensure the same promotion is configured in the TikTok Seller Center, as TikTok manages its own cart and discount engine.

## 4. Product Catalog Syndication

To sell on TikTok, the ShopFlow catalog must be syndicated to the platform.
- **Data Feed:** An automated daily XML/JSON feed or direct API sync that pushes Product Titles, Descriptions, Images, SKUs, and Prices to TikTok Shop.
- **Approval Process:** Social channels often require product approval. The ShopFlow admin panel should track the "Syndication Status" (Pending, Approved, Rejected) for each channel.
