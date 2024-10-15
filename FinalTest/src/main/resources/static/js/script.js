generateOverviewContent(); // 預設總覽頁面為首頁


// 點擊"總覽"時生成內容的函數
function generateOverviewContent() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'backlogin.html';
        return;
    }
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // 清空之前的內容

    // 初始化時間範圍
    let timeRange = "week";

    // 發送 API 請求並更新卡片和圖表數據
    function fetchData(timeRange) {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // 設置為今天的最後一秒
        let startDate, endDate;

        // 根據時間範圍設定起始日期
        switch (timeRange) {
            case "week":
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 6); // 從今天開始往前推 6 天（共 7 天）
                break;
            case "month":
                startDate = new Date(today);
                startDate.setMonth(today.getMonth() - 1);
                break;
            case "year":
                startDate = new Date(today);
                startDate.setFullYear(today.getFullYear() - 1);
                break;
      }
        startDate.setHours(0, 0, 0, 0); // 設置為起始日的第一秒
        endDate = today; // 今天作為結束日期

        const formatDate = (date) => date.toISOString().split('T')[0] + 'T' + date.toTimeString().split(' ')[0];

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        // 同時發送 overview 和 chart-data 的 API 請求
        Promise.all([
          fetch(`/api/orders/overview?startDate=${formattedStartDate}&endDate=${formattedEndDate}`), // 營業額和訂單總數
          fetch(
              `/api/orders/chart-data?startDate=${formattedStartDate}&endDate=${formattedEndDate}&range=${timeRange}`
          ), // 圖表數據
          fetch(`/users/count-active`), // 活躍人數
      ])
            .then(
                async ([overviewResponse, chartResponse, activeMembersResponse]) => {
                    // 解析兩個 API 的返回值
                    const overviewData = await overviewResponse.json();
                    const chartData = await chartResponse.json();
                    const activeMembers = await activeMembersResponse.json();
					
                    // 更新卡片數據
                    document.querySelector('[data-type="revenue"] p').textContent =
                        overviewData.revenue;
                    document.querySelector('[data-type="orders"] p').textContent =
                        overviewData.ordersCount;
                    document.querySelector('[data-type="users"] p').textContent =
                        activeMembers;

                    // 初始化圖表
                    initChart();

                    // 更新圖表
                    updateChart(chartData.labels, chartData.values, timeRange); // 將 timeRange 傳入以便更新圖表標籤
                }
            )
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    // 初始化頁面時顯示數據
    fetchData(timeRange);

    // 動態生成總覽卡片的 section
    const overviewSection = document.createElement("section");
    overviewSection.className = "overview";

    const cardData = [
        {type: "revenue", title: "營業額", value: "0"},
        {type: "orders", title: "訂單總量", value: "0"},
        {type: "users", title: "總用戶數", value: "0"}, // 假設這裡數據固定
    ];

    // 動態生成卡片
    cardData.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.setAttribute("data-type", card.type);

        const h2 = document.createElement("h2");
        h2.textContent = card.title;

        const p = document.createElement("p");
        p.textContent = card.value;

        cardDiv.appendChild(h2);
        cardDiv.appendChild(p);

        // 為每個卡片添加事件監聽
        // cardDiv.addEventListener("click", () => {
        //     // 根據卡片類型切換圖表數據
        //     if (card.type === "orders") {
        //         // 如果點擊的是「訂單總量」卡片，更新圖表顯示訂單數據
        //         fetchOrderChartData();
        //     } else if (card.type === "revenue") {
        //         // 如果點擊的是「營業額」卡片，更新圖表顯示營業額數據
        //         fetchRevenueChartData();
        //     }
        // });

        overviewSection.appendChild(cardDiv);
    });

    // 將 overview section 插入到 main-content
    mainContent.appendChild(overviewSection);

    // 動態生成圖表區域的 section
    const chartSection = document.createElement("section");
    chartSection.className = "chart-section";

    const chartHeader = document.createElement("div");
    chartHeader.className = "chart-header";

    const chartTitle = document.createElement("h3");
    chartTitle.textContent = "圖表";

    const controlsDiv = document.createElement("div");
    controlsDiv.className = "controls";

    // 生成下載按鈕
    const downloadButton = document.createElement("button");
    downloadButton.id = "downloadButton";
    downloadButton.textContent = "下載報表";

// 添加點擊事件監聽器
    downloadButton.addEventListener('click', downloadReport);

// 將按鈕添加到 controlsDiv
    controlsDiv.appendChild(downloadButton);

    // 生成下拉選單
    const timeRangeSelect = document.createElement("select");
    timeRangeSelect.id = "timeRange";

    const timeOptions = [
        {value: "week", text: "周"},
        {value: "month", text: "月"},
        {value: "year", text: "年"},
    ];

    timeOptions.forEach((optionData) => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.textContent = optionData.text;
        timeRangeSelect.appendChild(option);
    });

    controlsDiv.appendChild(downloadButton);
    controlsDiv.appendChild(timeRangeSelect);

    // 將 chart header 部分組合起來
    chartHeader.appendChild(chartTitle);
    chartHeader.appendChild(controlsDiv);

    // 生成 canvas 元素
    const canvas = document.createElement("canvas");
    canvas.id = "orderChart";

    // 組合 chart section
    chartSection.appendChild(chartHeader);
    chartSection.appendChild(canvas);

    // 將 chart section 插入到 main-content
    mainContent.appendChild(chartSection);

    // 為時間範圍選擇添加事件監聽
    timeRangeSelect.addEventListener("change", function () {
        timeRange = this.value; // 更新時間範圍
        fetchData(timeRange); // 請求 overview 和 chart-data
    });
}

// 下載對應時間區間xlsx
function downloadReport() {
  if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'backlogin.html';
    return;
}
    // 取得用戶選擇的時間區間
    var timeRange = document.getElementById("timeRange").value;

    // 使用 fetch API 發送請求
    fetch('/api/orders/report?timeRange=' + timeRange, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            // 創建一個臨時URL來下載文件
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'order_report.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('下載報表時發生錯誤:', error);
            alert('下載報表失敗，請稍後再試。');
        });
}

// 獲取初始圖表數據
function fetchInitialChartData() {
  if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'backlogin.html';
    return;
  }
    // 設置默認的時間範圍，例如 'week'
    document.getElementById("timeRange").value = "week";

    // 調用獲取數據的函數
    fetchRevenueChartData(); // 或者 fetchOrderChartData()，取決於您想要顯示的初始數據
}

// 點擊總覽上方"營業額"時切換圖表內容的函數
function fetchRevenueChartData() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'backlogin.html';
        return;
    }
    console.log("開始獲取營業額數據");
    const timeRange = document.getElementById("timeRange");
    if (!timeRange) {
        console.error("找不到時間範圍選擇器");
        alert("頁面載入不完整，請重新整理頁面。");
        return;
    }
    const selectedRange = timeRange.value;
    console.log("選擇的時間範圍:", selectedRange);

    const today = new Date();
    let startDate, endDate;

    // 設置起始日期
    switch (selectedRange) {
        case "week":
            startDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - 7
            );
            break;
        case "month":
            startDate = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                today.getDate()
            );
            break;
        case "year":
            startDate = new Date(
                today.getFullYear() - 1,
                today.getMonth(),
                today.getDate()
            );
            break;
        default:
            console.error("無效的時間範圍:", selectedRange);
            alert("請選擇有效的時間範圍。");
            return;
    }
    endDate = today;

    // 確保日期時間格式符合 ISO 8601 標準
    const formatDate = (date) => date.toISOString().split(".")[0] + "Z";

    const url = `/api/orders/chart-data?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&range=${selectedRange}`;
    console.log("請求 URL:", url);

    console.time('fetchRevenueData');
    fetch(url)
        .then((response) => {
            console.timeLog('fetchRevenueData', 'Received response');
            console.log("響應狀態:", response.status, response.statusText);
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP 錯誤! 狀態: ${response.status}, 響應內容: ${text}`);
                });
            }
            return response.json();
        })
        .then((chartData) => {
            console.timeEnd('fetchRevenueData');
            console.log("接收到的圖表數據:", JSON.stringify(chartData, null, 2));
            if (!chartData || !Array.isArray(chartData.labels) || !Array.isArray(chartData.values)) {
                throw new Error("接收到的數據格式不正確: " + JSON.stringify(chartData));
            }
            updateChart(chartData.labels, chartData.values, selectedRange, "營業額");
        })
        .catch((error) => {
            console.timeEnd('fetchRevenueData');
            console.error("獲取營業額數據時出錯");
            // alert("無法載入營業額數據，請稍後再試。錯誤詳情: " + error.message);
        });
}

// 初始化圖表的函數
function initChart() {
  const ctx = document.getElementById('orderChart').getContext('2d');
  if (window.myChart instanceof Chart) {
      window.myChart.destroy(); 
  }
  window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [],
          datasets: [{
              label: '營業額',
              data: [],
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

// 更新圖表數據的函數
function updateChart(labels, values, timeRange, dataType) {
  if (!localStorage.getItem('adminLoggedIn')) {
      window.location.href = 'backlogin.html';
      return;
  }

  console.log("更新圖表:", {labels, values, timeRange, dataType});

  let chart;
  if (window.myChart instanceof Chart) {
      chart = window.myChart;
  } else {
      chart = Chart.getChart("orderChart");
  }

  if (!chart) {
      console.error("找不到圖表");
      return;
  }

  // 更新圖表數據
  chart.data.labels = labels;
  chart.data.datasets[0].data = values;
  chart.data.datasets[0].label = dataType === "revenue" ? "營業額" : "訂單總量";

  // 更新 y 軸標題
  if (chart.options.scales.y) {
      chart.options.scales.y.title.text = dataType === "revenue" ? "營業額" : "訂單總量";
  } else if (chart.options.scales.yAxes && chart.options.scales.yAxes[0]) {
      chart.options.scales.yAxes[0].scaleLabel.labelString = dataType === "revenue" ? "營業額" : "訂單總量";
  }

  // 根據 timeRange 更新 x 軸標題
  if (chart.options.scales.x) {
      switch(timeRange) {
          case 'week':
              chart.options.scales.x.title.text = '日期';
              break;
          case 'month':
              chart.options.scales.x.title.text = '日期';
              break;
          case 'year':
              chart.options.scales.x.title.text = '月份';
              break;
          default:
              chart.options.scales.x.title.text = '時間';
      }
  }

  chart.update();
  console.log("圖表已更新");
}

// 點擊"訂單管理"時生成內容的函數
function generateOrderManagementContent() {
  if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'backlogin.html';
    return;
  }
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // 清空之前的內容

    // 動態生成訂單管理的標題和控制選項
    const orderManagementSection = `
        <section class="order-management">
            <h1>訂單管理</h1>
            <div class="orderControls">
                <label>每頁顯示結果數：</label>
                <select id="resultsPerPage">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <label>排序：</label>
                <select id="sortOrder">
                    <option value="orderDate,desc">訂單日期(遞減)</option>
                    <option value="orderDate,asc">訂單日期(遞增)</option>
                    <option value="totalAmount,desc">訂單金額(遞減)</option>
                    <option value="totalAmount,asc">訂單金額(遞增)</option>
                </select>

                <label>狀態：</label>
                <select id="orderStatus">
                    <option value="all">全部</option>
                    <option value="completed">completed</option>
                    <option value="pending">pending</option>
                </select>
            </div>

            <!-- 訂單表格 -->
            <table class="order-table">
                <thead>
                    <tr>
                        <th>買家名稱</th>
                        <th>訂單資訊</th>
                        <th>訂單狀態</th>
                        <th>訂單時間</th>
                        <th>詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 這裡插入動態生成的訂單 -->
                </tbody>
            </table>

            <!-- 頁數切換的下拉選單 -->
            <div class="pagination-controls" style="text-align: right; margin-top: 20px;">
                <label for="pageSelect">選擇頁數：</label>
                <select id="pageSelect" style="border-radius: 5px; border: 1px solid #ccc;">
                    <!-- 動態生成頁數選項 -->
                </select>
            </div>
        </section>
    `;
    mainContent.innerHTML = orderManagementSection;

    const tbody = document.querySelector(".order-table tbody");
    const resultsPerPageSelect = document.getElementById("resultsPerPage");
    const sortOrderSelect = document.getElementById("sortOrder");
    const orderStatusSelect = document.getElementById("orderStatus");
    const pageSelect = document.getElementById("pageSelect");

    // 設置初始條件
    let resultsPerPage = parseInt(resultsPerPageSelect.value);
    let sortField = sortOrderSelect.value.split(",")[0]; // 獲取排序字段
    let sortDirection = sortOrderSelect.value.split(",")[1]; // 獲取排序方向
    let orderStatus = orderStatusSelect.value;
    let currentPage = 1;

    // 調用後端 API 獲取數據
    function fetchOrders() {
        let url = `/api/orders/page?page=${
            currentPage - 1
        }&size=${resultsPerPage}&sortField=${sortField}&sortDirection=${sortDirection}`;

        if (orderStatus !== "all") {
            url += `&status=${orderStatus}`;
        }

        fetch(url)
            .then((response) => {
                // 檢查回應是否為成功
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                renderOrders(data.content); // 渲染訂單
                updatePagination(data.totalPages); // 更新分頁

                // 防止無限迴圈的邏輯
                if (currentPage >= data.totalPages) {
                    console.log("已到達最後一頁，停止加載");
                    return;
                }

                // 當有下一頁時，自動加載
                if (currentPage < data.totalPages - 1) {
                    currentPage++; // 自增當前頁數
                    fetchNextPage(); // 調用函數加載下一頁
                }
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">無法獲取訂單資料</td></tr>`;
            });
    }

    // 渲染訂單
    function renderOrders(orders) {
        tbody.innerHTML = ""; // 清空表格內容

        // 確保 orders 不為 undefined 或 null
        if (!orders || orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align: center;">目前沒有訂單資料</td></tr>`;
            return;
        }

        orders.forEach((order) => {
            const tr = document.createElement("tr");

            // 買家名稱，如果 order.username 不存在，顯示 '無名稱'
            const orderName = order.username ? order.username : "無名稱";

            // 訂單配送方式，如果 order.deliveryMethod 不存在，顯示 '無配送方式'
            const deliveryMethod = order.deliveryMethod
                ? order.deliveryMethod
                : "到府";

            // 訂單日期格式化，如果 order.orderDate 存在
            const orderDate = order.orderDate
                ? new Date(order.orderDate).toLocaleDateString()
                : "無日期";
            tr.innerHTML = `
            <td>
                <p>${orderName}</p>
            </td>
            <td>
                訂單編號: ${order.orderId}<br>
                配送方式: ${deliveryMethod}<br>
                訂單金額: ${order.totalAmount}
            </td>
            <td>${order.status}</td>
            <td>${orderDate}</td>
            <td><a href="#" class="details-link" data-id="${order.orderId}" style="color: white;">詳細</a></td>
        `;

            tbody.appendChild(tr);
        });

        // 綁定「詳細」按鈕的點擊事件
        document.querySelectorAll(".details-link").forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const orderId = this.getAttribute("data-id");
                // 顯示訂單詳情頁面
                // generateOrderDetailsContent(orderId);

                // 發送 fetch 請求到 API，根據 orderId 獲取訂單詳細資料
                fetch(`/api/orders/${orderId}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json(); // 解析成 JSON 格式
                    })
                    .then((orderData) => {
                        // 將返回的訂單資料傳遞給生成訂單詳情頁面的函數
                        generateOrderDetailsContent(orderData);
                    })
                    .catch((error) => {
                        console.error("Error fetching order details:", error);
                    });
            });
        });
    }

    // 動態生成頁數選項
    function updatePagination(totalPages) {
        pageSelect.innerHTML = ""; // 清空頁數選項
        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `第 ${i} 頁`;
            pageSelect.appendChild(option);
        }
        pageSelect.value = currentPage; // 設定當前頁數
    }

    // 更新顯示結果數或排序方式時，重新調用 API 並渲染
    resultsPerPageSelect.addEventListener("change", () => {
        resultsPerPage = parseInt(resultsPerPageSelect.value);
        currentPage = 1;
        fetchOrders();
    });

    sortOrderSelect.addEventListener("change", () => {
        const sortValues = sortOrderSelect.value.split(",");
        sortField = sortValues[0];
        sortDirection = sortValues[1];
        currentPage = 1;
        fetchOrders();
    });

    orderStatusSelect.addEventListener("change", () => {
        orderStatus = orderStatusSelect.value;
        currentPage = 1;
        fetchOrders();
    });

    pageSelect.addEventListener("change", () => {
        currentPage = parseInt(pageSelect.value);
        fetchOrders();
    });

    // 初始加載數據
    fetchOrders();
}

// 點擊訂單的"詳細"連結後生成訂單詳情頁面的函數
function generateOrderDetailsContent(order) {
  if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'backlogin.html';
    return;
  }
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // 清空之前的內容

    // 動態生成用戶信息
    const userInfo = order && order.user
        ? `<p><strong>用戶名稱:</strong> ${order.user.username || "未提供"}</p>
         <p><strong>電子郵件:</strong> ${order.user.email || "未提供"}</p>
         <p><strong>電話號碼:</strong> ${order.user.phoneNumber || "未提供"}</p>`
        : `<p>無法找到該用戶資訊</p>`;

    // 動態生成訂單詳情部分
    const orderDetailsSection = `
        <section class="order-details">
            <h1>訂單詳情 - 訂單編號: ${order.orderId}</h1>
            <div class="order-and-user-info">
                <div class="order-info">
                    <h2>訂單資訊</h2>
                    <div class="order-summary">
                        <p><strong>訂單日期:</strong> ${order.orderDate}</p>
                        <p><strong>配送地址:</strong> ${order.address}</p>
                        <p><strong>訂單總金額:</strong> $${
        order.totalAmount
    }</p>
                        <p><strong>優惠券 ID:</strong> ${
        order.couponId || "無使用"
    }</p>
                        <p><strong>百分比折扣:</strong> ${
        order.percentageDiscount || 0
    }%</p>
                        <p><strong>折扣金額:</strong> $${
        order.amountDiscount || 0
    }</p>
                        <p><strong>最終金額:</strong> $${order.finalAmount}</p>
                        <p><strong>訂單狀態:</strong> ${order.status}</p>
                    </div>
                </div>
                <div class="user-info2">
                    <h2>買家資訊</h2>
                    ${userInfo}
                </div>
            </div>
            <h2>購買商品</h2>
            <table class="order-items-table">
                <thead>
                    <tr>
                        <th>名稱</th>
                        <th>SKU</th>
                        <th>數量</th>
                        <th>價格</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 動態生成的商品將插入到這裡 -->
                </tbody>
            </table>
        </section>
    `;

    mainContent.innerHTML = orderDetailsSection;

    // 選取表格的 tbody
    const tbody = document.querySelector(".order-items-table tbody");

    // 確認 orderDetails 存在且是陣列，並動態生成商品列表
    if (order.orderDetails && order.orderDetails.length > 0) {
        order.orderDetails.forEach((orderDetails) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${orderDetails.productName}</td>
                <td>${orderDetails.sku}</td>
                <td>${orderDetails.quantity}</td>
                <td>$${orderDetails.price}</td>
            `;
            tbody.appendChild(tr); // 將每個商品插入到表格中
        });
    } else {
        console.warn("沒有購買商品");
    }
}

// 點擊"商品上傳"時生成內容的函數
function generateProductUploadForm() {
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // 清空之前的內容

    const productUploadForm = `
    <section class="product-upload">
      <h1>商品上傳</h1>
        <form>
                <div class="image-upload">
                  <div class="image-preview" id="imagePreviewContainer">
                    <img src="../material/icon/default.png" alt="預設商品圖片" style="max-width: 200px; margin: 10px;">
                  </div>
                  <input type="file" id="fileInput" accept="image/*" style="display: none;">
                  <button type="button" id="uploadImageButton">選擇圖片</button>
                </div>
                <div class="form-group">
                  <label for="name">商品名稱</label>
                  <textarea id="name" rows="1" placeholder="商品名稱"></textarea>
                </div>

                <div class="form-group">
                    <label for="sku" id="skulabel">SKU</label>
                    <textarea id="sku" rows="1"></textarea>
                </div>

                <!-- 類別選擇 -->
                <div class="form-group">
                    <label for="type">商品類型</label>
                    <select id="type">
                        <option value="preparedFood">調理包</option>
                        <option value="mealkit">生鮮食材包</option>
                    </select>
                </div>

                <!-- 菜品分類選擇 -->
                <div class="form-group">
                    <label for="category">菜品分類</label>
                    <select id="category">
                        <option value="1">異國料理</option>
                        <option value="2">多人料理</option>
                        <option value="3">兒童友善</option>
                        <option value="4">銀髮友善</option>
                        <option value="5">家常料理</option>
                    </select>
                </div>

                <!-- 商品描述 -->
                <div class="form-group">
                    <label for="description">商品描述</label>
                    <textarea id="description" rows="8"></textarea>
                </div>

                <div class="form-group">
                    <label for="price">價格</label>
                    <textarea id="price" rows="1" placeholder="價格"></textarea>
                </div>

                <!-- 庫存 -->
                <div class="form-group">
                    <label for="stockQuantity">庫存數量</label>
                    <textarea id="stockQuantity" rows="1" placeholder="庫存"></textarea>
                </div>

                <!-- 提交與取消按鈕 -->
                <div class="form-group">
                    <button type="submit" id="submitButton">確認</button>
                    <button type="reset" id="cancelButton">取消</button>
                </div>
            </form>
        </section>
    `;
    mainContent.innerHTML = productUploadForm;

    let selectedFile = null;

    function createProduct(productData) {
        fetch(`/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })
        .then((response) => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then((result) => {
            console.log("商品上傳成功", result);
            if (selectedFile) {
                uploadProductImage(result.productId, selectedFile);
            } else {
                showSuccessMessage(result.name);
            }
        })
        .catch((error) => {
            console.error("上傳商品時發生錯誤", error);
            showErrorMessage(productData.name, error.message);
        });
    }

    function uploadProductImage(productId, file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productId', productId);

        fetch('/productImages/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('圖片上傳失敗');
            }
            return response.json();
        })
        .then(data => {
            console.log('圖片上傳成功:', data);
            showSuccessMessage(document.getElementById("name").value);
        })
        .catch(error => {
            console.error('圖片上傳錯誤:', error);
            showErrorMessage(document.getElementById("name").value, '商品已創建，但圖片上傳失敗');
        });
    }

    function showSuccessMessage(productName) {
        Swal.fire({
            title: "Upload Success",
            text: `成功上傳「${productName}」商品`,
            icon: "success",
            timer: 1500,
        }).then(() => {
            generateProductUploadForm(); // 重新生成表單
        });
    }

    function showErrorMessage(productName, message = '商品上傳失敗') {
        Swal.fire({
            title: "Upload Failed",
            text: `上傳「${productName}」${message}`,
            icon: "error",
            timer: 1500,
        });
    }

    const uploadImageButton = document.getElementById("uploadImageButton");
    const fileInput = document.getElementById("fileInput");

    uploadImageButton.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (event) => {
        selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.querySelector("#imagePreviewContainer img").src = e.target.result;
            }
            reader.readAsDataURL(selectedFile);
        }
    });

    // 提交按鈕邏輯
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            const productData = {
                type: document.getElementById("type").value,
                sku: document.getElementById("sku").value,
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                price: parseInt(document.getElementById("price").value),
                categoryId: parseInt(document.getElementById("category").value),
                stockQuantity: parseInt(document.getElementById("stockQuantity").value)
            };
            createProduct(productData);
        });
    } else {
        console.error("submitButton 元素未找到");
    }
}

// 點擊"商品管理"時生成內容的函數
function generateProductManagementWithActionsContent() {
  if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'backlogin.html';
    return;
  }
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // 清空之前的內容

    // 動態生成商品管理的標題和表格
    const productManagementSection = `
    <section class="product-management">
        <h1>商品管理</h1>
        <div class="orderControls">
            <label>搜尋商品：</label>
            <input type="text" id="productSearchInput" placeholder="輸入名稱或SKU" class="SearchInput">
            <button id="searchBtn" class="btn">搜尋</button>
            
            <label>每頁顯示結果數：</label>
            <select id="resultsPerPage">
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>

            <label>排序：</label>
            <select id="sortOrder">
                <option value="default">預設排序</option>
                <option value="skuASC">SKU (A-Z)</option>
                <option value="skuDESC">SKU (Z-A)</option>
                <option value="stockValuesASC">庫存量(遞增)</option>
                <option value="stockValuesDESC">庫存量(遞減)</option>
                <option value="priceASC">價格(遞增)</option>
                <option value="priceDESC">價格(遞減)</option>
            </select>

            <label>狀態：</label>
            <select id="productStatus">
                <option value="all">全部</option>
                <option value="stockNull">零庫存</option>
            </select>
        </div>

        <!-- 商品表格 -->
        <table class="product-table">
            <thead>
                <tr>
                    <th>商品圖片</th>
                    <th>productId</th>
                    <th>SKU</th>
                    <th>商品名稱</th>
                    <th>價格</th>
                    <th>庫存</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <!-- 這裡插入動態生成的商品 -->
            </tbody>
        </table>

        <!-- 頁數切換的下拉選單 -->
        <div class="pagination-controls" style="text-align: right; margin-top: 20px;">
            <label for="pageSelect">選擇頁數：</label>
            <select id="pageSelect" style="border-radius: 5px; border: 1px solid #ccc;">
                <!-- 動態生成頁數選項 -->
            </select>
        </div>
    </section>
`;
    mainContent.innerHTML = productManagementSection;

    const tbody = document.querySelector(".product-table tbody");
    const resultsPerPageSelect = document.getElementById("resultsPerPage");//每頁幾筆資料選擇
    const sortOrderSelect = document.getElementById("sortOrder"); // 排序選項
    const productStatusSelect = document.getElementById("productStatus"); // 狀態選項
    const pageSelect = document.getElementById("pageSelect"); //頁數選擇
    const searchInput = document.getElementById("productSearchInput"); //搜尋關鍵字

    // 設置每頁顯示的商品數量
    let products = [];
    let resultsPerPage = parseInt(resultsPerPageSelect.value);
    let currentPage = 1; // 預設為第 1 頁
    let totalPages = Math.ceil(products.length / resultsPerPage);

    fetch(`/products`)
        .then((response) => {
            if (!response.ok) {
                throw new error("無法獲取現有商品清單");
            }
            return response.json();
        })
        .then((data) => {
            if (data.length === 0) {
                console.log("目前沒有可顯示的商品");
                tbody.innerHTML = `<tr><td colspan="6">目前沒有商品資料</td></tr>`;
            } else {
                products = data;
                updatePagination(products);
                filterProductsByStatus(products);
                sortProducts(products);
                renderProducts(products);
            }
        })
        .catch((error) => {
            console.error("獲取商品清單發生錯誤", error);
        });

    // 根據狀態(全部、零庫存)篩選商品
    function filterProductsByStatus(status) {
        if (status === "all") {// 如果選擇"全部"，返回所有商品
            return products;
        } else {
            return products.filter((product) => product.stock === 0);
        }
    }

    // 根據排序選項對商品進行排序
    function sortProducts(productsList, sortBy) {
        if (sortBy === "priceASC") {// 按價錢升序排序
            return productsList.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceDESC") {// 按價錢降序排序
            return productsList.sort((a, b) => b.price - a.price);
        } else if (sortBy === "stockValuesASC") {// 按庫存降序排序
            return productsList.sort((a, b) => a.stockQuantity - b.stockQuantity);
        } else if (sortBy === "stockValuesDESC") { // 按庫存升序排序
            return productsList.sort((a, b) => b.stockQuantity - a.stockQuantity);
        } else if (sortBy === "skuASC") {// 按庫存升序排序
            // 按 SKU 升序排序
            return productsList.sort((a, b) => a.sku.localeCompare(b.sku));
        } else if (sortBy === "skuDESC") {
            // 按 SKU 降序排序
            return productsList.sort((a, b) => b.sku.localeCompare(a.sku));
        } else if (sortBy === "default") {
            // 預設排序，根據 productId 升序排序
            return productsList.sort((a, b) => a.productId - b.productId);
        }

        return productsList;
    }

    // 渲染篩選和排序後的商品
    function renderFilteredAndSortedProducts() {
        let filteredProducts = filterProductsByStatus(productStatusSelect.value); // 先篩選
        let sortedProducts = sortProducts(filteredProducts, sortOrderSelect.value); // 再排序
        updatePagination(sortedProducts);
        renderProducts(sortedProducts);
    }

    // 動態生成頁數選項
    function updatePagination(filteredProducts) {
        pageSelect.innerHTML = ""; // 清空頁數選項
        totalPages = Math.ceil(filteredProducts.length / resultsPerPage); // 更新總頁數
        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `第 ${i} 頁`;
            pageSelect.appendChild(option);
        }
        pageSelect.value = currentPage; // 設定當前頁數
    }

    // 動態生成每個商品的表格行  渲染商品函數
    function renderProducts(filteredProducts) {
        tbody.innerHTML = ""; // 清空表格内容
        const start = (currentPage - 1) * resultsPerPage;
        const end = start + resultsPerPage;
        const visibleProducts = filteredProducts.slice(start, end);

        visibleProducts.forEach((product, index) => {
            const tr = document.createElement("tr");
            const imageSrc = product.productImages && product.productImages.length > 0
                ? product.productImages[0].image // 使用第一張圖的url
                : "/path/to/default/image.png"; // 使用默認圖片路徑

            tr.innerHTML = `
            <td><img src="${imageSrc}" alt="${
                product.name
            }"  style="height: auto; width: 150px;"></td>
            <td>${product.productId}</td>
            <td>${product.sku}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stockQuantity}</td>
            <td class="actions">
                <button class="edit-button" data-index="${
                start + index
            }" data-product-id="${product.productId}">修改</button>
                <button class="delete-button" data-index="${
                start + index
            }" data-product-id="${product.productId}" data-product-name="${product.name}">刪除</button>
            </td>
        `;

            tbody.appendChild(tr);
        });

        // 重新綁定「修改」按鈕事件
        document.querySelectorAll(".edit-button").forEach((button) => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-product-id"); // 從按鈕中獲取商品ID
                fetchProductDetails(productId); // 取得商品詳情並生成商品詳情的表單
            });
        });

        // 重新綁定「刪除」按鈕事件
        document.querySelectorAll(".delete-button").forEach((button) => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-product-id");
                const productName = this.getAttribute("data-product-name");
                //點擊刪除跳出提醒
                Swal.fire({
                    title: "注意",
                    text: `你確定要刪除「${productName}」商品`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`/products/${productId}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error("刪除商品失敗");
                                }
                                return response.text();
                            })
                            .then(() => {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: `刪除「${productName}」商品成功`,
                                    icon: "success",
                                    timer: 1500,
                                });
                                console.log(productId);
                                console.log(productName);
                                products.splice(productId, 1);
                                generateProductManagementWithActionsContent(); // 刷新商品管理頁面
                            })
                            .catch((error) => {
                                console.error("刪除商品時發生錯誤");
                                Swal.fire({
                                    title: "Failed!",
                                    text: `刪除「${productName}」商品失敗`,
                                    icon: "error",
                                    timer: 1500,
                                });
                                generateProductManagementWithActionsContent(); // 刷新商品管理頁面
                            });
                    }
                });
            });
        });

        // 搜尋商品
        document.getElementById("searchBtn").addEventListener("click", () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.sku.toLowerCase().includes(searchTerm)
            );
            currentPage = 1; // 搜尋時將頁面重置到第 1 頁
            updatePagination(filteredProducts);
            renderProducts(filteredProducts);
        });

        // 更新顯示結果數時，重新計算頁數並渲染
        resultsPerPageSelect.addEventListener("change", () => {
            resultsPerPage = parseInt(resultsPerPageSelect.value);
            currentPage = 1; // 切換每頁顯示數時，返回到第 1 頁
            const filteredProducts = products;
            updatePagination(filteredProducts);
            renderProducts(filteredProducts);
        });

        // 監聽頁數切換事件
        pageSelect.addEventListener("change", () => {
            currentPage = parseInt(pageSelect.value);
            const filteredProducts = products;
            renderProducts(filteredProducts);
        });

        // 監聽排序選項變更事件
        sortOrderSelect.addEventListener("change", () => {
            currentPage = 1;
            renderFilteredAndSortedProducts();
        });

        // 監聽狀態選項變更事件
        productStatusSelect.addEventListener("change", () => {
            currentPage = 1;
            renderFilteredAndSortedProducts();
        });
    }

    document.addEventListener("DOMContentLoaded", function () {

        const editProductButton = document.getElementById("editProductButton");

        if (editProductButton) {
            editProductButton.addEventListener("click", function (event) {
                event.preventDefault(); // 防止跳轉
                generateProductManagementWithActionsContent(); // 調用生成商品管理頁面的函數
            });
        } else {
            console.error("editProductButton 元素未找到");
        }
    });

    function fetchProductDetails(productId) {
        fetch(`/products/${productId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("無法獲取商品詳情");
                }
                return response.json();
            })
            .then((product) => {
                // 獲取到商品詳情後，生成編輯表單
                generateProductManagementEdit(product);
            })
            .catch((error) => {
                console.error("獲取商品詳情時發生錯誤", error);
            });
    }

    // 商品管理部分(點擊"商品管理-修改"時生成內容的函數)
    function generateProductManagementEdit(product) {
        const mainContent = document.querySelector(".main-content");
        mainContent.innerHTML = ""; // 清空之前的內容

        // 動態生成商品修改的表單
        const productEditForm = `
      <section class="product-edit">
        <h1>修改商品 - ${product.name}</h1>
            <div class="image-upload">
              <div class="image-preview-container">
                <div id="imagePreviewContainer" class="image-preview">
                  ${product.productImages && product.productImages.length > 0
            ? product.productImages.map(img =>
                `<div class="image-wrapper">
                          <img src="${img.image || '../material/icon/default.png'}" 
                                alt="${product.name || '商品圖片'}" 
                                class="preview-image">
                        </div>`
            ).join('')
            : '<div class="image-wrapper"><img src="../material/icon/default.png" alt="預設商品圖片" class="preview-image"></div>'}
                </div>
              </div>
              <div class="upload-button-container">
                <input type="file" id="fileInput" accept="image/*" style="display: none;">
                <button type="button" id="uploadImageButton">上傳新圖片</button>
              </div>
            </div>

          <form>
              <div class="form-group">
                  <label for="productId">productId</label>
                  <textarea id="productId" rows="1" readonly>${
            product.productId
        }</textarea>
              </div>
              <div class="form-group">
                  <label for="sku">SKU</label>
                  <textarea id="sku" rows="1" readonly>${product.sku}</textarea>
              </div>

              <div class="form-group">
                  <label for="name">商品名稱</label>
                  <textarea id="name" rows="1">${product.name}</textarea>
              </div>

              <div class="form-group">
                  <label for="type">商品類型</label>
                  <select id="type">
                      <option value="preparedFood" ${
                            product.type === "preparedFood" ? "selected" : ""
                        }>調理包</option>
                                      <option value="mealkit " ${
                            product.type === "mealkit" ? "selected" : ""
                        }>生鮮食材包</option>
                  </select>
              </div>
              
              <div class="form-group">
                  <label for="category">菜品分類</label>
                  <select id="category">
                        <option value=1 ${product.category.categoryId === 1 ? "selected" : ""}>異國料理</option>
                        <option value=2 ${product.category.categoryId === 2 ? "selected" : ""}>多人料理</option>
                        <option value=3 ${product.category.categoryId === 3 ? "selected" : ""}>兒童友善</option>
                        <option value=4 ${product.category.categoryId === 4 ? "selected" : ""}>銀髮友善</option>
                        <option value=5 ${product.category.categoryId === 5 ? "selected" : ""}>家常料理</option>
                  </select>
              </div>
              
              <div class="form-group">
                  <label for="description">商品描述</label>
                  <textarea id="description" rows="4">${
            product.description
        }</textarea>
              </div>

              <div class="form-group">
                  <label for="price">價格</label>
                  <textarea id="price" rows="1">${product.price}</textarea>
              </div>

              <div class="form-group">
                  <label for="stockQuantity">庫存數量</label>
                  <textarea id="stockQuantity" rows="1">${
            product.stockQuantity
        }</textarea>
              </div>


              <div class="form-group">
                  <button type="button" id="submitButton">保存修改</button>
                  <button type="button" id="cancelButton">取消</button>
              </div>
          </form>
      </section>
  `;
        mainContent.innerHTML = productEditForm;

        document
            .getElementById("submitButton")
            .addEventListener("click", function (event) {
                event.preventDefault();
                updateProductDetails(product);
            });

        // 綁定取消按鈕事件
        document
            .getElementById("cancelButton")
            .addEventListener("click", function () {
                generateProductManagementWithActionsContent(); // 返回商品管理頁面
            });

        document.getElementById("uploadImageButton").addEventListener("click", function () {
            document.getElementById("fileInput").click();
        });

        document.getElementById("fileInput").addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                uploadImage(file);
            }
        });

        function setupImageUpload() {
            const uploadButton = document.getElementById("uploadImageButton");
            const fileInput = document.getElementById("fileInput");

            if (!uploadButton || !fileInput) {
                console.error("無法找到上傳按鈕或文件輸入元素");
                return;
            }

            uploadButton.addEventListener("click", function () {
                fileInput.click();
            });

            fileInput.addEventListener("change", function (event) {
                const file = event.target.files[0];
                if (file) {
                    uploadImage(file);
                }
            });
        }

        document.addEventListener('DOMContentLoaded', setupImageUpload);
    }

    function updateProductDetails(product) {
        const updatedProduct = {
            name: document.getElementById("name").value,
            type: document.getElementById("type").value,
            categoryId: parseInt(document.getElementById("category").value),
            price: parseInt(document.getElementById("price").value),
            description: document.getElementById("description").value,
            stockQuantity: parseInt(document.getElementById("stockQuantity").value),
        };
        updateProduct(product.productId, updatedProduct);
    }

    function updateProduct(productId, productData) {
        fetch(`/products/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        })
        .then((response) => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then((result) => {
            console.log("商品修改成功", result);
            Swal.fire({
                title: "成功",
                text: `成功修改「${productData.name}」商品資訊`,
                icon: "success",
                timer: 1500,
            });
            generateProductManagementWithActionsContent();
        })
        .catch((error) => {
            console.error("修改商品時發生錯誤", error);
            Swal.fire({
                title: "錯誤",
                text: `修改商品資訊時發生錯誤: ${error.message}`,
                icon: "error",
                timer: 1500,
            });
        });
    }

    // 圖片上傳
    function uploadImage(file) {
        const productId = document.getElementById('productId').value;

        if (!productId) {
            console.error('無法獲取 productId');
            Swal.fire({
                title: '錯誤',
                text: '無法獲取商品 ID，請確保您在正確的頁面上',
                icon: 'error',
                timer: 2000
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('productId', productId);

        const imagePreviewContainer = document.getElementById('imagePreviewContainer');

        // 檢查是否存在預設圖片
        const defaultImage = imagePreviewContainer.querySelector('.image-wrapper img[src="../material/icon/default.png"]');

        // 創建新的圖片容器
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'image-wrapper';
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        imageWrapper.appendChild(loadingSpinner);

        // 如果存在預設圖片，替換它；否則，添加到最後
        if (defaultImage && defaultImage.parentNode) {
            imagePreviewContainer.replaceChild(imageWrapper, defaultImage.parentNode);
        } else {
            imagePreviewContainer.appendChild(imageWrapper);
        }

        fetch('/productImages/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('網路回應不正常');
                }
                return response.json();
            })
            .then(data => {
                console.log('上傳成功:', data);
                if (data.imageUrl) {
                    // 移除加載動畫
                    imageWrapper.removeChild(loadingSpinner);

                    // 創建新圖片元素
                    const newImage = document.createElement('img');
                    newImage.src = data.imageUrl;
                    newImage.alt = "新上傳的圖片";
                    newImage.className = 'preview-image';

                    // 當圖片加載完成時，添加 loaded 類
                    newImage.onload = function () {
                        imageWrapper.classList.add('loaded');
                    };

                    imageWrapper.appendChild(newImage);

                    Swal.fire({
                        title: '上傳成功',
                        text: '商品圖片已成功上傳',
                        icon: 'success',
                        timer: 2000
                    });
                } else {
                    throw new Error('返回的數據中沒有圖片 URL');
                }
            })
            .catch(error => {
                console.error('錯誤:', error);
                // 移除佔位容器
                imagePreviewContainer.removeChild(imageWrapper);
                // 如果是第一張圖片上傳失敗，恢復預設圖片
                if (imagePreviewContainer.children.length === 0) {
                    const defaultWrapper = document.createElement('div');
                    defaultWrapper.className = 'image-wrapper';
                    defaultWrapper.innerHTML = '<img src="../material/icon/default.png" alt="預設商品圖片" class="preview-image">';
                    imagePreviewContainer.appendChild(defaultWrapper);
                }
                Swal.fire({
                    title: '上傳失敗',
                    text: '商品圖片上傳失敗，請稍後再試',
                    icon: 'error',
                    timer: 2000
                });
            });
    }

    // setupImageUpload();
}


// 點擊"食譜管理"時生成內容的函數
function generateRecipeUploadForm() {
  if (!localStorage.getItem('adminLoggedIn')) {
      window.location.href = 'backlogin.html';
      return;
  }

  const mainContent = document.querySelector(".main-content");
  mainContent.innerHTML = `
      <section class="product-upload">
          <h1>食譜管理</h1>
          <div class="form-group">
              <label for="productSelect">選擇商品</label>
              <select id="productSelect">
                  <option value="">請選擇商品</option>
              </select>
          </div>
          <div id="productInfo" style="display: none;">
              <h2 id="productName"></h2>
              <button id="addRecipeBtn" style="display: none;">新增食譜</button>
          </div>
          <form id="recipeForm" style="display: none;">
              <div class="form-group">
                  <label for="recipeName">選擇食譜 (未選擇則為新增食譜)</label>
                  <select id="recipeName">
                      <option value="">請選擇食譜</option>
                  </select>
              </div>

              <div class="form-group">
                  <label for="recipeTitle">食譜標題</label>
                  <input type="text" id="recipeTitle" class="recipeInput" required>
              </div>
          
              <div class="form-group row-group">
                  <div class="field">
                      <label for="servings">人數</label>
                      <select id="servings">
                          <option value="1">1人</option>
                          <option value="2">2人</option>
                          <option value="3">3人</option>
                          <option value="4">4人</option>
                          <option value="5">5人</option>
                      </select>
                  </div>

                  <div class="field">
                      <label for="level">難度</label>
                      <select id="level">
                          <option value="簡單">簡單</option>
                          <option value="中等">中等</option>
                          <option value="困難">困難</option>
                      </select>
                  </div>

                  <div class="field time">
                      <label for="cookTime">製作時間（分鐘）</label>
                      <input type="number" id="cookTime" class="recipeInput" required>
                  </div>
              </div>

              <div class="form-group">
                  <label for="ingredients">食材</label>
                  <textarea id="ingredients" rows="5"></textarea>
              </div>

              <div class="form-group">
                  <label for="steps">食譜步驟</label>
                  <textarea id="steps" rows="8"></textarea>
              </div>

              <div class="form-group">
                  <label for="notes">貼心小提醒</label>
                  <textarea id="notes" rows="3"></textarea>
              </div>

              <div class="form-group">
                  <button type="submit" id="submitButton">確認</button>
                  <button type="reset" id="cancelButton">取消</button>
              </div>
          </form>
      </section>
  `;

  // 獲取產品列表並填充下拉選單
  fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(products => {
          const productSelect = document.getElementById('productSelect');
          products.forEach(product => {
              if (product.name.includes('生鮮食材')) {
                  const option = document.createElement('option');
                  option.value = product.productId;
                  option.textContent = product.name;
                  productSelect.appendChild(option);
              }
          });
      })
      .catch(error => {
          console.error('獲取產品列表失敗:', error);
          alert('獲取產品列表失敗，請稍後再試');
      });

  // 修改產品選擇事件監聽器
  document.getElementById('productSelect').addEventListener('change', function(event) {
    const productId = event.target.value;
    if (productId) {
        fetch(`http://localhost:8080/api/recipes/by-product/${productId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('productInfo').style.display = 'block';
                document.getElementById('productName').textContent = data.productName;
                
                const recipeSelect = document.getElementById('recipeName');
                recipeSelect.innerHTML = '<option value="">請選擇食譜</option>';
                
                if (data.recipes && data.recipes.length > 0) {
                    data.recipes.forEach(recipe => {
                        const option = document.createElement('option');
                        option.value = recipe.recipeId;
                        option.textContent = recipe.title;
                        recipeSelect.appendChild(option);
                    });
                }
                document.getElementById('recipeForm').style.display = 'block';
                clearRecipeForm(); // 清空表單，為可能的新增做準備
            })
            .catch(error => {
                console.error('獲取食譜列表失敗:', error);
                alert('獲取食譜列表失敗，請稍後再試');
            });
    } else {
        document.getElementById('productInfo').style.display = 'none';
        document.getElementById('recipeForm').style.display = 'none';
    }
});

  // 修改食譜選擇事件監聽器
  document.getElementById('recipeName').addEventListener('change', function(event) {
      const recipeId = event.target.value;
      if (recipeId) {
          fetch(`http://localhost:8080/api/recipes/view?id=${recipeId}`)
              .then(response => response.json())
              .then(data => {
                  if (data.recipe) {
                      fillRecipeForm(data.recipe);
                  } else {
                      console.error('No recipe data found in the response');
                      alert('無法獲取食譜資料，請稍後再試');
                  }
              })
              .catch(error => {
                  console.error('獲取食譜詳情失敗:', error);
                  alert('獲取食譜詳情失敗，請稍後再試');
              });
      } else {
          clearRecipeForm(); // 如果選擇了空選項，清空表單
      }
  });

  // 修改表單提交事件監聽器
  document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const productId = document.getElementById('productSelect').value;
    const recipeId = document.getElementById('recipeName').value;
    
    if (!productId) {
        alert('請選擇一個產品');
        return;
    }

    const formData = {
        recipeId: recipeId || null, // 如果沒有選擇食譜，則為 null（新增情況）
        title: document.getElementById('recipeTitle').value,
        servings: parseInt(document.getElementById('servings').value),
        level: document.getElementById('level').value,
        cookTime: parseInt(document.getElementById('cookTime').value),
        ingredients: document.getElementById('ingredients').value,
        steps: document.getElementById('steps').value,
        notes: document.getElementById('notes').value,
        isDel: false,
        productId: parseInt(productId)
    };

    console.log('提交的表單數據:', formData); // 添加日誌

    const url = recipeId ? 
        `http://localhost:8080/api/recipes/update?id=${recipeId}` : 
        'http://localhost:8080/api/recipes/create';

    const method = recipeId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        console.log('API 響應狀態:', response.status); // 添加日誌
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('API 響應數據:', data); // 添加日誌
        alert(recipeId ? '食譜更新成功' : '食譜創建成功');
        // 重新加載食譜列表
        document.getElementById('productSelect').dispatchEvent(new Event('change'));
    })
    .catch(error => {
        console.error('操作食譜時發生錯誤:', error);
        alert(recipeId ? '食譜更新失敗' : '食譜創建失敗');
    });
});

  function clearRecipeForm() {
      document.getElementById('recipeTitle').value = '';
      document.getElementById('servings').value = '1';
      document.getElementById('level').value = '簡單';
      document.getElementById('cookTime').value = '';
      document.getElementById('ingredients').value = '';
      document.getElementById('steps').value = '';
      document.getElementById('notes').value = '';
  }

  function fillRecipeForm(recipe) {
    document.getElementById('recipeTitle').value = recipe.title || '';
    document.getElementById('servings').value = recipe.servings || '';
    document.getElementById('level').value = recipe.level || '簡單';
    document.getElementById('cookTime').value = recipe.cookTime || '';
    document.getElementById('ingredients').value = recipe.ingredients || '';
    document.getElementById('steps').value = recipe.steps || '';
    document.getElementById('notes').value = recipe.notes || '';
}
}

// 點擊"用戶管理"時生成內容的函數
function generateUserManagementContent() {
  if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'backlogin.html';
    return;
  }
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // 清空之前的內容

    // 動態生成用戶管理的標題和表格
    const userManagementSection = `
        <section class="user-management">
            <h1>用戶管理</h1>
            <div class="userControls">
                <label>搜尋用戶：</label>
                <input type="text" id="userSearchInput" class="SearchInput" placeholder="輸入用戶名或電子郵件">

                <label>每頁顯示結果數：</label>
                <select id="resultsPerPage">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <label>排序：</label>
                <select id="sortOptions">
                    <option value="usernameASC">用戶名(遞增)</option>
                    <option value="usernameDESC">用戶名(遞減)</option>
                </select>
            </div>
            <table class="user-table">
                <thead>
                    <tr>
                        <th>用戶ID</th>
                        <th>用戶名</th>
                        <th>電子郵件</th>
                        <th>電話號碼</th>
                        <th>狀態</th>
                        <th>操作</th>                        
                    </tr>
                </thead>
                <tbody>
                    <!-- 這裡插入動態生成的用戶 -->
                </tbody>
            </table>

            <!-- 分頁控制 -->
            <div class="pagination-controls" style="text-align: right; margin-top: 20px;">
                <label for="pageSelect">選擇頁數：</label>
                <select id="pageSelect" style="border-radius: 5px; border: 1px solid #ccc;">
                    <!-- 動態生成頁數選項 -->
                </select>
            </div>
        </section>
    `;
    mainContent.innerHTML = userManagementSection;

    const tbody = document.querySelector(".user-table tbody");
    const resultsPerPageSelect = document.getElementById("resultsPerPage");
    const pageSelect = document.getElementById("pageSelect");
    const searchInput = document.getElementById("userSearchInput");
    const sortOptions = document.getElementById("sortOptions");

    let users = [];
    let resultsPerPage = parseInt(resultsPerPageSelect.value);
    let currentPage = 1;
    let totalPages = 0;

    // 從API獲取用戶數據
    async function fetchUsers() {
        try {
            const response = await fetch('/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            users = await response.json();
            totalPages = Math.ceil(users.length / resultsPerPage);
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    // 根據排序選項對用戶進行排序
    function sortUsers(usersList, sortBy) {
        if (sortBy === "usernameASC") {
            return usersList.sort((a, b) => a.username.localeCompare(b.username));
        } else if (sortBy === "usernameDESC") {
            return usersList.sort((a, b) => b.username.localeCompare(a.username));
        }
        return usersList;
    }

    // 動態生成每個用戶的表格行
    function renderUsers(filteredUsers) {
        tbody.innerHTML = ""; // 清空表格內容
        const start = (currentPage - 1) * resultsPerPage;
        const end = start + resultsPerPage;
        const visibleUsers = filteredUsers.slice(start, end);

        visibleUsers.forEach((user) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${user.userId}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber || 'N/A'}</td>
                <td>${user.isVerified ? '已驗證' : '未驗證'}</td>
                <td class="actions">
                    <button class="edit-button" data-userid="${user.userId}">詳情</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        // 綁定「詳情」按鈕的事件
        document.querySelectorAll(".edit-button").forEach((button) => {
            button.addEventListener("click", function () {
                const userId = this.getAttribute("data-userid");
                generateUserEditForm(users.find(u => u.userId == userId));
            });
        });
    }

    // 動態生成頁數選項
    function updatePagination(filteredUsers) {
        pageSelect.innerHTML = ""; // 清空頁數選項
        totalPages = Math.ceil(filteredUsers.length / resultsPerPage); // 更新總頁數
        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `第 ${i} 頁`;
            pageSelect.appendChild(option);
        }
        pageSelect.value = currentPage; // 設定當前頁數
    }

    // 搜尋用戶
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsers = users.filter(
            (user) =>
                user.username.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
        );
        currentPage = 1; // 搜尋時將頁面重置到第 1 頁
        updatePagination(filteredUsers);
        renderUsers(filteredUsers);
    });

    // 排序功能
    sortOptions.addEventListener("change", () => {
        let filteredUsers = sortUsers(users, sortOptions.value);
        currentPage = 1; // 改變排序時返回到第 1 頁
        updatePagination(filteredUsers);
        renderUsers(filteredUsers);
    });

    // 更新顯示結果數時，重新計算頁數並渲染
    resultsPerPageSelect.addEventListener("change", () => {
        resultsPerPage = parseInt(resultsPerPageSelect.value);
        currentPage = 1; // 切換每頁顯示數時，返回到第 1 頁
        let filteredUsers = sortUsers(users, sortOptions.value);
        updatePagination(filteredUsers);
        renderUsers(filteredUsers);
    });

    // 監聽頁數切換事件
    pageSelect.addEventListener("change", () => {
        currentPage = parseInt(pageSelect.value);
        let filteredUsers = sortUsers(users, sortOptions.value);
        renderUsers(filteredUsers);
    });

    // 初始化頁面
    fetchUsers().then(fetchedUsers => {
        users = fetchedUsers;
        let filteredUsers = sortUsers(users, sortOptions.value);
        updatePagination(filteredUsers);
        renderUsers(filteredUsers);
    });
}

// 生成用戶詳情表單
function generateUserEditForm(user) {
  if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'backlogin.html';
    return;
  }
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // 清空之前的內容

    const userInfoHTML = `
    <h1>用戶詳情 - 用戶ID: ${user.userId}</h1>
    <div class="user-info-container">
      <div class="basic-info">
        <h2>基本資訊</h2>
        <div class="info-summary">
          <p><strong>用戶名:</strong> ${user.username}</p>
          <p><strong>電子郵件:</strong> ${user.email}</p>
          <p><strong>電話號碼:</strong> ${user.phoneNumber || 'N/A'}</p>
          <p><strong>驗證狀態:</strong> ${user.isVerified ? '已驗證' : '未驗證'}</p>
          <p><strong>是否刪除:</strong> ${user.isDel ? '是' : '否'}</p>
        </div>
      </div>
      <div class="detailed-info">
        <h2>詳細資訊</h2>
        <div class="info-summary">
          <p><strong>名字:</strong> ${user.userinfo?.firstName || 'N/A'}</p>
          <p><strong>姓氏:</strong> ${user.userinfo?.lastName || 'N/A'}</p>
          <p><strong>地址:</strong> ${user.userinfo?.address || 'N/A'}</p>
          <p><strong>郵遞區號:</strong> ${user.userinfo?.postalCode || 'N/A'}</p>
          <p><strong>生日:</strong> ${user.userinfo?.birthday || 'N/A'}</p>
          <p><strong>縣市:</strong> ${user.userinfo?.county || 'N/A'}</p>
          <p><strong>區域:</strong> ${user.userinfo?.district || 'N/A'}</p>
        </div>
      </div>
    </div>
    <button onclick="generateUserManagementContent()" class="btn" style="margin-top :10px; ">返回用戶列表</button>
  `;

    mainContent.innerHTML = userInfoHTML;
}

function generateCouponManagementForm() {
  if (!localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'backlogin.html';
    return;
  }
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // 清空之前的內容

    const couponManagementForm = `
        <section class="coupon-management">
            <h1>優惠券管理</h1>

            <!-- 新增優惠券表單 -->
            <form id="couponForm">
                <div class="form-group">
                    <label for="code">優惠券代碼</label>
                    <textarea id="code" rows="1" placeholder="輸入優惠券代碼"></textarea>
                </div>

                <div class="form-group">
                    <label for="name">優惠券名稱</label>
                    <textarea id="name" rows="1" placeholder="輸入優惠券名稱"></textarea>
                </div>

                <div class="form-group">
                    <label for="discountType">折扣類型</label>
                    <select id="discountType">
                        <option value="percentage">百分比折扣</option>
                        <option value="amount">固定金額折扣</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="discountValue">折扣值</label>
                    <textarea id="discountValue" rows="1" placeholder="輸入折扣值"></textarea>
                </div>

                <div class="form-group">
                    <label for="expiryDate">到期日期</label>
                    <input type="date" id="expiryDate">
                    <!-- 提交與取消按鈕 -->
                    <button type="submit" id="submitCouponButton">新增優惠券</button>
                    <button type="reset" id="cancelCouponButton">取消</button>
                </div>
            </form>

            <!-- 已經新增的優惠券列表 -->
           <!-- 已經新增的優惠券列表 -->
        <section class="existing-coupons">
            <h1>已新增的優惠券</h1>
            <table class="coupon-table">
                <thead>
                    <tr>
                        <th>優惠券代碼</th>
                        <th>名稱</th>
                        <th>折扣類型</th>
                        <th>折扣值</th>
                        <th>到期日期</th>
                        <th>狀態</th> <!-- 新增狀態欄 -->
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="couponTableBody">
                    <!-- 動態生成的優惠券將插入這裡 -->
                </tbody>
            </table>
        </section>
        </section>
    `;
    mainContent.innerHTML = couponManagementForm;

    // 儲存優惠券的陣列
    let coupons = [];

    // 一進入頁面，獲取現有的優惠券並顯示
    fetch("/api/coupons/all")  // 假設後端的 GET API 是這個路徑
        .then((response) => response.json())
        .then((data) => {
            coupons = data; // 假設後端返回的是現有的優惠券列表
            displayCoupons(); // 顯示優惠券
        })
        .catch((error) => console.error("Error fetching coupons:", error));

    // 優惠券表單提交處理
    const couponForm = document.getElementById("couponForm");
    couponForm.addEventListener("submit", function (event) {
        event.preventDefault(); // 阻止表單提交刷新

        // 獲取輸入的優惠券信息
        const code = document.getElementById("code").value;
        const name = document.getElementById("name").value;
        const discountType = document.getElementById("discountType").value;
        const discountValue = document.getElementById("discountValue").value;
        const expiryDate = document.getElementById("expiryDate").value;

        // 構造優惠券對象
        const couponData = {
            code,
            name,
            discountType,
            discountValue,
            expiryDate,
        };

        // 發送 POST 請求到後端
        fetch("/api/coupons/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(couponData),
        })
            .then((response) => response.json()) // 解析 JSON 回應
            .then((data) => {
                // 使用返回的優惠券陣列更新表格
                coupons = data; // 假設後端返回的是最新的優惠券列表
                displayCoupons(); // 顯示優惠券
            })
            .catch((error) => console.error("Error:", error));

        // 重置表單
        couponForm.reset();
        displayCoupons(); // 提交表单后，刷新优惠券列表
    });

    // 顯示已新增的優惠券
    function displayCoupons() {
        const couponTableBody = document.getElementById("couponTableBody");
        couponTableBody.innerHTML = ""; // 清空之前的內容

        const currentDate = new Date();  // 獲取當前日期

        coupons.forEach((coupon, index) => {
            const tr = document.createElement("tr");
            const expiryDate = new Date(coupon.expiryDate);  // 將優惠券的到期日期轉換為日期格式

            // 確定優惠券的狀態
            let status = "有效"; // 預設為有效

            if (!coupon.active) {
                status = "已禁用";  // 如果優惠券被禁用
            } else if (expiryDate < currentDate) {
                status = "已過期";  // 如果優惠券已經過期
            }

            // 建立優惠券行
            tr.innerHTML = `
        <td>${coupon.code}</td>
        <td>${coupon.name}</td>
        <td>${coupon.discountType === "percentage" ? "百分比" : "固定金額"}</td>
        <td>${coupon.discountValue}</td>
        <td>${coupon.expiryDate}</td>
        <td>${status}</td>  <!-- 顯示優惠券狀態 -->
        <td>
            <button class="${coupon.active ? 'deactivate-button' : 'activate-button'}" data-index="${index}">
                ${coupon.active ? "禁用" : "啟用"}
            </button>
            <button class="send-button" data-index="${index}">發送</button>
        </td>
    `;
            couponTableBody.appendChild(tr);
        });

        // 綁定禁用/啟用按鈕的事件
        document.querySelectorAll(".deactivate-button, .activate-button").forEach((button) => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const coupon = coupons[index];

                const action = coupon.active ? "禁用" : "啟用";
                const isConfirmed = confirm(`確定要${action}此優惠券嗎？`);

                if (isConfirmed) {
                    // 發送請求到後端切換優惠券狀態
                    fetch(`/api/coupons/toggle/${coupon.couponId}`, {
                        method: "POST",
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // 更新該優惠券的狀態
                            coupons[index] = data.coupon;  // 使用後端返回的 coupon 對象更新狀態
                            displayCoupons(); // 重新渲染表格，確保狀態與後端同步
                        })
                        .catch((error) => console.error("Error toggling coupon:", error));
                }
            });
        });

        // 綁定發送按鈕的事件
        document.querySelectorAll(".send-button").forEach((button) => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const couponId = coupons[index].couponId;

                // 發送 POST 請求到 /api/coupons/issue/all
                fetch(`/api/coupons/issue/all?couponId=${couponId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to send coupon");
                        }
                        return response.text(); // 假設 API 返回一個字符串訊息
                    })
                    .then((data) => {
                        alert(`優惠券 ${couponId} 已成功發送: ${data}`);
                    })
                    .catch((error) => {
                        console.error("Error sending coupon:", error);
                        alert(`優惠券 ${couponId} 發送失敗，請稍後再試`);
                    });
            });
        });
    }






}

function logout() {
  localStorage.removeItem('adminLoggedIn');
  sessionStorage.removeItem('adminLoggedIn');
  window.location.href = 'backlogin.html';
}


document.addEventListener("DOMContentLoaded", function () {
    initChart();
});

document.addEventListener("DOMContentLoaded", function () {
    // 點擊logo時生成內容
    const logo = document.getElementById("logo");
    logo.addEventListener("click", function (event) {
        event.preventDefault(); // 防止跳轉
        generateOverviewContent(); // 調用生成函數
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 點擊"總覽"按鈕時生成內容
    const overviewButton = document.getElementById("overviewButton");
    overviewButton.addEventListener("click", function (event) {
        event.preventDefault(); // 防止跳轉
        generateOverviewContent(); // 調用生成函數
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 點擊"訂單管理"按鈕時生成內容
    const orderManagementButton = document.getElementById(
        "orderManagementButton"
    );
    orderManagementButton.addEventListener("click", function (event) {
        event.preventDefault(); // 防止跳轉
        generateOrderManagementContent(); // 調用生成訂單管理內容的函數
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 點擊"商品上傳"按鈕時生成內容
    const uploadProductButton = document.getElementById("uploadProductButton");
    uploadProductButton.addEventListener("click", function (event) {
        event.preventDefault(); // 防止跳轉
        generateProductUploadForm(); // 調用生成商品上傳表單的函數
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 點擊"食譜管理"按鈕時生成內容
    const uploadRecipeButton = document.getElementById("uploadRecipeButton");
    uploadRecipeButton.addEventListener("click", function (event) {
        event.preventDefault(); // 防止跳轉
        generateRecipeUploadForm(); // 調用生成商品上傳表單的函數
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const editProductButton = document.getElementById("editProductButton");

    if (editProductButton) {
        editProductButton.addEventListener("click", function (event) {
            event.preventDefault(); // 防止跳轉
            generateProductManagementWithActionsContent(); // 調用生成商品管理頁面的函數
        });
    } else {
        console.error("editProductButton 元素未找到");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const editProductButton = document.getElementById("recipeEditButton");
    editProductButton.addEventListener("click", function (event) {
        event.preventDefault(); // 防止跳轉
        generateRecipeManagementContent(); // 調用生成食譜管理頁面的函數
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const manageStockButton = document.getElementById("userManagementButton");
    manageStockButton.addEventListener("click", function (event) {
        event.preventDefault(); // 防止跳轉
        generateUserManagementContent(); // 調用生成用戶管理頁面的函數
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const manageStockButton = document.getElementById("couponManagementButton");
    manageStockButton.addEventListener("click", function (event) {
        event.preventDefault(); // 防止跳轉
        generateCouponManagementForm(); // 調用生成優惠券管理頁面的函數
    });
});

// 為 "詳情" 按鈕添加點擊事件
document.querySelectorAll(".details-link").forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const productIndex = this.getAttribute("data-index");
        generateProductEditForm(products[productIndex]); // 調用商品修改頁面並傳入對應商品數據
    });
});

// 取消按鈕事件
document.getElementById("cancelButton").addEventListener("click", function () {
    generateProductManagementContent(); // 返回商品管理頁面
});

// 綁定"商品修改"按鈕的點擊事件
document
    .getElementById("editProductButton")
    .addEventListener("click", function (event) {
        event.preventDefault();
        generateProductManagementWithActionsContent(); // 生成商品管理頁面
    });

// 登出功能
document.getElementById('logoutButton').addEventListener('click', function(e) {
	 e.preventDefault();
	 localStorage.removeItem('adminLoggedIn');
	 window.location.href = 'backlogin.html';
});