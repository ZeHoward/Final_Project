document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".couponPage");

    // 首先通過API獲取userId
    fetch('http://localhost:8080/api/favorites/recipes/getUserId')
        .then(response => response.json())
        .then(userId => {
            // 當成功獲取userId後，使用該userId來獲取優惠券
            fetch(`/api/coupons/user/${userId}`)
                .then(response => response.json())
                .then(data => {
                    displayCoupons(data);  // 顯示優惠券數據
                })
                .catch(error => {
                    console.error('Error fetching coupons:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching userId:', error);
        });

    // 動態生成優惠券的內容
    function displayCoupons(coupons) {
        // 清空現有內容
        container.innerHTML = '<p>優惠券</p>';

        // 檢查是否有優惠券
        if (coupons.length === 0) {
            container.innerHTML += '<p>目前沒有可用的優惠券。</p>';
            return;
        }

        coupons.forEach(couponObj => {
            const coupon = couponObj.coupon;

            // 動態生成優惠券的 HTML 結構
            const couponHTML = `
                <div class="couponPageDiv">
                    <span class="title1">${coupon.name}</span>
                    <span class="discountCode">代碼：${coupon.code}</span>
                    <span class="validDate">有效期限: ${coupon.expiryDate}</span>
                </div>
            `;

            // 插入到容器中
            container.innerHTML += couponHTML;
        });
    }
});
