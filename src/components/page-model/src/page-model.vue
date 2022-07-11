<template>
	<div>
		<el-dialog v-model="dialogFormVisible" title="新建用户" width="30%">
			<cl-form v-bind="modelFormConfig" v-model="formData"></cl-form>
			<slot></slot>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" @click="handleConfirmClick">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import ClForm from '@/base-ui/form'

export default defineComponent({
	components: { ClForm },
	props: {
		modelFormConfig: {
			type: Object,
			required: true
		},
		defaultInfo: {
			type: Object,
			default: () => ({})
		},
		pageName: {
			type: String,
			required: true
		},
		otherInfo: {
			type: Object,
			default: () => ({})
		}
	},
	setup(props) {
		const dialogFormVisible = ref(false)
		const formData = ref<any>({})
		watch(
			() => props.defaultInfo,
			(newValue) => {
				for (const item of props.modelFormConfig.formItems) {
					formData.value[`${item.field}`] = newValue[`${item.field}`]
				}
			}
		)

		const store = useStore()
		const handleConfirmClick = () => {
			dialogFormVisible.value = false
			if (Object.keys(props.defaultInfo).length) {
				store.dispatch('system/editPageDataAction', {
					pageName: props.pageName,
					editData: { ...formData.value, ...props.otherInfo },
					id: props.defaultInfo.id
				})
			} else {
				store.dispatch('system/createPageDataAction', {
					pageName: props.pageName,
					newData: { ...formData.value, ...props.otherInfo }
				})
			}
		}
		return { dialogFormVisible, formData, handleConfirmClick }
	}
})
</script>

<style lang="less" scoped>
.dialog-footer {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
