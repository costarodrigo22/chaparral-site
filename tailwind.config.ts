import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				lightGray: '#898989',
				ligthPink: '#FC4CD1',
				primaryWhite: '#F9F9F9',
				ligthWhite: '#FFEFE9',
				mediumWhite: '#FDECE5',
				darkGray: '#1E1E1E',
				darkPurple: '#3c004a',
				pastelPink: '#DB0084',
				pastelBlue: '#5E14FF',
				pastelYellow: '#FBA301',
				pastelGreen: '#00DB99',
				radiantGreen: '#02EA11',
				jadeGreen: '#11A147',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				shakeWithPause: {
					'0%, 10%': {
						transform: 'translateX(0)',
					},
					'25%': {
						transform: 'translateX(-5px)',
					},
					'50%': {
						transform: 'translateX(5px)',
					},
					'75%': {
						transform: 'translateX(-5px)',
					},
					'90%, 100%': {
						transform: 'translateX(0)',
					},
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' },
				},
			},
			animation: {
				shakeWithPause: 'shakeWithPause 1.5s ease-in-out infinite',
				'caret-blink': 'caret-blink 1.25s ease-out infinite',
				'fade-in': 'fade-in 1s ease-in-out',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;
