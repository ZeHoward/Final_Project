document.addEventListener("DOMContentLoaded", function () {
  let userId = null;

  fetch('api/favorites/recipes/getUserId')
      .then(response => response.json())
      .then(data => {
        userId = data;
        if (userId) {
          fetchFavorites('products');
        }
      })
      .catch(error => {
        console.error('Error fetching userId:', error);
      });

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

    let apiUrl = type === 'products'
        ? `/api/favorites/products?userId=${userId}`
        : `/api/favorites/recipes/user?userId=${userId}`;

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
    let html = '';

    if (favorites.length === 0) {
      html = `<p>您沒有收藏的${type === 'products' ? '商品' : '食譜'}。</p>`;
    } else {
      favorites.forEach(favorite => {
        const productId = favorite.productId; // 获取 productId
        const recipeId = favorite.recipeId;   // 获取 recipeId
        const imageSrc = favorite.imageUrl || '../material/icon/error.png';

        html += `
        <div class="product" data-product-id="${productId}" data-recipe-id="${recipeId}" data-type="${type}">
          <img class="product-image" src="${imageSrc}" alt="${favorite.name}" onerror="this.src='../material/icon/error.png';">
          <h3 class="product-name">${favorite.name}</h3>
          <p class="product-price">$NT${favorite.price}</p>
          <div class="home-product-btn">
            <button class="add-to-favorite favorited" data-product-id="${productId}" data-recipe-id="${recipeId}">
              <i class="fa-solid fa-heart"></i>
            </button>
            <button class="add-to-cart" data-product-id="${productId}" data-recipe-id="${recipeId}">
              ${type === 'products' ? '<i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車' : '<i class="fa-solid fa-book"></i>&nbsp;&nbsp;&nbsp;閱讀食譜'}
            </button>
          </div>
        </div>`;
      });
    }

    container.innerHTML = html;

    container.querySelectorAll('.product').forEach(productElement => {
      productElement.addEventListener('click', (event) => {
        if (event.target.closest('button')) return;

        const productId = productElement.getAttribute('data-product-id');
        const recipeId = productElement.getAttribute('data-recipe-id');
        const type = productElement.getAttribute('data-type');

        // 根據類型決定使用哪個 ID 跳轉
        window.location.href = type === 'products'
            ? `/detail?productId=${productId}`
            : `/recipeDetails/${recipeId}`;
      });
    });

    container.addEventListener('click', function(event) {
      const target = event.target.closest('button');
      if (!target) return;

      event.stopPropagation();

      const productId = target.getAttribute('data-product-id');
      const recipeId = target.getAttribute('data-recipe-id');
      const productElement = target.closest('.product');
      const type = productElement.getAttribute('data-type');

      if (target.classList.contains('add-to-favorite')) {
        removeFavorite(type === 'products' ? productId : recipeId, type);
      } else if (target.classList.contains('add-to-cart')) {
        const productName = productElement.querySelector('.product-name').innerText;
        if (type === 'products') {
          promptQuantityAndAddToCart(productId, productName);
        } else {
          window.location.href = `/recipeDetails/${recipeId}`;
        }
      }
    });
  }

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

        fetch(`/api/cart/${userId}`, {
          method: 'POST',
          body: JSON.stringify({
            productName: productName,
            quantity: parseInt(quantity)
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

  function removeFavorite(id, type) {
    let apiUrl = type === 'products'
        ? `/api/favorites/remove?userId=${userId}&productId=${id}`
        : `/api/favorites/recipes/removeByRecipeId?userId=${userId}&recipeId=${id}`;

    fetch(apiUrl, {
      method: 'DELETE',
    })
        .then(() => {
          const productElement = document.querySelector(`.product[data-product-id="${id}"], .product[data-recipe-id="${id}"]`);
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
