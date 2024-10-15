let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = 0; // 初始化旋轉角度為 0
let isSpinning = false; // 防止在轉盤在旋轉過程中再次點擊
let userId = null;

// 當頁面載入時，從伺服器獲取目前登入的使用者資料
window.onload = function() {
  fetch('/users/userAllInfo')
      .then(response => response.json())
      .then(data => {
        if (data && data.userId) {
          userId = data.userId; // 將 userId 保存
          console.log('Logged-in user ID:', userId);
        } else {
          console.error('無法取得使用者資訊');
        }
      })
      .catch(error => {
        console.error('取得使用者資訊時發生錯誤:', error);
      });
};

// 點擊按鈕事件
btn.onclick = function () {
  if (isSpinning) return; // 如果正在旋轉，則不可以重複點擊
  isSpinning = true;

  // 設定下一次旋轉的角度（保持順時針方向，最小轉動一圈）
  let spinAngle = Math.ceil(Math.random() * 1000 + 360); // 隨機增加 360 到 1360 度的旋轉角度
  number += spinAngle; // 累積旋轉角度
  container.style.transition = "transform 3s ease-out"; // 添加過渡動畫
  container.style.transform = "rotate(" + number + "deg)";

  // 等待旋轉動畫結束後再顯示優惠券
  setTimeout(function () {
    // 根據最接近的優惠券來決定結果
    let coupon = findNearestCoupon();

    if (coupon) {
      const couponName=coupon.dataset.couponName;
      const code=coupon.dataset.code;
      console.log("您獲得的優惠券:", couponName);
      issueCoupon(userId, code);
      Swal.fire({
        title: "恭喜",
        html: `<i class="fa-solid fa-ticket" style="font-size: 50px;color: #eae2cb"></i>
         <br><br><p>恭喜您獲得「${couponName}」優惠券!</p>`,
        imageAlt: "coupon"
      })

    } else {
      console.log("未找到對應的優惠券");
    }

    // 重置狀態，允許再次旋轉
    isSpinning = false;

    // 旋轉完後，將轉盤恢復至起始位置
    setTimeout(function () {
      container.style.transition = "none"; // 移除過渡動畫
      container.style.transform = "rotate(0deg)"; // 將轉盤恢復到 0 度位置
      number = 0; // 重置累積角度
    }, 1000); // 1 秒後回到初始位置
  }, 3000); // 3秒後顯示優惠券，與旋轉動畫時間一致
};

// 根據最接近的優惠券 class 來判斷
function findNearestCoupon() {
  const coupons = document.querySelectorAll(".coupon");
  let nearest = null;
  let minDistance = Infinity;

  coupons.forEach((coupon) => {
    // 獲取每個 coupon 的邊界框信息
    let couponRect = coupon.getBoundingClientRect();
    let arrowRect = document.querySelector(".arrow").getBoundingClientRect();

    // 計算優惠券中心與箭頭中心的距離
    let couponCenterX = couponRect.left + couponRect.width / 2;
    let couponCenterY = couponRect.top + couponRect.height / 2;
    let arrowCenterX = arrowRect.left + arrowRect.width / 2;
    let arrowCenterY = arrowRect.top + arrowRect.height / 2;

    let distance = Math.sqrt(
      Math.pow(couponCenterX - arrowCenterX, 2) +
        Math.pow(couponCenterY - arrowCenterY, 2)
    );

    // 找到距離箭頭最近的優惠券
    if (distance < minDistance) {
      minDistance = distance;
      nearest = coupon;
    }
  });

  // 返回最近的優惠券
  return nearest;
}

// 根據轉盤結果發放優惠券
function issueCoupon(userId, couponCode) {
  fetch('/api/coupons/issue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      userId: userId, // 使用者ID
      couponCode: couponCode, // 優惠券代碼
    }),
  })
      .then(response => response.text())
      .then(data => {
        console.log(data); // 成功發放的訊息
      })
      .catch(error => {
        console.error('Error:', error); // 發放失敗的錯誤訊息
      });
}
