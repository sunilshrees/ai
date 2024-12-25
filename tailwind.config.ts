import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'Arial', 'sans-serif'],
      'clash-display': ['var(--font-clash-display)'],
    },
    screens: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      ml: '1200px',
      xl: '1290px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1900px',
    },

    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        'primary-text-color': 'var(--primary-text-color)',
        'secondary-text-color': 'var(--secondary-text-color)',
      },
      fontSize: {
        h1: '45px',
        h2: '30px',
        h3: '25px',
        p1: '18px',
        p2: '16px',
        p3: '14px',
      },
    },
  },
  plugins: [],
}
export default config
