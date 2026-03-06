import { orders } from "../data/orders.js";
import { formatTime } from "./utils/time.js";
import { products, loadProducts } from "../data/products.js";

let productGrid = document.querySelector(".orders-grid");

loadOrders();

async function loadOrders() {
    let html = ''

    await loadProducts();

    orders.forEach((order) => {
        html += createOrderElement(order);
    })
    console.log(orders)

    productGrid.innerHTML = html;
}

function createOrderElement(order) {
    let html = '';

    html += `<div class="order-container">
        
        <div class="order-header">
        <div class="order-header-left-section">
            <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${formatTime(order.orderDate)}</div>
            </div>
            <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>Rs. ${order.totalCostCent}</div>
            </div>
        </div>

        <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
        </div>
        </div>

        <div class="order-details-grid">
            ${order.products.map((item) => {
                return itemHTML(item);
            }).join('')}
        </div>
    </div>
    `
    ;

    return html; 
}

function itemHTML(item) {
    let matchingProduct;
    
    products.forEach((product) => {
        if(product.id == item.productId){
            matchingProduct = product;
        }
    })
    
    console.log(item);

    return `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatTime(item.deliveryDate)}
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
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
}