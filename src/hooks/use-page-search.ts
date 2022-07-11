import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
	const pageContentRef = ref<InstanceType<typeof PageContent>>()

	const handleResetClick = () => {
		pageContentRef.value?.getPageData()
	}

	const handleSearchClick = (queryInfo: any) => {
		console.log('souzuo1')
		pageContentRef.value?.getPageData(queryInfo)
		console.log('souzuo')
	}
	return [pageContentRef, handleResetClick, handleSearchClick]
}
