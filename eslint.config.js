import pluginJest from 'eslint-plugin-jest';

export default [
  {
    files: ['**/__tests__/**/*.{js,jsx}', '**/*.{test,spec}.{js,jsx}'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      // Extend recommended Jest rules
      ...pluginJest.configs.recommended.rules,
      
      // Your custom Jest rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
    ignores: [
      "docs/coverage_report/**"
    ]
  },
];