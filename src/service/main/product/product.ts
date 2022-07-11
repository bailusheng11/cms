import clRequest from '../../index'

export function getPageListData(url: string, queryInfo: any): any {
	return clRequest.post({
		url: url,
		data: queryInfo
	})
}
