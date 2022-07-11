import type { LoginState } from './login/type'
import type { ISystemState } from './main/system/type'
import type { IDashboardState } from './main/analysis/type'

export interface IRootState {
	name: string
	age: number
	entireDepartment: any[]
	entireRole: any[]
	entireMenu: any[]
}

export interface IRootWithModules {
	login: LoginState
	system: ISystemState
	dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModules
