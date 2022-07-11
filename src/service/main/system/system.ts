import clRequest from '../../index'

export function getPageListData(url: string, queryInfo: any): any {
	return clRequest.post({
		url: url,
		data: queryInfo
	})
}

export function deletePageData(url: string): any {
	return clRequest.delete({
		url: url
	})
}

export function createPageData(url: string, newData: any): any {
	return clRequest.post({
		url: url,
		data: newData
	})
}

export function editPageData(url: string, editData: any): any {
	return clRequest.patch({
		url: url,
		data: editData
	})
}
