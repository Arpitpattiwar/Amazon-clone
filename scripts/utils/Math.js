import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

let today = dayjs()

export function formatMoney(num) {
    return num.toFixed(2);
}

export function getDateString(deliveryOptions,deliveryOption) {
    const deliveryDate = today.add(deliveryOptions.get(Number(deliveryOption)).deliveryDays, 'days');
    return deliveryDate.format('dddd, MMMM D');
}