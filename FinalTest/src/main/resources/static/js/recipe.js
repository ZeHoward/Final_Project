let currentPage = 1;
const recipesPerPage = 9;
let totalPages = 1;
let recipes = [];
let favoriteProductIds = []; // 存儲用戶收藏的 productId 列表

document.addEventListener('DOMContentLoaded', function () {
  fetchRecipes();

  // 綁定分類過濾
  document.querySelectorAll(".down-container a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const category = this.getAttribute("data-category");
      filterRecipes(category);
    });
  });

  // 綁定排序選擇事件
  const sortSelect = document.getElementById("sort");
  sortSelect.addEventListener("change", function () {
    sortRecipes();
  });

  document.getElementById("rcontainer").addEventListener("click", handleRecipeActions);
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderCurrentPage();
    }
  });
  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderCurrentPage();
    }
  });
  document.getElementById("searchIcon").addEventListener("click", () => {
    const keyword = document.getElementById("searchInput").value.trim();
    if (keyword) {
      searchRecipes(keyword);
    } else {
      alert("請輸入關鍵字");
    }
  });
});

function fetchRecipes(category = '') {
  fetch(`/api/recipes/list`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // 檢查 API 回傳的資料
        recipes = data.recipes;

        // 檢查每個 recipe 是否具有 productId
        recipes.forEach(recipe => {
          if (!recipe.productId) {
            console.warn("缺少 productId 的食譜:", recipe);
          }
        });

        totalPages = Math.ceil(recipes.length / recipesPerPage);
        currentPage = 1;
        renderCurrentPage();
        updateTitle(category);

        // 在獲取食譜後調用 fetchFavorites 來標記已收藏的食譜
        fetchFavorites();
      })
      .catch(error => console.error('Error fetching recipes:', error));
}

function fetchFavorites() {
  favoriteProductIds = [];
  getUserId().then(userId => {
    if (!userId) return;

    fetch(`/api/favorites/recipes/user?userId=${userId}`)
        .then(response => response.json())
        .then(favorites => {
          favoriteProductIds = favorites.map(item => item.productId);

          // 重新渲染當前頁面以顯示愛心樣式
          renderCurrentPage();
        })
        .catch(error => console.error('Error fetching favorites:', error));
  });
}

function renderCurrentPage() {
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const recipesToShow = recipes.slice(startIndex, endIndex);
  displayRecipes(recipesToShow);
  updatePageInfo();
}

function displayRecipes(recipesToShow) {
  const container = document.getElementById("rcontainer");
  container.innerHTML = "";

  const fetchImagePromises = recipesToShow.map(recipe =>
      fetch(`/productImages/product/${recipe.productId}`)
          .then(response => response.json())
          .then(imageUrls => ({
            recipe,
            imageUrl: (imageUrls && imageUrls.length > 0) ? imageUrls[0] : '../material/icon/default.png'
          }))
          .catch(() => ({
            recipe,
            imageUrl: '../material/icon/default.png'
          }))
  );

  Promise.all(fetchImagePromises)
      .then(recipeDataWithImages => {
        recipeDataWithImages.forEach(({ recipe, imageUrl }) => {
          const recipeDiv = document.createElement("div");
          recipeDiv.className = "recipe-card";
          recipeDiv.dataset.recipeId = recipe.recipeId;
          recipeDiv.dataset.productId = recipe.productId;
          recipeDiv.dataset.recipeName = recipe.title;

          const isFavorite = favoriteProductIds.includes(recipe.productId);
          const heartClass = isFavorite ? "fa-heart active" : "fa-heart";

          const recipeHtml = `
          <img class="recipe-image" src="${imageUrl}" alt="${recipe.title}">
          <h3 class="recipe-name">${recipe.title}</h3>
          <p class="recipe-level">難易度: ${recipe.level}</p>
          <p class="recipe-time">烹飪時間: ${recipe.cookTime} 分鐘</p>
          <div class="recipe-actions">
            <button class="add-to-favorite">
              <i class="fa-solid ${heartClass}"></i>&nbsp;&nbsp;加入收藏
            </button>
            <button class="view-recipe" data-recipe-id="${recipe.recipeId}">
              <i class="fa-solid fa-eye"></i>&nbsp;&nbsp;閱讀食譜
            </button>
          </div>
        `;
          recipeDiv.innerHTML = recipeHtml;
          container.appendChild(recipeDiv);
        });

        // 填補空白卡片
        const itemsPerRow = 3;
        let itemsToAdd = itemsPerRow - (recipesToShow.length % itemsPerRow);
        if (itemsToAdd && itemsToAdd !== itemsPerRow) {
          for (let i = 0; i < itemsToAdd; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.className = "recipe-card empty";
            emptyDiv.style.visibility = "hidden";
            container.appendChild(emptyDiv);
          }
        }
      });
}

function handleRecipeActions(event) {
  const target = event.target;

  if (target.closest(".add-to-favorite")) {
    event.preventDefault();
    event.stopPropagation();
    checkLoginStatus()
        .then((isLoggedIn) => {
          if (isLoggedIn) {
            getUserId().then(userId => {
              if (userId) {
                const recipeElement = target.closest(".recipe-card");
                const recipeId = recipeElement.dataset.recipeId;
                const productId = recipeElement.dataset.productId;
                const recipeName = recipeElement.dataset.recipeName;
                const favoriteBtn = recipeElement.querySelector(".fa-heart");

                if (favoriteBtn.classList.contains("active")) {
                  fetch(`/api/favorites/recipes/remove?userId=${userId}&recipeId=${recipeId}`, {
                    method: "DELETE",
                  }).then(() => {
                    favoriteBtn.classList.remove("active");
                    Swal.fire({
                      title: "已取消收藏",
                      text: `已將${recipeName}移除收藏`,
                      icon: "success",
                      timer: 1500,
                    });
                    console.log(productId);
                    console.log(recipeName);
                    console.log(recipeId);
                  }).catch((error)=>{
                    console.error("移除商品收藏遇到錯誤",error);
                  })
                } else {
                  fetch(`/api/favorites/recipes/add?userId=${userId}&recipeId=${recipeId}`, {
                    method: "POST",
                  })
                      .then(response => response.json())
                      .then(() => {
                        favoriteBtn.classList.add("active");
                        Swal.fire({
                          title: "成功",
                          text: `已將${recipeName}加入收藏`,
                          icon: "success",
                          timer: 1500,
                        });
                        console.log(productId);
                        console.log(recipeName);
                        console.log(recipeId);
                      })
                      .catch((error) => {
                        console.error("加入收藏時發生錯誤:", error);
                      });
                }
              }
            });
          } else {
            Swal.fire({
              title: "未登入",
              text: `請先登入才能加入收藏`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: '登入',
              cancelButtonText: '取消',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/loginPage";
              }
            });
          }
        })
    return; // 阻止後續的跳轉行為
  } else if (target.closest(".view-recipe")) {
    event.preventDefault();
    event.stopPropagation();
    const recipeId = target.closest(".view-recipe").dataset.recipeId;
    window.location.href = `/recipeDetails/${recipeId}`;
  }
}




function addFavorite(userId, recipeId, recipeName, favoriteBtn) {
  console.log(`Adding to favorites - User ID: ${userId}, Recipe ID: ${recipeId}`);
  fetch(`/api/favorites/recipes/add?userId=${userId}&recipeId=${recipeId}`, {
    method: "POST"
  })
      .then(response => {
        if (!response.ok) {
          console.error(`Add Favorite failed with status: ${response.status}`);
          throw new Error('加入收藏失敗');
        }
        return response.json();
      })
      .then(() => {
        favoriteBtn.classList.add("active");
        showSuccessMessage(`已將${recipeName}加入收藏`);
      })
      .catch(error => console.error("加入收藏時發生錯誤:", error));
}

function removeFavorite(userId, productId, recipeName, favoriteBtn) {
  console.log(`Removing from favorites - User ID: ${userId}, Product ID: ${productId}`);
  fetch(`/api/favorites/recipes/remove?userId=${userId}&productId=${productId}`, {
    method: "DELETE"
  })
      .then(response => {
        if (!response.ok) {
          console.error(`Remove Favorite failed with status: ${response.status}`);
          throw new Error('移除收藏失敗');
        }
      })
      .then(() => {
        favoriteBtn.classList.remove("active");
        showSuccessMessage(`已將${recipeName}移除收藏`);
      })
      .catch(error => console.error("移除商品收藏遇到錯誤", error));
}

function filterRecipes(category) {
  fetchRecipes();
}

function sortRecipes() {
  const sortBy = document.getElementById("sort").value;
  let sortedRecipes = [...recipes]; // 複製 recipes

  const levelOrder = {
    '簡易': 3,
    '中等': 2,
    '困難': 1
  };

  // 根據用戶選擇的排序方式進行排序
  switch (sortBy) {
    case "levelAsc":
      sortedRecipes.sort((a, b) => {
        return (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0);
      });
      break;
    case "levelDesc":
      sortedRecipes.sort((a, b) => {
        return (levelOrder[b.level] || 0) - (levelOrder[a.level] || 0);
      });
      break;
    case "cookTimeASC":
      sortedRecipes.sort((a, b) => b.cookTime - a.cookTime);
      break;
    case "cookTimeDesc":
      sortedRecipes.sort((a, b) => a.cookTime - b.cookTime);
      break;
  }

  // 更新頁面
  recipes = sortedRecipes;
  currentPage = 1;
  renderCurrentPage();
}

function searchRecipes(keyword) {
  const filteredRecipes = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(keyword.toLowerCase())
  );
  recipes = filteredRecipes;
  totalPages = Math.ceil(recipes.length / recipesPerPage);
  currentPage = 1;
  renderCurrentPage();
  updateTitle('搜尋結果');
}

function updateTitle(category = '') {
  const titleElement = document.getElementById("title");
  switch (category) {
    case 'home':
      titleElement.textContent = "家常料理";
      break;
    case 'kids':
      titleElement.textContent = "兒童友善";
      break;
    case 'elderly':
      titleElement.textContent = "銀髮友善";
      break;
    case 'international':
      titleElement.textContent = "異國料理";
      break;
    case 'group':
      titleElement.textContent = "多人料理";
      break;
    case '搜尋結果':
      titleElement.textContent = "搜尋結果";
      break;
    default:
      titleElement.textContent = "所有食譜";
  }
}

function getUserId() {
  return fetch('/users/userAllInfo')
      .then(response => response.json())
      .then(data => data.userId)
      .catch(error => {
        console.error("獲取用戶 ID 時發生錯誤", error);
        return null;
      });
}

function checkLoginStatus() {
  return fetch('users/checkSession')
      .then(response => response.json())
      .catch(error => {
        console.error("檢查登入狀態時發生錯誤", error);
        return false;
      });
}

function showLoginPrompt() {
  Swal.fire({
    title: "未登入",
    text: "請先登入才能加入收藏",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: '登入',
    cancelButtonText: '取消',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/loginPage";
    }
  });
}

function showSuccessMessage(message) {
  Swal.fire({
    title: "成功",
    text: message,
    icon: "success",
    timer: 1500,
  });
}
