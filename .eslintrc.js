module.exports = {
  env: { es6: true },
  extends: ['pitops/react'],
  rules: {
    'import/named': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'react/jsx-handler-names': 0,
    'react/jsx-no-duplicate-props': 'off'
  }
}
