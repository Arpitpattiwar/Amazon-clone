import { cart, removeFromCart, saveToStorage, updateItemQtn } from "../data/cart.js";
import { products } from "../data/products.js";
import { getDateString } from "./utils/Math.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { updateOrderSummary, updateQtn } from "./checkout/orderSummary.js";

let cartSummaryHTML = '';

cart.forEach((productData, key) => {
    let matchingProduct;

    products.forEach((product) => {
        if(product.id === key) {
            matchingProduct = product;
        }
    })

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date-${matchingProduct.id}">
                Delivery date: ${getDateString(deliveryOptions, cart.get(matchingProduct.id).deliveryOptionId)}
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
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cart.get(matchingProduct.id).quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                        Update
                    </span>
                    <input id="quantity-input-${matchingProduct.id}" class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                        Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
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
    let html = ``;

    deliveryOptions.forEach((deliveryOption) => {
        const dateString = getDateString(deliveryOptions, deliveryOption.id);
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
        const productId = event.target.name.split("delivery-option-")[1];
        cart.get(productId).deliveryOptionId = Number(event.target.dataset.deliveryId);
        
        let itemDeliveryDate = document.querySelector(`.js-delivery-date-${productId}`);
        itemDeliveryDate.textContent = `Delivery date: ${getDateString(deliveryOptions, cart.get(productId).deliveryOptionId)}`
        updateOrderSummary(deliveryOptions);
        saveToStorage();
    })
})

document.querySelectorAll(".js-delete-link")
    .forEach((link) => {
        link.addEventListener('click', () => {
            removeFromCart(link.dataset.productId);
            document.querySelector(`.js-cart-item-container-${link.dataset.productId}`).remove();
            updateQtn();
        })
    });

updateQtn()

document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

            const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
        });
    }
);

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');
      
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      updateItemQtn(productId, newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateOrderSummary()
    });
  }
);