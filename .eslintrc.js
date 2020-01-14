module.exports = {
  env: {
    browser: true,
    es6: true
  },
  settings: {
    polyfills: [
      'Promise'
    ]
  },
  extends: ['ash-nazg/sauron', 'plugin:node/recommended-script'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  overrides: [
    {
      files: '*.md',
      rules: {
        'node/no-missing-require': ['error', {allowModules: ['ocr-bulk']}]
      }
    },
    {
      files: '*.html',
      rules: {
        'import/unambiguous': 0
      }
    }
  ],
  rules: {
    'strict': ['error', 'safe'],
    'import/no-commonjs': 0,
    'import/unambiguous': 0
  }
};
