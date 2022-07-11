<template>
	<div class="user">
		<page-search
			:searchFormConfig="searchFormConfig"
			@resetBtnClick="handleResetClick"
			@searchBtnClick="handleSearchClick"
		></page-search>
		<page-content
			:contentTableConfig="contentTableConfig"
			pageName="users"
			ref="pageContentRef"
			@handleNewClick="handleNewClick"
			@handleEditClick="handleEditClick"
		></page-content>
		<page-model
			pageName="users"
			:defaultInfo="defaultInfo"
			ref="pageModelRef"
			:modelFormConfig="modelFormConfigRef"
		></page-model>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/table.config'
import { modelFormConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'

export default defineComponent({
	components: { PageSearch, PageContent, PageModel },
	setup() {
		const [handleResetClick, handleSearchClick, pageContentRef] =
			usePageSearch()

		const newCallback = () => {
			const passwordItem = modelFormConfig.formItems.find(
				(item) => item.field === 'password'
			)
			passwordItem!.isHidden = false
			console.log('newcb')
		}
		const editCallback = () => {
			const passwordItem = modelFormConfig.formItems.find(
				(item) => item.field === 'password'
			)
			passwordItem!.isHidden = true
			console.log('editcb')
		}

		//2.动态添加部门和角色列表
		const store = useStore()
		const modelFormConfigRef = computed(() => {
			const departmentItem = modelFormConfig.formItems.find(
				(item) => item.field === 'departmentId'
			)
			departmentItem!.options = store.state.entireDepartment.map(
				(item: any) => {
					return { title: item.name, value: item.name }
				}
			)

			const roleItem = modelFormConfig.formItems.find(
				(item) => item.field === 'roleId'
			)
			roleItem!.options = store.state.entireRole.map((item: any) => {
				return { title: item.name, value: item.name }
			})
			return modelFormConfig
		})

		const [pageModelRef, defaultInfo, handleNewClick, handleEditClick] =
			usePageModel(newCallback, editCallback)

		return {
			searchFormConfig,
			contentTableConfig,
			modelFormConfigRef,
			handleResetClick,
			handleSearchClick,
			pageContentRef,
			handleNewClick,
			handleEditClick,
			pageModelRef,
			defaultInfo
		}
	}
})
</script>

<style lang="less" scoped></style>
