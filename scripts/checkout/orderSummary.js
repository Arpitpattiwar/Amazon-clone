import { calcCartQuantity } from '../../data/cart.js'; 
import { roundTo2 } from '../utils/Math.js';
import { cart } from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { calcCartCost } from './paymentSummary.js';

const qtnHeader = document.querySelector(".js-middle-cart-qtn");
const itemsSummaryQtn = document.getElementById("items-summary-row-qtn");

export function updateOrderSummary() {
    let paymentSummaryMoney = document.getElementsByClassName("payment-summary-money");
    let cartCost = calcCartCost();

    let shippingCost = 0;

    cart.forEach((productData, productId) => {
        let selectedRadio = document.querySelector(`input[name="delivery-option-${productId}"]:checked`);
        shippingCost += Number(deliveryOptions.get(Number(selectedRadio.dataset.deliveryId)).price);
    })

    paymentSummaryMoney[0].textContent = `₨ ${cartCost}`;
    paymentSummaryMoney[1].textContent = `₨ ${shippingCost}`;
    paymentSummaryMoney[2].textContent = `₨ ${cartCost + shippingCost}`;
    paymentSummaryMoney[3].textContent = `₨ ${roundTo2((cartCost + shippingCost) * 0.1)}`;
    paymentSummaryMoney[4].textContent = `₨ ${roundTo2((cartCost + shippingCost) * 1.1)}`;
}

export function updateQtn() {
    let qtn = calcCartQuantity();

    qtnHeader.textContent = `${qtn} items`;
    itemsSummaryQtn.textContent = `Items (${qtn})`;
    updateOrderSummary();
}