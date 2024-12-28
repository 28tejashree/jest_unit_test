# JavaScript Unit Testing Assignment

This project demonstrates comprehensive unit testing of JavaScript utility functions using Jest.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```

3. Generate coverage report:
```bash
npm test -- --coverage
```

## Understanding Test Coverage Reports

After running tests with coverage, a detailed report is generated in the `coverage` directory.

### Reading Coverage Reports

The coverage report shows four key metrics:

1. **Statements**: Percentage of program statements executed
2. **Branches**: Percentage of control structures (if/else, switch) executed
3. **Functions**: Percentage of functions called
4. **Lines**: Percentage of executable lines executed

Example coverage output:
```
----------------------|---------|----------|---------|---------|
File                 | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files            |   97.87 |    96.15 |     100 |   97.67 |
 utils.js            |   97.87 |    96.15 |     100 |   97.67 |
----------------------|---------|----------|---------|---------|
```

To view detailed HTML report:
1. Open `coverage/lcov-report/index.html` in your browser
2. Click on specific files to see line-by-line coverage
3. Red highlights indicate uncovered lines
4. Green highlights indicate covered lines

## Examples of Parameterized Tests

Jest's `test.each` allows running the same test with different inputs:

```javascript
describe('calculateDiscount parameterized tests', () => {
  test.each([
    [100, 20, 80],    // price, discount, expected result
    [200, 50, 100],
    [50, 10, 45],
    [75, 25, 56.25]
  ])('calculateDiscount(%i, %i) = %i', (price, discount, expected) => {
    expect(calculateDiscount(price, discount)).toBe(expected);
  });
});
```

Benefits of parameterized tests:
- Reduces code duplication
- Makes test patterns more visible
- Easier to add new test cases
- Better maintenance

## Mock Usage Examples

### 1. Mocking External API Calls

```javascript
import fetch from 'node-fetch';
jest.mock('node-fetch');

describe('fetchProductDetails', () => {
  test('successful API call', async () => {
    const mockProduct = { id: '123', name: 'Test Product' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProduct
    });

    const result = await fetchProductDetails('123');
    expect(result).toEqual(mockProduct);
  });
});
```

### 2. Mocking Internal Functions

```javascript
describe('processBulkDiscounts', () => {
  const mockCalculateDiscount = jest.fn();
  const originalCalculateDiscount = calculateDiscount;

  beforeEach(() => {
    global.calculateDiscount = mockCalculateDiscount;
  });

  afterEach(() => {
    global.calculateDiscount = originalCalculateDiscount;
    jest.clearAllMocks();
  });

  test('process multiple items', () => {
    mockCalculateDiscount
      .mockReturnValueOnce(80)
      .mockReturnValueOnce(90);
    
    const result = processBulkDiscounts([
      { price: 100, discount: 20 },
      { price: 100, discount: 10 }
    ]);
    
    expect(result).toEqual([80, 90]);
  });
});
```

### Mock Verification

You can verify mock interactions:
```javascript
expect(mockFunction).toHaveBeenCalled();
expect(mockFunction).toHaveBeenCalledWith(expectedArgs);
expect(mockFunction).toHaveBeenCalledTimes(2);
```

## Best Practices

1. **Test Organization**
   - Group related tests using `describe`
   - Use clear, descriptive test names
   - Follow AAA pattern (Arrange, Act, Assert)

2. **Mock Usage**
   - Only mock what's necessary
   - Clean up mocks after tests
   - Use `beforeEach` and `afterEach` for setup/teardown

3. **Coverage Goals**
   - Aim for >90% coverage
   - Focus on critical business logic
   - Don't just test for coverage numbers

## CI/CD Integration

This project uses GitHub Actions for continuous integration:
- Runs tests on every push and pull request
- Generates coverage reports
- Fails if tests don't pass

Configuration is in `.github/workflows/test.yml`
