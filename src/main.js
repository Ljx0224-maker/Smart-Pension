//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
// import axios from 'axios' 

import 'normalize.css/normalize.css'

//在页面中需要使用反馈组件等需要通过js打开的东西我们就需要导入全局样式
import 'element-plus/dist/index.css'
// 如果store中只有一个index.js那么路径可以不写
import store from './store/index'


// axios.defaults.baseURL = 'http://localhost:8080/smartcare'

const app = createApp(App)
// app.config.globalProperties.$axios = axios
// app.config.globalProperties.$httpUrl = axios.defaults.baseURL

app.use(router)

// 将全局状态store挂载到app实例上
app.use(store)

app.mount('#app')

