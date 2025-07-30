import { defineConfig } from "vitest/config";
import { defineWorkersProject } from "@cloudflare/vitest-pool-workers/config";

export default defineConfig({
  test: {
    projects: [
      defineWorkersProject({
        test: {
          name: "Workers",
          include: ["**/*worker.test.ts"],
          poolOptions: {
            workers: {
              wrangler: { configPath: "./wrangler.jsonc" },
            },
          },
        },
      }),
    ],
  },
});
