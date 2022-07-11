<template>
	<div class="cl-form">
		<slot name="header"></slot>
		<el-form label-width="120px">
			<el-row :gutter="20">
				<template v-for="item in formItems" :key="item.label">
					<el-col v-bind="colLayout">
						<el-form-item
							v-if="!item.isHidden"
							:label="item.label"
							:style="itemStyle"
							:rules="item.rules"
							label-width="100px"
						>
							<template
								v-if="item.type === 'input' || item.type === 'password'"
							>
								<el-input
									:placeholder="item.placeholder"
									:show-password="item.type === 'password'"
									:model-value="modelValue[`${item.field}`]"
									@update:modelValue="handleValueChange($event, item.field)"
								/>
							</template>
							<template v-if="item.type === 'select'">
								<el-select
									:placeholder="item.placeholder"
									:model-value="modelValue[`${item.field}`]"
									@update:modelValue="handleValueChange($event, item.field)"
									style="width: 100%"
								>
									<el-option
										v-for="option in item.options"
										:key="option.value"
										:value="option.value"
										>{{ option.title }}</el-option
									>
								</el-select>
							</template>
							<template v-if="item.type === 'datepicker'">
								<el-date-picker
									v-bind="item.otherOptions"
									:model-value="modelValue[`${item.field}`]"
									@update:modelValue="handleValueChange($event, item.field)"
									style="width: 100%"
								>
								</el-date-picker>
							</template>
						</el-form-item>
					</el-col>
				</template>
			</el-row>
		</el-form>
		<slot name="footer"></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
	props: {
		modelValue: {
			type: Object,
			required: true
		},
		formItems: {
			type: Array as PropType<IFormItem[]>,
			default: () => []
		},
		itemStyle: {
			type: Object,
			default: () => ({ padding: '80px 80px' })
		},
		colLayout: {
			type: Object,
			default: () => ({
				xl: 6, // > 1920px span = 6
				lg: 8,
				md: 12,
				sm: 24,
				xs: 24
			})
		}
	},
	emit: ['update:modelValue'],
	setup(props, { emit }) {
		// const formData = ref({ ...props.modelValue })

		// watch(
		// 	formData,
		// 	(newValue) => {
		// 		emit('update:modelValue', newValue)
		// 	},
		// 	{ deep: true }
		// )

		const handleValueChange = (value: any, field: string) => {
			emit('update:modelValue', { ...props.modelValue, [field]: value })
		}

		return { handleValueChange }
	}
})
</script>

<style lang="less" scoped>
.cl-form {
	padding-top: 22px;
}
</style>
