class Product {
  id;
  image;
  name;
  rating;
  price;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.price = productDetails.price;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `₨ ${this.price}`;
  }

  clothingExtraInfo() {
    return "";
  }

  applianceExtraInfo() {
    return "";
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  clothingExtraInfo() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size Chart
      </a>`;
  }
}

class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  applianceExtraInfo() {
    return `
      <a href="${this.instructionsLink}" target="_blank">
        Instructions
      </a>
      <a href="${this.warrantyLink}" target="_blank">
        Warranty
      </a>`;
  }
}

export let products = [];

export function loadProducts() {
  const promise = fetch("http://127.0.0.1:8000/products")
    .then((response) => {
      return response.json();
    })
    .then((productsData) => {
      products = productsData.map((productDetails) => {
        if (productDetails.type == "clothing") {
          return new Clothing(productDetails);
        } else if (productDetails.type == "Appliance") {
          return new Appliance(productDetails);
        } else {
          return new Product(productDetails);
        }
      });
    });

  return promise;
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId);
}
