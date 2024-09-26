window.onload = function () {
  // 按鈕更換商品及食譜
  const buttons = document.querySelectorAll('.collection-tab-button');
  const content = document.querySelector('.collection-content');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const type = button.textContent === '我的商品' ? 'products' : 'recipes';

      // 向後端 API 發送請求，根據類型獲取收藏數據
      fetch(`/favorites?type=${type}`)
          .then(response => response.json())
          .then(data => {
            content.innerHTML = ''; // 清空內容
            data.forEach(item => {
              content.innerHTML += `
            <div class="product">
              <img class="product-image" src="${item.image}" alt="${item.name}">
              <h3 class="product-name">${item.name}</h3>
              <p class="product-price">$NT${item.price}</p>
              <div class="home-product-btn">
                <button class="add-to-favorite favorited"><i class="fa-solid fa-heart"></i></button>
              </div>
            </div>`;
            });
          });
    });
  });




  // 商品卡
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
        const productName = this.closest(".product").querySelector("h3").textContent;
        const productId = this.closest(".product").getAttribute("data-id");
        const isFavorited = this.classList.contains("favorited");

        if (isFavorited) {
          // 移除收藏
          fetch(`/favorites/${productId}`, {
            method: 'DELETE'
          })
              .then(() => {
                this.classList.remove("favorited");
                alert(`${productName} 已取消收藏！`);
              });
        } else {
          // 添加收藏
          fetch('/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: productId, type: 'product' })
          })
              .then(() => {
                this.classList.add("favorited");
                alert(`${productName} 已加入收藏！`);
              });
        }
      });
    });
    }



    displayProducts(products);

};


