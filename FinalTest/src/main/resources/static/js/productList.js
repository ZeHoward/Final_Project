window.onload = function () {
  fetchRandomProducts();

  // var dropdown2 = document.getElementsByClassName("down-btn");
  // var x;
  // for (x = 0; x < dropdown2.length; x++) {
  //   dropdown2[x].addEventListener("click", function () {
  //     this.classList.toggle("active2");
  //     var dropdownContent2 = this.nextElementSibling;
  //     if (dropdownContent2.style.display === "block") {
  //       dropdownContent2.style.display = "none";
  //     } else {
  //       dropdownContent2.style.display = "block";
  //     }
  //   });
  // }

  document.querySelectorAll(".links").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // 防止默認的 href 行為
      const type = this.getAttribute("data-type");
      const categoryId = this.getAttribute("data-category");
      fetchProductsByTypeAndCategory(type, categoryId); // 調用函數
    });
  });

  let resultsPerPage = parseInt(resultsPerPageSelect.value);
  let currentPage = 1;
  let totalPages = Math.ceil(products.length / resultsPerPage);

  function fetchRandomProducts() {
    fetch("/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("無法獲得商品清單");
        }
        return response.json();
      })
      .then((products) => {
        // 初始顯示產品
        displayProducts(products);

        // 重新顯示排序後的產品
        displayProducts(products);

        document.getElementById("sort").addEventListener("change", () => {
          const sortBy = document.getElementById("sort").value;
          sortProducts(products, sortBy);
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    document
      .getElementById("productContainer")
      .addEventListener("click", handleProductActions);
  }

  function fetchProductsByTypeAndCategory(type, categoryId) {
    fetch(`products/filter?type=${type}&categoryId=${categoryId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("無法獲得商品清單");
        }
        return response.json();
      })
      .then((products) => {
        // 初始顯示產品
        displayProducts(products);

        // 重新顯示排序後的產品
        displayProducts(products);

        document.getElementById("sort").addEventListener("change", () => {
          const sortBy = document.getElementById("sort").value;
          sortProducts(products, sortBy);
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    document
      .getElementById("productContainer")
      .addEventListener("click", handleProductActions);
  }
};

// 使用事件委託來處理加入購物車和收藏商品邏輯
function handleProductActions(event) {
  // 收藏商品按鈕事件處理
  if (event.target.closest(".add-to-favorite")) {
    const productName = event.target
      .closest(".product")
      .querySelector("h3").textContent;
    const favoriteButton = event.target.closest(".add-to-favorite");

    // 切換收藏狀態
    if (favoriteButton.classList.contains("favorited")) {
      favoriteButton.classList.remove("favorited");
      setTimeout(() => {
        alert(`已將 ${productName} 取消收藏！`);
      }, 500);
    } else {
      favoriteButton.classList.add("favorited");
      setTimeout(() => {
        alert(`已將 ${productName} 加入收藏！`);
      }, 500);
    }
  }

  // 加入購物車按鈕事件處理
  if (event.target.closest(".add-to-cart")) {
    const productName = event.target
      .closest(".product")
      .querySelector("h3").textContent;
    alert(`已將 ${productName} 加入購物車！`);
  }
}

// 顯示產品的函數
function displayProducts(products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = ""; // 清空現有的產品
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.style.cursor = "pointer"; //更改滑鼠樣式，可以點擊

    // 建立img標籤用於商品卡
    const imgElement = document.createElement("img");
    imgElement.className = "product-image";
    imgElement.alt = product.name;

    const productHtml = `
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">$NT${product.price}</p>
      <div class="home-product-btn">
        <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
        <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車</button>
      </div>
    `;
    productDiv.innerHTML = productHtml;
    productDiv.insertBefore(imgElement, productDiv.firstChild); // 將圖片放到最前面
    container.appendChild(productDiv);

    // Fetch 商品第一張圖片
    fetch(`/productImages/product/${product.productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("無法獲取商品圖片");
        }
        return response.json();
      })
      .then((images) => {
        if (images.length > 0) {
          imgElement.src = images[0]; // 使用 Base64Images
        } else {
          imgElement.src = "../material/icon/default.png"; // 沒有圖片時使用默認圖片
        }
      })
      .catch((error) => {
        console.error(
          `Error fetching product image for product ${product.id}:`,
          error
        );
        imgElement.src = "../material/icon/error.png"; // 如果發生錯誤使用錯誤圖片
      });

    productDiv.addEventListener("click", () => {
      window.location.href = `/detail?productId=${product.productId}`;
    });
  });
}

//商品排序
function sortProducts(products, sortBy) {
  if (sortBy === "priceLowHigh") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceHighLow") {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === "dateNewOld") {
    products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  } else if (sortBy === "dateOldNew") {
    products.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
  }
  displayProducts(products); // 重新顯示排序後的產品
}
