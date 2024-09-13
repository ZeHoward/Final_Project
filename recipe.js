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

  // 使用 fetch 從 product.json 載入商品資料
  fetch('./recipe.json')
    .then(response => response.json())
    .then(products => {
      // 顯示商品資料
      displayProducts(products);

      // 定義難易度排序的對應表
      const difficultyOrder = {
        "簡易": 1,
        "中等": 2,
        "困難": 3
      };

      // 商品排序功能
      window.sortProducts = function () {
        const sortBy = document.getElementById("sort").value;
        if (sortBy === "easyToHard") {
          // 依難易度由簡單到困難排序
          products.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        } else if (sortBy === "hardToEasy") {
          // 依難易度由困難到簡單排序
          products.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
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
    const container = document.getElementById("pcontainer");
    container.innerHTML = ""; // 清空現有商品
    products.forEach((product) => {
      container.innerHTML += `
        <div class="product-card">
          <img class="product-image" src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          
          <p class="product-difficulty">難易度: ${product.difficulty}</p>
          <div class="home-product-btn">
            <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
            <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車</button>
          </div>
        </div>
      `;
    });

    // 加入購物車按鈕事件處理
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productName = this.closest(".product-card").querySelector("h3").textContent;
        alert(`已將 ${productName} 加入購物車！`);
      });
    });

    // 收藏商品按鈕事件處理
    document.querySelectorAll(".add-to-favorite").forEach((button) => {
      button.addEventListener("click", function () {
        const productName = this.closest(".product-card").querySelector("h3").textContent;
        alert(`已將 ${productName} 加入收藏！`);
        this.style.color = "#cc4235";
      });
    });
  };
};
