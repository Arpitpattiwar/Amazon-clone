export const cart = loadCart();

export function addToCart(productId) {
    if(cart.has(productId)){
        cart.set(productId, cart.get(productId)+1)
    }else{
        cart.set(productId, 1)
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