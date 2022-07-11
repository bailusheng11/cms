//npm install dayjs

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
	uctString: string,
	format: string = DATE_TIME_FORMAT
): string {
	return dayjs.utc(uctString).format(format)
}
