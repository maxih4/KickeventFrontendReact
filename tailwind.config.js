/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
        extend: {
            colors: {
                'text': {
                    50: '#effde7',
                    100: '#dffbd0',
                    200: '#bff7a1',
                    300: '#9ff471',
                    400: '#7ff042',
                    500: '#5fec13',
                    600: '#4cbd0f',
                    700: '#398e0b',
                    800: '#265e08',
                    900: '#132f04',
                    950: '#091802',
                    DEFAULT: 'oklch(96.51% 0.052 134.78)'
                },
                'background': {
                    50: '#eefde7',
                    100: '#ddfbd0',
                    200: '#bcf8a0',
                    300: '#9af471',
                    400: '#79f141',
                    500: '#57ed12',
                    600: '#46be0e',
                    700: '#348e0b',
                    800: '#235f07',
                    900: '#112f04',
                    950: '#091802',
                    DEFAULT: 'oklch(19.98% 0.053 135.61)',
                },
                'primary': {
                    50: '#eefde8',
                    100: '#ddfbd0',
                    200: '#bbf7a1',
                    300: '#99f372',
                    400: '#77ef43',
                    500: '#55eb14',
                    600: '#44bc10',
                    700: '#338d0c',
                    800: '#225e08',
                    900: '#112f04',
                    950: '#081702',
                    DEFAULT: 'oklch(88.77% 0.173 136.98)',
                },
                'secondary': {
                    50: '#e6edfe',
                    100: '#cddbfe',
                    200: '#9cb7fc',
                    300: '#6a93fb',
                    400: '#386ffa',
                    500: '#064bf9',
                    600: '#053cc7',
                    700: '#042d95',
                    800: '#031e63',
                    900: '#010f32',
                    950: '#010819',
                    DEFAULT: 'oklch(36.12% 0.177 263.37)',
                },
                'accent': {
                    50: '#effee7',
                    100: '#dffccf',
                    200: '#befa9e',
                    300: '#9ef76e',
                    400: '#7df53d',
                    500: '#5df20d',
                    600: '#4ac20a',
                    700: '#389108',
                    800: '#256105',
                    900: '#133003',
                    950: '#091801',
                    DEFAULT: 'oklch(86.58% 0.242 137.28)',
                },
            },
            container:{
                center:true,
            },
        },


        fontSize: {
            sm: '0.750rem',
            base: '1rem',
            xl: '1.333rem',
            '2xl': '1.777rem',
            '3xl': '2.369rem',
            '4xl': '3.158rem',
            '5xl': '4.210rem',
        },
        fontFamily: {
            heading: 'Outfit',
            body: 'Inter',
        },
        fontWeight: {
            normal: '400',
            bold: '700',
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false
    },

}

