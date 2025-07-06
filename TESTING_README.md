# Frontend Testing Guide

This document provides comprehensive testing setup and instructions for the Mitho Bites React frontend application.

## 🧪 Testing Stack

- **Unit/Integration Tests**: Vitest + React Testing Library
- **End-to-End Tests**: Playwright
- **API Mocking**: MSW (Mock Service Worker)
- **Test Utilities**: Custom test utilities for providers

## 📁 Test Structure

```
tests/
├── e2e/                          # End-to-end tests
│   ├── auth.spec.js             # Authentication flow tests
│   ├── ordering-flow.spec.js    # Complete ordering flow tests
│   └── cart-management.spec.js  # Cart functionality tests
├── integration/                  # Integration tests
│   ├── hooks/                   # Custom hooks tests
│   │   ├── useFoodProducts.test.js
│   │   └── useCart.test.js
│   └── components/              # Component tests
│       └── Dashboard.test.js
src/
└── test/                        # Test utilities and setup
    ├── setup.js                 # Test environment setup
    ├── utils/
    │   └── test-utils.jsx       # Custom render utilities
    └── mocks/
        ├── server.js            # MSW server setup
        └── handlers.js          # API mock handlers
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests

#### Unit/Integration Tests (Vitest)
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

#### End-to-End Tests (Playwright)
```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with browser visible
npm run test:e2e:headed

# Run E2E tests in UI mode
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug
```

## 📋 Test Categories

### 1. Unit/Integration Tests

#### Custom Hooks Testing
- **useFoodProducts**: Tests data fetching, search, filtering, pagination
- **useCart**: Tests cart operations (add, update, remove, clear)

#### Component Testing
- **Dashboard**: Tests navigation, state management, user interactions

### 2. End-to-End Tests

#### Authentication Flow
- User registration and login
- Form validation and error handling
- Session management

#### Food Ordering Flow
- Complete ordering process
- Restaurant browsing
- Category navigation
- Search functionality

#### Cart Management
- Add/remove items
- Quantity updates
- Total calculation
- Cart persistence

## 🛠️ Test Configuration

### Vitest Configuration
Located in `vite.config.js`:
```javascript
test: {
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.js'],
  globals: true,
  css: true
}
```

### Playwright Configuration
Located in `playwright.config.js`:
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile device testing
- Screenshot and video capture on failure
- Automatic dev server startup

### MSW Setup
- API mocking for consistent test data
- Handlers for all major endpoints
- Fallback error handling

## 🎯 Testing Best Practices

### 1. Test Organization
- Group related tests using `describe` blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Component Testing
- Test user interactions, not implementation details
- Use semantic queries (getByRole, getByText)
- Mock external dependencies

### 3. Hook Testing
- Test loading, success, and error states
- Verify state updates
- Test side effects

### 4. E2E Testing
- Test complete user journeys
- Use realistic test data
- Test responsive design

## 🔧 Custom Test Utilities

### renderWithProviders
Custom render function that includes all necessary providers:
- React Query Client
- Router
- Authentication Context
- Cart Context

### Mock Data
Consistent mock data for:
- Categories
- Products
- Cart items
- User information

## 📊 Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: 90%+ coverage
- **E2E Tests**: 100% critical path coverage

## 🐛 Debugging Tests

### Vitest Debugging
```bash
# Run specific test file
npm test useFoodProducts.test.js

# Run tests in debug mode
npm test -- --debug
```

### Playwright Debugging
```bash
# Run specific test
npm run test:e2e -- auth.spec.js

# Debug mode with browser
npm run test:e2e:debug

# UI mode for interactive debugging
npm run test:e2e:ui
```

## 📝 Writing New Tests

### 1. Unit Test Template
```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { useCustomHook } from '../path/to/hook';

describe('useCustomHook', () => {
  test('should work correctly', async () => {
    const { result } = renderHook(() => useCustomHook());
    
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
  });
});
```

### 2. Component Test Template
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../test/utils/test-utils';
import MyComponent from '../path/to/component';

describe('MyComponent', () => {
  test('should render correctly', () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### 3. E2E Test Template
```javascript
const { test, expect } = require('@playwright/test');

test('user can perform action', async ({ page }) => {
  await page.goto('/');
  await page.click('button');
  await expect(page.locator('text=Success')).toBeVisible();
});
```

## 🔄 Continuous Integration

### GitHub Actions Workflow
```yaml
- name: Run Tests
  run: |
    npm test
    npm run test:e2e
```

### Pre-commit Hooks
- Run unit tests before commit
- Ensure minimum coverage thresholds
- Lint and format code

## 📈 Performance Testing

### Bundle Analysis
```bash
npm run build
npm run analyze
```

### Lighthouse Testing
```bash
npm run lighthouse
```

## 🚨 Common Issues & Solutions

### 1. MSW Not Working
- Ensure MSW is properly set up in test setup
- Check handler patterns match API endpoints
- Verify server is started before tests

### 2. Async Test Failures
- Use `waitFor` for async operations
- Increase timeout for slow operations
- Mock external API calls

### 3. Provider Context Issues
- Use `renderWithProviders` utility
- Ensure all required providers are included
- Mock context values when needed

## 📞 Support

For testing-related issues:
1. Check this documentation
2. Review existing test examples
3. Consult testing library documentation
4. Create issue with detailed error information

---

**Note**: This testing setup is specifically designed for React TanStack Query applications and follows modern testing best practices. 