module.exports = {
  content: [
    "./views/**/*.{ejs,html}",
    "./public/**/*.{html,js}"
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: ["retro"],
  },
};
