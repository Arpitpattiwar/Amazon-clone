import { deleteCart } from "./cart.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function placeOrder(order) {
    orders.unshift(order);
    saveToStorage();
    deleteCart();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}