import { Module } from 'vuex'

import { IRootState } from '@/store/type'
import { ISystemState } from './type'

import {
	getPageListData,
	deletePageData,
	createPageData,
	editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
	namespaced: true,
	state() {
		return {
			usersList: [],
			usersCount: 0,
			roleList: [],
			roleCount: 0,
			goodsList: [],
			goodsCount: 0,
			menuList: [],
			menuCount: 0,
			departmentList: [],
			departmentCount: 0,
			categoryList: [],
			categoryCount: 0
		}
	},
	mutations: {
		// 用户 --> users
		changeUsersList(state, usersList: any[]) {
			state.usersList = usersList
		},
		changeUsersCount(state, usersCount: any) {
			state.usersCount = usersCount
		},
		// 权限 --> role
		changeRoleList(state, roleList: any[]) {
			state.roleList = roleList
		},
		changeRoleCount(state, roleCount: any) {
			state.roleCount = roleCount
		},
		// 商品 --> goods
		changeGoodsList(state, goodsList: any[]) {
			state.goodsList = goodsList
		},
		changeGoodsCount(state, goodsCount: any) {
			state.goodsCount = goodsCount
		},
		// 菜单 --> menu
		changeMenuList(state, List: any[]) {
			state.menuList = List
		},
		changeMenuCount(state, Count: any) {
			state.menuCount = Count
		},
		// 部门 --> department
		changeDepartmentList(state, List: any[]) {
			state.departmentList = List
		},
		changeDepartmentCount(state, Count: any) {
			state.departmentCount = Count
		},
		// 商品类别 --> category
		changeCategoryList(state, List: any[]) {
			state.categoryList = List
		},
		changeCategoryCount(state, Count: any) {
			state.categoryCount = Count
		}
	},
	getters: {
		pageListData(state) {
			return (pageName: string) => {
				return (state as any)[`${pageName}List`]
				// switch (pageName) {
				// 	case 'users':
				// 		return state.usersList
				// 	case 'role':
				// 		return state.roleList
				// }
			}
		},
		pageListCount(state) {
			return (pageName: string) => {
				return (state as any)[`${pageName}Count`]
				// switch (pageName) {
				// 	case 'users':
				// 		return state.usersList
				// 	case 'role':
				// 		return state.roleList
				// }
			}
		}
	},
	actions: {
		async getPageListAction({ commit }, payload) {
			//console.log(payload.pageUrl)
			// 1.获取pageUrl
			const pageName = payload.pageName
			const pageUrl = `/${pageName}/list`

			// 2.对页面发送请求
			const res = await getPageListData(pageUrl, payload.queryInfo)
			console.log(res)

			// 3.将数据存储到state中
			const { list, totalCount } = res.data
			// commit('changeUserList', list)
			// commit('changeUserCount', totalCount)
			commit(
				`change${pageName.replace(pageName[0], pageName[0].toUpperCase())}List`,
				list
			)
			commit(
				`change${pageName.replace(
					pageName[0],
					pageName[0].toUpperCase()
				)}Count`,
				totalCount
			)
		},

		async deletePageDataAction({ dispatch }, payload: any) {
			const { pageName, id } = payload
			const pageUrl = `/${pageName}/${id}`

			await deletePageData(pageUrl)

			dispatch('getPageListAction', {
				pageName,
				queryInfo: {
					offset: 0,
					size: 10
				}
			})
		},

		async createPageDataAction({ dispatch }, payload: any) {
			const { pageName, newData } = payload
			const pageUrl = `/${pageName}`

			await createPageData(pageUrl, newData)

			dispatch('getPageListAction', {
				pageName,
				queryInfo: {
					offset: 0,
					size: 10
				}
			})
		},

		async editPageDataAction({ dispatch }, payload: any) {
			const { pageName, editData, id } = payload
			const pageUrl = `/${pageName}/${id}`

			await editPageData(pageUrl, editData)

			dispatch('getPageListAction', {
				pageName,
				queryInfo: {
					offset: 0,
					size: 10
				}
			})
		}
	}
}

export default systemModule
