
// 切換子選單的顯示與隱藏
function toggleSubmenu() {
  const submenu = document.querySelector(".submenu");
  const arrowIcon = document.getElementById("arrow-icon");

  if (submenu.style.display === "block") {
    submenu.style.display = "none";
    arrowIcon.classList.remove("fa-chevron-up");
    arrowIcon.classList.add("fa-chevron-down");
  } else {
    submenu.style.display = "block";
    arrowIcon.classList.remove("fa-chevron-down");
    arrowIcon.classList.add("fa-chevron-up");
  }
}

// 切換愛心按鈕的顯示狀態
function toggleHeart(heartIcon) {
  heartIcon.classList.toggle("liked");
}


document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('recipe.json');  // 確保這裡的文件名與實際一致
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const recipes = await response.json();
  
      // 檢查數據是否正確
      console.log('Recipes Data:', recipes);
  
      const foodCardsContainer = document.getElementById('foodCards');
  
      recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipes';
  
        card.innerHTML = `
          <div class="card-content">
            <img src="${recipe.img}" alt="${recipe.name}" class="card-img" />
            <div class="card-title">${recipe.name}</div>
            <div class="card-details">
              <div class="heart-btn" onclick="toggleHeart(this)"></div>
              <button class="read-btn">閱讀食譜</button>
            </div>
          </div>
        `;
  
        foodCardsContainer.appendChild(card);
      });
    } catch (error) {
      console.error('載入食譜數據時出錯：', error);
    }
  });
  