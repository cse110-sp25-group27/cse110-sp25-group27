// sum.test.js
import { sum } from '../code-to-unit-test/sum';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('adds 2 + 2 to equal 4', () => {
  expect(sum(1,2)).toBe(3);
});

test('adds 5 + 5 to equal 10', () => {
  expect(sum(5,5)).toBe(10);
})