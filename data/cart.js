import { products } from "./products.js";

let cartQtn = document.body.querySelector(".cart-quantity");

export const cart = loadCart();

export function addToCart(productId) {
    let qtn = document.getElementById(`qtn-${productId}`).value;

    if(cart.has(productId)){
        cart.set(productId, cart.get(productId)+Number(qtn))
    }else{
        cart.set(productId, Number(qtn))
    }

    saveToStorage()
}

export function removeFromCart(productId) {
    cart.delete(productId);
    saveToStorage();
}

function saveToStorage() {
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
    
    cart.forEach((value) => {
        totalQuantity += value;
    })

    return totalQuantity;
}

export function updateCartQtn() {
    let cartQuantity = 0;
    cart.forEach((value) => 
        cartQuantity += value
    )

    cartQtn.innerText = cartQuantity ? cartQuantity : '';
}

export function calcCartCost() {
    let totalCost = 0;
    cart.forEach((qtn, id) => {
        let matchingProductPrice;
        products.forEach((product) => {
            if(product.id == id) {
                matchingProductPrice = product.price;
            }
        })

        totalCost += matchingProductPrice * qtn;
    })

    return totalCost;
}