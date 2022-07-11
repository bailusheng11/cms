<template>
	<div class="rose-echart">
		<base-echart :options="options"></base-echart>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IDataType } from '../types'

import { convertData } from '../utils/convert-data'

const props = withDefaults(
	defineProps<{
		title?: string
		mapData: IDataType[]
	}>(),
	{
		title: ''
	}
)

const options = computed(() => {
	return {
		backgroundColor: 'transparent',
		title: {
			text: '全国主要城市空气质量',

			left: 'center',
			textStyle: {
				color: '#fff'
			}
		},
		tooltip: {
			trigger: 'item'
		},
		visualMap: {
			min: 0,
			max: 60000,
			left: 20,
			bottom: 20,
			calculable: true,
			text: ['高', '低'],
			inRange: {
				color: ['rgb(70,240,252)', 'rgb(250,220,46)', 'rgb(245,38,186)']
			},
			textStyle: {
				color: '#fff'
			}
		},
		geo: {
			map: 'china',
			roam: 'scale',
			emphasis: {
				areaColor: '#f4cccc',
				borderColor: 'rgb(9,54,95)',
				itemStyle: {
					areaColor: '#f4cccc'
				}
			}
		},
		series: [
			{
				name: '销售',
				type: 'scatter',
				coordinateSystem: 'geo',
				data: convertData(props.mapData),
				encode: {
					value: 2
				},
				label: {
					formatter: '{b}',
					position: 'right'
				},
				itemStyle: {
					color: '#ddb926'
				},
				emphasis: {
					label: {
						show: true
					}
				}
			},
			{
				type: 'map',
				map: 'china',
				geoIndex: 0,
				aspectScale: 0.75,
				tooltip: {
					show: false
				}
			}
		]
	}
})
</script>

<style lang="less" scoped></style>
