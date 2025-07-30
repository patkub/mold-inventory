// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: [
      ".generated/",
      ".wrangler/",
      "node_modules/",
      "worker-configuration.d.ts",
    ],
  },
);
