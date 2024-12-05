import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	resolve: {
        alias: {
            '$components': resolve(__dirname, 'src/components'), // Алиас для папки components
            '$assets': resolve(__dirname, 'src/assets'), // Алиас для папки components
        }
    },
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
