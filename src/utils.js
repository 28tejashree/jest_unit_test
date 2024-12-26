/**
 * Calculates the final price after applying a discount percentage
 * @param {number} price - Original price
 * @param {number} discount - Discount percentage (0-100)
 * @returns {number} Final price after discount
 */
export function calculateDiscount(price, discount) {
    if (price < 0 || discount < 0 || discount > 100) {
      throw new Error('Invalid input');
    }
    return price - (price * discount / 100);
  }
  
  /**
   * Filters products based on a search query
   * @param {Array} products - Array of product objects
   * @param {string} query - Search query
   * @returns {Array} Filtered array of products
   */
  export function filterProducts(products, query) {
    if (!Array.isArray(products) || typeof query !== 'string') {
      throw new Error('Invalid input');
    }
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  /**
   * Sorts products by specified key (name or price)
   * @param {Array} products - Array of product objects
   * @param {string} key - Sort key ('name' or 'price')
   * @returns {Array} Sorted array of products
   */
  export function sortProducts(products, key) {
    if (!Array.isArray(products) || (key !== 'name' && key !== 'price')) {
      throw new Error('Invalid input');
    }
    return [...products].sort((a, b) => {
      if (key === 'price') {
        return a.price - b.price;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }
  
  /**
   * Validates email address format
   * @param {string} email - Email address to validate
   * @returns {boolean} True if valid, false otherwise
   */
  export function validateEmail(email) {
    if (typeof email !== 'string') {
      throw new Error('Invalid input');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }