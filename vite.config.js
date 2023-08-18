/*
 * @Author: emma
 * @Date: 2023-06-02 15:04:27
 * @LastEditors: emma
 * @LastEditTime: 2023-06-05 15:07:06
 * @Description: 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import copy from 'rollup-plugin-copy' //引入插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets:[
        { src: "src/assets/*", dest: "dist/assets/" },
        // { src: "src/lib/*", dest: "dist/lib/" },
      ],
      hook:"writeBundle",
      verbose:true,
      flatten:true
    })
  ],

  resolve: {
    alias: [//配置别名
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ],
  },

  build: {
    terserOptions: {
      compress: {
        drop_console: true,//打包删除console
        drop_debugger: true,//打包删除调试信息
      }
    },
  },

  server: {
    host: "0.0.0.0",
    https: false,//是否启用 http 2
    cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
    open: false,//服务启动时自动在浏览器中打开应用
    port: "8007",
    watch: {
      ignored: ["!**/node_modules/your-package-name/**"]
    },
    // 反向代理配置
    proxy: {
      '/api': {
        target: "http://222.212.82.225:20128",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/newApi': {
        target: "http://192.168.3.200:9007",
        changeOrigin: true,
      }
    }
  }
})
