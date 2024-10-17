let currentIndex1 = 0;
let currentIndex2 = 0;
const type1 = "mealkit";
const type2 = "preparedFood";
let slideIndex = 1;
//*wen
const apiWEN = "/api"
let userIdWEN = 2
let merchantNoList = []
//wen*//

// const checkUserPayment = () => {
//   const userId = 2
//   //用id找payment
//   //寫controller
// }
//*wen
const getUserIdWEN = async () => {
    const res = await axios.get(`/users/userAllInfo`);
    userIdWEN = res.data.userId;
    checkUserPaymentWEN()
};

const checkUserPaymentWEN = async () => {
    const res = await axios.get(`${apiWEN}/orders/pay/${userIdWEN}`);
    merchantNoList = res.data
    merchantNoList.forEach((merchantNo) => {
        checkIsPaidWEN(merchantNo)
    })
    //用id找payment
    //寫controller
}

const checkIsPaidWEN = async (merchantNo) => {

    const res = await axios.post(`${apiWEN}/ECPAY/queryOrder`, {
        merchantID: "2000132",
        merchantTradeNo: merchantNo,
        timeStamp: "",
        checkMacValue: "",
        platformID: ""
    });
    const PaidMerchantNo = extractMerchantTradeNo(res.data);
//res拆出
   if (getTradeStatus(res.data) == 1 ) {
       PutOrdersStatus(PaidMerchantNo)
   }

}

const getTradeStatus = (data) => {
    // 將字符串轉換為對象
    const params = new URLSearchParams(data);
    // 獲取 TradeStatus 的值
    return params.get('TradeStatus');
}

const PutOrdersStatus = async (PaidMerchantNo) => {
    const res = await axios.put(`${apiWEN}/ECPAY/changeOrderStatus`, {
        merchantNo: PaidMerchantNo
    });
};

function extractMerchantTradeNo(inputString) {
    // 將輸入字符串分割成鍵值對
    const pairs = inputString.split('&');
    let merchantTradeNo = '';
    let tradeStatus = '';

    // 遍歷所有鍵值對
    for (let pair of pairs) {
        const [key, value] = pair.split('=');

        // 找到 MerchantTradeNo
        if (key === 'MerchantTradeNo') {
            merchantTradeNo = value;
        }

        // 找到 TradeStatus
        if (key === 'TradeStatus') {
            tradeStatus = value;
        }

        // 如果兩個值都找到了，就可以停止遍歷
        if (merchantTradeNo && tradeStatus) {
            break;
        }
    }

    // 如果 TradeStatus 為 1，返回 MerchantTradeNo，否則返回空字符串
    return tradeStatus === '1' ? merchantTradeNo : '';
}

// wen*//

document.addEventListener("DOMContentLoaded", function () {
    //輪播廣告
    showSlides(slideIndex);

    loadProductData(type1, "productContainer1", currentIndex1, "prevBtn", "nextBtn");
    loadProductData(type2, "productContainer2", currentIndex2, "prevBtn2", "nextBtn2");

    //前往商品區
    document.querySelectorAll(".view-all").forEach((viewAllBtn) => {
        viewAllBtn.addEventListener("click", function (event) {
            event.preventDefault();
            const type = this.getAttribute("data-type");
            window.location.href = `/productList`;
        })
    })

    //wen
    getUserIdWEN()
});

//載入商品資訊
function loadProductData(type, containerId, currentIndex, prevBtnId, nextBtnId) {
    fetch(`products/type/${type}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`無法獲得${type}商品清單`);
            }
            return response.json();
        })
        .then((products) => {
            const productsPerPage = 4; // 每次顯示4個商品
            updateProductInfo(products, containerId, currentIndex, productsPerPage);

            // 上一個商品組
            document.getElementById(prevBtnId).addEventListener("click", () => {
                currentIndex = (currentIndex - productsPerPage + products.length) % products.length;
                updateProductInfo(products, containerId, currentIndex, productsPerPage);
            });

            // 下一個商品組
            document.getElementById(nextBtnId).addEventListener("click", () => {
                currentIndex = (currentIndex + productsPerPage) % products.length;
                updateProductInfo(products, containerId, currentIndex, productsPerPage);
            });
        })
        .catch((error) => {
            console.error(`無法獲得${type}商品清單:`, error);
        });
}
//更新商品資訊
function updateProductInfo(products, containerId, currentIndex, productsPerPage) {
    const container = document.getElementById(containerId);
    const productElements = container.getElementsByClassName("product");

    for (let i = 0; i < productElements.length; i++) {
        const productElement = productElements[i];

        // 計算要顯示的商品索引
        const productIndex = (currentIndex + i) % products.length;

        // 取得商品資料
        const product = products[productIndex];

        // 更新商品名稱和商品價格
        productElement.querySelector(".product-name").textContent = product.name;
        productElement.querySelector(".product-price").textContent = `$NT${product.price}`;

        // 更新商品圖片
        const imgElement = productElement.querySelector(".product-image");

        imgElement.onload = function() {
            setTimeout(() => {
                productElement.classList.add("animate__animated", "animate__flipInY"); // 整個商品卡加入動畫效果
            }, i * 200); // 每個商品卡延遲200ms進入
        };

        fetch(`productImages/product/${product.productId}`)
            .then((response) => response.json())
            .then((images) => {
                imgElement.src = images.length > 0 ? images[0] : "default.jpg";
            })
            .catch(() => {
                imgElement.src = "error.jpg"; // 如果取得圖片失敗，顯示錯誤圖片
            });

        // 跳轉跳轉商品詳情
        productElement.addEventListener("click", () => {
            window.location.href = `/detail?productId=${product.productId}`;
        });

        // 加入購物車按鈕
        productElement.querySelector(".add-to-cart").addEventListener("click", function (event) {
            event.stopPropagation();
            checkLoginStatus().then(isLoggedIn => {
                if (isLoggedIn) {
                    getUserId().then(userId => {
                        if (userId) {
                            const cartItem = {
                                productName: product.name,
                                productId: product.productId,
                                quantity: 1
                            };
                            // 發送加入購物車請求
                            fetch(`/api/cart/${userId}`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(cartItem), // 傳送商品數據
                            }).then(response => {
                                if (response.ok) {
                                    Swal.fire({
                                        title: "成功",
                                        text: "已將商品加入購物車",
                                        icon: "success",
                                        timer: 1500,
                                    });
                                } else {
                                    Swal.fire({
                                        title: "錯誤",
                                        text: "無法將商品加入購物車",
                                        icon: "error",
                                    });
                                }
                            }).catch((error) => {
                                console.error("加入購物車時發生錯誤:", error);
                                Swal.fire({
                                    title: "錯誤",
                                    text: "加入購物車時發生錯誤",
                                    icon: "error",
                                });
                            });
                        }
                    });
                } else {
                    Swal.fire({
                        title: "未登入",
                        text: "請先登入才能加入購物車",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: '登入',
                        cancelButtonText: '取消',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/loginPage";
                        }
                    });
                }
            });
        });

        // 收藏商品按鈕
        productElement.querySelector(".add-to-favorite").addEventListener("click", function (event) {
            event.stopPropagation();
            checkLoginStatus().then(isLoggedIn => {
                if (isLoggedIn) {
                    getUserId().then(userId => {
                        if (userId) {
                            const favoriteBtn = this.querySelector(".fa-heart");
                            if (favoriteBtn.classList.contains("active")) {
                                // 移除收藏
                                fetch(`/api/favorites/remove?userId=${userId}&productId=${product.productId}`, {
                                    method: "DELETE",
                                }).then(() => {
                                    favoriteBtn.classList.remove("active");
                                    Swal.fire({
                                        title: "已取消收藏",
                                        text: `已將${product.name}移除收藏`,
                                        icon: "success",
                                        timer: 1500,
                                    });
                                }).catch((error) => {
                                    console.error("移除商品收藏遇到錯誤", error);
                                });
                            } else {
                                // 加入收藏
                                fetch(`/api/favorites/add?userId=${userId}&productId=${product.productId}`, {
                                    method: "POST",
                                }).then(() => {
                                    favoriteBtn.classList.add("active");
                                    Swal.fire({
                                        title: "成功",
                                        text: `已將${product.name}加入收藏`,
                                        icon: "success",
                                        timer: 1500,
                                    });
                                }).catch((error) => {
                                    console.error("加入收藏時發生錯誤:", error);
                                });
                            }
                        }
                    });
                } else {
                    Swal.fire({
                        title: "未登入",
                        text: "請先登入才能加入收藏",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: '登入',
                        cancelButtonText: '取消',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/loginPage";
                        }
                    });
                }
            });
        });
    }
}

// 輪播圖自動播放
let autoPlayInterval = setInterval(function () {
    plusSlides(1);
}, 4500);

function plusSlides(n) {
    clearInterval(autoPlayInterval); // 切換幻燈片時停止自動播放
    showSlides(slideIndex += n);
    autoPlayInterval = setInterval(function () { // 重啟自動播放
        plusSlides(1);
    }, 4500);
}

function currentSlide(n) {
    clearInterval(autoPlayInterval); // 選擇特定幻燈片時停止自動播放
    showSlides(slideIndex = n);
    autoPlayInterval = setInterval(function () { // 重啟自動播放
        plusSlides(1);
    }, 4500);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

//登入驗證取得userId
function getUserId() {
    return fetch('/users/userAllInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error("無法獲取用戶 ID");
            }
            return response.json(); // 返回 UserAllInfo 包含 userId
        })
        .then(data => data.userId) // 假設返回的數據中包含 userId
        .catch(error => {
            console.error("獲取用戶 ID 時發生錯誤", error);
            return null;
        });
}

//確認登入
function checkLoginStatus() {
    return fetch('users/checkSession').then(response => {
        if (!response.ok) {
            throw new Error("無法檢查登入狀態");
        }
        return response.json();
    }).catch(error => {
            console.error("登入時發生錯誤", error);
            return false;
    })
}