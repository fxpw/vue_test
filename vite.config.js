import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		vue()
	],
	server: {
		//host: '0.0.0.0',
		hmr: {
			host: 'localhost',
			// port: 5173
		},
	},
	build: {
		// buildDirectory: 'my_build_directory',
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.esm-bundler.js',
		},
	},
})
