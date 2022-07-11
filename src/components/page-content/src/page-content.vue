<template>
	<div class="content">
		<cl-table
			:listData="userList"
			:listCount="userCount"
			v-bind="contentTableConfig"
			v-model:page="pageInfo"
		>
			<template #header>
				<el-button
					type="primary"
					size="default"
					v-if="isCreate"
					@click="handleNewClick"
					>新建用户</el-button
				>
			</template>
			<template #status="scope">
				<el-button :type="scope.row.enable ? 'success' : 'danger'">{{
					scope.row.enable ? '启用' : '禁用'
				}}</el-button>
			</template>
			<template #createAt="scope">
				<strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
			</template>
			<template #updateAt="scope">
				<strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
			</template>
			<template #handler="scope">
				<div class="handle-btns">
					<el-button
						type="text"
						v-if="isUpdate"
						@click="handleEditClick(scope.row)"
						>编辑</el-button
					>
					<el-button
						type="text"
						v-if="isDelete"
						@click="handlerDeleteClick(scope.row)"
						>删除</el-button
					>
				</div>
			</template>
			<template
				v-for="item in otherPropSlots"
				:key="item.prop"
				#[item.slotName]="scope"
			>
				<template v-if="item.slotName">
					<slot :name="item.slotName" :row="scope.row"></slot>
				</template>
			</template>
		</cl-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import ClTable from '@/base-ui/table'
import { useStore } from 'vuex'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
	components: { ClTable },
	props: {
		contentTableConfig: {
			type: Object,
			required: true
		},
		pageName: {
			type: String,
			required: true
		}
	},
	emits: ['handleNewClick', 'handleEditClick'],
	setup(props, { emit }) {
		const store = useStore()

		// 0.获取操作的权限
		const isCreate = usePermission(props.pageName, 'create')
		const isUpdate = usePermission(props.pageName, 'update')
		const isDelete = usePermission(props.pageName, 'delete')
		const isQuery = usePermission(props.pageName, 'query')

		// 1.双向绑定pageInfo
		const pageInfo = ref({ currentPage: 1, pageSize: 10 })
		watch(pageInfo, () => getPageData())

		// 发送网络请求
		const getPageData = (queryInfo: any = {}) => {
			if (!isQuery) return
			store.dispatch('system/getPageListAction', {
				pageName: props.pageName,
				queryInfo: {
					offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
					size: pageInfo.value.pageSize,
					...queryInfo
				}
			})
		}

		getPageData()

		const otherPropSlots = props.contentTableConfig?.propList.filter(
			(item: any) => {
				if (item.slotName === 'status') return false
				if (item.slotName === 'createAt') return false
				if (item.slotName === 'updateAt') return false
				if (item.slotName === 'handler') return false
				return true
			}
		)

		const userList = computed(() =>
			store.getters['system/pageListData'](props.pageName)
		)
		const userCount = computed(() =>
			store.getters['system/pageListCount'](props.pageName)
		)

		// 5.删除/编辑/新建操作
		const handlerDeleteClick = (item: any) => {
			// console.log(item)
			store.dispatch('system/getPageListAction', {
				pageName: props.pageName,
				id: item.id
			})
		}

		const handleNewClick = () => {
			console.log('dialog')
			emit('handleNewClick')
		}

		const handleEditClick = (item: any) => {
			console.log('dialog')
			emit('handleEditClick', item)
		}

		return {
			userList,
			userCount,
			getPageData,
			pageInfo,
			otherPropSlots,
			isCreate,
			isUpdate,
			isDelete,
			handlerDeleteClick,
			handleNewClick,
			handleEditClick
		}
	}
})
</script>

<style lang="less" scoped>
.content {
	padding: 20px;
	border-top: 2px solid #f5f5f5;
}
</style>
