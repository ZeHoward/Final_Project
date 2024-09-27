window.onload = function () {
  var dropdown2 = document.getElementsByClassName("down-btn");
  var x;
  for (x = 0; x < dropdown2.length; x++) {
    dropdown2[x].addEventListener("click", function () {
      this.classList.toggle("active2");
      var dropdownContent2 = this.nextElementSibling;
      if (dropdownContent2.style.display === "block") {
        dropdownContent2.style.display = "none";
      } else {
        dropdownContent2.style.display = "block";
      }
    });
  }

  //menu toggle up/down 圖案
  window.togglePic3 = function () {
    var img3 = document.getElementById("updown3");
    if (img3.src.includes("down.png")) {
      img3.src = "./material/icon/up.png";
    } else {
      img3.src = "./material/icon/down.png";
    }
  };

  window.togglePic4 = function () {
    var img4 = document.getElementById("updown4");
    if (img4.src.includes("down.png")) {
      img4.src = "./material/icon/up.png";
    } else {
      img4.src = "./material/icon/down.png";
    }
  };

  const categoryId = 5;
  fetch(`products/category/${categoryId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("無法獲得商品清單");
      }
      return response.json();
    })
    .then((products) => {
      const container = document.getElementById("productContainer");
      container.innerHTML = ""; // 清空現有的圖片
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

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
      });

      // 加入事件委託邏輯，將點擊事件委託給父容器
      document
        .getElementById("productContainer")
        .addEventListener("click", function (event) {
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
        });

      document.getElementById("sort").addEventListener("change", () => {
        const sortBy = document.getElementById("sort").value; // 取得選擇的 option 的值
        if (sortBy === "priceLowHigh") {
          products.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceHighLow") {
          products.sort((a, b) => b.price - a.price);
        } else if (sortBy === "dateNewOld") {
          products.sort(
            (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
          );
        } else if (sortBy === "dateOldNew") {
          products.sort(
            (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
          );
        }
      });

      //displayProducts(products);

      // 預設排序為隨機排序
      // products.sort(() => Math.random() - 0.5); // 隨機排序
      // displayProducts(products);

      /* 
      window.filterCategory = function (category) {
        const filteredProducts = products.filter((p) => p.category === category);
        displayProducts(filteredProducts);
      };

      displayProducts(products);
     */
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
};
