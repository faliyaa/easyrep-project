import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customtextBox: '#222436', 
        // custombutton: 'linear-gradient(90deg, #6A4BFF 31%, #9070F7 64%, #AE8EF1 100%)'
      },
    },
  },
  plugins: [],
};

export default config;

