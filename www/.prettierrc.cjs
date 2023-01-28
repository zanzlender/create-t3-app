/** @type {import('prettier').Config} */
module.exports = {
  ...require("../.prettierrc.cjs"),
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
  ],
  tailwindConfig: "./tailwind.config.cjs",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^~/utils/(.*)$",
    "^~/components/(.*)$",
    "^~/styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
};
