
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
            <div class="cardContent">
              <img src="${recipe.img}" alt="${recipe.name}" class="cardImg" />
              <div class="card-title">${recipe.name}</div>
              <div class="card-details">
                <div class="heart-btn" onclick="toggleHeart(this)"></div>
                <button class="readBtn">閱讀食譜</button>
              </div>
            </div>
          `;
    
          foodCardsContainer.appendChild(card);
        });
      } catch (error) {
        console.error('載入食譜數據時出錯：', error);
      }
    });
    

    window.onload = function () {
        //菜單展開、關閉
        window.openSidenav = function () {
          document.getElementById("sidenav").style.width = "100%";
          document.body.style.overflow = "hidden";
        };
      
        window.closeSidenav = function () {
          document.getElementById("sidenav").style.width = "0%";
          document.body.style.overflow = "";
        };
      
        //展開菜單選項
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
      
        //menu toggle up/down 圖案
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
      };
      