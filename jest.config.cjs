module.exports = {
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/e2e.test.js',
        '/__tests__/testSetup.js'
    ],
    setupFiles: ['./__tests__/testSetup.js'],
    coverageDirectory: 'docs/coverage_report',
    coverageReporters: ['text', 'html', 'lcov'],
    collectCoverage: true,
  };