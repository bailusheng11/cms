export const contentTableConfig = {
	// showIndexColumn: true,
	// showSelectColumn: true,
	title: '部门列表',
	propList: [
		{ prop: 'id', label: '部门id', minWidth: '60' },
		{ prop: 'name', label: '部门', minWidth: '100' },
		{ prop: 'leader', label: '领导', minWidth: '100' },
		{ prop: 'parentId', label: '父id', minWidth: '140' },
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
