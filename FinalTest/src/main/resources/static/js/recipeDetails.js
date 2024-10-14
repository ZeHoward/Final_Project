document.addEventListener('DOMContentLoaded', () => {
  console.log("HI~");

  // 從 URL 路徑中獲取 ID
  const pathParts = window.location.pathname.split('/');
  const recipeId = pathParts[pathParts.length - 1];

  if (!recipeId) {
      console.error('未提供食譜 ID');
      alert('未提供食譜 ID，請檢查 URL');
      return;
  }

  // 使用正確的 API 路徑來獲取食譜數據
  fetch(`/api/recipes/view?id=${recipeId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP 錯誤！狀態：${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          const recipe = data.recipe;

          // 更新 DOM 元素
          updateElement('recipeName', recipe.title);
          updateElement('foodName', recipe.title);
          updateElement('cookingTime', `烹飪時間：${recipe.cookTime} 分鐘`);
          updateElement('level', `難度：${recipe.level}`);
          updateElement('servings', `份量：${recipe.servings} 人份`);

          // 使用修改後的 updateList 函數
          updateList('ingredientsList', recipe.ingredients);
          updateList('stepsList', recipe.steps);
          updateList('notesList', recipe.notes);

          // 添加事件監聽器
          addButtonListener('saveRecipe', () => console.log('收藏食譜', recipe.recipeId));

          // 更新"查看商品"按鈕的事件監聽器
          addButtonListener('viewProduct', () => {
              window.location.href = `/detail?productId=${recipe.productId}`;
          });

          // 獲取並顯示圖片部分，使用 productId
          const productId = recipe.productId;
          fetch(`/productImages/product/${productId}`)
              .then(response => response.json())
              .then(imageUrls => {
                  // 只顯示第一張圖片
                  const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : '../material/icon/default.png';
                  updateImage('recipeImage', firstImageUrl);
                  console.log(firstImageUrl);
              })
              .catch(() => {
                  // 如果請求圖片失敗，顯示預設圖片
                  updateImage('recipeImage', '../material/icon/default.png');
              });
      })
      .catch(error => {
          console.error('載入食譜數據時出錯：', error);
          alert('載入食譜數據時出錯，請稍後再試');
      });
});

// 輔助函數
function updateElement(id, content) {
  const element = document.getElementById(id);
  if (element) {
      element.textContent = content;
  } else {
      console.warn(`未找到 ID 為 '${id}' 的元素`);
  }
}

function updateList(id, content) {
  const preElement = document.getElementById(id);
  if (preElement) {
      if (id === 'ingredientsList') {
          const formattedContent = content.split(',').map(item => item.trim()).join('\n');
          preElement.textContent = formattedContent;
      } else {
          preElement.textContent = content;
      }
  } else {
      console.warn(`未找到 ID 為 '${id}' 的 pre 元素`);
  }
}

function addButtonListener(id, callback) {
  const button = document.getElementById(id);
  if (button) {
      button.addEventListener('click', callback);
  } else {
      console.warn(`未找到 ID 為 '${id}' 的按鈕`);
  }
}

function updateImage(id, imageUrl) {
  const imageElement = document.getElementById(id);
  if (imageElement) {
      imageElement.src = imageUrl;  // 更新圖片的 src 屬性
  } else {
      console.warn(`未找到 ID 為 '${id}' 的圖片元素`);
  }
}