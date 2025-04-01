import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://bibiabusness.com", //si tu ne lie pas sa ne marchera pas
      routes: ["/", "/contact ", "apropos", "produit"],
    }), // Remplace par ton domaine
  ],

  build: {
    outDir: "dist", // Assurez-vous que la sortie est "dist"
  },
});
