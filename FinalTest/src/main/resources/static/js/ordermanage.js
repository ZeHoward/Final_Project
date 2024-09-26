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


  // 模擬訂單資料
const orders = [
  {
      orderId: '#92286157',
      totalAmount: 988,
      status: '備貨中',
      itemCount: 3,
      statusIcon: '',
  },
  {
      orderId: '#27287157',
      totalAmount: 350,
      status: '運輸中',
      itemCount: 4,
      statusIcon: '',
  },
  {
      orderId: '#32287157',
      totalAmount: 388,
      status: '已完成',
      itemCount: 2,
      statusIcon: '✔',
  },
  {
      orderId: '#9228456',
      totalAmount: 1988,
      status: '已完成',
      itemCount: 5,
      statusIcon: '✔',
  },
  {
      orderId: '#62348157',
      totalAmount: 200,
      status: '已完成',
      itemCount: 1,
      statusIcon: '✔',
  }
];




// 找到 HTML 中的訂單列表區域
const orderList = document.getElementById('order-list');

// 動態生成訂單項目
orders.forEach(order => {
  const orderItem = document.createElement('div');
  orderItem.classList.add('order-item');

  // 訂單圖片區域
  const orderImage = document.createElement('div');
  orderImage.classList.add('order-image');
  orderImage.innerHTML = '<img src="box_placeholder.png" alt="訂單圖片">';
  orderItem.appendChild(orderImage);

  // 訂單詳細資訊區域
  const orderDetails = document.createElement('div');
  orderDetails.classList.add('order-details');
  orderDetails.innerHTML = `
      <p>訂單編號 <strong>${order.orderId}</strong></p>
      <p>金額總計 NT$${order.totalAmount.toLocaleString()}</p>
      <p>${order.status} ${order.statusIcon ? `<span class="status-icon">${order.statusIcon}</span>` : ''}</p>
  `;
  orderItem.appendChild(orderDetails);

  // 訂單商品數量及按鈕區域
  const orderInfo = document.createElement('div');
  orderInfo.classList.add('order-info');
  orderInfo.innerHTML = `
      <span>${order.itemCount}項商品</span>
      <button>查看訂單</button>
  `;
  orderItem.appendChild(orderInfo);

  // 將訂單項目添加到訂單列表中
  orderList.appendChild(orderItem);
});

};
