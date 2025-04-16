/** @type {import('tailwindcss').Config} */

const config = {
  content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/Modal/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {
          colors: {
            sky: {
              500: '#0ea5e9', // ваш цвет для sky-500
            },
            background: "var(--background)",
            foreground: "var(--foreground)",
           
          },
          screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
          },
        },
      },
      plugins: [],
    };

export default config;