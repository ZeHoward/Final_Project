let currentPage = 1;
const productsPerPage = 9; // 每頁顯示的商品數量
let totalPages = 1;
window.onload = function () {

    fetchRandomProducts();

    document.querySelectorAll(".links").forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const type = this.getAttribute("data-type");
            const categoryId = this.getAttribute("data-category");
            fetchProductsByTypeAndCategory(type, categoryId);
        });
    });

    // 綁定事件委託到 productContainer來處理按鈕事件
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

    //關鍵字搜尋商品
    document.getElementById("searchIcon").addEventListener("click", () => {
        const keyword = document.getElementById("searchInput").value.trim();
        if (keyword) {
            searchProducts(keyword);
        } else {
            alert("請輸入關鍵字");
        }
    })

    document.querySelectorAll(".productType").forEach((typeBtn)=> {
        typeBtn.addEventListener("click", function (event) {
            event.preventDefault();
            const productType = this.getAttribute("data-type")
            fetchProductsByType(productType);
        })
    })

}

//商品頁隨機顯示商品
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

// 渲染當前頁面的產品
function renderCurrentPage() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);

    displayProducts(productsToShow); // 顯示當前頁面商品
    updatePageInfo(); // 更新頁面信息
}

// 更新頁面信息（頁碼顯示）
function updatePageInfo() {
    document.getElementById("pageInfo").textContent = `第 ${currentPage} 頁 / 總共 ${totalPages} 頁`;
}

// 使用事件委託來處理加入購物車和收藏商品邏輯
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
        return; // 阻止後續的跳轉行為
    }

    // 加入購物車按鈕
    if (target.closest(".add-to-cart")) {
        event.preventDefault(); // 阻止預設行為
        event.stopPropagation(); // 阻止事件冒泡
        checkLoginStatus().then((isLoggedIn) => {
            if (isLoggedIn) {
                Swal.fire({
                    title: "成功",
                    text: "已將商品加入購物車",
                    icon: "success",
                    timer: 1500,
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

// 顯示產品
function displayProducts(productsToShow) {
    const container = document.getElementById("productContainer");
    container.innerHTML = ""; // 清空現有的產品
    productsToShow.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.style.cursor = "pointer"; //更改滑鼠樣式，可以點擊
        productDiv.dataset.productId = product.productId;

        const imgElement = document.createElement("img");
        imgElement.className = "product-image";
        imgElement.alt = product.name;

        const productHtml = `
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$NT${product.price}</p>
            <div class="home-product-btn">
                <button class="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
                <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;加入購物車</button>
            </div>
        `;
        productDiv.innerHTML = productHtml;
        productDiv.insertBefore(imgElement, productDiv.firstChild); // 將圖片放到最前面
        container.appendChild(productDiv);

        fetch(`/productImages/product/${product.productId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("無法獲取商品圖片");
                }
                return response.json();
            })
            .then((images) => {
                if (images.length > 0) {
                    imgElement.src = images[0]; // 使用 Base64Images
                } else {
                    imgElement.src = "../material/icon/default.png"; // 沒有圖片時使用默認圖片
                }
            })
            .catch((error) => {
                console.error(`Error fetching product image for product ${product.id}:`, error);
                imgElement.src = "../material/icon/error.png"; // 如果發生錯誤使用錯誤圖片
            });
    });
}

//依照產品類型和產品分類
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
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
}

function fetchProductsByType(type){
    fetch(`products/type/${type}`)
        .then((response)=>{
            if(!response.ok){
                throw new Error("無法獲取商品清單");
            }
            return response.json();
        })
        .then(data=>{
            products = data; // 更新 products 數據
            totalPages = Math.ceil(products.length / productsPerPage);
            currentPage = 1; // 重置頁碼
            renderCurrentPage(); // 顯示當前頁面產品
            document.getElementById("sort").addEventListener("change", () => {
                const sortBy = document.getElementById("sort").value;
                sortProducts(products, sortBy);
            });
        })
        .catch(error=>{
            console.error("Error fetching products:", error);
        })
}

//商品排序
function sortProducts(products, sortBy) {
    if (sortBy === "priceLowHigh") {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
        products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "dateNewOld") {
        products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (sortBy === "dateOldNew") {
        products.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }
    displayProducts(products); // 重新顯示排序後的產品
}

//確認登入狀態
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
// 取得Id
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

//搜尋功能
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