import { cart, getCartArray } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { placeOrder } from "../../data/orders.js";

if (document.querySelector('.js-place-order')) { enableOrderBtn(); }

function enableOrderBtn() {
	document.querySelector('.js-place-order')
		.addEventListener('click', async () => {
			try {
				let cartArray = getCartArray();

				const response = await fetch('https://supersimplebackend.dev/orders', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json' 
						},
						body: JSON.stringify({
							cart: cartArray
						})
					})

				const order = await response.json();

				placeOrder(order);

				window.location.href = 'orders.html';
				
			} catch (error) {
				alert('Unexpected error while placing order!')
			}
		})
}

export function calcCartCost() {
	let totalCost = 0;
	cart.forEach((productData, id) => {
		let matchingProductPrice;
		products.forEach((product) => {
			if(product.id == id) {
				matchingProductPrice = product.price;
			}
		})

		totalCost += matchingProductPrice * productData.quantity;
	})

	return totalCost;
}