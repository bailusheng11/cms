import { Module } from 'vuex'

import { IRootState } from '@/store/type'
import { IProductState } from './type'

import { getPageListData } from '@/service/main/system/system'

const productModule: Module<IProductState, IRootState> = {
	namespaced: true,
	state() {
		return {
			goodsList: [],
			goodsCount: 0
		}
	},
	mutations: {
		changeGoodsList(state, goodsList: any[]) {
			state.goodsList = goodsList
		},
		changeGoodsCount(state, goodsCount: any) {
			state.goodsCount = goodsCount
		}
	},
	getters: {
		pageListData(state) {
			return (pageName: string) => {
				return (state as any)[`${pageName}List`]
			}
		},
		pageListCount(state) {
			return (pageName: string) => {
				return (state as any)[`${pageName}Count`]
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
			console.log('goods')

			console.log(res)

			// 3.将数据存储到state中
			const { list, totalCount } = res.data

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
		}
	}
}

export default productModule
