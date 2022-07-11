export const contentTableConfig = {
	// showIndexColumn: true,
	// showSelectColumn: true,
	title: '商品类别',
	propList: [
		{ prop: 'id', label: '类别id', minWidth: '60' },
		{ prop: 'name', label: '类别名', minWidth: '100' },
		{
			prop: 'createAt',
			label: '创建时间',
			minWidth: '200',
			slotName: 'createAt'
		},
		{
			prop: 'updateAt',
			label: '更新时间',
			minWidth: '200',
			slotName: 'updateAt'
		},
		{ prop: '操作', minWidth: '120', slotName: 'handler' }
	],
	childrenProps: {
		rowKey: 'id',
		treeProp: {
			children: 'children'
		}
	},
	showFooter: false
}
