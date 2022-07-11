<template>
	<div class="department">
		<page-search :searchFormConfig="searchFormConfig"></page-search>
		<page-content
			:contentTableConfig="contentTableConfig"
			pageName="department"
		></page-content>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/table.config'

export default defineComponent({
	components: { PageSearch, PageContent },
	setup() {
		return {
			searchFormConfig,
			contentTableConfig
		}
	}
})
</script>

<style lang="less" scoped></style>
