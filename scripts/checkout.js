import { cart, removeFromCart, calcCartQuantity, calcCartCost } from "../data/cart.js";
import { products } from "../data/products.js";
import { roundTo2 } from "./utils/Math.js";

let itemsSummaryQtn = document.getElementById("items-summary-row-qtn");
let cartSummaryHTML = '';

cart.forEach((value, key) => {
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
                    Quantity: <span class="quantity-label">${value}</span>
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
                <div class="delivery-option">
                    <input type="radio" checked="" class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-shipping-cost='0'>
                    <div>
                        <div class="delivery-option-date">
                            Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                            FREE Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-shipping-cost='49'>
                    <div>
                        <div class="delivery-option-date">
                            Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                            ₨ 49 - Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-shipping-cost='99'>
                    <div>
                        <div class="delivery-option-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            ₨ 99 - Shipping
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `
})

document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

let deliveryOptionButtons = document.querySelectorAll('.delivery-option-input');

deliveryOptionButtons.forEach((button) => {
    button.addEventListener('change', () => {
        updateOrderSummary();
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

const qtnHeader = document.querySelector(".js-middle-cart-qtn");

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

    cart.forEach((qtn, productId) => {
        let selectedRadio = document.querySelector(`input[name="delivery-option-${productId}"]:checked`);
        shippingCost += Number(selectedRadio.dataset.shippingCost);
    })

    paymentSummaryMoney[0].textContent = `₨ ${cartCost}`;
    paymentSummaryMoney[1].textContent = `₨ ${shippingCost}`;
    paymentSummaryMoney[2].textContent = `₨ ${cartCost + shippingCost}`;
    paymentSummaryMoney[3].textContent = `₨ ${roundTo2((cartCost + shippingCost) * 0.1)}`;
    paymentSummaryMoney[4].textContent = `₨ ${roundTo2((cartCost + shippingCost) * 1.1)}`;  
}