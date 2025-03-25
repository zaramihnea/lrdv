import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { visualizer } from 'rollup-plugin-visualizer' // Optional: to analyze bundle size

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Optional: Uncomment to generate a bundle size visualization report
    //visualizer({ open: true, filename: 'stats.html' }),
  ],
  build: {
    cssCodeSplit: false,
    
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2,
      }
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-utils': ['react-helmet-async']
        },
      },
    },
    
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
  },
  
  server: {
    hmr: {
      overlay: true,
    },
  },
})