module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended', // vue3 基础配置
    'prettier', // prettier
    'plugin:prettier/recommended' // 合并eslint-plugin-prettier和eslint-config-prettier 配置
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': 'error'
  },
  settings: {}
}
