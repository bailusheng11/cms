<template>
	<div class="rose-echart">
		<base-echart :options="options"></base-echart>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'

import { IDataType } from '../types'

const props = defineProps<{
	roseData: IDataType[]
}>()

const options = computed(() => {
	return {
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)'
		},
		// legend: {
		// 	left: 'center',
		// 	top: 'bottom',
		// 	data: [
		// 		'rose1',
		// 		'rose2',
		// 		'rose3',
		// 		'rose4',
		// 		'rose5',
		// 		'rose6',
		// 		'rose7',
		// 		'rose8'
		// 	]
		// },
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		series: [
			{
				name: 'Radius Mode',
				type: 'pie',
				radius: [10, 100],
				center: ['50%', '50%'],
				roseType: 'radius',
				itemStyle: {
					borderRadius: 5
				},
				label: {
					show: true
				},
				emphasis: {
					label: {
						show: true
					}
				},
				data: props.roseData
			}
		]
	}
})
</script>

<style lang="less" scoped></style>
