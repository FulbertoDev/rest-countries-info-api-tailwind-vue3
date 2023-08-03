/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    plugins: [],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'dark-blue': '#2b3945',
                'very-dark-blue-dark-mode': '#202c37',
                'very-dark-blue-light-mode': '#111517',
                'dark-gray': '#858585',
                'very-light-gray': '#fafafa',
            }
        },
    },
}

/**
 *
 * Dark Blue (Dark Mode Elements): #2b3945
 - Very Dark Blue (Dark Mode Background): #202c37
 - Very Dark Blue (Light Mode Text): #111517
 - Dark Gray (Light Mode Input): #858585
 - Very Light Gray (Light Mode Background): #fafafa
 - White (Dark Mode Text & Light Mode Elements): #fff
 *
 */