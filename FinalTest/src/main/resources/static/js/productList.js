let currentPage = 1; //目前的頁碼
const productsPerPage = 9; // 每頁顯示的商品數量，超過九個換頁
let totalPages = 1; //總頁數

document.addEventListener("DOMContentLoaded", function () {

    fetchRandomProducts(); //隨機抓取商品

    document.querySelectorAll(".links").forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const type = this.getAttribute("data-type"); //自訂義屬姓
            const categoryId = this.getAttribute("data-category");
            fetchProductsByTypeAndCategory(type, categoryId);
        });
    });

    // 處理按鈕事件
    document.getElementById("productContainer").addEventListener("click", handleProductActions);
    // 分頁按鈕(上一頁)
    document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderCurrentPage();
        }
    });
    // 分頁按鈕(下一頁)
    document.getElementById("nextPage").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCurrentPage();
        }
    });
    // 關鍵字搜尋商品
    document.getElementById("searchIcon").addEventListener("click", () => {
        const keyword = document.getElementById("searchInput").value.trim();
        if (keyword) {
            searchProducts(keyword);
        } else {
            alert("請輸入關鍵字");
        }
    })
    // 根據商品類別抓取商品
    document.querySelectorAll(".productType").forEach((typeBtn) => {
        typeBtn.addEventListener("click", function (event) {
            event.preventDefault();
            const productType = this.getAttribute("data-type")
            fetchProductsByType(productType);
        })
    })

});

//隨機顯示商品
function fetchRandomProducts() {
    fetch("/products")
        .then((response) => {
            if (!response.ok) {
                throw new Error("無法獲得商品清單");
            }
            return response.json();
        })
        .then((data) => {
            products = data; // 更新 products 數據
            totalPages = Math.ceil(products.length / productsPerPage);
            currentPage = 1; // 重置頁碼
            renderCurrentPage(); // 顯示當前頁面產品
            document.getElementById("sort").addEventListener("change", () => {
                const sortBy = document.getElementById("sort").value;
                sortProducts(products, sortBy);
            });
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });

    document
        .getElementById("productContainer")
        .addEventListener("click", handleProductActions);
}

// 渲染當前頁面
function renderCurrentPage() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);

    displayProducts(productsToShow); // 顯示當前頁面商品
    updatePageInfo(); // 更新頁面信息
}

// 更新頁碼
function updatePageInfo() {
    document.getElementById("pageInfo").textContent = `第 ${currentPage} 頁 / 共 ${totalPages} 頁`;
}

// 處理加入購物車和收藏商品按鈕邏輯
function handleProductActions(event) {
    const target = event.target;

    // 收藏按鈕
    if (target.closest(".add-to-favorite")) {
        event.preventDefault(); // 阻止預設行為
        event.stopPropagation(); // 阻止事件冒泡
        checkLoginStatus()
            .then((isLoggedIn) => {
                if (isLoggedIn) {
                    getUserId().then(userId => {
                        if (userId) {
                            const productElement = target.closest(".product");
                            const productId = productElement.dataset.productId;
                            const productName = productElement.dataset.productName;
                            const favoriteBtn = productElement.querySelector(".fa-heart");

                            if (favoriteBtn.classList.contains("active")) {
                                fetch(`/api/favorites/remove?userId=${userId}&productId=${productId}`, {
                                    method: "DELETE",
                                }).then(() => {
                                    favoriteBtn.classList.remove("active");
                                    Swal.fire({
                                        title: "已取消收藏",
                                        text: `已將${productName}移除收藏`,
                                        icon: "success",
                                        timer: 1500,
                                    });
                                }).catch((error)=>{
                                    console.error("移除商品收藏遇到錯誤",error);
                                })
                            } else {
                                fetch(`/api/favorites/add?userId=${userId}&productId=${productId}`, {
                                    method: "POST",
                                })
                                    .then(response => response.json())
                                    .then(() => {
                                        favoriteBtn.classList.add("active");
                                        Swal.fire({
                                            title: "成功",
                                            text: `已將${productName}加入收藏`,
                                            icon: "success",
                                            timer: 1500,
                                        });
                                        console.log(productId);
                                        console.log(productName);
                                    })
                                    .catch((error) => {
                                        console.error("加入收藏時發生錯誤:", error);
                                    });
                            }
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
        return; // 阻止後續的跳轉行為
    }

    // 加入購物車按鈕
    if (target.closest(".add-to-cart")) {
        event.preventDefault(); // 阻止預設行為
        event.stopPropagation(); // 阻止事件冒泡
        checkLoginStatus()
            .then((isLoggedIn) => {
                if (isLoggedIn) {
                    getUserId().then(userId => {
                        if (userId) {
                            const productElement = target.closest(".product");
                            const productId = productElement.dataset.productId;
                            const productName = productElement.dataset.productName;
                            const quantity = 1;
                            // const productId = parseInt(new URLSearchParams(window.location.search).get("productId"));
                            const cartItem =
                                {
                                    productName: productName,
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
        return; // 阻止後續的跳轉行為
    }

    const productElement = target.closest(".product");
    if (productElement) {
        const productId = productElement.dataset.productId; // 從自定義屬性中獲取 productId
        if (productId) {
            window.location.href = `/detail?productId=${productId}`; // 跳轉到商品詳情頁
        }
    }
}

// 渲染商品卡
function displayProducts(productsToShow) {
    const container = document.getElementById("productContainer");
    container.innerHTML = ""; // 清空現有的產品重新渲染
    productsToShow.forEach((product, index) => {
        //生成商品卡
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.style.cursor = "pointer";
        productDiv.dataset.productId = product.productId;
        productDiv.dataset.productName = product.name; // 設置自定義屬性 data-name 購物車撈商品名稱用

        const imgElement = document.createElement("img");
        imgElement.className = "product-image";
        imgElement.alt = product.name;

        const productHtml = `
            <p class="product-name" id="productName">${product.name}</p>
            <p class="product-price">$NT${product.price}</p>
            <div class="home-product-btn">
                <button class="add-to-favorite"><i class="fa-solid fa-heart"></i>&nbsp;&nbsp;收藏商品</button>
                <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;加入購物車</button>
            </div>
        `;
        productDiv.innerHTML = productHtml;
        productDiv.insertBefore(imgElement, productDiv.firstChild); // 將圖片放到最前面
        container.appendChild(productDiv);

        // 加載圖片後設置延遲並添加動畫效果
        /*imgElement.onload = function() {
            setTimeout(() => {
                productDiv.classList.add("animate__animated", "animate__flipInY"); // 整個商品卡加入動畫效果
            }, index * 200); // 每個商品卡延遲200ms進入
        };*/

        fetch(`/productImages/product/${product.productId}`)
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
                    imgElement.src = "../material/icon/default.png"; // 如果沒有圖片時使用預設圖片
                }

            })
            .catch((error) => {
                console.error(`Error fetching product image for product ${product.id}:`, error);
                imgElement.src = "../material/icon/error.png"; // 如果發生錯誤使用錯誤圖片
            });
    });

    //沒有排滿三張商品卡填補空白商品卡(方便對齊)
    const itemsPerRow = 3;
    let itemsToAdd = itemsPerRow - (productsToShow.length % itemsPerRow);
    if (itemsToAdd && itemsToAdd !== itemsPerRow) {
        for (let i = 0; i < itemsToAdd; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.className = "product empty";
            emptyDiv.style.visibility = "hidden";
            container.appendChild(emptyDiv);
        }
    }
}

//依照產品類型和產品分類抓取商品
function fetchProductsByTypeAndCategory(type, categoryId) {
    fetch(`products/filter?type=${type}&categoryId=${categoryId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("無法獲得商品清單");
            }
            return response.json();
        })
        .then((data) => {
            products = data; // 更新 products 數據
            totalPages = Math.ceil(products.length / productsPerPage);
            currentPage = 1; // 重置頁碼
            renderCurrentPage(); // 顯示當前頁面產品
            document.getElementById("sort").addEventListener("change", () => {
                const sortBy = document.getElementById("sort").value;
                sortProducts(products, sortBy);
            });
            if (type === "mealkit") {
                switch (categoryId) {
                    case("1"):
                        document.getElementById("title").innerHTML = `生鮮食材包 異國料理`;
                        console.log(1);
                        break;
                    case("2"):
                        document.getElementById("title").innerHTML = `生鮮食材包 多人料理`;
                        console.log(1);
                        break;
                    case("3"):
                        document.getElementById("title").innerHTML = `生鮮食材包 兒童料理`;
                        console.log(1);
                        break;
                    case("4"):
                        document.getElementById("title").innerHTML = `生鮮食材包 銀髮友善`;
                        console.log(1);
                        break;
                    case("5"):
                        document.getElementById("title").innerHTML = `生鮮食材包 家常料理`;
                        console.log(1);
                        break;

                }
            } else {
                switch (categoryId) {
                    case("1"):
                        document.getElementById("title").innerHTML = `調理包 異國料理`;
                        console.log(1);
                        break;
                    case("2"):
                        document.getElementById("title").innerHTML = `調理包 多人料理`;
                        console.log(1);
                        break;
                    case("3"):
                        document.getElementById("title").innerHTML = `調理包 兒童料理`;
                        console.log(1);
                        break;
                    case("4"):
                        document.getElementById("title").innerHTML = `調理包 銀髮友善`;
                        console.log(1);
                        break;
                    case("5"):
                        document.getElementById("title").innerHTML = `調理包 家常料理`;
                        console.log(1);
                        break;

                }
            }

        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
}

//依照產品類型抓取商品
function fetchProductsByType(type) {
    fetch(`products/type/${type}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("無法獲取商品清單");
            }
            return response.json();
        })
        .then(data => {
            products = data; // 更新 products 數據
            totalPages = Math.ceil(products.length / productsPerPage);
            currentPage = 1; // 重置頁碼
            renderCurrentPage(); // 顯示當前頁面產品
            document.getElementById("sort").addEventListener("change", () => {
                const sortBy = document.getElementById("sort").value;
                sortProducts(products, sortBy);
            });
            if(type==="mealkit"){
                document.getElementById("title").innerHTML="生鮮食材包";
            }else{
                document.getElementById("title").innerHTML="調理包";
            }
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        })
}

//商品排序按鈕
function sortProducts(products, sortBy) {
    if (sortBy === "priceLowHigh") {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
        products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "dateNewOld") {
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "dateOldNew") {
        products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    console.log(products);
    displayProducts(products); // 重新顯示排序後的產品
}

//取得userId
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

//點選加入購物車和收藏按鈕先確認登入狀態再加入收藏和購物車
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

//關鍵字搜尋功能(模糊查詢)
function searchProducts(keyword) {
    fetch(`/products/search?keyword=${encodeURIComponent(keyword)}`, {method: "GET"})
        .then((response) => {
            if (!response.ok) {
                throw new Error("無法用關鍵字搜尋商品");
            }
            return response.json();
        })
        .then((data) => {
            products = data; // 更新 products 數據
            totalPages = Math.ceil(products.length / productsPerPage);
            currentPage = 1; // 重置頁碼
            renderCurrentPage(); // 顯示當前頁面產品
            document.getElementById("sort").addEventListener("change", () => {
                const sortBy = document.getElementById("sort").value;
                sortProducts(products, sortBy);
            });
        })
        .catch((error) => {
            console.error("搜尋過程發生錯誤", error);
        });
}




