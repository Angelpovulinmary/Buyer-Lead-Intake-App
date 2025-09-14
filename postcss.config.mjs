const config = {
  plugins: ["@tailwindcss/postcss"],
  ssr: {
      noExternal:s ['@syncfusion/ej2-react-dropdowns', '@syncfusion/ej2-react-buttons']
    },
};

export default config;
