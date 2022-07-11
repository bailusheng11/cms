import { Module } from 'vuex'

import {
	accountLoginRequest,
	requestUserInfoById,
	requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router/index'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

import type { IAccount } from '@/service/login/type'
import { LoginState } from './type'
import { IRootState } from '../type'

const loginModule: Module<LoginState, IRootState> = {
	namespaced: true,
	state() {
		return {
			token: '',
			userInfo: {},
			userMenus: [],
			permissions: []
		}
	},
	mutations: {
		changeToken(state, token) {
			state.token = token
		},
		changeUserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		changeUserMenus(state, userMenus) {
			state.userMenus = userMenus

			const routes = mapMenusToRoutes(userMenus)

			// console.log(routes)

			routes.forEach((route) => {
				router.addRoute('main', route)
			})

			const permissions = mapMenusToPermissions(userMenus)
			// console.log(permissions)
			state.permissions = permissions
		}
	},
	actions: {
		async accountLoginAction({ commit, dispatch }, payload: IAccount) {
			// 1.实现登录逻辑
			const loginResult = await accountLoginRequest(payload)
			// console.log(loginResult.data.token)
			const { id, token } = loginResult.data
			commit('changeToken', token)
			localCache.setCache('token', token)

			// 发送初始化请求(完整的role/department)
			dispatch('getInitialDataAction', null, { root: true })

			// 2.请求用户信息
			const userInfoResult = await requestUserInfoById(id)
			const userInfo = userInfoResult.data
			// console.log(userInfo)
			commit('changeUserInfo', userInfo)
			localCache.setCache('userInfo', userInfo)

			const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
			const userMenus = userMenusResult.data
			// console.log(userMenus)
			commit('changeUserMenus', userMenus)
			localCache.setCache('userMenus', userMenus)

			router.push('/main')
		},
		loadLocalLogin({ commit, dispatch }) {
			const token = localCache.getCache('token')
			if (token) {
				commit('changeToken', token)
				// 发送初始化请求
				dispatch('getInitialDataAction', null, { root: true })
			}

			const userInfo = localCache.getCache('userInfo')
			if (userInfo) {
				commit('changeUserInfo', userInfo)
			}

			const userMenus = localCache.getCache('userMenus')
			if (userMenus) {
				commit('changeUserMenus', userMenus)
			}
		}
	}
}

export default loginModule
