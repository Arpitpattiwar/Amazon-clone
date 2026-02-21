import { updateQtn } from "../scripts/checkout/orderSummary.js";

let cartQtn = document.body.querySelector(".cart-quantity");

function Cart(storageKey) {
	const cart = {
		cartItems: loadCart(storageKey),

		addToCart(productId) {
			let qtn = document.getElementById(`qtn-${productId}`).value;

			if(this.cartItems.has(productId)){
				this.cartItems.set(productId, {
					quantity: this.cartItems.get(productId).quantity + Number(qtn),
					deliveryOptionId: this.cartItems.get(productId).deliveryOptionId
				})
			}else{
				this.cartItems.set(productId, {
					quantity: Number(qtn), 
					deliveryOptionId: 1
				})
			}

			this.saveToStorage()
		},

		removeFromCart(productId) {
			this.cartItems.delete(productId);
			this.saveToStorage();
		},

		saveToStorage() {
			localStorage.setItem(this.storageKey, JSON.stringify(Array.from(this.cartItems.entries())));
		},

		loadCart(storageKey) {
			try {
				if (typeof localStorage === 'undefined') {
					return new Map();
				}
				const raw = localStorage.getItem(storageKey);
				if (!raw) {
					return new Map();
				}
				const parsed = JSON.parse(raw);
				const entries = Array.isArray(parsed) ? parsed : [];
				return new Map(entries);
			} catch (error) {
				return new Map();
			}
		},

		calcCartQuantity() {
			let totalQuantity = 0;
			
			this.cartItems.forEach((productData) => {
				totalQuantity += productData.quantity;
			})

			return totalQuantity;
		},

		updateItemQtn(productId, qtn) {
			this.cartItems.get(productId).quantity = qtn;
			this.saveToStorage();
			updateQtn();
		},

		updateCartQtn() {
			cartQtn.textContent = this.calcCartQuantity();
		}
	};

	return cart;
}

const cart = Cart('cart-oop');
const business = Cart('business-cart');


