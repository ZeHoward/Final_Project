window.onload = function () {
  //菜單menu展開
  window.openSidenav = function () {
    document.getElementById("sidenav").style.width = "100%";
    document.body.style.overflow = "hidden";
  };
  //菜單menu收合
  window.closeSidenav = function () {
    document.getElementById("sidenav").style.width = "0%";
    document.body.style.overflow = "";
  };

  //展開菜單選項(商品列表、常見問題)
  var dropdowns = document.getElementsByClassName("tem-dropdown-btn");
  for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener("click", function () {
      this.classList.toggle("tem-active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }

  //menu toggle up/down 圖案
  window.togglePic1 = function () {
    var margin1 = document.getElementById("add");
    var img1 = document.getElementById("updown1");
    if (img1.src.includes("down.png")) {
      img1.src = "./material/icon/up.png";
      margin1.style.margin = "40px 0";
    } else {
      img1.src = "./material/icon/down.png";
      margin1.style.margin = "";
    }
  };
  window.togglePic2 = function () {
    var margin2 = document.getElementById("add");
    var img2 = document.getElementById("updown2");
    if (img2.src.includes("down.png")) {
      img2.src = "./material/icon/up.png";
      margin2.style.margin = "40px 0";
    } else {
      img2.src = "./material/icon/down.png";
      margin2.style.margin = "";
    }
  };

  // 相關商品
  //精選調理包專區
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
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + products.length) % products.length;
      const product = products[index];
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$NT${product.price}</p>
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
  }

  //上下一個商品
  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    renderProducts();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % products.length;
    renderProducts();
  });

  renderProducts();

  //商品區
  const product = {
    name: "日式豬排飯",
    price: 130,
    image: "./material/mealkit/katsudon.jpg",
    promotion:
      "免運優惠來囉！新會員七天內於官網下單，即食享熱幫你付運費，最高可折100元",
  };

  // 建立商品資訊 HTML 結構
  const infoSection = document.querySelector(".spec");
  const productHtml = `
      <p class="product-name">${product.name}</p>
      <p class="product-price">NT$ ${product.price}</p>
      <div class="quantity-selector">
        <label for="quantity">數量:</label>
        <input type="number" id="quantity" name="quantity" value="1" min="1" />
      </div>
      <button class="btn cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;加入購物車</button>
      <button class="btn like"><i class="fa-regular fa-heart"></i>&nbsp;收藏商品</button>
      <button class="btn keep"><i class="fa-solid fa-book-open"></i>&nbsp;收藏食譜</button>
      <div class="promotion">
        <strong>優惠活動:</strong> <p> ${product.promotion}</p>
      </div>
    `;

  // 將 HTML 插入到 info 區塊
  infoSection.innerHTML = productHtml;

  // 商品詳細資料
  const productDetail = {
    description: `暖心美味——香芋獅子頭炊粉湯，幸福每一碗！<br>在忙碌的日子裡，是否渴望一碗暖心暖胃的湯品來撫慰身心？<br><br>
    讓我們為你帶來這款既美味又方便的香芋獅子頭炊粉湯調理包，讓你在家就能輕鬆享受家庭般的溫暖與幸福。<br><br>
    香芋富含纖維與維生素，獅子頭富含蛋白質，炊粉低脂健康，營養均衡。<br><br>無論春夏秋冬，這款湯品都是你的理想選擇，溫暖你的每一天。<br><br>
    香芋獅子頭炊粉湯，融合了香芋的清香與獅子頭的鮮美，再加上柔滑的炊粉，為你帶來一碗滿足味蕾、暖心暖胃的湯品。無論是家庭聚餐還是獨自享用，都能給你帶來無限的幸福感。
    `,
    weight: "600g",
    storage: "冷凍-18℃以下，保存24個月",
    origin: "台灣",
    porkOrigin: "台灣製造",
    manufacturer: "即食享熱股份有限公司",
    address: "408台中市南屯區公益路二段51號18樓",
    phone: "04-2326-5860",
    allergyInfo:
      "本產品含有甲殼類、蛋、堅果種子類、含麩質之穀物、大豆及其製品。該產線生產甲殼類、芒果、花生、芝麻、牛奶與羊奶、蛋、堅果、大豆、魚類、含麩質之穀物及其製品。",
    heatingInstructions: `★本產品應先解凍再加熱
    電鍋加熱：請將湯包、配料置入可蒸煮容器中，在外鍋加入約一杯水量，待電鍋跳起即可食用。
    直火加熱：請將湯包、配料置入鍋中，充分加熱即可食用。
    微波爐（800W）加熱：請撕除盒上封膜，拆封湯包並倒入盒中，微波約3-7分鐘即可食用。`,
    shippingMethod: "低溫物流配送",
  };

  // 動態生成 detail 區塊
  const detailSection = document.querySelector(".detail");
  const detailHtml = `
    <p class="title">| 商品詳情</p>
    <br /><br />
    <p>${productDetail.description}</p>
    <br /><br />
    <p>淨重：${productDetail.weight}</p>
    <p>保存條件：${productDetail.storage}</p>
    <p>原產地：${productDetail.origin}</p>
    <p>豬肉原產地：${productDetail.porkOrigin}</p>
    <p>製造商：${productDetail.manufacturer}</p>
    <p>地址：${productDetail.address}</p>
    <p>服務專線：${productDetail.phone}</p>
    <p>過敏原標示：${productDetail.allergyInfo}</p>
    <br />
    <p>加熱方式：</p>
    <p>${productDetail.heatingInstructions}</p>
    <br />
    <p>運送方式：${productDetail.shippingMethod}</p>
  `;

  // 將 HTML 插入到 detail 區塊
  detailSection.innerHTML = detailHtml;

  // 模擬從資料庫獲取圖片的函數
  async function fetchProductImages() {
    // 這裡可以是 AJAX 或者 Fetch 從後端取得資料
    const imageList = [
      { src: "./material/mealkit/katsudon.jpg", alt: "縮略圖1" },
      { src: "./material/mealkit/pasta.png", alt: "縮略圖2" },
    ];
    return imageList;
  }

  // 動態生成縮略圖並設置點擊事件
  function generateGallery(images) {
    const thumbnailContainer = document.getElementById("thumbnailContainer");
    const currentImage = document.getElementById("currentImage");

    // 設置預設的主圖片
    if (images.length > 0) {
      currentImage.src = images[0].src;
      currentImage.alt = images[0].alt;
    }

    // 清空縮略圖容器
    thumbnailContainer.innerHTML = "";

    // 生成每一張縮略圖
    images.forEach((image, index) => {
      const thumbnail = document.createElement("img");
      thumbnail.src = image.src;
      thumbnail.alt = image.alt;
      thumbnail.classList.add("thumbnail");

      // 設置點擊事件，當點擊縮略圖時變更主圖片
      thumbnail.onclick = () => changeImage(image.src);

      // 插入到縮略圖容器中
      thumbnailContainer.appendChild(thumbnail);
    });
  }

  // 切換主圖片的函數
  function changeImage(imageSrc) {
    const currentImage = document.getElementById("currentImage");
    currentImage.src = imageSrc;
  }

  // 當頁面載入時，從資料庫抓取圖片並生成畫廊
  fetchProductImages().then((images) => generateGallery(images));
};
