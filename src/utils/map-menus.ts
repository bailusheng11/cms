import { RouteRecordRaw } from 'vue-router'
import { IBreadCrumb } from '@/base-ui/breadCrumb/types'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
	const routes: RouteRecordRaw[] = []

	// 1.先去加载默认的所有的routes
	const allRoutes: RouteRecordRaw[] = []
	const routeFiles = require.context('../router/main', true, /\.ts/)
	routeFiles.keys().forEach((key) => {
		// console.log(key)
		// console.log(1)

		const route = require('../router/main' + key.split('.')[1])
		allRoutes.push(route.default)
	})

	// console.log(allRoutes)
	// 2.根据菜单获取需要添加的routes
	// userMenus
	// type === 1 -> children -> type === 1
	// type === 2 -> url -> route
	const _recurseGetRoute = (menus: any[]) => {
		for (const menu of menus) {
			if (menu.type === 2) {
				const route = allRoutes.find((route) => {
					return route.path === menu.url
				})
				if (route) routes.push(route)
				if (!firstMenu) {
					firstMenu = menu
				}
			} else if (menu.type === 1) {
				_recurseGetRoute(menu.children)
			}
		}
	}

	_recurseGetRoute(userMenus)

	return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
	const breadCrumbs: IBreadCrumb[] = []

	pathMapToMenu(userMenus, currentPath, breadCrumbs)

	return breadCrumbs
}

export function pathMapToMenu(
	userMenus: any[],
	currentPath: string,
	breadCrumbs?: IBreadCrumb[]
): any {
	for (const menu of userMenus) {
		if (menu.type === 1) {
			const findMenu = pathMapToMenu(
				menu.children ?? [],
				currentPath,
				breadCrumbs
			)
			if (findMenu) {
				breadCrumbs?.push({ name: menu.name })
				breadCrumbs?.push({ name: findMenu.name })
				return findMenu
			}
		} else if (menu.type === 2 && menu.url === currentPath) {
			return menu
		}
	}
}

// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
// 	const breadCrumbs: IBreadCrumb[] = []

// 	for (const menu of userMenus) {
// 		if (menu.type === 1) {
// 			const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
// 			if (findMenu) {
// 				breadCrumbs.push({ name: menu.name, path: menu.url })
// 				breadCrumbs.push({ name: findMenu.name, path: findMenu.url })
// 				return findMenu
// 			}
// 		} else if (menu.type === 2 && menu.url === currentPath) {
// 			return menu
// 		}
// 	}

// 	return breadCrumbs
// }

// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
// 	for (const menu of userMenus) {
// 		if (menu.type === 1) {
// 			const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
// 			if (findMenu) return findMenu
// 		} else if (menu.type === 2 && menu.url === currentPath) {
// 			return menu
// 		}
// 	}
// }

export function mapMenusToPermissions(userMenus: any[]) {
	const permissions: string[] = []

	const _recurseGetPermissions = (menus: any[]) => {
		for (const menu of menus) {
			if (menu.type === 1 || menu.type === 2) {
				_recurseGetPermissions(menu.children ?? [])
			} else if (menu.type === 3) {
				permissions.push(menu.permission)
			}
		}
	}

	_recurseGetPermissions(userMenus)
	return permissions
}

export function mapMenuLeafKeys(menuList: any[]) {
	const leafKeys: number[] = []

	const _recurseGetLeaf = (menuList: any[]) => {
		for (const menu of menuList) {
			if (menu.children) {
				_recurseGetLeaf(menu.children)
			} else {
				leafKeys.push(menu.id)
			}
		}
	}
	_recurseGetLeaf(menuList)

	return leafKeys
}

export { firstMenu }
