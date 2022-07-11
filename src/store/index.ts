import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IRootState, IStoreType } from './type'

import { getPageListData, deletePageData } from '@/service/main/system/system'

import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

const store = createStore<IRootState>({
	state: () => {
		return {
			name: 'lcl',
			age: 18,
			entireDepartment: [],
			entireRole: [],
			entireMenu: []
		}
	},
	mutations: {
		changeDepartmentList(state: IRootState, List: any[]) {
			state.entireDepartment = List
		},
		changeRoleList(state: IRootState, List: any[]) {
			state.entireRole = List
		},
		changeMenuList(state: IRootState, List: any[]) {
			state.entireMenu = List
		}
	},
	actions: {
		async getInitialDataAction({ commit }) {
			const departmentResult = await getPageListData('/department/list', {
				offset: 0,
				size: 1000
			})
			const { list: departmentList } = departmentResult.data

			const roleResult = await getPageListData('/role/list', {
				offset: 0,
				size: 1000
			})
			const { list: roleList } = roleResult.data

			const menuResult = await getPageListData('/menu/list', {})
			const { list: menuList } = menuResult.data

			commit('changeDepartmentList', departmentList)
			commit('changeRoleList', roleList)
			commit('changeMenuList', menuList)
		}
	},
	modules: {
		login,
		system,
		dashboard
	}
})

export function setupStore(): void {
	store.dispatch('login/loadLocalLogin')
	// store.dispatch('dashboard/getDashboardDataAction')
	// store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
	return useVuexStore()
}

export default store
