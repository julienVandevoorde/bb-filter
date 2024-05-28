import colors from 'tailwindcss/colors.js'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{html,js,ts}'],
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                blueviolet: {
                    50: '#f3f6fb',
                    100: '#e4e8f5',
                    200: '#d0d8ed',
                    300: '#afbee1',
                    400: '#899cd1',
                    500: '#6073F0',
                    600: '#5C6CD6',
                    700: '#5865b4',
                    800: '#383796',
                    900: '#313277',
                    950: '#21214a',
                },
                purple: {
                    600: '#ac5cd6',
                },
                blue: {
                    600: '#0AF',
                },
            },
            height: {
                screen: '100dvh',
                screenSmall: '100svh',
                screenLarge: '100lvh'
            },
            maxHeight: {
                128: '32rem',
            },
            spacing: {
                17: '4.25rem',
                22: '5.5rem',
                68: '17rem',
            },
            transitionDuration: {
                400: '400ms',
                600: '600ms',
            },
            transitionProperty: {
                height: 'height, max-height, min-height',
                width: 'width, max-width, min-width',
            },
        },
    },
    plugins: [forms],
    variants: {
        extend: {},
    },
    darkMode: 'class',
}