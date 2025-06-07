module.exports = {
    preset: 'jest-puppeteer',
    testMatch: ['**/__tests__/e2e.test.js'],
    reporters: [
      'default',
      ['jest-html-reporters', {
        publicPath: './docs/e2e-report',
        filename: 'e2e-report.html',
        expand: true,
      }],
    ]//,
    // testEnvironmentOptions: {
    //   "jest-playwright": {
    //     launchOptions: {
    //       headless: true
    //     },
    //     baseURL: 'http://localhost:8080'
    //   }
    // }
  };