import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vitePluginImp from 'vite-plugin-imp'


// https://vitejs.dev/config/
export default defineConfig({
  server:{
    cors:true,

    proxy:{
     
      
      //"/dev/users/login":"localhost:3000/api/users/login",
      '/api':{
        target:"http://127.0.0.1:3000",
        changeOrigin:true,
        
        //rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  plugins: [
    react(),
    
    vitePluginImp({
      libList: [
        {
          libName:"antd",
          style:(name)=>`antd/es/${name}/style`
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, './src')
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "@/assets/styles/main.scss";',
        javascriptEnabled: true
      }
    }
  }
})
