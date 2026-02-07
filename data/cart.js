export const cart = new Map();

export function addToCart(productId) {
    if(cart.has(productId)){
        cart.set(productId, cart.get(productId)+1)
    }else{
        cart.set(productId, 1)
    }
}

export function removeFromCart(productId) {
    cart.delete(productId);
}