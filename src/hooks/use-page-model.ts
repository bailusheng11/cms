import { ref } from 'vue'
import PageModel from '@/components/page-model'

type callbackFn = (item?: any) => void

export function usePageModel(newCb?: callbackFn, editCb?: callbackFn) {
	const pageModelRef = ref<InstanceType<typeof PageModel>>()
	const defaultInfo = ref({})
	const handleNewClick = () => {
		defaultInfo.value = {}
		if (pageModelRef.value) {
			pageModelRef.value.dialogFormVisible = true
		}
		newCb && newCb()
	}
	const handleEditClick = (item: any) => {
		defaultInfo.value = item
		defaultInfo.value = { ...item }
		if (pageModelRef.value) {
			pageModelRef.value.dialogFormVisible = true
		}
		console.log(item)

		editCb && editCb(item)
	}
	return [pageModelRef, defaultInfo, handleNewClick, handleEditClick]
}
