// Maps product_type to specific high-quality placeholder images
export const getProductImage = (productType) => {
  if (!productType) return '/images/cream.jpg'; // fallback

  const type = productType.toLowerCase();

  if (type.includes('essential oil')) return '/images/essential_oil.jpg';
  if (type.includes('body oil') || type.includes('hair oil')) return '/images/body_oil.jpg';
  if (type.includes('serum') || type.includes('treatment')) return '/images/serum.jpg';
  if (type.includes('body wash') || type.includes('shampoo') || type.includes('conditioner') || type.includes('liquid soap') || type.includes('cleanser')) return '/images/body_wash.jpg';
  if (type.includes('bar soap') || type.includes('soap')) return '/images/bar_soap.jpg';
  if (type.includes('cream') || type.includes('moisturiser') || type.includes('sunscreen') || type.includes('lotion')) return '/images/cream.jpg';

  // Fallback
  return '/images/cream.jpg';
};
