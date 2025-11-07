import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

// Setup MSW for API mocking
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vitest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vitest.fn(), // deprecated
    removeListener: vitest.fn(), // deprecated
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  })),
}); 
