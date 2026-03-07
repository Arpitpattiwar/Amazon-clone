import { updateQtn } from "../scripts/checkout/orderSummary.js";

export const cart = loadCart();

export function addToCart(productId) {
	let qtn = document.getElementById(`qtn-${productId}`)?.value || 1;

	if(cart.has(productId)){
		cart.set(productId, {
			quantity: cart.get(productId).quantity + Number(qtn),
			deliveryOptionId: cart.get(productId).deliveryOptionId
		})
	}else{
		cart.set(productId, {
			quantity: Number(qtn), 
			deliveryOptionId: "1"
		})
	}

	saveToStorage()
}

export function removeFromCart(productId) {
	cart.delete(productId);
	saveToStorage();
}

export function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())));
}

function loadCart() {
	try {
		if (typeof localStorage === 'undefined') {
			return new Map();
		}
		const raw = localStorage.getItem('cart');
		if (!raw) {
			return new Map();
		}
		const parsed = JSON.parse(raw);
		const entries = Array.isArray(parsed) ? parsed : [];
		return new Map(entries);
	} catch {
		return new Map();
	}
}

export function calcCartQuantity() {
	let totalQuantity = 0;
	
	cart.forEach((productData) => {
		totalQuantity += productData.quantity;
	})

	return totalQuantity;
}

export function updateItemQtn(productId, qtn) {
	cart.get(productId).quantity = qtn;
	saveToStorage();
	updateQtn();
}

export function getCartArray() {
	return Array.from(cart, ([key, value]) => ({ productId: key, ...value }));
}

export function deleteCart() {
	cart.clear();
	saveToStorage();
}