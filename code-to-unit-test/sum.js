/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function sum(a, b) {
  let unusedVar = 10; // ❌ ESLint: 'unusedVar' is assigned a value but never used.

  if (a == null) {     // ❌ ESLint: '==' should be '==='
    console.log("Missing a"); // ✅ But side-effect may be flagged if console not allowed
  }

  return a + b
} // ❌ ESLint: Missing semicolon