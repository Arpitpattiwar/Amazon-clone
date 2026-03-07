import { getOrderById } from "../data/orders.js";
import { getProductById, loadProducts } from "../data/products.js";
import { formatDate } from "./utils/time.js";
import { calcCartQuantity } from "../data/cart.js";

let orderBox = document.querySelector(".js-order-box");
let cartQtn = document.body.querySelector(".cart-quantity");

loadPage();

async function loadPage() {
	await loadProducts();

	const url = new URL(window.location.href);
	const orderId = url.searchParams.get('orderId');
	const productId = url.searchParams.get('productId');

	orderBox.innerHTML = getHTML(orderId, productId);
}

function getHTML(orderId, productId) {
	let order = getOrderById(orderId);
	let productDetails = getProductById(productId);

	let orderDetails = order.products.find((item) => item.productId === productId);

	return `
		<a class="back-to-orders-link link-primary" href="orders.html">
		  View all orders
		</a>

		<div class="delivery-date">
		  ${formatDate(order.deliveryDate)}
		</div>

		<div class="product-info">
		  ${productDetails.name}
		</div>

		<div class="product-info">
		  Quantity: ${orderDetails?.quantity || 1}
		</div>

		<img class="product-image" src=${productDetails.image}>

		<div class="progress-labels-container">
		  <div class="progress-label">
			Preparing
		  </div>
		  <div class="progress-label current-status">
			Shipped
		  </div>
		  <div class="progress-label">
			Delivered
		  </div>
		</div>

		<div class="progress-bar-container">
		  <div class="progress-bar"></div>
		</div>
	`
}

function updateCartQtn() {
	cartQtn.textContent = calcCartQuantity();
}

updateCartQtn();