/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {}
	},

	plugins: [require('daisyui')],
	dasiyui: {
		daisyui: {
			themes: ['light', 'dark'],
			darkTheme: 'dark',
			logs: false
		}
	}
};
