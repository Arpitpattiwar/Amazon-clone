import { cart, getCartArray } from "../../data/cart.js";
import { getProductById } from "../../data/products.js";
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

				if(!order['errorMessage']){
					placeOrder(order);
					window.location.href = 'orders.html';
				}else{
					alert('Cart is empty!')
				}

			} catch (error) {
				alert('Unexpected error while placing order!')
			}
		})
}

export function calcCartCost() {
	let totalCost = 0;
	cart.forEach((productData, id) => {
		let matchingProductPrice = getProductById(id).price;
		totalCost += matchingProductPrice * productData.quantity;
	})

	return totalCost;
}