export const contentTableConfig = {
	showIndexColumn: true,
	showSelectColumn: true,
	title: '商品列表',
	propList: [
		{ prop: 'name', label: '用户名', minWidth: '100' },
		{ prop: 'newPrice', label: '折扣价', minWidth: '80', slotName: 'newPrice' },
		{ prop: 'oldPrice', label: '原价', minWidth: '80', slotName: 'oldPrice' },
		{ prop: 'imgUrl', label: '预览', minWidth: '100', slotName: 'image' },
		{ prop: 'status', label: '库存', minWidth: '100', slotName: 'status' },
		{
			prop: 'createAt',
			label: '创建时间',
			minWidth: '250',
			slotName: 'createAt'
		},
		{
			prop: 'updateAt',
			label: '更新时间',
			minWidth: '250',
			slotName: 'updateAt'
		},
		{ prop: '操作', minWidth: '120', slotName: 'handler' }
	]
}
