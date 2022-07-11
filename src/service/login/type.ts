export interface IAccount {
	name: string
	password: any
}

export interface ILoginResult {
	id: number
	name: string
	token: string
}

export interface IDataType<T = any> {
	code: number
	data: T
}
