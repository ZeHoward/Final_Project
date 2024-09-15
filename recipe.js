window.onload = function () {
  // 菜單展開、關閉
  window.openSidenav = function () {
    document.getElementById("sidenav").style.width = "100%";
    document.body.style.overflow = "hidden";
  };

  window.closeSidenav = function () {
    document.getElementById("sidenav").style.width = "0%";
    document.body.style.overflow = "";
  };

  // 展開菜單選項
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

  // menu toggle up/down 圖案
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

  var dropdown2 = document.getElementsByClassName("down-btn");
  var x;

  for (x = 0; x < dropdown2.length; x++) {
    dropdown2[x].addEventListener("click", function () {
      this.classList.toggle("active2");
      var dropdownContent2 = this.nextElementSibling;
      if (dropdownContent2.style.display === "block") {
        dropdownContent2.style.display = "none";
      } else {
        dropdownContent2.style.display = "block";
      }
    });
  }

  // 使用 fetch 從 recipe.json 載入商品資料
  fetch('./recipe.json')
    .then(response => response.json())
    .then(products => {
      // 顯示商品資料
      displayProducts(products);

      // 定義難易度排序的對應表
      const levelOrder = {
        "簡易": 1,
        "中等": 2,
        "困難": 3
      };

      // 商品排序功能
      window.sortRecipes = function () {
        const sortBy = document.getElementById("sort").value;
        if (sortBy === "easyToHard") {
          // 依難易度由簡單到困難排序
          products.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
        } else if (sortBy === "hardToEasy") {
          // 依難易度由困難到簡單排序
          products.sort((a, b) => levelOrder[b.level] - levelOrder[a.level]);
          /*食譜應該不用用價錢排序 */
        } else if (sortBy === "priceLowHigh") {
          products.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceHighLow") {
          products.sort((a, b) => b.price - a.price);

        } else if (sortBy === "dateNewOld") {
          products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        } else if (sortBy === "dateOldNew") {
          products.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        }
        displayProducts(products);
      };
    })
    .catch(error => console.error('Error loading products:', error));

  // 顯示商品資料的函數
  window.displayProducts = function (products) {
    const container = document.getElementById("rcontainer");
    container.innerHTML = ""; // 清空現有商品
    products.forEach((product) => {
      container.innerHTML += `
        <div class="recipe-card">
          <img class="recipe-image" src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
           
          <p class="recipeLevel">難易度: ${product.level}</p>
          <div class="home-product-btn">
            <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
            <button class="readRecipeBtn"><i class="fa-solid fa-book-open"></i>&nbsp;&nbsp;&nbsp;閱讀食譜</button>
          </div>
        </div>
      `;
    });

/*以下版本收藏時的訊息提示會自動消失 */
   // 收藏食譜按鈕事件處理
   document.querySelectorAll(".add-to-favorite").forEach((button) => {
    // 使用 dataset 屬性追踪按鈕的收藏狀態
    button.dataset.isFavorited = "false"; // 初始狀態

    button.addEventListener("click", function () {
      const recipeName = this.closest(".recipe-card").querySelector("h3").textContent;

      if (this.dataset.isFavorited === "false") {
        // 當狀態為未收藏時，執行收藏操作
        this.style.color = "#cc4235"; // 愛心變成紅色
        this.dataset.isFavorited = "true"; // 更新狀態為已收藏
        // 使用訊息提示
        showMessage(`已將 【${recipeName}】食譜加入收藏！`);
      } else {
        // 當狀態為已收藏時，執行取消收藏操作
        this.style.color = "#787575"; // 愛心變回灰色
        this.dataset.isFavorited = "false"; // 更新狀態為未收藏
        // 使用訊息提示
        showMessage(`已將 【${recipeName}】食譜取消收藏！`);
      }
    });
  });
};

// 顯示訊息的函數
function showMessage(message) {
  const messageBox = document.createElement("div");
  messageBox.className = "message-box";
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  // 設定訊息顯示時間
  setTimeout(() => {
    messageBox.remove();
  }, 2000);
}
};


/*以下版本是alert，需手動按確認才會結束提示框*/
//     // 收藏食譜按鈕事件處理
//     document.querySelectorAll(".add-to-favorite").forEach((button) => {
//       // 使用 dataset 屬性追踪按鈕的收藏狀態
//       button.dataset.isFavorited = "false"; // 初始狀態

//       button.addEventListener("click", function () {
//         const recipeName = this.closest(".recipe-card").querySelector("h3").textContent;

//         if (this.dataset.isFavorited === "false") {
//           // 當狀態為未收藏時，執行收藏操作
//           alert(`已將 ${recipeName} 加入收藏！`);
//           this.style.color = "#cc4235"; // 愛心變成紅色
//           this.dataset.isFavorited = "true"; // 更新狀態為已收藏
//         } else {
//           // 當狀態為已收藏時，執行取消收藏操作
//           alert(`已將 ${recipeName} 取消收藏！`);
//           this.style.color = "#787575"; // 愛心變回灰色
//           this.dataset.isFavorited = "false"; // 更新狀態為未收藏
//         }
//       });
//     });
//   };
// };