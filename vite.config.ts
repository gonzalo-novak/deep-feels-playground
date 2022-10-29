/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['jest.setup.js'],
		coverage: {
			include: ['src/**/*.{ts,tsx}']
		}
  },
})
