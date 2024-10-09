console.log('999999');
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
      const idd = data.productId;
      
      

      // 更新 DOM 元素
      updateElement('recipeName', recipe.title);
      updateElement('foodName', recipe.title);
      updateElement('cookingTime', `烹飪時間：${recipe.cookTime} 分鐘`);
      updateElement('level', `難度：${recipe.level}`);
      updateElement('servings', `份量：${recipe.servings} 人份`);

      updateList('ingredientsList', recipe.ingredients.split(', '));
      updateList('stepsList', recipe.steps.split('\n\n'), true);
      updateList('notesList', [recipe.notes]);

      // 獲取並顯示圖片部分，使用 productId
      const productId = recipe.productId;  // 確認 productId 來自食譜數據
      fetch(`/productImages/product/${idd}`)
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

function updateList(id, items, numbered = false) {
  const list = document.getElementById(id);
  if (list) {
    list.innerHTML = '';
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = numbered ? `${index + 1}. ${item}` : item;
      list.appendChild(li);
    });
  } else {
    console.warn(`未找到 ID 為 '${id}' 的列表`);
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

// 新增的圖片更新函數
function updateImage(id, imageUrl) {
  const imageElement = document.getElementById(id);
  if (imageElement) {
    imageElement.src = imageUrl;  // 更新圖片的 src 屬性
  } else {
    console.warn(`未找到 ID 為 '${id}' 的圖片元素`);
  }
}