/**
 * Format price for display (e.g. "₹ 12,999").
 * @param {number} amount - Price in currency units
 * @param {string} [currency='₹'] - Currency symbol
 * @param {string} [locale='en-IN'] - Locale for number formatting
 * @returns {string}
 */
export function formatPrice(amount, currency = '₹', locale = 'en-IN') {
  if (amount == null || Number.isNaN(amount)) return `${currency} 0`;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return `${currency} ${formatted}`;
}

export default formatPrice;
