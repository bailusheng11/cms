<template>
	<div>
		<el-dropdown>
			<span class="el-dropdown-link">
				<el-avatar
					src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
				></el-avatar>
				<div>
					<span>{{ name }}</span>
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</div>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item icon="circle-close">查看更多</el-dropdown-item>
					<el-dropdown-item @click="handlerSignOutClick"
						><img src="~@/assets/image/signOut.svg" class="sign-out" />
						退出登录</el-dropdown-item
					>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

import LocalCache from '@/utils/cache'

export default defineComponent({
	name: 'UserInfo',
	setup() {
		const store = useStore()
		const router = useRouter()
		const name = computed(() => store.state.login.userInfo.name)

		const handlerSignOutClick = () => {
			console.log('out')
			LocalCache.deleteCache('token')
			router.push('/login')
		}

		return { name, handlerSignOutClick }
	}
})
</script>

<style lang="less" scoped>
.el-dropdown-link {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 130px;
}
.sign-out {
	width: 18px;
	height: 18px;
	margin-right: 3px;
}
</style>
