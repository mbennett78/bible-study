import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["js/vendor/**", "node_modules/**", "data/**", "supabase/**"] },
  js.configs.recommended,
  {
    files: ["js/**/*.js", "sw.js"],
    languageOptions: { ecmaVersion: 2024, sourceType: "module", globals: { ...globals.browser, ...globals.serviceworker } },
    rules: {
      "no-unused-vars": ["error", { args: "none", caughtErrors: "none" }],
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  { files: ["js/config.js", "sw.js"], languageOptions: { sourceType: "script" } },
  {
    files: ["tests/**/*.{js,mjs}", "eslint.config.js"],
    languageOptions: { ecmaVersion: 2024, sourceType: "module", globals: { ...globals.node, ...globals.browser } },
  },
];
