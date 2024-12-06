import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
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
			$inc: resolve(__dirname, 'src/components/inc'),
			$assets: resolve(__dirname, 'src/assets'),
			$api: resolve(__dirname, 'src/api'),
			vue: 'vue/dist/vue.esm-bundler.js', // Псевдоним для Vue (если требуется)
		}
	},
})
