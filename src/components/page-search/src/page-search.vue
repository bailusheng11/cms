<template>
	<div>
		<cl-form v-bind="searchFormConfig" v-model="formData">
			<template #header><h2 class="header">高级检索</h2></template>
			<template #footer>
				<div class="footer">
					<el-button @click="handleResetClick"
						><el-icon><Refresh /></el-icon>重置</el-button
					>
					<el-button type="primary" @click="handleSearchClick"
						><el-icon><Search /></el-icon>搜索</el-button
					>
				</div>
			</template>
		</cl-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import ClForm from '@/base-ui/form'

export default defineComponent({
	components: { ClForm },
	props: {
		searchFormConfig: {
			type: Object,
			required: true
		}
	},
	emits: ['resetBtnClick', 'searchBtnClick'],
	setup(props, { emit }) {
		// formdata中的属性动态决定
		const formItems = props.searchFormConfig?.formItems ?? []
		const formOriginData: any = {}
		for (const item of formItems) {
			formOriginData[item.field] = ''
		}
		let formData = ref(formOriginData)

		// 用户点击重置
		const handleResetClick = () => {
			formData.value = formOriginData
			emit('resetBtnClick')
			// console.log(1)
		}

		const handleSearchClick = () => {
			emit('searchBtnClick', formData.value)
			// console.log(2)
		}

		return { formData, handleResetClick, handleSearchClick }
	}
})
</script>

<style lang="less" scoped>
.header {
	color: red;
}
.footer {
	text-align: right;
	padding: 0 50px 20px 0;
}
</style>
