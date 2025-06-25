import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 🔧 Development Server Configuration
  server: {
    port: 5173, // Vite default port
    host: true, // Allow external access
    proxy: {
      // 🔗 Proxy API requests to backend during development
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  
  // 📦 Build Configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  
  // 🔍 Dependency Optimization
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  
  // 🌍 Environment Variables
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
});
