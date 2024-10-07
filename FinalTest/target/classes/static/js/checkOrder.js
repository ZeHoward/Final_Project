window.onload = function () {
    // 從 URL 路徑中獲取訂單 ID
    const pathParts = window.location.pathname.split('/');
    const orderId = pathParts[pathParts.length - 1];

    if (orderId) {
        fetchOrderDetails(orderId);
    } else {
        console.error('沒有提供訂單 ID');
    }

    function fetchOrderDetails(orderId) {
        fetch(`/api/orders/${orderId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("獲取訂單詳情失敗");
                }
                return response.json();
            })
            .then(order => {
                if (order) {
                    displayOrderDetails(order);
                } else {
                    console.error('沒有找到訂單');
                }
            })
            .catch(error => console.error('獲取訂單詳情時出錯:', error));
    }

    function displayOrderDetails(order) {
        // 更新訂單編號和日期
        document.getElementById('orderId').textContent = `訂單編號：#${order.orderId}`;
        document.getElementById('orderDate').textContent = `訂單日期：${new Date(order.orderDate).toLocaleDateString()}`;

        // 更新訂單項目
        const orderItemsContainer = document.getElementById('che-order-items');
        orderItemsContainer.innerHTML = '';

        order.orderDetails.forEach(item => {
            const row = document.createElement('tr');
            const imageUrl = item.productImageUrl || (item.productImages && item.productImages.length > 0 ? item.productImages[0].image : '../material/icon/default.png');
            row.innerHTML = `
                <td class="che-td"><img src="${imageUrl}" alt="${item.productName}" style="width: 100px; height: auto;"></td>
                <td class="che-td">${item.productName}</td>
                <td class="che-td">${item.quantity}</td>
                <td class="che-td">NT$${item.price}</td>
                <td class="che-td">NT$${item.total}</td>
            `;
            orderItemsContainer.appendChild(row);
        });

        // 更新訂單摘要
        const summaryContainer = document.querySelector('.che-summary');
        summaryContainer.innerHTML = `
            商品總計：NT$${order.totalAmount}<br>
            折扣碼：${order.couponCode || '無'}<br>
            折扣百分比：${order.percentageDiscount ? order.percentageDiscount + '%' : '無'}<br>
            折扣金額：${order.amountDiscount ? '-NT$' + order.amountDiscount : '無'}<br>
            付款總金額：NT$${order.finalAmount}<br>
            訂單狀態：${order.status}
        `;

        // 更新收件人資訊
        const recipientDetailsContainer = document.getElementById('che-recipient-details');
        recipientDetailsContainer.innerHTML = `
            <p><strong>收件人：</strong> ${order.user.username}</p>
            <p><strong>收件人信箱：</strong> ${order.user.email}</p>
            <p><strong>收件人地址：</strong> ${order.address || '未提供'}</p>
            <p><strong>收件人電話：</strong> ${order.user.phoneNumber}</p>
        `;
    }
};