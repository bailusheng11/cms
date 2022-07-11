<template>
	<div class="nav-header">
		<el-icon :size="28" @click="clickFold">
			<Fold v-if="isFold" />
			<Expand v-else />
		</el-icon>
		<div class="content">
			<bread-crumb :breadcrumbs="breadcrumbs" />
			<user-info />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import BreadCrumb, { IBreadCrumb } from '@/base-ui/breadCrumb'
import UserInfo from './user-info.vue'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'NavHeader',
	components: { UserInfo, BreadCrumb },
	emits: ['foldChange'],
	setup(props, { emit }) {
		const isFold = ref(false)
		const clickFold = () => {
			isFold.value = !isFold.value
			emit('foldChange', isFold.value)
		}

		const store = useStore()
		const breadcrumbs = computed(() => {
			const userMenus = store.state.login.userMenus
			const route = useRoute()
			const currentPath = route.path
			return pathMapBreadcrumbs(userMenus, currentPath)
		})

		return {
			isFold,
			clickFold,
			breadcrumbs
		}
	}
})
</script>

<style lang="less" scoped>
.nav-header {
	display: flex;
	width: 100%;
	text-align: center;
	align-items: center;
	vertical-align: middle;
	.el-icon {
		// margin-right: 8px;
	}
	.content {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
		margin: 0 10px;
	}
}
</style>
