import { cart, removeFromCart, calcCartQuantity, calcCartCost, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { roundTo2 } from "./utils/Math.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions } from "../data/deliveryOptions.js";


const qtnHeader = document.querySelector(".js-middle-cart-qtn");
let itemsSummaryQtn = document.getElementById("items-summary-row-qtn");
let cartSummaryHTML = '';

cart.forEach((productData, key) => {
    let matchingProduct;

    products.forEach((product) => {
        if(product.id === key) {
            matchingProduct = product;
        }
    })

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src=${matchingProduct.image}>

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ₨ ${matchingProduct.price}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${productData.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id=${matchingProduct.id}>
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, productData.deliveryOptionId)}
                </div>
            </div>
        </div>
    `
})

function deliveryOptionsHTML(matchingProduct, deliveryOptionId) {
    const today = dayjs();
    let html = ``;

    deliveryOptions.forEach((deliveryOption) => {
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.price
        === 0 
            ? 'FREE Shipping' 
            : `₨ ${deliveryOption.price} - Shipping`;
        
        html +=
            `
            <div class="delivery-option">
                <input ${deliveryOption.id === deliveryOptionId ? 'checked' : ''} type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-delivery-id=${deliveryOption.id}>
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString}
                    </div>
                </div>
            </div>
            `
    })

    return html;
}

document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

let deliveryOptionButtons = document.querySelectorAll('.delivery-option-input');

deliveryOptionButtons.forEach((button) => {
    button.addEventListener('change', (event) => {
        updateOrderSummary();
        saveToStorage();
    })
})

document.querySelectorAll(".js-delete-link")
    .forEach((link) => {
        link.addEventListener('click', () => {
            removeFromCart(link.dataset.productId);
            document.querySelector(`.js-cart-container-${link.dataset.productId}`).remove();
            updateQtn();
        })
    });

function updateQtn() {
    let qtn = calcCartQuantity();

    qtnHeader.textContent = `${qtn} items`;
    itemsSummaryQtn.textContent = `Items (${qtn})`;
    updateOrderSummary();
}

updateQtn()

function updateOrderSummary() {
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