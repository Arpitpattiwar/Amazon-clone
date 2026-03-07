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

export function getOrderById(orderId) {
    let matchedOrder;

    orders.forEach(order => {
        if (order.id === orderId) {
            matchedOrder = order;
        }
    });
    
    return matchedOrder || null;
}