<template>
	<div class="login-panel">
		<h1 class="title">后台管理系统</h1>
		<el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
			<el-tab-pane name="account">
				<template #label>
					<span class="custom-tabs-label">
						<el-icon :size="16" style="vertical-align: middle"
							><User
						/></el-icon>
						<span style="vertical-align: middle">账号登录</span>
					</span>
				</template>
				<login-account ref="accountRef"></login-account>
			</el-tab-pane>
			<el-tab-pane name="phone">
				<template #label>
					<span class="custom-tabs-label">
						<el-icon :size="16" style="vertical-align: middle"
							><Iphone
						/></el-icon>
						<span style="vertical-align: middle">手机登录</span>
					</span>
				</template>
				<login-phone ref="phoneRef"></login-phone>
			</el-tab-pane>
		</el-tabs>

		<div class="account-control">
			<el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
			<el-link type="primary">忘记密码</el-link>
		</div>

		<el-button type="primary" class="login-btn" @click="handleLoginClick"
			>立即登录</el-button
		>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
	setup() {
		//
		const isKeepPassword = ref(true)
		// <InstanceType<typeof LoginAccount>> 拿到 组件 login-account的类型 在用该组件中的函数时就不会用错了
		const accountRef = ref<InstanceType<typeof LoginAccount>>()
		const phoneRef = ref<InstanceType<typeof LoginPhone>>()

		//
		const currentTab = ref('account')

		const handleLoginClick = () => {
			// console.log('登录')
			if (currentTab.value === 'account') {
				// 因为有可能没用用这个组件 所以要加个?
				accountRef.value?.loginAction(isKeepPassword.value)
			} else {
				console.log('调用phone中的login')
			}
		}

		return {
			isKeepPassword,
			handleLoginClick,
			accountRef,
			phoneRef,
			currentTab
		}
	},
	components: { LoginAccount, LoginPhone }
})
</script>

<style lang="less" scoped>
.login-panel {
	width: 320px;
	margin-bottom: 220px;

	.title {
		text-align: center;
	}
}

.account-control {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.login-btn {
	width: 100%;
	margin-top: 10px;
}
</style>
