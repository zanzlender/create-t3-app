module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ["eslint:recommended", "next/core-web-vitals"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {},
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      rules: {
        "no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
        ],
      },
    },
  ],
};
