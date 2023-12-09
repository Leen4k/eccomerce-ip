  // tailwind.config.js
  module.exports = {
    purge: [],
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
     darkMode: false, // or 'media' or 'class'
     theme: {
       extend: {
        colors: {
          primary: "#470CED",
          secondary: "#E2D8FF",
          
        }
       },
     },
     variants: {
       extend: {},
     },
     plugins: [],
   }