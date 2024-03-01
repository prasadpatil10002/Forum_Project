/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: { 
       
            gray: {
            800 : "#262D34",
           700 : "#2C353D",
          },
           white:{
           100: "#F7f7f7",
        }
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        }
      },
    },

  plugins: [],
}

