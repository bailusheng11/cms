import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { CLRequestInterface, CLRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class CLRequest {
	instance: AxiosInstance
	interceptors?: CLRequestInterface
	loading?: LoadingInstance
	showLoading: boolean

	constructor(config: CLRequestConfig) {
		// 创建axios实例
		this.instance = axios.create(config)
		// 保存基本信息
		this.interceptors = config.interceptors
		this.showLoading = config.showLoading ?? DEFAULT_LOADING

		// 使用拦截器
		// 从config中取出的拦截器是对应实例的拦截器
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		)

		// 添加所有的实例都有的拦截器
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		)

		this.instance.interceptors.request.use(
			(config) => {
				// console.log('所有的请求成功')
				if (this.showLoading) {
					this.loading = ElLoading.service({
						lock: true,
						text: '正在请求数据...',
						background: 'rgba(0, 0, 0, 0.5)'
					})
				}
				return config
			},
			(err) => {
				// console.log('所有的请求成失败')
				this.loading?.close()
				return err
			}
		)

		this.instance.interceptors.response.use(
			(res) => {
				// console.log('所有的响应成功')
				this.loading?.close()

				const data = res.data
				if (data.returnCode === '-1001') {
					console.log('请求失败~，错误信息')
				} else {
					return data
				}
			},
			(err) => {
				// console.log('所有的响应失败')
				this.loading?.close()
				return err
			}
		)
	}

	request<T = any>(config: CLRequestConfig<T>): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			{
				if (config.interceptors?.requestInterceptor) {
					config = config.interceptors.requestInterceptor(config)
				}
				// 判断是否需要显示loading
				if (config.showLoading == false) {
					this.showLoading = false
				}

				this.instance
					.request<any, T>(config)
					.then((res) => {
						// 单个请求对数据的处理
						if (config.interceptors?.responseInterceptor) {
							res = config.interceptors.responseInterceptor(res)
						}
						// 将showloading重置，不会影响到下一个请求
						this.showLoading = DEFAULT_LOADING
						resolve(res)
					})
					.catch((err) => {
						this.showLoading = DEFAULT_LOADING
						reject(err)
						return err
					})
			}
		})
	}

	get<T = any>(config: CLRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' })
	}

	post<T = any>(config: CLRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' })
	}

	delete<T = any>(config: CLRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' })
	}

	patch<T = any>(config: CLRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PATCH' })
	}
}

export default CLRequest
