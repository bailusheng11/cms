import { Module } from 'vuex'

import { IRootState } from '@/store/type'
import { IDashboardState } from './type'

import {
	getCategoryGoodsCount,
	getCategoryGoodsSale,
	getCategoryGoodsFavor,
	getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
	namespaced: true,
	state() {
		return {
			categoryGoodsCount: [],
			categoryGoodsSale: [],
			categoryGoodsFavor: [],
			addressGoodsSale: []
		}
	},
	mutations: {
		changeCategoryGoodsCount(state, list: any) {
			state.categoryGoodsCount = list
		},
		changeCategoryGoodsSale(state, list: any) {
			state.categoryGoodsSale = list
		},
		changeCategoryGoodsFavor(state, list: any) {
			state.categoryGoodsFavor = list
		},
		changeAddressGoodsSale(state, list: any) {
			state.addressGoodsSale = list
		}
	},
	actions: {
		async getDashboardDataAction({ commit }) {
			const goodsCountResult = await getCategoryGoodsCount()

			const goodsSaleResult = await getCategoryGoodsSale()

			const goodsFavorResult = await getCategoryGoodsFavor()

			const addressSaleResult = await getAddressGoodsSale()

			commit('changeCategoryGoodsCount', goodsCountResult.data)
			commit('changeCategoryGoodsSale', goodsSaleResult.data)
			commit('changeCategoryGoodsFavor', goodsFavorResult.data)
			commit('changeAddressGoodsSale', addressSaleResult.data)
		}
	}
}

export default dashboardModule
