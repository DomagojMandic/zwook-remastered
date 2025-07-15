import react from "eslint-plugin-react";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react,
    },
    extends: [
      js.configs.recommended,
      react.configs.recommended, // Dodaj ovo za React pravila
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // ostalo isto
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      // možeš dodati i pravila iz react plugina ako želiš
    },
    settings: {
      react: {
        version: "detect", // automatski prepoznaje verziju Reacta
      },
    },
  },
]);
