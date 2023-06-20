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
	define: {
		// As we need to add a host in our testing environment to prevent issues with the fetch API, 
		// we exposed an env variable on the node-js process. However, since we use a proxy in the browser, 
		// we don't need it but we do need to persist its reference to avoid errors.
    ...((process.env.NODE_ENV !== 'production') ? ({'process.env': process.env}) : ({'process': {}}))
  },
	server: {
		host: true,
		port: 3090,
		proxy: {
			'/api': {
        target: `http://${process.env.API_HOST}:${process.env.API_PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
		}
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
