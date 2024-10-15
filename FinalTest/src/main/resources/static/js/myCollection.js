document.addEventListener("DOMContentLoaded", function () {
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
    let html = '';  // 構建 HTML 字串

    if (favorites.length === 0) {
      html = `<p>您沒有收藏的${type === 'products' ? '商品' : '食譜'}。</p>`;
    } else {
      favorites.forEach(favorite => {
        const imageSrc = favorite.imageUrl || '../material/icon/error.png';
        html += `
        <div class="product" data-product-id="${favorite.productId || favorite.recipeId}" data-type="${type}">
          <img class="product-image" src="${imageSrc}" alt="${favorite.name}" onerror="this.src='../material/icon/error.png';">
          <h3 class="product-name">${favorite.name}</h3>
          <p class="product-price">$NT${favorite.price}</p>
          <div class="home-product-btn">
            <button class="add-to-favorite favorited" data-product-id="${favorite.productId || favorite.recipeId}">
              <i class="fa-solid fa-heart"></i>
            </button>
            <button class="add-to-cart" data-product-id="${favorite.productId || favorite.recipeId}">
              <i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車
            </button>
          </div>
        </div>`;
      });
    }

    container.innerHTML = html;  // 一次性插入 DOM

    // 為每個商品或食譜卡片設置點擊事件監聽器
    container.querySelectorAll('.product').forEach(productElement => {
      productElement.addEventListener('click', (event) => {
        if (event.target.closest('button')) return;  // 如果點擊的是按鈕，則不進行跳轉

        const productId = productElement.getAttribute('data-product-id');
        const type = productElement.getAttribute('data-type');

        // 根據類型構建跳轉 URL
        if (type === 'products') {
          window.location.href = `/detail?productId=${productId}`;
        } else if (type === 'recipes') {
          window.location.href = `/recipeDetails/${productId}`;
        }
      });
    });

    // 按鈕事件代理 - 收藏和加入購物車按鈕
    container.addEventListener('click', function(event) {
      const target = event.target.closest('button');
      if (!target) return;  // 如果不是按鈕則退出

      event.stopPropagation();  // 阻止冒泡

      const productId = target.getAttribute('data-product-id');
      const productElement = target.closest('.product');
      const type = productElement.getAttribute('data-type');

      if (target.classList.contains('add-to-favorite')) {
        removeFavorite(productId, type);
      } else if (target.classList.contains('add-to-cart')) {
        const productName = productElement.querySelector('.product-name').innerText;
        promptQuantityAndAddToCart(productId, productName);
      }
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
  function removeFavorite(productId, type) {
    let apiUrl;
    if (!type) {
      console.error('Type is undefined');
      return;
    }

    if (type === 'products') {
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
            productElement.remove();
          }
          alert(`已將收藏移除！`);
        })
        .catch(error => {
          console.error('Error removing favorite:', error);
        });
  }
});
