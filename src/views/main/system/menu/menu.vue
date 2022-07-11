<template>
	<div class="user">
		<page-search
			:searchFormConfig="searchFormConfig"
			@resetBtnClick="handleResetClick"
			@searchBtnClick="handleSearchClick"
		></page-search>
		<page-content
			:contentTableConfig="contentTableConfig"
			pageName="menu"
			ref="pageContentRef"
			@handleNewClick="handleNewClick"
			@handleEditClick="handleEditClick"
		></page-content>
		<page-model
			ref="pageModelRef"
			:modelFormConfig="modelFormConfig"
			:defaultInfo="defaultInfo"
			pageName="menu"
		>
		</page-model>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

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

		const [pageModelRef, defaultInfo, handleNewClick, handleEditClick] =
			usePageModel()

		return {
			handleResetClick,
			handleSearchClick,
			pageContentRef,
			pageModelRef,
			defaultInfo,
			handleNewClick,
			handleEditClick,
			searchFormConfig,
			contentTableConfig,
			modelFormConfig
		}
	}
})
</script>

<style lang="less" scoped></style>
