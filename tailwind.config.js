/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ejs,js}","./views/**/*.ejs'],
  theme: {
    extend: {
      colors: {
        customBlue: '#365DA8',
        customeLBlue: '#ECF2FF',
        customBTransparant: 'rgba(54, 93, 168, 0.5)',
        customeGrey: '#DFDFD7',
        customeLGrey: '#F5F5F5',
        customeRed: '#FF0000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}