import { describe, test, expect } from 'vitest';

// Simple utility functions for testing
const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    test('should format price correctly', () => {
      expect(formatPrice(10)).toBe('$10.00');
      expect(formatPrice(10.5)).toBe('$10.50');
      expect(formatPrice(0)).toBe('$0.00');
    });

    test('should handle decimal places', () => {
      expect(formatPrice(10.123)).toBe('$10.12');
      expect(formatPrice(10.999)).toBe('$11.00');
    });
  });

  describe('calculateTotal', () => {
    test('should calculate total correctly', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 1 }
      ];
      expect(calculateTotal(items)).toBe(25);
    });

    test('should return 0 for empty array', () => {
      expect(calculateTotal([])).toBe(0);
    });

    test('should handle single item', () => {
      const items = [{ price: 15, quantity: 1 }];
      expect(calculateTotal(items)).toBe(15);
    });
  });

  describe('validateEmail', () => {
    test('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    test('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('truncateText', () => {
    test('should truncate long text', () => {
      const longText = 'This is a very long text that needs to be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long...');
    });

    test('should not truncate short text', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });

    test('should handle exact length', () => {
      const text = 'Exactly ten chars';
      expect(truncateText(text, 10)).toBe('Exactly...');
    });
  });
}); 