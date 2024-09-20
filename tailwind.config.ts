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
    },
  },
  plugins: [],
};
export default config;
