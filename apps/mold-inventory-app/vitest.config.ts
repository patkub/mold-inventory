import { defineConfig, defineProject } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    // "test.workspace" is now "test.projects"
    projects: [
      defineProject({
        plugins: [react()],
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          name: 'Components',
          environment: 'jsdom',
          include: ['components/*.test.tsx'],
          setupFiles: 'vitest-setup.js',
        },
      }),
    ],
  },
})
