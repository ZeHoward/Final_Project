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




// JSON 資料 - 訂單項目
const orderItems = [
  {
      image: "./image/印度雞肉香飯.jpg",
      name: "[冷凍] 台式芋頭獅子頭米粉湯",
      quantity: 2,
      subtotal: "NT$300"
  },
  {
      image: "./image/西班牙海鮮燉飯.jpg",
      name: "[冷凍] 經典梅干苦瓜",
      quantity: 1,
      subtotal: "NT$140"
  },
  {
      image: "product3.jpg",
      name: "[冷凍] 經典魯燒櫻花蝦米糕",
      quantity: 1,
      subtotal: "NT$130"
  },
  {
      image: "product4.jpg",
      name: "五色糙米拌飯",
      quantity: 2,
      subtotal: "NT$400"
  }
];

// JSON 資料 - 收件人資訊
const recipientInfo = {
  name: "不來的",
  email: "bradchao@brad.tw",
  address: "100台北市中正區中山南路7號",
  phone: "02-23123456",
  shippingMethod: "冷凍-黑貓快遞到店"
};

// 動態生成訂單項目
const orderItemsContainer = document.getElementById('che-order-items');

orderItems.forEach(item => {
  const row = document.createElement('tr');
  row.innerHTML = `
      <td class="che-td"><img src="${item.image}" alt="商品圖片"></td>
      <td class="che-td">${item.name}</td>
      <td class="che-td">${item.quantity}</td>
      <td class="che-td">${item.subtotal}</td>
  `;
  orderItemsContainer.appendChild(row);
});

// 動態生成收件人資訊
const recipientDetailsContainer = document.getElementById('che-recipient-details');
recipientDetailsContainer.innerHTML = `
  <p><strong>收件人：</strong> ${recipientInfo.name}</p>
  <p><strong>收件人信箱：</strong> ${recipientInfo.email}</p>
  <p><strong>收件人地址：</strong> ${recipientInfo.address}</p>
  <p><strong>收件人電話：</strong> ${recipientInfo.phone}</p>
  <p><strong>運送方式：</strong> ${recipientInfo.shippingMethod}</p>
`;




};
