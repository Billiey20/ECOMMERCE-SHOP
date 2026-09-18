-- =====================================================
-- SHOPFLOW Seed Data — Expanded Catalog
-- Lumora Body & Home: Oils, Skincare & Detergents
-- =====================================================

USE shopflow;

-- =====================================================
-- ROLES
-- =====================================================
INSERT INTO Roles (name, description) VALUES
  ('Admin', 'Full system access'),
  ('Operations Manager', 'Manages products, inventory, orders, and analytics'),
  ('Customer Service', 'Manages support tickets, returns, and customer orders'),
  ('Customer', 'Storefront access only');

-- =====================================================
-- USERS (passwords are bcrypt of "admin", "ops", "cs", "cust")
-- =====================================================
INSERT INTO Users (role_id, first_name, last_name, email, password_hash) VALUES
  (1, 'Admin',     'User',    'admin@lumoraskin.com',   '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
  (2, 'Sam',       'Ops',     'ops@lumoraskin.com',     '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
  (3, 'Chloe',     'Service', 'cs@lumoraskin.com',      '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
  (4, 'Jane',      'Doe',     'jane@example.com',       '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- =====================================================
-- COLLECTIONS
-- =====================================================
INSERT INTO Collections (title, description, is_automated) VALUES
  ('Best Sellers',        'Our most popular products across all categories', FALSE),
  ('Body Oils',           'Nourishing oils for every skin type and purpose',  FALSE),
  ('Essential Oils',      'Pure aromatherapy and therapeutic essential oils', FALSE),
  ('Hair Oils',           'Strengthening and shine-boosting hair care oils',  FALSE),
  ('Massage Oils',        'Relaxing blends for massage and muscle relief',    FALSE),
  ('Skincare',            'Complete facial skincare range',                   FALSE),
  ('Detergents & Soaps',  'Body washes, soaps, and cleansing formulas',       FALSE),
  ('Laundry & Home',      'Home-safe laundry detergents and fabric care',     FALSE),
  ('New Arrivals',        'The latest additions to our catalog',              FALSE);

-- =====================================================
-- PRODUCTS — BODY OILS
-- =====================================================
INSERT INTO Products (title, description, vendor, product_type, status) VALUES
  ('Pure Sweet Almond Oil',    'Cold-pressed sweet almond oil, rich in Vitamin E. Ideal for daily moisturising and gentle massage.', 'Lumora Body', 'Body Oil', 'active'),
  ('Organic Coconut Oil',      '100% virgin organic coconut oil. Deeply hydrating for skin, hair, and body. Multi-use formula.', 'Lumora Body', 'Body Oil', 'active'),
  ('Rosehip Seed Oil',         'Nutrient-dense rosehip oil packed with Vitamin A and C. Targets scars, fine lines, and uneven tone.', 'Lumora Body', 'Body Oil', 'active'),
  ('Pure Jojoba Oil',          'Lightweight golden jojoba oil that closely mimics skin sebum. Balances oily and dry skin types.', 'Lumora Body', 'Body Oil', 'active'),
  ('Avocado Body Oil',         'Rich, creamy avocado oil loaded with oleic acid. Best for dry and mature skin.', 'Lumora Body', 'Body Oil', 'active'),
  ('Argan Oil (Liquid Gold)',  'Moroccan argan oil for skin, hair, and nails. Absorbs quickly and leaves no greasy residue.', 'Lumora Body', 'Body Oil', 'active'),
  ('Castor Oil',               'Cold-pressed castor oil for hair growth, skin conditioning, and eyebrow nourishment.', 'Lumora Body', 'Body Oil', 'active'),
  ('Grapeseed Body Oil',       'Light and fast-absorbing grapeseed oil — ideal for all skin types and post-shower use.', 'Lumora Body', 'Body Oil', 'active'),
  ('Marula Oil',               'Luxurious marula oil bursting with antioxidants and omega fatty acids. For deeply radiant skin.', 'Lumora Body', 'Body Oil', 'active'),
  ('Sea Buckthorn Oil',        'Vibrant orange sea buckthorn oil — a powerhouse for skin regeneration and anti-ageing.', 'Lumora Body', 'Body Oil', 'active');

-- =====================================================
-- PRODUCTS — ESSENTIAL OILS
-- =====================================================
INSERT INTO Products (title, description, vendor, product_type, status) VALUES
  ('Lavender Essential Oil',    'Pure therapeutic-grade lavender oil. Promotes relaxation, sleep, and skin healing.', 'Lumora Botanics', 'Essential Oil', 'active'),
  ('Tea Tree Essential Oil',    'Potent antifungal and antibacterial tea tree oil. Ideal for spot treatment and purifying routines.', 'Lumora Botanics', 'Essential Oil', 'active'),
  ('Peppermint Essential Oil',  'Refreshing peppermint oil for headache relief, muscle cooling, and energy stimulation.', 'Lumora Botanics', 'Essential Oil', 'active'),
  ('Eucalyptus Essential Oil',  'Clearing eucalyptus oil. Opens airways and refreshes the senses. Ideal for steam diffusion.', 'Lumora Botanics', 'Essential Oil', 'active'),
  ('Rose Essential Oil',        'Rare and precious rose absolute oil. Deeply romantic and skin-balancing. 100% pure.', 'Lumora Botanics', 'Essential Oil', 'active'),
  ('Frankincense Essential Oil','Ancient frankincense oil known for grounding properties, skin rejuvenation, and meditation.', 'Lumora Botanics', 'Essential Oil', 'active');

-- =====================================================
-- PRODUCTS — HAIR OILS
-- =====================================================
INSERT INTO Products (title, description, vendor, product_type, status) VALUES
  ('Bhringraj Hair Oil',        'Ayurvedic bhringraj oil to stimulate hair growth, reduce dandruff, and strengthen roots.', 'Lumora Hair', 'Hair Oil', 'active'),
  ('Jamaican Black Castor Oil', 'Dark-roasted castor oil traditionally used to grow thicker, longer hair and edges.', 'Lumora Hair', 'Hair Oil', 'active'),
  ('Amla & Brahmi Hair Oil',    'Traditional Indian hair oil blend for deep conditioning and scalp nourishment.', 'Lumora Hair', 'Hair Oil', 'active'),
  ('Rosemary Scalp Oil',        'Rosemary-infused oil clinically linked to hair density improvement. Promotes scalp circulation.', 'Lumora Hair', 'Hair Oil', 'active');

-- =====================================================
-- PRODUCTS — MASSAGE OILS
-- =====================================================
INSERT INTO Products (title, description, vendor, product_type, status) VALUES
  ('Relaxing Lavender Massage Oil',  'Calming lavender-infused massage blend with a jojoba base. Perfect for evening wind-down.', 'Lumora Body', 'Massage Oil', 'active'),
  ('Deep Muscle Relief Massage Oil', 'Peppermint and eucalyptus massage oil blend. Cools and soothes sore muscles post-workout.', 'Lumora Body', 'Massage Oil', 'active'),
  ('Warming Ginger Massage Oil',     'Spicy warming ginger and cinnamon oil blend. Ideal for cold nights and joint stiffness.', 'Lumora Body', 'Massage Oil', 'active');

-- =====================================================
-- PRODUCTS — SKINCARE (Original Catalog, Expanded)
-- =====================================================
INSERT INTO Products (title, description, vendor, product_type, status) VALUES
  ('Vitamin C Brightening Serum',   '20% stabilised Vitamin C serum to fade dark spots, even skin tone, and restore radiance.', 'Lumora Skin', 'Serum', 'active'),
  ('Hyaluronic Acid Serum',         'Triple-weight hyaluronic acid serum delivering 72-hour deep skin hydration.', 'Lumora Skin', 'Serum', 'active'),
  ('Niacinamide 10% Serum',         'High-strength niacinamide serum to reduce pores, control oil, and brighten complexion.', 'Lumora Skin', 'Serum', 'active'),
  ('Retinol Night Serum',           '0.5% encapsulated retinol serum for skin renewal, smoothing fine lines overnight.', 'Lumora Skin', 'Serum', 'active'),
  ('Deep Hydrating Cream',          'Rich ceramide and peptide moisturiser to restore and strengthen the skin barrier.', 'Lumora Skin', 'Moisturiser', 'active'),
  ('SPF 50 Mineral Sunscreen',      'Broad-spectrum zinc oxide SPF 50 — lightweight, non-greasy, and reef-safe formula.', 'Lumora Skin', 'Sunscreen', 'active'),
  ('Balancing Gentle Cleanser',     'pH-balanced gel cleanser to remove impurities without disrupting the skin microbiome.', 'Lumora Skin', 'Cleanser', 'active'),
  ('AHA/BHA Exfoliating Toner',     'Glycolic acid and salicylic acid toner for gentle daily exfoliation and pore clarity.', 'Lumora Skin', 'Toner', 'active');

-- =====================================================
-- PRODUCTS — BODY WASH & SOAPS (Detergents)
-- =====================================================
INSERT INTO Products (title, description, vendor, product_type, status) VALUES
  ('Shea Butter Body Wash',          'Creamy, sulphate-free body wash infused with shea butter and vanilla. Leaves skin silky.', 'Lumora Body', 'Body Wash', 'active'),
  ('Charcoal Deep Cleanse Body Wash','Activated charcoal body wash that draws out impurities and unclogs pores on the body.', 'Lumora Body', 'Body Wash', 'active'),
  ('Coconut & Honey Body Wash',      'Tropical moisturising body wash with a honey-coconut lather. Gentle for sensitive skin.', 'Lumora Body', 'Body Wash', 'active'),
  ('Citrus Energy Body Wash',        'Zesty lemon and orange body wash for an invigorating morning shower experience.', 'Lumora Body', 'Body Wash', 'active'),
  ('Aloe Vera Soothing Bar Soap',    'Handcrafted cold-process bar soap with aloe vera, oatmeal, and chamomile. Very gentle.', 'Lumora Body', 'Bar Soap', 'active'),
  ('Turmeric Brightening Bar Soap',  'Artisan turmeric soap for brightening dark spots and evening out body skin tone.', 'Lumora Body', 'Bar Soap', 'active'),
  ('African Black Soap',             'Authentic raw African black soap with shea butter and plantain ash. Deeply purifying.', 'Lumora Body', 'Bar Soap', 'active'),
  ('Himalayan Pink Salt Scrub Soap', 'Exfoliating Himalayan salt bar soap. Buffs away dead skin for silky-smooth results.', 'Lumora Body', 'Bar Soap', 'active');

-- =====================================================
-- PRODUCTS — LAUNDRY & HOME DETERGENTS
-- =====================================================
INSERT INTO Products (title, description, vendor, product_type, status) VALUES
  ('Sensitive Skin Laundry Liquid',  'Hypoallergenic, fragrance-free laundry detergent for sensitive skin and baby clothing.', 'Lumora Home', 'Laundry Detergent', 'active'),
  ('Lavender Fresh Laundry Powder',  'Plant-based lavender laundry powder. Powerful clean with a long-lasting calming scent.', 'Lumora Home', 'Laundry Detergent', 'active'),
  ('Concentrated Eco Laundry Liquid','Eco-certified concentrated laundry liquid — 1 cap washes a full load. Low-waste formula.', 'Lumora Home', 'Laundry Detergent', 'active'),
  ('Colour Protect Laundry Capsules','Pre-dosed laundry capsules with colour-protect technology. Keeps fabrics vibrant for longer.', 'Lumora Home', 'Laundry Detergent', 'active'),
  ('Fabric Softener — Cotton Dream', 'Luxurious fabric conditioner that leaves laundry soft, fresh, and static-free.', 'Lumora Home', 'Fabric Softener', 'active'),
  ('White Vinegar Fabric Rinse',     'Natural fabric softening rinse with white vinegar. Removes detergent residue naturally.', 'Lumora Home', 'Fabric Softener', 'active');

-- =====================================================
-- VARIANTS (Sample — Body Oils)
-- =====================================================
-- Pure Sweet Almond Oil (product 1)
INSERT INTO Variants (product_id, sku, title, price, compare_at_price, weight_grams) VALUES
  (1, 'OIL-ALM-100', '100ml', 12.99, 16.99, 110),
  (1, 'OIL-ALM-250', '250ml', 22.99, 28.99, 270),
  (1, 'OIL-ALM-500', '500ml', 38.99, 48.99, 540);

-- Organic Coconut Oil (product 2)
INSERT INTO Variants (product_id, sku, title, price, compare_at_price, weight_grams) VALUES
  (2, 'OIL-COC-200', '200ml', 14.99, 18.99, 220),
  (2, 'OIL-COC-500', '500ml', 28.99, 36.99, 530);

-- Rosehip Seed Oil (product 3)
INSERT INTO Variants (product_id, sku, title, price, compare_at_price, weight_grams) VALUES
  (3, 'OIL-ROS-30',  '30ml',  19.99, 24.99,  40),
  (3, 'OIL-ROS-60',  '60ml',  34.99, 42.99,  70);

-- Argan Oil (product 6)
INSERT INTO Variants (product_id, sku, title, price, compare_at_price, weight_grams) VALUES
  (6, 'OIL-ARG-50',  '50ml',  24.99, 32.99,  60),
  (6, 'OIL-ARG-100', '100ml', 42.99, 54.99, 115);

-- Lavender Essential Oil (product 11)
INSERT INTO Variants (product_id, sku, title, price, compare_at_price, weight_grams) VALUES
  (11, 'ESS-LAV-10', '10ml',  9.99, 13.99, 15),
  (11, 'ESS-LAV-30', '30ml', 22.99, 28.99, 40);

-- Vitamin C Serum (product 23)
INSERT INTO Variants (product_id, sku, title, price, compare_at_price, weight_grams) VALUES
  (23, 'SKN-VCS-30', '30ml', 29.99, 38.99, 45),
  (23, 'SKN-VCS-50', '50ml', 44.99, 56.99, 65);

-- Shea Butter Body Wash (product 31)
INSERT INTO Variants (product_id, sku, title, price, compare_at_price, weight_grams) VALUES
  (31, 'WASH-SHE-250', '250ml', 9.99,  13.99, 270),
  (31, 'WASH-SHE-500', '500ml', 16.99, 21.99, 540);

-- Sensitive Skin Laundry Liquid (product 39)
INSERT INTO Variants (product_id, sku, title, price, compare_at_price, weight_grams) VALUES
  (39, 'LAU-SEN-1L',  '1 Litre',  11.99, 14.99, 1050),
  (39, 'LAU-SEN-3L',  '3 Litres', 26.99, 33.99, 3100);

-- =====================================================
-- INVENTORY — set stock for all above variants
-- =====================================================
INSERT INTO Inventory (variant_id, available, reserved) VALUES
  (1,  120, 5),
  (2,  85,  3),
  (3,  60,  2),
  (4,  150, 8),
  (5,  90,  4),
  (6,  200, 10),
  (7,  70,  2),
  (8,  45,  1),
  (9,  30,  0),
  (10, 55,  3),
  (11, 180, 12),
  (12, 140, 7),
  (13, 95,  5),
  (14, 60,  3),
  (15, 110, 6),
  (16, 75,  4);

-- =====================================================
-- COLLECTIONS → PRODUCTS  (Manual Mappings)
-- =====================================================
-- Best Sellers (collection 1)
INSERT INTO Collection_Products (collection_id, product_id) VALUES
  (1, 1),  -- Sweet Almond Oil
  (1, 2),  -- Coconut Oil
  (1, 6),  -- Argan Oil
  (1, 11), -- Lavender Essential Oil
  (1, 23), -- Vitamin C Serum
  (1, 31), -- Shea Butter Body Wash
  (1, 17), -- Rosemary Scalp Oil
  (1, 39); -- Sensitive Skin Laundry

-- Body Oils (collection 2)
INSERT INTO Collection_Products (collection_id, product_id) VALUES
  (2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
  (2, 6), (2, 7), (2, 8), (2, 9), (2, 10);

-- Essential Oils (collection 3)
INSERT INTO Collection_Products (collection_id, product_id) VALUES
  (3, 11), (3, 12), (3, 13), (3, 14), (3, 15), (3, 16);

-- Hair Oils (collection 4)
INSERT INTO Collection_Products (collection_id, product_id) VALUES
  (4, 17), (4, 18), (4, 19), (4, 20);

-- Massage Oils (collection 5)
INSERT INTO Collection_Products (collection_id, product_id) VALUES
  (5, 21), (5, 22), (5, 23);

-- Skincare (collection 6)
INSERT INTO Collection_Products (collection_id, product_id) VALUES
  (6, 24), (6, 25), (6, 26), (6, 27), (6, 28), (6, 29), (6, 30), (6, 31);

-- Detergents & Soaps (collection 7)
INSERT INTO Collection_Products (collection_id, product_id) VALUES
  (7, 32), (7, 33), (7, 34), (7, 35), (7, 36), (7, 37), (7, 38), (7, 39);

-- Laundry & Home (collection 8)
INSERT INTO Collection_Products (collection_id, product_id) VALUES
  (8, 40), (8, 41), (8, 42), (8, 43), (8, 44), (8, 45);

-- New Arrivals (collection 9)
INSERT INTO Collection_Products (collection_id, product_id) VALUES
  (9, 9),  -- Marula Oil
  (9, 10), -- Sea Buckthorn Oil
  (9, 16), -- Frankincense Essential Oil
  (9, 20), -- Rosemary Scalp Oil
  (9, 27), -- Retinol Night Serum
  (9, 42), -- Eco Laundry Liquid
  (9, 43); -- Colour Protect Capsules

-- =====================================================
-- DISCOUNTS
-- =====================================================
INSERT INTO Discounts (code, discount_type, value, min_order_value, valid_from, valid_until, is_active) VALUES
  ('WELCOME10',  'percentage', 10.00, 0,     '2026-01-01', '2027-01-01', TRUE),
  ('OILS20',     'percentage', 20.00, 30.00, '2026-09-01', '2026-12-31', TRUE),
  ('FRESH15',    'percentage', 15.00, 20.00, '2026-09-01', '2026-10-31', TRUE),
  ('SAVE5',      'fixed',       5.00, 25.00, '2026-09-01', '2026-12-31', TRUE);

-- =====================================================
-- ORDERS & ORDER ITEMS
-- =====================================================
INSERT INTO Orders (id, user_id, total_amount, status, payment_status, shipping_address, created_at) VALUES
  (1, 4, 38.98, 'delivered', 'paid', '124 Market St, San Francisco, CA', NOW() - INTERVAL 3 DAY),
  (2, 4, 69.97, 'delivered', 'paid', '89 Ocean Ave, Santa Monica, CA',   NOW() - INTERVAL 2 DAY),
  (3, 4, 24.99, 'shipped',   'paid', '45 Pine Rd, Seattle, WA',           NOW() - INTERVAL 1 DAY),
  (4, 4, 52.98, 'processing','paid', '77 Willow Lane, Austin, TX',        NOW());

INSERT INTO Order_Items (order_id, variant_id, product_title, variant_title, sku, quantity, price_at_purchase) VALUES
  (1, 1, 'Pure Sweet Almond Oil', '100ml', 'OIL-ALM-100', 1, 12.99),
  (1, 16, 'Sensitive Skin Laundry Liquid', '1 Litre', 'LAU-SEN-1L', 2, 11.99),
  (2, 8, 'Argan Oil (Liquid Gold)', '50ml', 'OIL-ARG-50', 1, 24.99),
  (2, 12, 'Vitamin C Brightening Serum', '30ml', 'SKN-VCS-30', 1, 29.99),
  (2, 4, 'Organic Coconut Oil', '200ml', 'OIL-COC-200', 1, 14.99),
  (3, 8, 'Argan Oil (Liquid Gold)', '50ml', 'OIL-ARG-50', 1, 24.99),
  (4, 14, 'Shea Butter Body Wash', '250ml', 'WASH-SHE-250', 2, 9.99),
  (4, 11, 'Lavender Essential Oil', '30ml', 'ESS-LAV-30', 1, 22.99);

