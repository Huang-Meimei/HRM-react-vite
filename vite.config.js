import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vitePluginImp from 'vite-plugin-imp'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    cors:true,
    proxy:{
     
      
      //"/dev/users/login":"localhost:3000/api/users/login",
      '/dev':{
        target:"http://127.0.0.1:3000",
        changeOrigin:true,
        
        rewrite: (path) => {
          console.log('path', path,path.replace(/^\/dev/, ''))
          return path.replace(/^\/dev/, '')
        },
      }
    }
  },
  plugins: [
    react(),svgr(),
   
    
    vitePluginImp({
      libList: [
        {
          libName:"antd",
          style:(name)=>`antd/es/${name}/style`
        }
      ]
    })
  ],
  envPrefix:"REACT_",
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
