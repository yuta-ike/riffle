// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme")
/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  purge: ["./src/**/*"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#4169e1",
        black: "#333333",
        check: "rgb(16, 185, 129)",
        question: "rgb(59, 130, 246)",
        answer: "rgb(239, 68, 68)",
      },
      boxShadow: {
        main: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
      fontFamily: {
        sans: ["'M PLUS Rounded 1c'", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        ping: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        spin: "spin 4s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
