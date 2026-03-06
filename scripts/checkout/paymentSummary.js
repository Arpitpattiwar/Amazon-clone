import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../utils/deliveryOptions.js";

// document.querySelector('.js-place-order').addEventListener('click', async () => {
// 	let cartArray = getCartArray();

// 	const response = await fetch('https://supersimplebackend.dev/orders', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json' 
// 			},
// 			body: JSON.stringify({
// 				cart: cartArray
// 			})
// 		})

// 	const order = await response.json();

// 	console.log(order)
// })

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