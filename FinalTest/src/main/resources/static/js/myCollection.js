// window.onload = function () {
//   //菜單展開、關閉
//   window.openSidenav = function () {
//     document.getElementById("sidenav").style.width = "100%";
//     document.body.style.overflow = "hidden";
//   };
//
//   window.closeSidenav = function () {
//     document.getElementById("sidenav").style.width = "0%";
//     document.body.style.overflow = "";
//   };
//
//   //展開菜單選項
//   var dropdowns = document.getElementsByClassName("tem-dropdown-btn");
//   for (var i = 0; i < dropdowns.length; i++) {
//     dropdowns[i].addEventListener("click", function () {
//       this.classList.toggle("tem-active");
//       var dropdownContent = this.nextElementSibling;
//       if (dropdownContent.style.display === "block") {
//         dropdownContent.style.display = "none";
//       } else {
//         dropdownContent.style.display = "block";
//       }
//     });
//   }
//
//   //menu toggle up/down 圖案
//   window.togglePic1 = function () {
//     var margin1 = document.getElementById("add");
//     var img1 = document.getElementById("updown1");
//     if (img1.src.includes("down.png")) {
//       img1.src = "./material/icon/up.png";
//       margin1.style.margin = "40px 0";
//     } else {
//       img1.src = "./material/icon/down.png";
//       margin1.style.margin = "";
//     }
//   };
//   window.togglePic2 = function () {
//     var margin2 = document.getElementById("add");
//     var img2 = document.getElementById("updown2");
//     if (img2.src.includes("down.png")) {
//       img2.src = "./material/icon/up.png";
//       margin2.style.margin = "40px 0";
//     } else {
//       img2.src = "./material/icon/down.png";
//       margin2.style.margin = "";
//     }
//   };
//
//
//
//   // 按鈕更換商品及食譜
//   const buttons = document.querySelectorAll('.collection-tab-button');
//   const content = document.querySelector('.collection-content');
//
//   buttons.forEach(button => {
//       button.addEventListener('click', () => {
//           buttons.forEach(btn => btn.classList.remove('active'));
//           button.classList.add('active');
//
//           if (button.textContent === '我的商品') {
//               content.innerHTML = '<p>我收藏的商品</p>';
//           } else {
//               content.innerHTML = '<p>我收藏的食譜</p>';
//           }
//       });
//   });
//
//
//
//   // 商品卡
//   const products = [
//     {
//       name: "日式豬排飯",
//       price: 130,
//       image: "./material/mealkit/katsudon.jpg",
//       releaseDate: "2023-04-22",
//     },
//     {
//       name: "南洋叻沙海鮮湯麵",
//       price: 135,
//       image: "./material/mealkit/laksa.jpg",
//       releaseDate: "2021-04-24",
//     },
//     {
//       name: "奶油松露百菇燉飯",
//       price: 220,
//       image: "./material/mealkit/CreamyRisotto.jpg",
//       releaseDate: "2025-06-22",
//     },
//     {
//       name: "泰式冬蔭功酸辣海鮮湯",
//       price: 170,
//       image: "./material/mealkit/soup.png",
//       releaseDate: "2021-04-02",
//     },
//     {
//       name: "印度雞肉香飯",
//       price: 140,
//       image: "./material/mealkit/ChickenBiryani.jpg",
//       releaseDate: "2023-02-22",
//     },
//     {
//       name: "新加坡海南雞飯",
//       price: 150,
//       image: "./material/mealkit/HainaneseChickenRice.jpg",
//       releaseDate: "2021-07-22",
//     },
//     {
//       name: "韓式五色石鍋拌飯",
//       price: 140,
//       image: "./material/mealkit/KoreanBibimbap.png",
//       releaseDate: "2021-11-22",
//     },
//     {
//       name: "馬來西亞椰漿飯",
//       price: 190,
//       image: "./material/mealkit/NasiLemak.jpg",
//       releaseDate: "2021-04-01",
//     },
//     {
//       name: "馬來西亞椰漿飯",
//       price: 150,
//       image: "./material/mealkit/thaiPork.jpg",
//       releaseDate: "2021-04-01",
//     },
//     {
//       name: "越南牛肉河粉",
//       price: 130,
//       image: "./material/mealkit/BeefPho.png",
//       releaseDate: "2021-04-01",
//     },
//     {
//       name: "希臘酥炸櫛瓜薯泥球",
//       price: 160,
//       image: "./material/mealkit/PotatoBalls.jpg",
//       releaseDate: "2021-04-01",
//     },
//     {
//       name: "西班牙海鮮燉飯",
//       price: 220,
//       image: "./material/mealkit/SeafoodPaella.jpg",
//       releaseDate: "2021-04-01",
//     },
//   ];
//
//   window.displayProducts = function (products) {
//     const container = document.getElementById("productContainer");
//     container.innerHTML = ""; // Clear existing products
//     products.forEach((product) => {
//       container.innerHTML += `
//                 <div class="product">
//                     <img class="product-image" src="${product.image}" alt="${product.name}">
//                     <h3 class="product-name">${product.name}</h3>
//                     <p class="product-price">$NT${product.price}</p>
//                     <div class="home-product-btn">
//                       <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
//                       <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車</button>
//                     </div>
//                 </div>
//             `;
//     });
//
//     // 加入購物車按鈕事件處理
//     document.querySelectorAll(".add-to-cart").forEach((button) => {
//       button.addEventListener("click", function () {
//         const productName =
//           this.closest(".product").querySelector("h3").textContent;
//         alert(`已將 ${productName} 加入購物車！`);
//       });
//     });
//
//     // 收藏商品按鈕事件處理
//     document.querySelectorAll(".add-to-favorite").forEach((button) => {
//       button.addEventListener("click", function () {
//         const productName =
//           this.closest(".product").querySelector("h3").textContent;
//
//         // 切換收藏狀態
//         if (this.classList.contains("favorited")) {
//           this.classList.remove("favorited");
//
//           // 先更改顏色，然後延遲彈跳框
//           setTimeout(() => {
//             alert(`已將 ${productName} 取消收藏！`);
//           }, 500); // 300 毫秒延遲
//         } else {
//           this.classList.add("favorited");
//
//           // 先更改顏色，然後延遲彈跳框
//           setTimeout(() => {
//             alert(`已將 ${productName} 加入收藏！`);
//           }, 500); // 300 毫秒延遲
//         }
//       });
//     });
//   };
//   displayProducts(products);
// };



//
// window.onload = function () {
//   // 省略其他代碼...
//
//   // 按鈕更換商品及食譜
//   const buttons = document.querySelectorAll('.collection-tab-button');
//   const content = document.querySelector('.collection-content');
//
//   buttons.forEach(button => {
//     button.addEventListener('click', () => {
//       buttons.forEach(btn => btn.classList.remove('active'));
//       button.classList.add('active');
//
//       // 判斷點擊的是“我的商品”還是“我的食譜”
//       if (button.textContent === '我的商品') {
//         fetchFavorites('products');
//       } else {
//         fetchFavorites('recipes');
//       }
//     });
//   });
//
//   // 定義 fetchFavorites 函數，用於根據類型來發送 API 請求
//   function fetchFavorites(type) {
//     const userId = 1;  // 假設用戶 ID 是 1
//     let apiUrl = '';
//
//     // 正確使用反引號來插入 userId 變量
//     if (type === 'products') {
//       apiUrl = `/api/favorites/products?userId=${userId}`;  // 假設這是獲取收藏商品的API
//     } else if (type === 'recipes') {
//       apiUrl = `/api/favorites/recipes/user?userId=${userId}`;  // 假設這是獲取收藏食譜的API
//     }
//
//     // 使用 fetch 向後端發送請求，然後處理返回的數據
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//           // 根據返回的數據更新前端的產品或食譜顯示
//           displayFavorites(data);
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//         });
//   }
//
//   // 更新頁面顯示的商品或食譜
//   function displayFavorites(favorites) {
//     const container = document.getElementById("productContainer");
//     container.innerHTML = "";  // 清空現有內容
//
//     favorites.forEach(favorite => {
//       // 將 Base64 字符串作為圖片的 src
//       const imageSrc = `data:image/jpeg;base64,${favorite.imageBase64}`;
//
//       container.innerHTML += `
//         <div class="product">
//           <img class="product-image" src="${imageSrc}" alt="${favorite.name}">
//           <h3 class="product-name">${favorite.name}</h3>
//           <p class="product-price">$NT${favorite.price}</p>
//           <div class="home-product-btn">
//             <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
//             <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車</button>
//           </div>
//         </div>`;
//     });
//
//     // 為“加入購物車”和“收藏”按鈕添加事件處理
//     attachProductButtonHandlers();
//   }
//
//   // 添加購物車和收藏按鈕的處理邏輯
//   function attachProductButtonHandlers() {
//     // 加入購物車按鈕事件處理
//     document.querySelectorAll(".add-to-cart").forEach((button) => {
//       button.addEventListener("click", function () {
//         const productName = this.closest(".product").querySelector("h3").textContent;
//         alert(`已將 ${productName} 加入購物車！`);
//       });
//     });
//
//     // 收藏商品按鈕事件處理
//     document.querySelectorAll(".add-to-favorite").forEach((button) => {
//       button.addEventListener("click", function () {
//         const productName = this.closest(".product").querySelector("h3").textContent;
//
//         // 切換收藏狀態
//         if (this.classList.contains("favorited")) {
//           this.classList.remove("favorited");
//
//           // 先更改顏色，然後延遲彈跳框
//           setTimeout(() => {
//             alert(`已將 ${productName} 取消收藏！`);
//           }, 500); // 500 毫秒延遲
//         } else {
//           this.classList.add("favorited");
//
//           // 先更改顏色，然後延遲彈跳框
//           setTimeout(() => {
//             alert(`已將 ${productName} 加入收藏！`);
//           }, 500); // 500 毫秒延遲
//         }
//       });
//     });
//   }
//
//   // 初始顯示商品（假設需要顯示商品）
//   fetchFavorites('products');
// };
//
//


window.onload = function () {
  // 定義全局 userId 變數
  const userId = 1;  // 假設用戶 ID 是 1

  // 按鈕更換商品及食譜
  const buttons = document.querySelectorAll('.collection-tab-button');
  const content = document.querySelector('.collection-content');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 判斷點擊的是“我的商品”還是“我的食譜”
      if (button.textContent === '我的商品') {
        fetchFavorites('products');
      } else {
        fetchFavorites('recipes');
      }
    });
  });

  // 定義 fetchFavorites 函數，用於根據類型來發送 API 請求
  function fetchFavorites(type) {
    let apiUrl = '';

    // 根據類型設置 API URL
    if (type === 'products') {
      apiUrl = `/api/favorites/products?userId=${userId}`;  // 獲取收藏商品的API
    } else if (type === 'recipes') {
      apiUrl = `/api/favorites/recipes/user?userId=${userId}`;  // 獲取收藏食譜的API
    }

    // 使用 fetch 向後端發送請求，然後處理返回的數據
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          displayFavorites(data);  // 更新前端的產品或食譜顯示
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }

  // 更新頁面顯示的商品或食譜
  function displayFavorites(favorites) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";  // 清空現有內容

    favorites.forEach(favorite => {
      // 將 Base64 字符串作為圖片的 src
      const imageSrc = `data:image/jpeg;base64,${favorite.imageBase64}`;

      container.innerHTML += `
        <div class="product" data-product-id="${favorite.productId}">
          <img class="product-image" src="${imageSrc}" alt="${favorite.name}">
          <h3 class="product-name">${favorite.name}</h3>
          <p class="product-price">$NT${favorite.price}</p>
          <div class="home-product-btn">
            <button class="add-to-favorite favorited" data-product-id="${favorite.productId}">
              <i class="fa-solid fa-heart"></i>
            </button>
            <button class="add-to-cart" data-product-id="${favorite.productId}">
              <i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車
            </button>
          </div>
        </div>`;
    });

    // 為收藏和購物車按鈕添加事件處理
    attachButtonHandlers();
  }

  // 收藏和加入購物車按鈕處理邏輯
  function attachButtonHandlers() {
    // 收藏商品按鈕事件處理
    document.querySelectorAll(".add-to-favorite").forEach(button => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute('data-product-id');
        removeFavorite(productId, this);
      });
    });

    // 加入購物車按鈕事件處理
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute('data-product-id');
        addToCart(productId);
      });
    });
  }

  // 取消收藏並移除商品
  function removeFavorite(productId, button) {
    fetch(`/api/favorites/remove?userId=${userId}&productId=${productId}`, {
      method: 'DELETE',
    })
        .then(() => {
          const productElement = document.querySelector(`.product[data-product-id="${productId}"]`);
          if (productElement) {
            productElement.remove();  // 從頁面中移除商品
          }
          alert(`已將商品取消收藏！`);
        })
        .catch(error => {
          console.error('Error removing favorite:', error);
        });
  }


  // 加入購物車邏輯
  function addToCart(productId) {
    fetch(`/api/cart/add`, {
      method: 'POST',
      body: JSON.stringify({ userId, productId }), // 使用全局的 userId
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(() => {
          alert(`商品已加入購物車！`);
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
        });
  }

  // 預設顯示收藏的商品
  fetchFavorites('products');
};
