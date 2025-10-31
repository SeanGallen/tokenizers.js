import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        // Default for most identifiers
        {
          selector: "default",
          format: ["snake_case"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        // Variables can be camelCase or UPPER_CASE (for constants)
        {
          selector: "variable",
          format: ["snake_case", "UPPER_CASE", "PascalCase"],
        },
        // Imports can be PascalCase (for classes) or camelCase (for functions)
        {
          selector: "import",
          format: ["snake_case", "PascalCase"],
        },
        // Classes, interfaces, type aliases, enums use PascalCase
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        // Enum members use PascalCase
        {
          selector: "enumMember",
          format: ["PascalCase"],
        },
        // Allow destructured variables to have any format (useful for APIs)
        {
          selector: "variable",
          modifiers: ["destructured"],
          format: null,
        },
      ],
    },
  },
];
