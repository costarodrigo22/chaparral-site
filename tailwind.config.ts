import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#898989',
        ligthPink: '#FC4CD1',
        ligthWhite: '#FFEFE9',
        
        mediumWhite: '#FDECE5',
        
        darkGray: '#1E1E1E',
        darkPurple: '#3c004a',
        

        pastelPink: '#DB0084',
        pastelBlue: '#5E14FF',
        pastelYellow: '#FBA301',
        pastelGreen: '#00DB99',

      },
      keyframes: {
        shakeWithPause: {
          '0%, 10%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
          '90%, 100%': { transform: 'translateX(0)' }, 
        },
      },
      animation: {
        shakeWithPause: 'shakeWithPause 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
