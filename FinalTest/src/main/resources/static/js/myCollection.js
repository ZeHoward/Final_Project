window.onload = function () {
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

      if (button.textContent === '我的商品') {
        fetchFavorites('products');
      } else {
        fetchFavorites('recipes');
      }
    });
  });

  function fetchFavorites(type) {
    if (!userId) {
      console.error('userId 未獲取到');
      return;
    }

    let apiUrl = '';

    if (type === 'products') {
      apiUrl = `/api/favorites/products?userId=${userId}`;
    } else if (type === 'recipes') {
      apiUrl = `/api/favorites/recipes/user?userId=${userId}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          displayFavorites(data, type);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }

  function displayFavorites(favorites, type) {
    const container = document.getElementById("productContainer");
    container.innerHTML = "";  // 清空現有內容

    if (favorites.length === 0) {
      container.innerHTML = `<p>您沒有收藏的${type === 'products' ? '商品' : '食譜'}。</p>`;
      return;
    }

    favorites.forEach(favorite => {
      const imageSrc = `data:image/jpeg;base64,${favorite.imageBase64}`;

      // 動態生成商品卡，並在外部包裹一個 <a> 元素，讓商品卡成為一個可點擊的鏈接
      const productDiv = document.createElement('div');
      productDiv.className = "product";
      productDiv.dataset.productId = favorite.productId;
      productDiv.dataset.productName = favorite.name;

      // 設置商品卡的 HTML 結構
      productDiv.innerHTML = `
      <img class="product-image" src="${imageSrc}" alt="${favorite.name}">
      <h3 class="product-name">${favorite.name}</h3>
      <p class="product-price">$NT${favorite.price}</p>
      <div class="home-product-btn">
        <button class="add-to-cart" data-product-id="${favorite.productId}" data-product-name="${favorite.name}">
          <i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車
        </button>
      </div>`;

      // 綁定點擊事件到商品卡，點擊跳轉到商品詳情頁
      productDiv.addEventListener('click', function () {
        window.location.href = `/detail?productId=${favorite.productId}`;
      });

      // 將商品卡添加到容器
      container.appendChild(productDiv);
    });

    attachButtonHandlers();
  }


  function attachButtonHandlers() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
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
};
