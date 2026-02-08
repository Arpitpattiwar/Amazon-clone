import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";

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