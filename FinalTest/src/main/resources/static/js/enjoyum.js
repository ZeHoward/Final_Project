var slideIndex = 1;
var autoPlayInterval;
let currentIndex1 = 0;
let currentIndex2 = 0;

// 自動播放幻燈片
function startAutoPlay() {
  autoPlayInterval = setInterval(function () {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000); // 每5秒自動切換
}

// 手動切換幻燈片
function plusSlides(n) {
  clearInterval(autoPlayInterval); // 停止自動播放
  slideIndex += n;
  showSlides(slideIndex);
  startAutoPlay(); // 重新啟動自動播放
}

// 顯示幻燈片
function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // 隱藏所有幻燈片
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // 移除所有圓點的活動狀態
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dotActive", "");
  }

  // 顯示當前幻燈片，並激活當前的圓點
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " dotActive";
}

// 初始化幻燈片
showSlides(slideIndex);
startAutoPlay();

const type1 = "mealkit";
const type2 = "preparedFood";

document.addEventListener("DOMContentLoaded", function () {
  // 調理包推薦商品
  fetch(`products/type/${type1}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("無法獲得第一區域推薦商品清單");
      }
      return response.json();
    })
    .then((products1) => {
      renderProducts(products1, "productContainer1", currentIndex1);

      // 上一個商品
      document.getElementById("prevBtn").addEventListener("click", () => {
        currentIndex1 =
          (currentIndex1 - 1 + products1.length) % products1.length;
        renderProducts(products1, "productContainer1", currentIndex1);
      });

      // 下一個商品
      document.getElementById("nextBtn").addEventListener("click", () => {
        currentIndex1 = (currentIndex1 + 1) % products1.length;
        renderProducts(products1, "productContainer1", currentIndex1);
      });
    })
    .catch((error) => {
      console.error("無法獲得第一區域商品清單:", error);
    });

  // 生鮮食材包推薦商品
  fetch(`products/type/${type2}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("無法獲得第二區域推薦商品清單");
      }
      return response.json();
    })
    .then((products2) => {
      renderProducts(products2, "productContainer2", currentIndex2);

      // 上一個商品
      document.getElementById("prevBtn2").addEventListener("click", () => {
        currentIndex2 =
          (currentIndex2 - 1 + products2.length) % products2.length;
        renderProducts(products2, "productContainer2", currentIndex2);
      });

      // 下一個商品
      document.getElementById("nextBtn2").addEventListener("click", () => {
        currentIndex2 = (currentIndex2 + 1) % products2.length;
        renderProducts(products2, "productContainer2", currentIndex2);
      });
    })
    .catch((error) => {
      console.error("無法獲得第二區域商品清單:", error);
    });
});

function renderProducts(products, containerId, currentIndex) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // 清空容器

  for (let i = -1; i <= 2; i++) {
    const index = (currentIndex + i + products.length) % products.length;
    const product = products[index];

    // 創建商品卡
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.style.cursor = "pointer";

    // 創建 img 元素
    const imgElement = document.createElement("img");
    imgElement.className = "product-image";
    imgElement.alt = `${product.name}`; // 動態設置 alt 屬性

    // 設置商品卡的 HTML 內容
    const productHtml = `
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">$NT${product.price}</p>
      <div class="home-product-btn">
        <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
        <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車</button>
      </div>
    `;

    productDiv.innerHTML = productHtml;
    productDiv.insertBefore(imgElement, productDiv.firstChild); // 插入圖片在第一位
    container.appendChild(productDiv);

    // 獲取商品圖片
    fetch(`productImages/product/${product.productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("無法獲取商品圖片");
        }
        return response.json();
      })
      .then((images) => {
        if (images.length > 0) {
          imgElement.src = images[0];
        } else {
          imgElement.src = "../material/icon/default.png"; // 默認圖片
        }
      })
      .catch((error) => {
        console.error(
          `Error fetching product image for product ${product.productId}:`,
          error
        );
        imgElement.src = "../material/icon/error.png"; // 錯誤圖片
      });

    // 商品卡點擊事件跳轉到商品詳情頁面
    productDiv.addEventListener("click", () => {
      window.location.href = `/detail?productId=${product.productId}`;
    });

    productDiv
      .querySelector(".add-to-cart")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        Swal.fire({
          title: "成功",
          text: "已將商品加入購物車",
          icon: "success",
          timer: 1500,
        });
      });

    productDiv
      .querySelector(".add-to-favorite")
      .addEventListener("click", (event1) => {
        event1.stopPropagation();
        Swal.fire({
          title: "成功",
          text: `已將${product.name}加入收藏`,
          icon: "success",
          timer: 1500,
        });
      });
  }
}
