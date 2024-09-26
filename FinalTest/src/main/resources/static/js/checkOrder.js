window.onload = function () {
// JSON 資料 - 訂單項目
    const orderItems = [
        {
            image: "./material/mealkit/BeefPho.png",
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



