/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        'primary-dark': '#E85A28',
        secondary: '#004E89',
        accent: '#FFD23F',
        success: '#06D6A0',
        warning: '#FFA400',
        danger: '#EF476F',
        dark: '#1A1A2E',
        grey: '#626F86',
        'grey-light': '#E8ECF1',
      },
      fontFamily: {
        heading: ['Rajdhani', 'sans-serif'],
        body: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
