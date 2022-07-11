import clRequest from '../index'
import type { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
	AccountLogin = '/login',
	LoginUserInfo = '/users/',
	UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
	return clRequest.post<IDataType<ILoginResult>>({
		url: LoginAPI.AccountLogin,
		data: account
	})
}

export function requestUserInfoById(id: number) {
	return clRequest.get<IDataType>({
		url: LoginAPI.LoginUserInfo + id
	})
}

export function requestUserMenusByRoleId(id: number) {
	return clRequest.get<IDataType>({
		url: LoginAPI.UserMenus + id + '/menu'
	})
}
