/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Escanea todos los archivos HTML y TypeScript
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        success: "#28a745",
        danger: "#dc3545",
      }
    }, // Aquí puedes extender o personalizar el tema predeterminado
  },
  plugins: [], // Puedes agregar plugins si es necesario
};