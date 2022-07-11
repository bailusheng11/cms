export const contentTableConfig = {
	// showIndexColumn: true,
	// showSelectColumn: true,
	title: '菜单列表',
	propList: [
		{ prop: 'name', label: '权限名', minWidth: '100' },
		{ prop: 'type', label: '类型', minWidth: '60' },
		{ prop: 'url', label: '菜单url', minWidth: '140' },
		{ prop: 'icon', label: '菜单icon', minWidth: '140' },
		{ prop: 'permission', label: '按钮权限', minWidth: '160' },
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
