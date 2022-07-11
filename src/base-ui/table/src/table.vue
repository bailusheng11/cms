<template>
	<div class="table">
		<div class="header">
			<div>{{ title }}</div>
			<div><slot name="header"></slot></div>
		</div>
		<el-table
			:data="listData"
			border
			style="width: 100%"
			@selection-change="handleSelectChange"
			v-bind="childrenProps"
		>
			<el-table-column
				type="selection"
				align="center"
				v-if="showIndexColumn"
			></el-table-column>
			<el-table-column
				v-if="showSelectColumn"
				type="index"
				label="序号"
				width="60"
				align="center"
			></el-table-column>
			<template v-for="propItem in propList" :key="propItem.prop">
				<el-table-column
					v-bind="propItem"
					align="center"
					:show-overflow-tooltip="true"
				>
					<template #default="scope">
						<slot :name="propItem.slotName" :row="scope.row">
							{{ scope.row[propItem.prop] }}
						</slot>
					</template>
				</el-table-column>
			</template>
			<slot name="footer"></slot>
		</el-table>
		<div class="footer" v-if="showFooter">
			<slot name="footer">
				<el-pagination
					:page-sizes="[10, 20, 30, 40]"
					:page-size="page.pageSize"
					:current-page="page.currentPage"
					layout="total, sizes, prev, pager, next, jumper"
					:total="listCount"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		title: {
			type: String,
			default: '用户'
		},
		listData: {
			type: Array,
			required: true
		},
		listCount: {
			type: Number,
			default: 0
		},
		propList: {
			type: Array,
			required: true
		},
		showIndexColumn: {
			type: Boolean,
			default: false
		},
		showSelectColumn: {
			type: Boolean,
			default: false
		},
		page: {
			type: Object,
			default: () => ({ currentPage: 1, pageSize: 10 })
		},
		childrenProps: {
			type: Object,
			default: () => ({})
		},
		showFooter: {
			type: Boolean,
			default: true
		}
	},
	emits: ['handleSelectChange', 'update:page'],
	setup(props, { emit }) {
		const handleSelectChange = (value: any) => {
			console.log(value)
			emit('handleSelectChange', value)
		}

		const handleCurrentChange = (currentPage: number) => {
			// console.log(currentPage)
			emit('update:page', { ...props.page, currentPage })
		}

		const handleSizeChange = (pageSize: number) => {
			// console.log(pageSize)
			emit('update:page', { ...props.page, pageSize })
		}

		return { handleSelectChange, handleSizeChange, handleCurrentChange }
	}
})
</script>

<style lang="less" scoped>
.table {
	padding: 20px;
	.header {
		display: flex;
		justify-content: space-between;
	}
}
</style>
