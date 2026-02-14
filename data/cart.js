import { updateQtn } from "../scripts/checkout/orderSummary.js";
import { products } from "./products.js";

let cartQtn = document.body.querySelector(".cart-quantity");

export const cart = loadCart();

export function addToCart(productId) {
    let qtn = document.getElementById(`qtn-${productId}`).value;

    if(cart.has(productId)){
        cart.set(productId, {
            quantity: cart.get(productId).quantity + Number(qtn),
            deliveryOptionId: cart.get(productId).deliveryOptionId
        })
    }else{
        cart.set(productId, {
            quantity: Number(qtn), 
            deliveryOptionId: 1
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

export function updateTotalItems() {
    let cartQuantity = calcCartQuantity();

    cartQtn.innerText = cartQuantity ? cartQuantity : '';
}

export function updateItemQtn(productId, qtn) {
    cart.get(productId).quantity = qtn;
    saveToStorage();
    updateQtn();
}