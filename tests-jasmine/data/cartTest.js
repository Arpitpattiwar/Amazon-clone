import { addToCart, cart,removeFromCart } from "../../data/cart.js";

describe('test suite: addToCart ', () => {
    it('adds a new product to thecart', () => {
        spyOn(localStorage, 'setItem').and.callFake(() => {
            return;
        })

        spyOn(document, 'getElementById').and.callFake((id) => {
            if (id == 'qtn-sample_item') {
                return { value: 1 };
            }
        });

        let currSize = cart.size;
        addToCart('sample_item');
        expect(cart.size).toBe(currSize+1);
        expect(cart.get('sample_item')).toEqual({quantity: 1, deliveryOptionId: 1});
    })

    it('adds an existing product to the cart', () => {
        removeFromCart('sample_item');
        spyOn(document, 'getElementById').and.callFake((id) => {
            if (id == 'qtn-sample_item') {
                return { value: 1 };
            }
        });

        let currSize = cart.size;
        addToCart('sample_item');
        addToCart('sample_item');

        expect(cart.size).toBe(currSize+1);
        expect(cart.get('sample_item')).toEqual({quantity: 2, deliveryOptionId: 1});
        removeFromCart('sample_item');
    })
})