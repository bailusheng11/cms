<template>
	<div class="rose-echart">
		<base-echart :options="options"></base-echart>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'

const props = defineProps<{
	xLabels: string[]
	values: any[]
}>()

const options = computed(() => {
	return {
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: props.xLabels
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: props.values,
				type: 'line',
				areaStyle: {}
			}
		]
	}
})
</script>

<style lang="less" scoped></style>
