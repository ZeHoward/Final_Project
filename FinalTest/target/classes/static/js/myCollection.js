window.onload = function () {
  // 定義全局 userId 變數
  let userId = null;

  // 獲取 userId，並在成功後調用 fetchFavorites('products')
  fetch('api/favorites/recipes/getUserId')
      .then(response => response.json())
      .then(data => {
        userId = data;

        // 確保 userId 已經成功獲取，然後加載商品
        if (userId) {
          fetchFavorites('products');
        }
      })
      .catch(error => {
        console.error('Error fetching userId:', error);
      });

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
    if (!userId) {
      console.error('userId 未獲取到');
      return;
    }

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
          displayFavorites(data, type);  // 傳入類型以區分商品或食譜
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }

  // 更新頁面顯示的商品或食譜
  function displayFavorites(favorites, type) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";  // 清空現有內容

    if (favorites.length === 0) {
      container.innerHTML = `<p>您沒有收藏的${type === 'products' ? '商品' : '食譜'}。</p>`;
      return;
    }

    favorites.forEach(favorite => {
      // 將 Base64 字符串作為圖片的 src
      const imageSrc = `data:image/jpeg;base64,${favorite.imageBase64}`;

      container.innerHTML += `
        <div class="product" data-product-id="${favorite.productId}" data-type="${type}">
          <img class="product-image" src="${imageSrc}" alt="${favorite.name}">
          <h3 class="product-name">${favorite.name}</h3>
          <p class="product-price">$NT${favorite.price}</p>
          <div class="home-product-btn">
            <button class="add-to-favorite favorited" data-product-id="${favorite.productId}" data-type="${type}">
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
        const type = this.getAttribute('data-type');  // 獲取類型來決定是商品還是食譜
        removeFavorite(productId, type, this);
      });
    });

    // 加入購物車按鈕事件處理，添加商品數量選擇功能
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute('data-product-id');
        const productName = this.closest('.product').querySelector('.product-name').innerText;
        promptQuantityAndAddToCart(productId, productName);
      });
    });
  }

  // 彈出視窗詢問商品數量並將商品添加到購物車
  function promptQuantityAndAddToCart(productId, productName) {
    Swal.fire({
      title: `請輸入您想購買的「${productName}」數量`,
      input: 'number',
      inputLabel: '數量',
      inputValue: 1,
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      inputValidator: (value) => {
        if (!value || value <= 0) {
          return '請輸入正確的數量';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const quantity = result.value;

        // 發送請求到後端的購物車 API
        fetch(`/api/cart/${userId}`, {
          method: 'POST',
          body: JSON.stringify({
            productName: productName, // 使用商品名稱
            quantity: parseInt(quantity) // 將數量轉換為整數
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(() => {
              Swal.fire('成功', `商品已加入購物車，數量：${quantity}`, 'success');
            })
            .catch(error => {
              console.error('Error adding to cart:', error);
            });
      }
    });
  }

  // 取消收藏邏輯，根據不同類型來呼叫不同的API
  function removeFavorite(productId, type, button) {
    let apiUrl;

    if (type === 'products') {
      apiUrl = `/api/favorites/products/remove?userId=${userId}&productId=${productId}`;  // 呼叫刪除商品的API
      apiUrl = `/api/favorites/remove?userId=${userId}&productId=${productId}`;  // 呼叫刪除商品的API
    } else if (type === 'recipes') {
      apiUrl = `/api/favorites/recipes/remove?userId=${userId}&productId=${productId}`;  // 呼叫刪除食譜的API
    }

    fetch(apiUrl, {
      method: 'DELETE',
    })
        .then(() => {
          const productElement = document.querySelector(`.product[data-product-id="${productId}"]`);
          if (productElement) {
            productElement.remove();  // 從頁面中移除商品
          }
          alert(`已將收藏移除！`);
        })
        .catch(error => {
          console.error('Error removing favorite:', error);
        });
  }
};
