let productGrid = document.body.querySelector(".products-grid");
let cartQtn = document.body.querySelector(".cart-quantity");

let productsHTML = ''

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            ₨ ${product.price}
        </div>

        <div class="product-quantity-container">
            <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
         Add to Cart
        </button>
    </div>`
})

productGrid.innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart")
    .forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            
            if(cart.has(productId)){
                cart.set(productId, cart.get(productId)+1)
            }else{
                cart.set(productId, 1)
            }

            let cartQuantity = 0;
            cart.forEach((value) => 
                cartQuantity += value
            )

            cartQtn.innerText = cartQuantity;
        })
    })