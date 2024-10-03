window.onload = function () {
    // 從 URL 路徑中獲取訂單 ID
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    const orderId = pathSegments[pathSegments.length - 1];  // 取得最後一段，這就是 orderId

    console.log("訂單 ID:", orderId);  // 調試用，打印訂單 ID

    if (orderId) {
        // 有訂單 ID，抓取訂單詳情
        fetchOrderDetails(orderId);
    } else {
        console.error('未提供訂單 ID');
    }

    // 使用 Fetch API 獲取訂單詳情
    function fetchOrderDetails(orderId) {
        fetch(`/api/orders/${orderId}`)  // 確保這個路徑是正確的
            .then(response => {
                if (!response.ok) {
                    throw new Error("獲取訂單詳情失敗");
                }
                return response.json();
            })
            .then(order => {
                displayOrderDetails(order);
            })
            .catch(error => console.error('獲取訂單詳情時出錯:', error));
    }

    // 顯示訂單詳情
    function displayOrderDetails(order) {
        // 1. 更新訂單編號和日期
        document.getElementById('orderId').textContent = `訂單編號：#${order.orderId}`;
        document.getElementById('orderDate').textContent = `訂單日期：${new Date(order.orderDate).toLocaleDateString()}`;

        // 2. 更新訂單項目
        const orderItemsContainer = document.getElementById('che-order-items');
        orderItemsContainer.innerHTML = ''; // 清空現有內容

        order.orderDetails.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="che-td"><img src="${item.productImageBase64 ? `data:image/png;base64,${item.productImageBase64}` : 'placeholder.jpg'}" alt="商品圖片"></td>
                <td class="che-td">${item.productName}</td>
                <td class="che-td">${item.quantity}</td>
                <td class="che-td">NT$${item.price}</td>
                <td class="che-td">NT$${item.total}</td>
            `;
            orderItemsContainer.appendChild(row);
        });

        // 3. 更新訂單摘要
        const summaryContainer = document.querySelector('.che-summary');
        summaryContainer.innerHTML = `
            商品總計：NT$${order.totalAmount}<br>
            折扣碼：${order.couponCode ? order.couponCode : '無'}<br>
            折扣百分比：${order.percentageDiscount ? order.percentageDiscount + '%' : '無'}<br>
            折扣金額：${order.amountDiscount ? '-NT$' + order.amountDiscount : '無'}<br>
            付款總金額：NT$${order.finalAmount}
        `;

        // 4. 更新收件人資訊
        const recipientDetailsContainer = document.getElementById('che-recipient-details');
        recipientDetailsContainer.innerHTML = `
            <p><strong>收件人：</strong> ${order.user.username}</p>
            <p><strong>收件人信箱：</strong> ${order.user.email}</p>
            <p><strong>收件人地址：</strong> ${order.user.address}</p>
            <p><strong>收件人電話：</strong> ${order.user.phoneNumber}</p>
        `;
    }
};
