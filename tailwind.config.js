/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        30: "7.5rem",
        22: "5.5rem",
      },
      height: {
        30: "7.5rem",
        22: "5.5rem",
      },
      blur: {
        xs: "1.5px",
      },
      spacing: {
        1.5: "0.375rem",
        2.5: "0.625rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      gap: {
        4.5: "1.125rem",
      },
      colors: {
        primary: {
          purple: {
            1: "#8661EE",
            2: "#662FFF",
            3: "#C2ACFF",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
