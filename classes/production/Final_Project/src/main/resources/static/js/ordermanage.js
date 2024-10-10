window.onload = function () {
  // 從後端獲取當前用戶的訂單
  function fetchOrders() {
    fetch('/api/orders/user')
      .then(response => response.json())
      .then(orders => {
        displayOrders(orders);  // 成功後調用顯示訂單的函數
      })
      .catch(error => console.error('獲取訂單時出錯:', error));  // 錯誤處理
  }

  // 顯示訂單的函數
  function displayOrders(orders) {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = ''; // 清空現有內容

    orders.forEach(order => {
      const orderItem = document.createElement('div');
      orderItem.classList.add('order-item');
      orderItem.setAttribute('data-order-id', order.orderId); // 將orderId添加為data屬性

      // 訂單圖片區域
      const orderImage = document.createElement('div');
      orderImage.classList.add('order-image');
      // 使用第一個商品的圖片或預設圖片
      let firstProductImage = "../material/icon/default.png";
      if (order.orderDetails && order.orderDetails.length > 0) {
        const firstProduct = order.orderDetails[0];
        if (firstProduct.productImageUrl) {
          firstProductImage = firstProduct.productImageUrl;
        }
      }

      orderImage.innerHTML = `<img src="${firstProductImage}" alt="訂單商品圖片" class="order-thumbnail">`;
      orderItem.appendChild(orderImage);

      // 訂單詳細資訊區域
      const orderDetails = document.createElement('div');
      orderDetails.classList.add('order-details');
      orderDetails.innerHTML = `
        <p>訂單編號 <strong>${order.orderId}</strong></p>
        <p>金額總計 NT$${order.finalAmount.toLocaleString()}</p>
        <p>${order.status}</p>
      `;
      orderItem.appendChild(orderDetails);

      // 訂單商品數量及按鈕區域
      const orderInfo = document.createElement('div');
      orderInfo.classList.add('order-info');
      orderInfo.innerHTML = `
        <span>${order.orderDetails.length}項商品</span>
      `;

      // 創建查看訂單按鈕
      const viewOrderButton = document.createElement('button');
      viewOrderButton.textContent = '查看訂單';
      viewOrderButton.addEventListener('click', function () {
        viewOrderDetails(order.orderId);
      });
      orderInfo.appendChild(viewOrderButton);

      orderItem.appendChild(orderInfo);

      // 將訂單項目添加到訂單列表中
      orderList.appendChild(orderItem);
    });
  }

  // 查看訂單詳情
  function viewOrderDetails(orderId) {
    console.log('Viewing order details for orderId:', orderId); // 添加日誌
    window.location.href = `/myOrder/details/${orderId}`;
  }

  // 將 viewOrderDetails 函數添加到全局作用域
  window.viewOrderDetails = viewOrderDetails;

  // 頁面加載時獲取訂單
  fetchOrders();

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
};
