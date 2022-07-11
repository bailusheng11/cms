import clRequest from '@/service/index'

enum DashboardAPI {
	categoryGoodsCount = '/goods/category/count',
	categoryGoodsSale = '/goods/category/sale',
	categoryGoodsFavor = '/goods/category/favor',
	addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
	return clRequest.get({ url: DashboardAPI.categoryGoodsCount })
}

export function getCategoryGoodsSale() {
	return clRequest.get({ url: DashboardAPI.categoryGoodsSale })
}

export function getCategoryGoodsFavor() {
	return clRequest.get({ url: DashboardAPI.categoryGoodsFavor })
}

export function getAddressGoodsSale() {
	return clRequest.get({ url: DashboardAPI.addressGoodsSale })
}
