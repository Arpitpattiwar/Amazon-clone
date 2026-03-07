import { orders } from "../data/orders.js";
import { formatDate } from "./utils/time.js";
import { products, loadProducts } from "../data/products.js";

let productGrid = document.querySelector(".orders-grid");

loadOrders();

async function loadOrders() {
    let html = ''

    await loadProducts();

    orders.forEach((order) => {
        html += createOrderElement(order);
    })

    productGrid.innerHTML = html;

    enableTrackPackageBtn();
}

function createOrderElement(order) {
    let html = '';

    html += `<div class="order-container">
        
        <div class="order-header">
        <div class="order-header-left-section">
            <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${formatDate(order.orderDate)}</div>
            </div>
            <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>Rs. ${order.totalCostCents}</div>
            </div>
        </div>

        <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
        </div>
        </div>

        <div class="order-details-grid">
            ${order.products.map((item) => {
                return itemHTML(item, order);
            }).join('')}
        </div>
    </div>
    `
    ;

    return html; 
}

function itemHTML(item, order) {
    let matchingProduct;
    
    products.forEach((product) => {
        if(product.id == item.productId){
            matchingProduct = product;
        }
    })
    
    return `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatDate(item.deliveryDate)}
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a>
            <button class="track-package-button button-secondary js-track-package" data-order-id=${order.id} data-product-id=${item.productId}>
              Track package
            </button>
          </a>
        </div>
      `;
}

function enableTrackPackageBtn() {
    document.querySelectorAll('.js-track-package').forEach((button) => {
        button.addEventListener('click', (event) => {
            const orderId = event.target.dataset.orderId;
            const productId = event.target.dataset.productId;
            window.location.href = `tracking.html?orderId=${orderId}&productId=${productId}`;
        });
    });
}