import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/login.vue')
	},
	{
		path: '/main',
		name: 'main',
		component: () => import('@/views/main/main.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/notFound/notFound.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to) => {
	if (to.path !== '/login') {
		const token = localCache.getCache('token')
		if (!token) {
			return '/login'
		}
	}

	// console.log(router.getRoutes())
	// console.log(to)
	if (to.path === '/main') {
		return firstMenu.url
	}
})

export default router
