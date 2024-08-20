module.exports = {
  content: [
    "./views/*.{html,js,css,ejs,hbs}",
    "./views/home.ejs",
    "./assets/styles/*.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
}
