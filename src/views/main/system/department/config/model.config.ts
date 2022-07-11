import { IForm } from '@/base-ui/form/types/index'

export const modelFormConfig: IForm = {
	formItems: [
		{
			field: 'name',
			type: 'input',
			label: '用户名',
			placeholder: '请输入用户名'
		},
		{
			field: 'password',
			type: 'input',
			label: '密码',
			placeholder: '请输入密码',
			isHidden: false
		},
		{
			field: 'realname',
			type: 'input',
			label: '真实姓名',
			placeholder: '请输入真实姓名'
		},
		{
			field: 'cellphone',
			type: 'input',
			label: '电话号码',
			placeholder: '请输入电话号码'
		},
		{
			field: 'departmentId',
			type: 'select',
			label: '部门',
			options: []
		},
		{
			field: 'roleId',
			type: 'select',
			label: '角色',
			options: []
		}
	],
	colLayout: { span: 24 },
	itemStyle: {
		padding: '10px 0px'
	}
}
