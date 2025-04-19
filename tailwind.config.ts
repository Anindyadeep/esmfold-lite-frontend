import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
    	container: {
    		center: true,
    		padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			success: {
    				DEFAULT: 'hsl(var(--success))',
    				foreground: 'hsl(var(--success-foreground))'
    			},
    			warning: {
    				DEFAULT: 'hsl(var(--warning))',
    				foreground: 'hsl(var(--warning-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			molecule: {
    				purple: '#9b87f5',
    				'dark-purple': '#1A1F2C',
    				'light-purple': '#D6BCFA',
    				'vivid-purple': '#8B5CF6',
    				magenta: '#D946EF',
    				orange: '#F97316',
    				blue: '#0EA5E9',
    				green: '#4ADE80',
    				yellow: '#FACC15',
    				teal: '#2DD4BF',
    				pink: '#EC4899',
    				red: '#EF4444'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius-lg)',
    			md: 'var(--radius-md)',
    			sm: 'var(--radius-sm)'
    		},
    		fontFamily: {
    			sans: ["var(--font-sans)", ...fontFamily.sans],
          heading: ["var(--font-heading)", ...fontFamily.sans],
    		},
        fontSize: {
          "2xs": ["0.75rem", { lineHeight: "1.25rem" }],
          xs: ["0.8125rem", { lineHeight: "1.5rem" }],
          sm: ["0.875rem", { lineHeight: "1.5rem" }],
          base: ["1rem", { lineHeight: "1.75rem" }],
          lg: ["1.125rem", { lineHeight: "1.75rem" }],
          xl: ["1.25rem", { lineHeight: "1.75rem" }],
          "2xl": ["1.5rem", { lineHeight: "2rem" }],
          "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
          "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
          "5xl": ["3rem", { lineHeight: "1" }],
          "6xl": ["3.75rem", { lineHeight: "1" }],
          "7xl": ["4.5rem", { lineHeight: "1" }],
          "8xl": ["6rem", { lineHeight: "1" }],
          "9xl": ["8rem", { lineHeight: "1" }],
        },
        spacing: {
          "4.5": "1.125rem",
        },
    		keyframes: {
    			'accordion-down': {
    				from: { height: '0' },
    				to: { height: 'var(--radix-accordion-content-height)' }
    			},
    			'accordion-up': {
    				from: { height: 'var(--radix-accordion-content-height)' },
    				to: { height: '0' }
    			},
          'fade-in': {
            from: { opacity: '0' },
            to: { opacity: '1' }
          },
          'fade-out': {
            from: { opacity: '1' },
            to: { opacity: '0' }
          }
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
          'fade-in': 'fade-in 0.2s ease-out',
          'fade-out': 'fade-out 0.2s ease-out'
    		}
    	}
    },
	plugins: [animatePlugin],
} satisfies Config;

export default config;
