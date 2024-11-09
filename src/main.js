import './style.css'

import { createApp } from 'vue';

const app = createApp({});

const blacklist = [
];

const isBlacklisted = (name) => {
	return blacklist.some(blacklistedName => name.includes(blacklistedName));
}

async function registerComponents() {
	const components = import.meta.glob('./components/*.vue');

	for (const path in components) {
		const componentName = path
			.split('/')
			.pop()
			.replace(/\.\w+$/, '');
		if (isBlacklisted(componentName)) {
			continue;
		}
		console.log(componentName);
		try {
			const component = await components[path]();
			// Register the component
			app.component(componentName, component.default || component);
		} catch (error) {
			console.error(`Failed to load component at ${path}:`, error);
		}
	}
}

registerComponents().then(() => {
	app.mount('#app');
});
