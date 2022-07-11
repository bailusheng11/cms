<template>
	<div class="goods">
		<page-search
			:searchFormConfig="searchFormConfig"
			@resetBtnClick="handleResetClick"
			@searchBtnClick="handleSearchClick"
		></page-search>
		<page-content :contentTableConfig="contentTableConfig" pageName="goods">
			<template #image="scope">
				<el-image
					style="width: 100px; height: 100px"
					:src="scope.row.imgUrl"
					:preview-src-list="[scope.row.imgUrl]"
				/>
			</template>
			<template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>
			<template #newPrice="scope">{{ '￥' + scope.row.newPrice }}</template>
		</page-content>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/table.config'

import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
	components: { PageSearch, PageContent },
	setup() {
		const [handleResetClick, handleSearchClick, pageContentRef] =
			usePageSearch()

		return {
			searchFormConfig,
			contentTableConfig,
			handleResetClick,
			handleSearchClick,
			pageContentRef
		}
	}
})
</script>

<style lang="less" scoped></style>
