// Maps product to specific high-quality images based on ID to ensure each has its own picture.
export const getProductImage = (product) => {
  if (!product || !product.id) return '/images/cream.jpg';

  // A pool of premium aesthetic images for skincare and beauty products
  const pool = [
    '/images/body_oil_1_1791553551831.jpg',
    '/images/body_oil_2_1791553562867.jpg',
    '/images/cream_1_1791553593497.jpg',
    '/images/serum_1_1791553576772.jpg',
    '/images/soap_1_1791553605517.jpg',
    '/images/laundry_1_1791553616815.jpg',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1608248593842-8021c618e1ca?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1556228720-1c2f1ea0808a?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1615397323209-17075c3db08f?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1629198725838-8eecb52a1ba3?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1615397025877-3e198bb9ffce?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1571781926291-c477eb3af5dc?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1607503790584-6e16541d2fb7?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1611077544990-2c32bb4f72db?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1614859324967-bdfdec6dce6d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1580870058866-22442475439a?auto=format&fit=crop&w=400&q=80',
    '/images/essential_oil.jpg',
    '/images/body_oil.jpg',
    '/images/serum.jpg',
    '/images/body_wash.jpg',
    '/images/bar_soap.jpg',
    '/images/cream.jpg'
  ];

  // Hash the ID so it's consistent for each product. 
  // Offset it based on the length of the product title to get more randomness.
  const hash = product.id * 7 + (product.title ? product.title.length : 0) * 3;
  return pool[hash % pool.length];
};
