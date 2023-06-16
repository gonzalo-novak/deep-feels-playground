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
	server: {
		host: true,
		port: 3090,
	},
	preview: {
		port: 3090
	},
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['jest.setup.js'],
		coverage: {
			provider: 'v8',
			include: [
				'src/**/*.{ts,tsx}', 

				// These files are just configurations for booting our application
				// So there's nothing to tests here.
				'!src/main.tsx', 
				'!src/routes.tsx'
			],
			branches: 90,
			statements: 90,
			functions: 90,
			lines: 90,
			all: true
		},
		allowOnly: true,
  },
})
