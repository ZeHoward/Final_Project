window.onload = function () {
    // 獲取 URL 中的 productId
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");
    let currentIndex1 = 0; //相關商品索引

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
                <input type="text" id="quantity" value="1" readonly />
                <button id="increase" class="btn-quantity"><i class="fa-solid fa-plus"></i></button>
                <span>&nbsp;&nbsp;商品剩最後 ${product.stockQuantity} 件</span>
            </div>
              <button class="btn cart" id="cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;加入購物車</button>
              <button class="btn like" id="like"><i class="fa-regular fa-heart"></i>&nbsp;收藏商品</button>
              <button class="btn keep" id="keep"><i class="fa-solid fa-book-open"></i>&nbsp;查看食譜</button>
            <div class="ship">
              <h3>&nbsp;配送方式: &nbsp;</h3>
              <p>黑貓宅急便(低溫配送)</p>
              <h3>&nbsp;運費:&nbsp;</h3>
              <p>
                全站運費皆160元。<br>
                ※如遇颱風地震等天災或其他不可抗力因素(如：疫情、罷工)影響時，出貨時間將順延。<br>
                ※離島門市取貨的預購商品配送需搭配船期，故實際配送至離島門市的日期會與您訂購時選擇之希望到貨日有所差異。<br>
              </p>
              <h3>&nbsp; 配送說明: &nbsp;</h3>
              <p>※宅配：貨運將依收件者資料寄送到府</p>
            </div>
      
          `;
                infoSection.innerHTML = productHtml;

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
                                        const productName = document.getElementById("productName").textContent.trim();  // 確保去掉空格
                                        const quantity = parseInt(document.getElementById("quantity").value);
                                        const productId = new URLSearchParams(window.location.search).get("productId");
                                        const cartItem = {
                                            productName: productName,  // 傳遞商品名稱
                                            quantity: quantity
                                        };


                                        // 發送加入購物車請求
                                        fetch(`/api/cart/put/${userId}`, {
                                            method: "PUT",
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
                document.getElementById("keep").addEventListener("click", function () {
                    window.location.href = "我要食譜頁面URL";
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

    // 縮略圖畫廊生成函數
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

    const type = "mealkit";
    // 相關商品
    fetch(`products/type/${type}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("無法獲得第一區域推薦商品清單");
                console.log(1);
            }
            return response.json();
        })
        .then((products1) => {
            renderProducts(products1, "productContainer", currentIndex1);

            // 上一個商品
            document.getElementById("prevBtn").addEventListener("click", () => {
                currentIndex1 =
                    (currentIndex1 - 1 + products1.length) % products1.length;
                renderProducts(products1, "productContainer", currentIndex1);
            });

            // 下一個商品
            document.getElementById("nextBtn").addEventListener("click", () => {
                currentIndex1 = (currentIndex1 + 1) % products1.length;
                renderProducts(products1, "productContainer", currentIndex1);
            });
        })
        .catch((error) => {
            console.error("無法獲得相關商品清單:", error);
            console.log(1);
        });

    function renderProducts(products, containerId, currentIndex) {
        const container = document.getElementById(containerId);
        container.innerHTML = ""; // 清空容器

        for (let i = -1; i <= 2; i++) {
            const index = (currentIndex + i + products.length) % products.length;
            const product = products[index];

            // 創建商品卡
            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.style.cursor = "pointer";

            // 創建 img 元素
            const imgElement = document.createElement("img");
            imgElement.className = "related-product-image";
            imgElement.alt = `${product.name}`; // 動態設置 alt 屬性

            // 設置商品卡的 HTML 內容
            const productHtml = `
        <h3 class="related-product-name">${product.name}</h3>
        <p class="related-product-price">$NT${product.price}</p>
        <div class="home-product-btn">
          <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
          <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車</button>
        </div>
      `;

            productDiv.innerHTML = productHtml;
            productDiv.insertBefore(imgElement, productDiv.firstChild); // 插入圖片在第一位
            container.appendChild(productDiv);

            // 獲取商品圖片
            fetch(`productImages/product/${product.productId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("無法獲取商品圖片");
                    }
                    return response.json();
                })
                .then((images) => {
                    if (images.length > 0) {
                        imgElement.src = images[0];
                    } else {
                        imgElement.src = "../material/icon/default.png"; // 默認圖片
                    }
                })
                .catch((error) => {
                    console.error(
                        `Error fetching product image for product ${product.productId}:`,
                        error
                    );
                    imgElement.src = "../material/icon/error.png"; // 錯誤圖片
                });

            // 商品卡點擊事件跳轉到商品詳情頁面
            productDiv.addEventListener("click", () => {
                window.location.href = `/detail?productId=${product.productId}`;
            });


            productDiv
                .querySelector(".add-to-cart")
                .addEventListener("click", function (event) {
                    event.stopPropagation();
                    checkLoginStatus()
                        .then(isLoggedIn => {
                            if (isLoggedIn) {
                                Swal.fire({
                                    title: "成功",
                                    text: "已將商品加入購物車",
                                    icon: "success",
                                    timer: 1500,
                                });
                                console.log("success");
                                // addToCart(product.productId,1); //加入購物車請求
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
                                        window.location.href = 'http://localhost:8080/loginPage';
                                    }
                                });
                            }
                        });
                });

            productDiv
                .querySelector(".add-to-favorite")
                .addEventListener("click", function (event) {
                    event.stopPropagation();
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
                                    text: `請先登入才能加入收藏`,
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

};


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