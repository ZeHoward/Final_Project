const products = [
  {
    name: "Chicken Curry",
    price: 100,
    imageUrl: "chicken-curry.jpg",
    releaseDate: "2023-04-22",
  },
  {
    name: "Vegetable Soup",
    price: 85,
    imageUrl: "veg-soup.jpg",
    releaseDate: "2021-03-22",
  },
  {
    name: "Beef Stew",
    price: 150,
    imageUrl: "beef-stew.jpg",
    releaseDate: "2021-04-24",
  },
  {
    name: "Chicken Curry",
    price: 120,
    imageUrl: "chicken-curry.jpg",
    releaseDate: "2025-06-22",
  },
  {
    name: "Vegetable Soup",
    price: 45,
    imageUrl: "veg-soup.jpg",
    releaseDate: "2021-04-02",
  },
  {
    name: "Beef Stew",
    price: 130,
    imageUrl: "beef-stew.jpg",
    releaseDate: "2023-02-22",
  },
  {
    name: "Chicken Curry",
    price: 200,
    imageUrl: "chicken-curry.jpg",
    releaseDate: "2021-07-22",
  },
  {
    name: "Vegetable Soup",
    price: 185,
    imageUrl: "veg-soup.jpg",
    releaseDate: "2021-11-22",
  },
  {
    name: "Beef Stew",
    price: 50,
    imageUrl: "beef-stew.jpg",
    releaseDate: "2021-04-01",
  },
];

function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // Clear existing products
  products.forEach((product) => {
    container.innerHTML += `
            <div class="product-card">
                <img class="product-image" src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="button favorite" onclick="favoriteProduct('${product.name}')">Favorite</button>
                <button class="button cart" onclick="addToCart('${product.name}')">Add to Cart</button>
            </div>
        `;
  });
}

function sortProducts() {
  const sortBy = document.getElementById("sort").value;
  if (sortBy === "priceLowHigh") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceHighLow") {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === "dateNewOld") {
    products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else if (sortBy === "dateOldNew") {
    products.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }
  displayProducts(products);
}

function filterCategory(category) {
  const filteredProducts = products.filter((p) => p.category === category);
  displayProducts(filteredProducts);
}

window.onload = () => displayProducts(products);
