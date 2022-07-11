import { IForm } from '@/base-ui/form/types/index'

export const searchFormConfig: IForm = {
	itemStyle: {
		padding: '10px 40px'
	},

	formItems: [
		{
			field: 'name',
			type: 'input',
			label: '角色名称',
			placeholder: '请输入角色名称'
		},
		{
			field: 'intro',
			type: 'input',
			label: '权限介绍',
			placeholder: '请输入权限介绍'
		},
		{
			field: 'creatTime',
			type: 'datepicker',
			label: '选择时间',
			otherOptions: {
				startPlaceholder: '开始时间',
				endPlaceholder: '结束时间',
				type: 'daterange'
			}
		}
	]
}
