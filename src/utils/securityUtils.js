// ==========================================
// FRONTEND SECURITY UTILITIES
// ==========================================
// This file contains utility functions to protect against common web vulnerabilities
// including XSS, CSRF, and secure data handling

// ==========================================
// 1. XSS PREVENTION UTILITIES
// ==========================================

/**
 * Escapes HTML entities to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
export const escapeHTML = (str) => {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

/**
 * Removes script tags and event handlers to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
export const removeScriptTags = (str) => {
    if (typeof str !== 'string') return str;
    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+="[^"]*"/gi, '')
        .replace(/on\w+='[^']*'/gi, '')
        .replace(/on\w+=[^\s>]+/gi, '');
};

/**
 * Sanitizes user input for safe display
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (str) => {
    if (typeof str !== 'string') return str;
    return escapeHTML(removeScriptTags(str));
};

// ==========================================
// 2. CSRF TOKEN HANDLING
// ==========================================

/**
 * Gets CSRF token from meta tag or cookie
 * @returns {string|null} - CSRF token or null
 */
export const getCSRFToken = () => {
    // In a real implementation, you would get this from:
    // 1. Meta tag: <meta name="csrf-token" content="TOKEN">
    // 2. Cookie set by the server
    // 3. Hidden input in forms
    
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
        return metaTag.getAttribute('content');
    }
    
    // Example of getting from cookie
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrf-token') {
            return decodeURIComponent(value);
        }
    }
    
    return null;
};

/**
 * Adds CSRF token to form data
 * @param {FormData} formData - FormData object to add token to
 */
export const addCSRFTokenToFormData = (formData) => {
    const token = getCSRFToken();
    if (token) {
        formData.append('_csrf', token);
    }
};

/**
 * Adds CSRF token to request headers
 * @param {Object} headers - Headers object to add token to
 */
export const addCSRFTokenToHeaders = (headers) => {
    const token = getCSRFToken();
    if (token) {
        headers['X-CSRF-Token'] = token;
    }
    return headers;
};

// ==========================================
// 3. SECURE DATA HANDLING
// ==========================================

/**
 * Securely stores data in sessionStorage
 * @param {string} key - Key to store data under
 * @param {any} value - Value to store
 */
export const secureSessionStorage = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Error storing data in sessionStorage:', error);
    }
};

/**
 * Securely retrieves data from sessionStorage
 * @param {string} key - Key to retrieve data for
 * @returns {any} - Retrieved data or null
 */
export const secureSessionStorageGet = (key) => {
    try {
        const serializedValue = sessionStorage.getItem(key);
        if (serializedValue === null) {
            return null;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error('Error retrieving data from sessionStorage:', error);
        return null;
    }
};

/**
 * Clears sensitive data from sessionStorage
 * @param {string} key - Key to remove
 */
export const secureSessionStorageRemove = (key) => {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing data from sessionStorage:', error);
    }
};

// ==========================================
// 4. INPUT VALIDATION UTILITIES
// ==========================================

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with score and feedback
 */
export const validatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];
    
    if (password.length >= 8) score++;
    else feedback.push('Password should be at least 8 characters long');
    
    if (/[a-z]/.test(password)) score++;
    else feedback.push('Password should contain lowercase letters');
    
    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Password should contain uppercase letters');
    
    if (/[0-9]/.test(password)) score++;
    else feedback.push('Password should contain numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push('Password should contain special characters');
    
    const strength = score < 3 ? 'Weak' : score < 5 ? 'Medium' : 'Strong';
    
    return {
        score,
        strength,
        feedback
    };
};

// Export all utilities
export default {
    escapeHTML,
    removeScriptTags,
    sanitizeInput,
    getCSRFToken,
    addCSRFTokenToFormData,
    addCSRFTokenToHeaders,
    secureSessionStorage,
    secureSessionStorageGet,
    secureSessionStorageRemove,
    isValidEmail,
    validatePasswordStrength
};
