import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://bibiabusness.vercel.app", //https://bibiabusness.com si tu ne lie pas sa ne marchera pas
      routes: ["/", "/contact ", "/apropos", "/produit"],
    }), // Remplace par ton domaine
  ],

  build: {
    outDir: "dist", // Assurez-vous que la sortie est "dist"

    rollupOptions: {
      output: {
        manualChunks: {
          // Groupes optimisés
          react: ["react", "react-dom", "react-router-dom"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          animation: ["framer-motion", "aos", "react-aos"],
          ui: ["react-bootstrap", "bootstrap", "react-icons", "lucide-react"],
          carousel: ["react-slick", "slick-carousel"],
          utils: ["lodash", "axios", "jquery"],
          pdf: ["jspdf", "jspdf-autotable"],
          fonts: [
            "@fortawesome/free-brands-svg-icons",
            "@fortawesome/free-solid-svg-icons",
          ],
          modals: ["react-modal", "react-toastify"],
          swiper: ["swiper"],
          helmet: ["react-helmet", "react-helmet-async"],
        },
      },
    },
    chunkSizeWarningLimit: 8000, // Ajustez la limite (en kB)
  },
});
