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

  const products = [
    {
      name: "日式豬排飯",
      price: 130,
      image: "./material/mealkit/katsudon.jpg",
      releaseDate: "2023-04-22",
    },
    {
      name: "義大利餃",
      price: 120,
      image: "./material/mealkit/dumpling.jpg",
      releaseDate: "2021-03-22",
    },
    {
      name: "南洋叻沙海鮮湯麵",
      price: 135,
      image: "./material/mealkit/laksa.jpg",
      releaseDate: "2021-04-24",
    },
    {
      name: "奶油松露百菇燉飯",
      price: 220,
      image: "./material/mealkit/奶油松露百菇燉飯.jpg",
      releaseDate: "2025-06-22",
    },
    {
      name: "泰式冬蔭功酸辣海鮮湯",
      price: 170,
      image: "./material/mealkit/soup.png",
      releaseDate: "2021-04-02",
    },
    {
      name: "印度雞肉香飯",
      price: 140,
      image: "./material/mealkit/印度雞肉香飯.jpg",
      releaseDate: "2023-02-22",
    },
    {
      name: "新加坡海南雞飯",
      price: 150,
      image: "./material/mealkit/新加坡海南雞飯.jpg",
      releaseDate: "2021-07-22",
    },
    {
      name: "新加坡海南雞飯",
      price: 140,
      image: "./material/mealkit/新加坡海南雞飯.jpg",
      releaseDate: "2021-11-22",
    },
    {
      name: "新加坡海南雞飯",
      price: 190,
      image: "./material/mealkit/新加坡海南雞飯.jpg",
      releaseDate: "2021-04-01",
    },
  ];

  window.displayProducts = function (products) {
    const container = document.getElementById("pcontainer");
    container.innerHTML = ""; // Clear existing products
    products.forEach((product) => {
      container.innerHTML += `
              <div class="product-card">
                  <img class="product-image" src="${product.image}" alt="${product.name}">
                  <h3>${product.name}</h3>
                  <p class="product-price">$${product.price}</p>
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
        const productName =
          this.closest(".product-card").querySelector("h3").textContent;
        alert(`已將 ${productName} 加入購物車！`);
      });
    });

    // 收藏商品按鈕事件處理
    document.querySelectorAll(".add-to-favorite").forEach((button) => {
      button.addEventListener("click", function () {
        const productName =
          this.closest(".product-card").querySelector("h3").textContent;
        alert(`已將 ${productName} 加入收藏！`);
        this.style.color = "#cc4235";
      });
    });
  };

  window.sortProducts = function () {
    const sortBy = document.getElementById("sort").value;
    if (sortBy === "priceLowHigh") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "dateNewOld") {
      products.sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    } else if (sortBy === "dateOldNew") {
      products.sort(
        (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
      );
    }
    displayProducts(products);
  };

  window.filterCategory = function (category) {
    const filteredProducts = products.filter((p) => p.category === category);
    displayProducts(filteredProducts);
  };

  displayProducts(products);
};
