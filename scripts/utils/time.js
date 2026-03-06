import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

let today = dayjs()

export function getDateString(deliveryOptions, deliveryOption) {
	const deliveryDate = today.add(deliveryOptions.get(String(deliveryOption)).deliveryDays, 'days');
	return deliveryDate.format('dddd, MMMM D');
}

export function formatTime(time) {
	return dayjs(time)
		.format('MMMM D');
}
