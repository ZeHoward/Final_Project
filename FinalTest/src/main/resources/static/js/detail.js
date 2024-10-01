window.onload = function () {
  // 獲取 URL 中的 productId
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");

  if (productId) {
    // 使用 productId 來請求商品詳細數據
    fetch(`/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("無法獲取商品信息");
        }
        return response.json();
      })
      .then((product) => {
        // 更新商品描述
        const infoSection = document.querySelector(".spec");
        const productHtml = `
            <p class="product-name">${product.name}</p>
            <p class="product-price">NT$ ${product.price}</p>
            <div class="quantity-selector">
                <label for="quantity">數量選擇：</label>
                <button id="decrease" class="btn-quantity"><i class="fa-solid fa-minus"></i></button>
                <input type="text" id="quantity" value="1" readonly />
                <button id="increase" class="btn-quantity"><i class="fa-solid fa-plus"></i></button>
                <span>&nbsp;&nbsp;商品剩最後 ${product.stockQuantity} 件</span>
            </div>
            <button class="btn cart" id="cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;加入購物車</button>
            <button class="btn like" id="like"><i class="fa-regular fa-heart"></i>&nbsp;收藏商品</button>
            <button class="btn keep" id="keep"><i class="fa-solid fa-book-open"></i>&nbsp;收藏食譜</button>
          `;
        infoSection.innerHTML = productHtml;

        document
          .getElementById("like")
          .addEventListener("click", function (event) {
            const favoriteButton = event.target;
            if (favoriteButton.classList.contains("favorited")) {
              favoriteButton.classList.remove("favorited");
              Swal.fire({
                title: "成功",
                text: `已將${product.name}取消收藏`,
                icon: "success",
                timer: 1500,
              });
            } else {
              favoriteButton.classList.add("favorited");
              Swal.fire({
                title: "成功",
                text: `已將${product.name}加入收藏`,
                icon: "success",
                timer: 1500,
              });
            }
          });

        document.getElementById("cart").addEventListener(
          "click",
          () => {
            Swal.fire({
              title: "成功",
              text: `已將${product.name}加入購物車`,
              icon: "success",
              timer: 1500,
            });
          },
          500
        );

        document.getElementById("keep").addEventListener("click", () => {
          Swal.fire({
            title: "成功",
            text: `已將${product.name}加入收藏`,
            icon: "success",
            timer: 1500,
          });
        });

        // 更新商品詳細描述
        const detailSection = document.querySelector(".detail");
        const detailHtml = `<pre>${product.description}</pre>`;
        detailSection.innerHTML = detailHtml;

        // 取得商品照片並產生主圖和略縮圖
        fetch(`/productImages/product/${productId}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("無法獲取商品圖片");
            }
            return response.json();
          })
          .then((images) => {
            if (images.length > 0) {
              document.getElementById("currentImage").src = images[0];
              generateGallery(images);
            } else {
              document.getElementById("currentImage").src =
                "../material/icon/default.png";
            }
          })
          .catch((error) => {
            console.error("Error fetching product images:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
    document.getElementById("currentImage").src = "../material/icon/donut.png";
  } else {
    console.error("productId 未找到");
  }

  // 縮略圖畫廊生成函數
  function generateGallery(images) {
    const thumbnailContainer = document.getElementById("thumbnailContainer");

    // 清空略縮圖
    thumbnailContainer.innerHTML = "";

    // 巡訪所有圖片並生成略縮圖
    images.forEach((base64Image, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = base64Image;
      imgElement.classList.add("thumbnail");

      // 點擊略縮圖時更換主圖
      imgElement.onclick = () => {
        document.getElementById("currentImage").src = base64Image;
      };

      thumbnailContainer.appendChild(imgElement);
    });
  }

  // 相關商品專區
  const products = [
    {
      id: 1,
      name: "日式豬排飯",
      price: 130,
      image: "./material/mealkit/katsudon.jpg",
    },
    {
      id: 2,
      name: "南洋叻沙海鮮湯麵",
      price: 135,
      image: "./material/mealkit/laksa.jpg",
    },
    {
      id: 3,
      name: "奶油松露百菇燉飯",
      price: 220,
      image: "./material/mealkit/CreamyRisotto.jpg",
    },
    {
      id: 4,
      name: "泰式冬蔭功酸辣海鮮湯",
      price: 170,
      image: "./material/mealkit/soup.png",
    },
    {
      id: 5,
      name: "印度雞肉香飯",
      price: 140,
      image: "./material/mealkit/ChickenBiryani.jpg",
    },
    {
      id: 6,
      name: "新加坡海南雞飯",
      price: 150,
      image: "./material/mealkit/HainaneseChickenRice.jpg",
    },
    {
      id: 7,
      name: "韓式五色石鍋拌飯",
      price: 140,
      image: "./material/mealkit/KoreanBibimbap.png",
    },
    {
      id: 8,
      name: "馬來西亞椰漿飯",
      price: 190,
      image: "./material/mealkit/NasiLemak.jpg",
    },
    {
      id: 9,
      name: "馬來西亞椰漿飯",
      price: 150,
      image: "./material/mealkit/thaiPork.jpg",
    },
    {
      id: 10,
      name: "越南牛肉河粉",
      price: 130,
      image: "./material/mealkit/BeefPho.png",
    },
    {
      id: 11,
      name: "希臘酥炸櫛瓜薯泥球",
      price: 160,
      image: "./material/mealkit/PotatoBalls.jpg",
    },
    {
      id: 12,
      name: "西班牙海鮮燉飯",
      price: 220,
      image: "./material/mealkit/SeafoodPaella.jpg",
    },
  ];

  let currentIndex = 0;

  function renderProducts() {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";
    for (let i = -1; i <= 2; i++) {
      const index = (currentIndex + i + products.length) % products.length;
      const product = products[index];
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
        <img class="related-product-image" src="${product.image}" alt="${product.name}">
        <h3 class="related-product-name">${product.name}</h3>
        <p class="related-product-price">$NT${product.price}</p>
        <div class="home-product-btn">
          <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
          <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車</button>
        </div>
      `;
      container.appendChild(productElement);
    }

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

        if (this.classList.contains("favorited")) {
          this.classList.remove("favorited");
          setTimeout(() => {
            alert(`已將 ${productName} 取消收藏！`);
          }, 500);
        } else {
          this.classList.add("favorited");
          setTimeout(() => {
            alert(`已將 ${productName} 加入收藏！`);
          }, 500);
        }
      });
    });
  }

  // 上下一個商品
  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    renderProducts();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % products.length;
    renderProducts();
  });

  // 初始渲染相關商品
  renderProducts();
};
