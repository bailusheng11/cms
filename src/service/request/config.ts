// const BASE_URL = 'http://lcl.org/dev'
// const BASE_NAME = 'lcl'

// const BASE_URL = 'http://lcl.org/pro'
// const BASE_NAME = 'lcc'

// const BASE_URL = 'http://lcl.org/test'
// const BASE_NAME = 'lll'

// 2--------------------------------------------------------
// 根据process.env.NODE_ENV
// 开发环境：development
// 生产环境：production
// 测试环境：test

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
	BASE_URL = '/api' // http://152.136.185.210:5000 http://123.207.32.32:8000/
} else if (process.env.NODE_ENV === 'production') {
	BASE_URL = 'http://lcl.org/pro'
} else {
	BASE_URL = 'http://lcl.org/test'
}

export { BASE_URL, TIME_OUT }
