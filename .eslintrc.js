module.exports = {
  root: true,
  extends: [
    "universe/native",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  plugins: ["@tanstack/query"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unstable-nested-components": "off",
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/prefer-query-object-syntax": "off",
  },
};
