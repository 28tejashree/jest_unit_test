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
  
      // Added edge cases
  test('should handle edge case discounts (0 and 100)', () => {
    expect(calculateDiscount(100, 0)).toBe(100);    // No discount
    expect(calculateDiscount(100, 100)).toBe(0);    // Full discount
    expect(calculateDiscount(0, 20)).toBe(0);       // Zero price
    expect(calculateDiscount(0, 0)).toBe(0);        // Zero price, zero discount
  });

      test('should handle decimal values correctly', () => {
        expect(calculateDiscount(100, 33.33)).toBeCloseTo(66.67);
        expect(calculateDiscount(45.50, 25)).toBeCloseTo(34.125);
        expect(calculateDiscount(99.99, 10)).toBeCloseTo(89.991);
      });

      test('should throw error for invalid inputs', () => {
        expect(() => calculateDiscount(null, 20)).toThrow('Invalid input');
        expect(() => calculateDiscount(100, undefined)).toThrow('Invalid input');
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
        expect(sorted).toEqual([
          { name: 'iPad', price: 799 },
          { name: 'iPhone', price: 999 },
          { name: 'Samsung Galaxy', price: 899 },
          { name: 'Samsung TV', price: 1299 }
        ]);
      });
  
      test('should sort products by price correctly', () => {
        const sorted = sortProducts([...testProducts], 'price');
        expect(sorted).toEqual([
          { name: 'iPad', price: 799 },
          { name: 'Samsung Galaxy', price: 899 },
          { name: 'iPhone', price: 999 },
          { name: 'Samsung TV', price: 1299 }
        ]);
      });

      test('should handle single item array', () => {
        const singleItem = [{ name: 'Test', price: 100 }];
        expect(sortProducts([...singleItem], 'name')).toEqual(singleItem);
        expect(sortProducts([...singleItem], 'price')).toEqual(singleItem);
      });
    
      test('should handle items with same values', () => {
        const products = [
          { name: 'A', price: 100 },
          { name: 'A', price: 100 },
          { name: 'B', price: 100 }
        ];
        const sortedByName = sortProducts([...products], 'name');
        expect(sortedByName).toEqual(products);
        
        const sortedByPrice = sortProducts([...products], 'price');
        expect(sortedByPrice).toEqual(products);
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
  
      test('should handle spaces correctly', () => {
        expect(validateEmail(' test@example.com')).toBe(false);
        expect(validateEmail('test@example.com ')).toBe(false);
        expect(validateEmail('te st@example.com')).toBe(false);
      });

      test('should reject invalid characters', () => {
        expect(validateEmail('test!@example.com')).toBe(false);
        expect(validateEmail('test@exa!mple.com')).toBe(false);
        expect(validateEmail('test@example.c#m')).toBe(false);
        expect(validateEmail('тест@example.com')).toBe(false);  // Non-ASCII characters
        expect(validateEmail('test@example.com\n')).toBe(false); // Newline
        expect(validateEmail('test\\@example.com')).toBe(false); // Backslash
      });

      test('should validate email structure', () => {
        expect(validateEmail('@domain.com')).toBe(false);
        expect(validateEmail('test@')).toBe(false);
        expect(validateEmail('test@domain')).toBe(false);
        expect(validateEmail('test.domain.com')).toBe(false);
        expect(validateEmail('test@domain.')).toBe(false);
        expect(validateEmail('.test@domain.com')).toBe(false);
        expect(validateEmail('test@.domain.com')).toBe(false);
        expect(validateEmail('test@domain..com')).toBe(false);
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