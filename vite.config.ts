import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     '/api':{
  //       target: 'http://13.247.245.19:5000',
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
