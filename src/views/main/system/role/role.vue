<template>
	<div class="user">
		<page-search :searchFormConfig="searchFormConfig"></page-search>
		<page-content
			:contentTableConfig="contentTableConfig"
			pageName="role"
			@handleNewClick="handleNewClick"
			@handleEditClick="handleEditClick"
		></page-content>
		<page-model
			ref="pageModelRef"
			:defaultInfo="defaultInfo"
			:modelFormConfig="modelFormConfig"
			pageName="role"
			:otherInfo="otherInfo"
		>
			<div class="menu-tree">
				<el-tree
					ref="elTreeRef"
					:data="menus"
					node-key="id"
					:props="{ children: 'children', label: 'name' }"
					show-checkbox
					@check="handleCheckChange"
				/></div
		></page-model>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { mapMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/table.config'
import { modelFormConfig } from './config/model.config'

import { usePageModel } from '@/hooks/use-page-model'

export default defineComponent({
	components: { PageSearch, PageContent, PageModel },
	setup() {
		const elTreeRef = ref<InstanceType<typeof ElTree>>()
		const editCallback = (item: any) => {
			const leafKeys = mapMenuLeafKeys(item.menuList)
			nextTick(() => {
				console.log(leafKeys)

				elTreeRef.value?.setCheckedKeys(leafKeys, false)
			})
		}

		const [pageModelRef, defaultInfo, handleNewClick, handleEditClick] =
			usePageModel(undefined, editCallback)

		const store = useStore()
		const menus = computed(() => store.state.entireMenu)

		const otherInfo = ref({})
		const handleCheckChange = (data1: any, data2: any) => {
			const checkedKeys = data2.checkedKeys
			const halfCheckedKeys = data2.halfCheckedKeys
			const menuList = [...checkedKeys, ...halfCheckedKeys]

			otherInfo.value = { menuList }
		}
		return {
			searchFormConfig,
			contentTableConfig,
			modelFormConfig,
			pageModelRef,
			defaultInfo,
			handleNewClick,
			handleEditClick,
			handleCheckChange,
			menus,
			otherInfo,
			elTreeRef
		}
	}
})
</script>

<style lang="less" scoped>
.menu-tree {
	margin-left: 50px;
}
</style>
