document.addEventListener("DOMContentLoaded", function () {
    // 從 URL 拿productId
    const urlParams = new URLSearchParams(window.location.search); //productId
    const productId = urlParams.get("productId");
    let currentIndex = 0; //相關商品索引

    if (productId) {
        // 使用 productId 來請求商品詳細數據
        fetch(`/products/${productId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("無法獲取商品信息");
                }
                return response.json();
            })
            .then((product) => {
                // 更新商品描述
                const infoSection = document.querySelector(".spec");
                const productHtml = `
            <p class="product-name" id="productName">${product.name}</p>
            <p class="product-price">NT$ ${product.price}</p>
            <div class="quantity-selector">
                <label for="quantity">數量選擇：</label>
                <button id="decrease" class="btn-quantity"><i class="fa-solid fa-minus"></i></button>
                <input class="quantity-input" type="text" id="quantity" value="1" readonly />
                <button id="increase" class="btn-quantity"><i class="fa-solid fa-plus"></i></button>
                <span>&nbsp;&nbsp;商品剩最後 ${product.stockQuantity} 件</span>
            </div>
              <button class="btn cart" id="cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;加入購物車</button>
              <button class="btn like" id="like"><i class="fa-regular fa-heart"></i>&nbsp;收藏商品</button>
            <div class="ship">
              <h3>&nbsp;配送方式: &nbsp;</h3>
              <p>黑貓宅急便--低溫配送 (目前僅限台灣本島配送，暫無開放外島配送)</p>
              <h3>&nbsp;運費:&nbsp;</h3>
              <p>
                每筆訂單皆須另支付160元運費。<br> 
              </p>
              <h3>&nbsp; 配送說明: &nbsp;</h3>
              <p>※宅配到府：貨運將依收件者資料寄送到府。<br>
                 ※如遇颱風地震等天災或其他不可抗力因素(如：疫情、罷工)影響時，出貨時間將順延。<br>
              </p>
              
            </div>
      
          `;
                infoSection.innerHTML = productHtml;

                document.getElementById("productName").textContent = product.name;

                // 購買數量加減
                var stockQuantity = `${product.stockQuantity}`;
                var quantityInput = document.getElementById("quantity");
                var decreaseButton = document.getElementById("decrease");
                var increaseButton = document.getElementById("increase");

                // 點擊減少按鈕
                decreaseButton.addEventListener("click", function () {
                    var currentQuantity = parseInt(quantityInput.value);
                    if (currentQuantity > 1) {
                        quantityInput.value = currentQuantity - 1;
                    }
                });
                // 點擊增加按鈕
                increaseButton.addEventListener("click", function () {
                    var currentQuantity = parseInt(quantityInput.value);
                    if (currentQuantity < stockQuantity) {
                        quantityInput.value = currentQuantity + 1;
                    }
                });

                //加入購物車和收藏驗證
                document.getElementById("cart").addEventListener("click", function () {
                    checkLoginStatus()
                        .then((isLoggedIn) => {
                            if (isLoggedIn) {
                                getUserId().then(userId => {
                                    if (userId) {
                                        const productName = document.getElementById("productName").textContent.trim();
                                        const quantity = parseInt(document.getElementById("quantity").value);
                                        const productId = parseInt(new URLSearchParams(window.location.search).get("productId")) ;
                                        const cartItem =
                                            {
                                                productName:productName,
                                                productId: productId,
                                                quantity: quantity
                                            };
                                        console.log(cartItem);

                                        // 發送加入購物車請求
                                        fetch(`/api/cart/${userId}`, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(cartItem), // 傳送商品數據
                                        })
                                            .then(response => {
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
                                            })
                                            .catch((error) => {
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
                document.getElementById("like").addEventListener("click", function () {
                    checkLoginStatus()
                        .then((isLoggedIn) => {
                            if (isLoggedIn) {
                                getUserId().then(userId => {
                                    if (userId) {
                                        const productId = new URLSearchParams(window.location.search).get("productId");
                                        // 發送收藏請求
                                        fetch(`/api/favorites/add?userId=${userId}&productId=${productId}`, {
                                            method: "POST",
                                        })
                                            .then(response => response.json())
                                            .then(() => {
                                                Swal.fire({
                                                    title: "成功",
                                                    text: "已將商品加入收藏",
                                                    icon: "success",
                                                    timer: 1500,
                                                });
                                            })
                                            .catch((error) => {
                                                console.error("加入收藏時發生錯誤:", error);
                                            });
                                    }
                                });
                            } else {
                                Swal.fire({
                                    title: "未登入",
                                    text: `請先登入才能加入購物車`,
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
                        })
                })

                // 商品詳細描述
                const detailSection = document.querySelector(".description");
                const detailHtml = `<pre>${product.description}</pre>`;
                detailSection.innerHTML = detailHtml;

                // 取得商品照片並產生主圖和略縮圖
                fetch(`/productImages/product/${productId}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("無法獲取商品圖片");
                        }
                        return response.json();
                    })
                    .then((images) => {
                        if (images.length > 0) {
                            document.getElementById("currentImage").src = images[0];
                            generateGallery(images);
                        } else {
                            document.getElementById("currentImage").src =
                                "../material/icon/default.png";
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching product images:", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
            });
        document.getElementById("currentImage").src = "../material/icon/donut.png";
    } else {
        console.error("productId 未找到");
    }

    // 縮略圖畫廊
    function generateGallery(images) {
        const thumbnailContainer = document.getElementById("thumbnailContainer");

        // 清空略縮圖
        thumbnailContainer.innerHTML = "";

        // 巡訪所有圖片並生成略縮圖
        images.forEach((base64Image, index) => {
            const imgElement = document.createElement("img");
            imgElement.src = base64Image;
            imgElement.classList.add("thumbnail");

            // 點擊略縮圖時更換主圖
            imgElement.onclick = () => {
                document.getElementById("currentImage").src = base64Image;
            };

            thumbnailContainer.appendChild(imgElement);
        });
    }

    loadProductData("mealkit", "productContainer", currentIndex, "prevBtn", "nextBtn");

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
            productElement.querySelector(".related-product-name").textContent = product.name;
            productElement.querySelector(".related-product-price").textContent = `$NT${product.price}`;

            // 更新商品圖片
            const imgElement = productElement.querySelector(".related-product-image");

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
                    imgElement.src = "error.jpg"; // 如果獲取圖片失敗，顯示錯誤圖片
                });

            // 跳轉跳轉商品詳情
            productElement.addEventListener("click", () => {
                window.location.href = `/detail?productId=${product.productId}`;
            });

            // 加入購物車按鈕
            productElement.querySelector(".add-to-cart").addEventListener("click", function (event) {
                event.stopPropagation(); // 阻止冒泡以避免觸發商品詳情跳轉
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

    //tab內容
    var tab1 = document.getElementById("tab1");
    var tab2 = document.getElementById("tab2");

    tab1.addEventListener(
        "click",
        function (event) {
            openContent(event, "content1");
        },
        false
    );
    tab2.addEventListener(
        "click",
        function (event) {
            openContent(event, "content2");
        },
        false
    );

    function openContent(event, content) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            console.log(tabcontent[i]);
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(content).style.display = "block";
        event.currentTarget.className += " active";

        document.getElementById(content).style.display = "block";
    }

    function checkLoginStatus() {
        return fetch('users/checkSession').then(response => {
            if (!response.ok) {
                throw new Error("無法檢查登入狀態");
            }
            return response.json();
            console.log(data);
        })
            .catch(error => {
                console.error("登入時發生錯誤", error);
                return false;
            })
    }

});


// 發送請求取得 userId
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