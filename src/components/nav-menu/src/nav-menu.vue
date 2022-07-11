<template>
	<div class="nav-menu">
		<div class="logo">
			<img class="img" src="~@/assets/image/logo.svg" alt="logo" />
			<span class="title">Vue3+Ts</span>
		</div>
		<el-menu
			default-active="defaultValue"
			class="el-menu-vertical-demo"
			:collapse="collapse"
			:unique-opened="true"
			background-color="#0c2135"
			text-color="#b7bdc3"
			active-text-color="#0a60bd"
		>
			<template v-for="item in userMenus" :key="item.id">
				<!-- 一级菜单 -->
				<template v-if="item.type === 1">
					<el-sub-menu :index="item.id + ''">
						<template #title>
							<el-icon v-if="item.icon" class="fold-menu"
								><component :is="item.icon.split('el-icon-')[1]"></component
							></el-icon>
							<span>{{ item.name }}</span>
						</template>
						<template v-for="subitem in item.children" :key="subitem.id">
							<el-menu-item
								:index="subitem.id + ''"
								@click="handleMenuItemClick(subitem)"
							>
								<el-icon v-if="subitem.icon" :class="subitem.icon"></el-icon>
								<span>{{ subitem.name }}</span>
							</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
				<template v-else-if="item.type === 2">
					<el-menu-item>
						<el-icon v-if="item.icon" :class="item.icon"></el-icon>
						<span>{{ item.name }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'

import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
	name: 'NavMenu',
	props: {
		collapse: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const store = useStore()

		const router = useRouter()
		const route = useRoute()
		const currentPath = route.path
		const userMenus: any = store.state.login.userMenus

		const menu = pathMapToMenu(userMenus, currentPath)
		const defaultValue = ref(menu.id + '')

		// console.log(2)

		const handleMenuItemClick = (item: any) => {
			// console.log(item)

			router.push({
				path: item.url ?? '/not-found'
			})
		}

		return {
			userMenus,
			defaultValue,
			handleMenuItemClick
		}
	}
})
</script>

<style lang="less" scoped>
.nav-menu {
	height: 100%;
	background-color: #001529;

	.logo {
		display: flex;
		height: 28px;
		padding: 12px 10px 8px 10px;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.img {
			height: 100%;
			margin: 0 10px;
		}

		.title {
			font-size: 16px;
			font-weight: bold;
			color: white;
		}
	}
}
</style>
