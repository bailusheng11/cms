import { IForm } from '@/base-ui/form/types/index'

export const modelFormConfig: IForm = {
	formItems: [
		{
			field: 'name',
			type: 'input',
			label: '权限名',
			placeholder: '请输入权限名'
		},
		{
			field: 'intro',
			type: 'input',
			label: '权限介绍',
			placeholder: '请输入权限介绍'
		}
	],
	colLayout: { span: 24 },
	itemStyle: {
		padding: '10px 0px'
	}
}
