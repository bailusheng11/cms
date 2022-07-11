import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import { globalRegister } from './global'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.use(store)
app.use(ElementPlus)
app.use(globalRegister)

setupStore()
app.use(router)
app.mount('#app')

// import clRequest from './service/index'

// interface DataType {
// 	data: any
// 	returnCode: string
// 	success: boolean
// }

// clRequest
// 	.get<DataType>({
// 		url: '/home/multidata',
// 		showLoading: false
// 		// interceptors: {
// 		//   requestInterceptor: (config) => {
// 		//     console.log('单独的请求成功');
// 		//     return config

// 		//   },
// 		//   responseInterceptor: (res) => {
// 		//     console.log('单独的响应成功');
// 		//     return res
// 		//   }
// 		// }
// 	})
// 	.then((res) => {
// 		console.log(res.data)
// 		console.log(res.returnCode)
// 		console.log(res.success)
// 	})
// console.log(process.env.VUE_APP_BASE_URL);
// console.log(process.env.VUE_APP_BASE_NAME);
