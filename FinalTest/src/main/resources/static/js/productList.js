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
    // var margin1 = document.getElementById("add");
    var img3 = document.getElementById("updown3");
    if (img3.src.includes("down.png")) {
      img3.src = "./material/icon/up.png";
      // margin1.style.margin = "40px 0";
    } else {
      img3.src = "./material/icon/down.png";
      // margin1.style.margin = "";
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
  /*
  const products = [
    {
      name: "日式豬排飯",
      price: 130,
      image: "./material/mealkit/katsudon.jpg",
      releaseDate: "2023-04-22",
    },
    {
      name: "南洋叻沙海鮮湯麵",
      price: 135,
      image: "./material/mealkit/laksa.jpg",
      releaseDate: "2021-04-24",
    },
    {
      name: "奶油松露百菇燉飯",
      price: 220,
      image: "./material/mealkit/CreamyRisotto.jpg",
      releaseDate: "2025-06-22",
    },
    {
      name: "泰式冬蔭功酸辣海鮮湯",
      price: 170,
      image: "./material/mealkit/soup.png",
      releaseDate: "2021-04-02",
    },
    {
      name: "印度雞肉香飯",
      price: 140,
      image: "./material/mealkit/ChickenBiryani.jpg",
      releaseDate: "2023-02-22",
    },
    {
      name: "新加坡海南雞飯",
      price: 150,
      image: "./material/mealkit/HainaneseChickenRice.jpg",
      releaseDate: "2021-07-22",
    },
    {
      name: "韓式五色石鍋拌飯",
      price: 140,
      image: "./material/mealkit/KoreanBibimbap.png",
      releaseDate: "2021-11-22",
    },
    {
      name: "馬來西亞椰漿飯",
      price: 190,
      image: "./material/mealkit/NasiLemak.jpg",
      releaseDate: "2021-04-01",
    },
    {
      name: "馬來西亞椰漿飯",
      price: 150,
      image: "./material/mealkit/thaiPork.jpg",
      releaseDate: "2021-04-01",
    },
    {
      name: "越南牛肉河粉",
      price: 130,
      image: "./material/mealkit/BeefPho.png",
      releaseDate: "2021-04-01",
    },
    {
      name: "希臘酥炸櫛瓜薯泥球",
      price: 160,
      image: "./material/mealkit/PotatoBalls.jpg",
      releaseDate: "2021-04-01",
    },
    {
      name: "西班牙海鮮燉飯",
      price: 220,
      image: "./material/mealkit/SeafoodPaella.jpg",
      releaseDate: "2021-04-01",
    },
  ];

  window.displayProducts = function (products) {
    const container = document.getElementById("productContainer");
    container.innerHTML = ""; // Clear existing products
    products.forEach((product) => {
      container.innerHTML += `
              <div class="product">
                  <img class="product-image" src="${product.image}" alt="${product.name}">
                  <h3 class="product-name">${product.name}</h3>
                  <p class="product-price">$NT${product.price}</p>
                  <div class="home-product-btn">
                    <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
                    <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車</button>
                  </div>
              </div>
          `;
    });
*/

    // 加入購物車按鈕事件處理
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productName =
          this.closest(".product").querySelector("h3").textContent;
        alert(`已將 ${productName} 加入購物車！`);
      });
    });

    // 收藏商品按鈕事件處理
    document.querySelectorAll(".add-to-favorite").forEach((button) => {
      button.addEventListener("click", function () {
        const productName =
          this.closest(".product").querySelector("h3").textContent;

        // 切換收藏狀態
        if (this.classList.contains("favorited")) {
          this.classList.remove("favorited");

          // 先更改顏色，然後延遲彈跳框
          setTimeout(() => {
            alert(`已將 ${productName} 取消收藏！`);
          }, 500); // 300 毫秒延遲
        } else {
          this.classList.add("favorited");

          // 先更改顏色，然後延遲彈跳框
          setTimeout(() => {
            alert(`已將 ${productName} 加入收藏！`);
          }, 500); // 300 毫秒延遲
        }
      });
    });
  };

  window.sortProducts = function () {
    const sortBy = document.getElementById("sort").value;
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
    displayProducts(products);
  };

  // 預設排序為隨機排序
  products.sort(() => Math.random() - 0.5); // 隨機排序
  displayProducts(products);

	/* 
  window.filterCategory = function (category) {
    const filteredProducts = products.filter((p) => p.category === category);
    displayProducts(filteredProducts);
  };

  displayProducts(products);
 */

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
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        // 建立img標籤用於商品卡
        const imgElement = document.createElement('img');
        imgElement.className = 'product-image';
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
              // 使用 Base64Inmages
              imgElement.src = images[0]; // imgElement.src 為 base64Images
            } else {
              imgElement.src = '../material/icon/default.png'; // 沒有圖片時使用默認圖片
            }
          })
          .catch((error) => {
            console.error(`Error fetching product image for product ${product.id}:`, error);
            imgElement.src = '../material/icon/error.png'; // 如果發生錯誤使用錯誤圖片
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });


