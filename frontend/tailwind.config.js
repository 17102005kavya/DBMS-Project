/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.html"
    
  ],
  theme: {
    extend: {
      colors:{
        primary:'rgb(255, 236, 183)',
        secondary:'rgb(234, 81, 65)',
        tertiary:'rgb(255, 241, 241)'
      },
      
      width:{
        '35':'8.75rem',
      },
      height:{
        '35':'8.75rem',
      },
      
    },
  },
  plugins: [],
}

