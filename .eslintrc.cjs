/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "prettier",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: ["@typescript-eslint", "tailwindcss"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off", // We currently not using next/image because it isn't supported with SSG mode
    "react-hooks/exhaustive-deps": "off", // Incorrectly report needed dependency with Next.js router
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "error",
    "@typescript-eslint/no-misused-promises": "off", // TODO: remove & fix
    "@typescript-eslint/no-unsafe-assignment": "off", // TODO: remove & fix
    "@typescript-eslint/no-unsafe-member-access": "off", // TODO: remove & fix
    "@typescript-eslint/no-unsafe-argument": "off", // TODO: remove & fix
    "no-unused-vars": "off", // TODO: remove & fix
  },
  settings: {
    tailwindcss: {
      callees: ["cn", "cva"],
      config: "tailwind.config.js",
    },
    next: {
      rootDir: true,
    },
  },
}
