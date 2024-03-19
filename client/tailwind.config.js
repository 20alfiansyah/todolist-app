/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00ccf8",
          
        "secondary": "#5c2aff",
                  
        "accent": "#00b2ff",
                  
        "neutral": "#282a25",
                  
        "base-100": "#252530",
                  
        "info": "#00adff",
                  
        "success": "#67ff72",
                  
        "warning": "#fd7100",
                  
        "error": "#ff003d",
      },
      fontFamily: {
        'Poppins':'Poppins'
      },
    },
  },
  plugins: [],
}