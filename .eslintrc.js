module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: ['babel-eslint', '@typescript-eslint/parser'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'error', // 사용하지않는 변수 error처리 하겠다.
    'no-console': 'off', // 콘솔로그를 사용하수 있게 꺼놓겠다.
    'no-else-return': ['error', {allowElseIf: false}], // if문에 else 문을 사용하지 규칙을 정의한다.
    semi: [1, 'always'],
    'space-unary-ops': 2,
  },
}
