import { 
    calculateDiscount, 
    filterProducts, 
    sortProducts, 
    validateEmail 
  } from '../utils';
  
  describe('Product Management Functions Tests', () => {
    // calculateDiscount tests
    describe('calculateDiscount', () => {
      test('should correctly calculate discount for valid inputs', () => {
        expect(calculateDiscount(100, 20)).toBe(80);
        expect(calculateDiscount(50, 10)).toBe(45);
        expect(calculateDiscount(200, 0)).toBe(200);
      });
  
      test('should handle decimal values correctly', () => {
        expect(calculateDiscount(100, 33.33)).toBeCloseTo(66.67);
        expect(calculateDiscount(45.50, 25)).toBeCloseTo(34.125);
      });
  
      test('should throw error for negative price', () => {
        expect(() => calculateDiscount(-100, 20)).toThrow('Invalid input');
      });
  
      test('should throw error for negative discount', () => {
        expect(() => calculateDiscount(100, -20)).toThrow('Invalid input');
      });
  
      test('should throw error for discount greater than 100', () => {
        expect(() => calculateDiscount(100, 120)).toThrow('Invalid input');
      });
    });
  
    // filterProducts tests
    describe('filterProducts', () => {
      const testProducts = [
        { name: 'iPhone', price: 999 },
        { name: 'Samsung Galaxy', price: 899 },
        { name: 'iPad', price: 799 },
        { name: 'Samsung TV', price: 1299 }
      ];
  
      test('should filter products correctly based on query', () => {
        expect(filterProducts(testProducts, 'Samsung')).toHaveLength(2);
        expect(filterProducts(testProducts, 'iphone')).toHaveLength(1);
        expect(filterProducts(testProducts, 'tablet')).toHaveLength(0);
      });
  
      test('should be case insensitive', () => {
        expect(filterProducts(testProducts, 'IPHONE')).toHaveLength(1);
        expect(filterProducts(testProducts, 'samsung')).toHaveLength(2);
      });
  
      test('should handle empty query', () => {
        expect(filterProducts(testProducts, '')).toEqual(testProducts);
      });
  
      test('should throw error for invalid products array', () => {
        expect(() => filterProducts(null, 'test')).toThrow('Invalid input');
        expect(() => filterProducts('not an array', 'test')).toThrow('Invalid input');
      });
  
      test('should throw error for invalid query type', () => {
        expect(() => filterProducts(testProducts, null)).toThrow('Invalid input');
        expect(() => filterProducts(testProducts, 123)).toThrow('Invalid input');
      });
    });
  
    // sortProducts tests
    describe('sortProducts', () => {
      const testProducts = [
        { name: 'iPad', price: 799 },
        { name: 'iPhone', price: 999 },
        { name: 'Samsung TV', price: 1299 },
        { name: 'Samsung Galaxy', price: 899 }
      ];
  
      test('should sort products by name correctly', () => {
        const sorted = sortProducts([...testProducts], 'name');
        expect(sorted[0].name).toBe('iPad');
        expect(sorted[3].name).toBe('Samsung TV');
      });
  
      test('should sort products by price correctly', () => {
        const sorted = sortProducts([...testProducts], 'price');
        expect(sorted[0].price).toBe(799);
        expect(sorted[3].price).toBe(1299);
      });
  
      test('should throw error for invalid sort key', () => {
        expect(() => sortProducts(testProducts, 'invalid')).toThrow('Invalid input');
      });
  
      test('should throw error for invalid products array', () => {
        expect(() => sortProducts(null, 'name')).toThrow('Invalid input');
        expect(() => sortProducts('not an array', 'price')).toThrow('Invalid input');
      });
    });
  
    // validateEmail tests
    describe('validateEmail', () => {
      test('should validate correct email formats', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('user.name@domain.co.uk')).toBe(true);
        expect(validateEmail('user+label@domain.com')).toBe(true);
      });
  
      test('should reject invalid email formats', () => {
        expect(validateEmail('invalid.email')).toBe(false);
        expect(validateEmail('test@')).toBe(false);
        expect(validateEmail('@domain.com')).toBe(false);
        expect(validateEmail('test@domain')).toBe(false);
      });
  
      test('should handle empty string', () => {
        expect(validateEmail('')).toBe(false);
      });
  
      test('should throw error for non-string input', () => {
        expect(() => validateEmail(null)).toThrow('Invalid input');
        expect(() => validateEmail(undefined)).toThrow('Invalid input');
        expect(() => validateEmail(123)).toThrow('Invalid input');
      });
    });
  });