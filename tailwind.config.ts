import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./page-components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				slideIn: {
					from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.95)' },
					to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
				},
			},
			animation: {
				fadeIn: 'fadeIn 200ms ease-out',
				slideIn: 'slideIn 200ms ease-out',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
