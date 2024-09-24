generateOverviewContent(); // 預設總覽頁面為首頁

// 假資料，模擬不同報表的數據
const chartData = {
    revenue: {
        week: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            data: [3000, 40, 3500, 5000, 4500, 6000, 5500],
            label: '每周營業額'
        },
        month: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            data: [12000, 15000, 18000, 20000, 22000, 25000, 28000, 30000, 33000, 35000, 37000, 40000],
            label: '每月營業額'
        },
        year: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            data: [150000, 180000, 200000, 220000, 250000],
            label: '每年營業額'
        }
    },
    orders: {
        week: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            data: [100, 120, 150, 180, 200, 250, 300],
            label: '每周訂單總量'
        },
        month: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            data: [1000, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3500, 3700, 3900, 4000],
            label: '每月訂單總量'
        },
        year: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            data: [15000, 18000, 20000, 22000, 25000],
            label: '每年訂單總量'
        }
    },
    users: {
        week: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            data: [50, 60, 75, 80, 100, 120, 150],
            label: '每周總用戶數'
        },
        month: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            data: [500, 700, 900, 1100, 1300, 1500, 1700, 2000, 2300, 2500, 2800, 3000],
            label: '每月總用戶數'
        },
        year: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            data: [10000, 15000, 20000, 25000, 30000],
            label: '每年總用戶數'
        }
    }
};

// 假資料，模擬不同訂單
const orders = [
    {
        orderNumber: "XXXX1",
        name: "產品名稱1",
        deliveryMethod: "快遞",
        orderAmount: 1000,
        status: "已付款",
        statusClass: "paid",
        date: "2024-09-21 16:55:56",
        couponId: "COUPON123",
        orderDate: "2024-09-20",
        percentageDiscount: 10,  // 百分比折扣
        amountDiscount: 100,  // 折扣金額
        totalAmount: 1000,  // 訂單總金額
        finalAmount: 900,  // 最終金額
        comment: "快速配送，無問題",
        changedBy: "Admin",
        changedAt: "2024-09-22 08:00",
        address: "100台北市中正區鄭州路8號",
        userId: "1", 
        items: [
            {
                name: "商品1",
                sku: "SKU123",
                quantity: 2,
                price: 50,
                image: "紅大頭.png"
            },
            {
                name: "商品2",
                sku: "SKU456",
                quantity: 1,
                price: 100,
                image: "紅大頭.png"
            }
        ]
    },
    {
        orderNumber: "XXXX2",
        name: "產品名稱2",
        deliveryMethod: "郵寄",
        orderAmount: 2000,
        status: "尚未付款",
        statusClass: "unpaid",
        date: "2024-09-22 10:00:00",
        couponId: "COUPON456",
        orderDate: "2024-09-21",
        percentageDiscount: 5,
        amountDiscount: 100,
        totalAmount: 2000,
        finalAmount: 1900,
        comment: "",
        changedBy: "Admin",
        changedAt: "2024-09-22 09:00",
        address: "100台北市中正區忠孝西路一段49號",
        userId: "1",  
        items: [
            {
                name: "商品3",
                sku: "SKU789",
                quantity: 1,
                price: 150,
                image: "紅大頭.png"
            }
        ]
    }
];

// 假資料，模擬不同商品
const products = [
    {
        index: '1',
        name: '商品名稱1',
        sku: 'ABC-66',
        image: '紅大頭.png',
        category: '異國料理',
        servings: 3,
        difficulty: '中等',
        vegan: '否',
        time: '40',
        price: 500,
        description: '一道經典的肉醬義大利麵，肉醬味道濃郁，搭配煮得恰到好處的義大利麵，簡單且美味，適合全家人享用',
        Ingredients: '義大利麵200g,牛絞肉 150g,番茄醬 1 杯,洋蔥 1 顆（切丁）,大蒜 2 瓣（切碎）,橄欖油 2 湯匙',
        steps: '用手做，再說一次用手做',
        stock: '50',
    },
    {
        index: '2',
        name: '商品名稱2',
        sku: 'ABC-66',
        image: '紅大頭.png',
        category: '異國料理',
        servings: 3,
        difficulty: '中等',
        vegan: '否',
        time: '40',
        price: 500,
        description: '一道經典的肉醬義大利麵，肉醬味道濃郁，搭配煮得恰到好處的義大利麵，簡單且美味，適合全家人享用',
        Ingredients: '義大利麵200g,牛絞肉 150g,番茄醬 1 杯,洋蔥 1 顆（切丁）,大蒜 2 瓣（切碎）,橄欖油 2 湯匙',
        steps: '用手做，再說一次用手做',
        stock: '50',
    },
    {
        index: '3',
        name: '商品名稱3',
        sku: 'ABC-66',
        image: '紅大頭.png',
        category: '異國料理',
        servings: 3,
        difficulty: '中等',
        vegan: '否',
        time: '80',
        price: 500,
        description: '一道經典的肉醬義大利麵，肉醬味道濃郁，搭配煮得恰到好處的義大利麵，簡單且美味，適合全家人享用',
        Ingredients: '義大利麵200g,牛絞肉 150g,番茄醬 1 杯,洋蔥 1 顆（切丁）,大蒜 2 瓣（切碎）,橄欖油 2 湯匙',
        steps: '用手做，再說一次用手做',
        stock: '50',
    }
];

// 假資料，模擬不同食譜
const recipes = [
    {
        image: '紅大頭.png',
        name: '肉醬義大利麵',
        description: '一道經典的肉醬義大利麵，搭配濃郁的番茄醬和牛肉，簡單美味，適合全家人享用。',
        category: '異國料理',
        people: 4,
        difficulty: '中等',
        vegan: '否',
        time: '45',
        ingredients: '義大利麵 200g, 牛絞肉 150g, 番茄醬 1 杯, 洋蔥 1 顆 (切丁), 大蒜 2 瓣 (切碎), 橄欖油 2 湯匙, 鹽與胡椒適量',
        steps: '1. 先煮義大利麵，根據包裝說明進行。2. 加熱橄欖油，炒洋蔥和大蒜直到金黃。3. 加入牛絞肉，炒熟。4. 倒入番茄醬，煮滾後轉小火煨煮10分鐘。5. 將煮好的義大利麵拌入醬汁，調味後即可享用。'
    },
    {
        image: '紅大頭.png',
        name: '奶油雞肉蘑菇濃湯',
        description: '豐富的口感與濃郁的香味，是一份溫暖又美味的湯品。',
        category: '家常料理',
        people: 2,
        difficulty: '簡單',
        vegan: '否',
        time: '30',
        ingredients: '雞胸肉 200g, 蘑菇 100g, 洋蔥 1 顆 (切丁), 奶油 30g, 牛奶 300ml, 麵粉 2 湯匙, 鹽與胡椒適量',
        steps: '1. 雞胸肉切塊，蘑菇切片。2. 加熱奶油，炒洋蔥至軟。3. 加入雞肉，炒至變色。4. 加入麵粉，煮至呈糊狀。5. 慢慢倒入牛奶，拌勻。6. 加入蘑菇，煮至濃稠，調味後即可。'
    },
    {
        image: '紅大頭.png',
        name: '蔬菜炒飯',
        description: '清爽的蔬菜炒飯，加入多樣時令蔬菜，簡單又營養，適合素食者。',
        category: '多人料理',
        people: 3,
        difficulty: '簡單',
        vegan: '全素',
        time: '20',
        ingredients: '白飯 300g, 青椒 1 顆, 紅蘿蔔 1 根, 洋蔥 1 顆, 玉米粒 100g, 醬油 2 湯匙, 橄欖油 1 湯匙',
        steps: '1. 將青椒、紅蘿蔔、洋蔥切丁。2. 加熱橄欖油，炒洋蔥至透明。3. 加入其他蔬菜，翻炒至軟。4. 倒入白飯，拌炒均勻。5. 加入醬油調味，翻炒片刻後即可享用。'
    }
];

// 假資料，模擬不同用戶
const users = [
    {
        userId: '1',
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phoneNumber: '123-456-7890',
        address: '123 Main St',
        city: '台中市',
        postalCode: '400',
        createdAt: '2023-01-15 14:30:00',
        updatedAt: '2023-09-10 09:20:00'
    },
    {
        userId: '2',
        username: 'jane_smith',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'password456',
        phoneNumber: '987-654-3210',
        address: '456 Maple Ave',
        city: '台北市',
        postalCode: '100',
        createdAt: '2023-02-20 16:45:00',
        updatedAt: '2023-09-05 10:10:00'
    },
    {
        userId: '3',
        username: 'alice_wang',
        firstName: 'Alice',
        lastName: 'Wang',
        email: 'alice.wang@example.com',
        password: 'alice789',
        phoneNumber: '456-123-7890',
        address: '789 Oak St',
        city: '高雄市',
        postalCode: '800',
        createdAt: '2023-03-10 11:50:00',
        updatedAt: '2023-09-12 14:00:00'
    }
];

// 點擊"總覽"時生成內容的函數
function generateOverviewContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    // 動態生成總覽卡片的 section
    const overviewSection = document.createElement('section');
    overviewSection.className = 'overview';

    const cardData = [
        { type: 'revenue', title: '營業額', value: '1,268,358' },
        { type: 'orders', title: '訂單總量', value: '3,056' },
        { type: 'users', title: '總用戶數', value: '29,556' }
    ];

    // 動態生成卡片
    cardData.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-type', card.type);

        const h2 = document.createElement('h2');
        h2.textContent = card.title;

        const p = document.createElement('p');
        p.textContent = card.value;

        cardDiv.appendChild(h2);
        cardDiv.appendChild(p);

        overviewSection.appendChild(cardDiv);
    });

    // 將 overview section 插入到 main-content
    mainContent.appendChild(overviewSection);

    // 動態生成圖表區域的 section
    const chartSection = document.createElement('section');
    chartSection.className = 'chart-section';

    const chartHeader = document.createElement('div');
    chartHeader.className = 'chart-header';

    const chartTitle = document.createElement('h3');
    chartTitle.textContent = '圖表';

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'controls';

    // 生成下載按鈕
    const downloadButton = document.createElement('button');
    downloadButton.id = 'downloadButton';
    downloadButton.textContent = '下載報表';

    // 生成下拉選單
    const timeRangeSelect = document.createElement('select');
    timeRangeSelect.id = 'timeRange';

    const timeOptions = [
        { value: 'week', text: '周' },
        { value: 'month', text: '月' },
        { value: 'year', text: '年' }
    ];

    timeOptions.forEach(optionData => {
        const option = document.createElement('option');
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
    const canvas = document.createElement('canvas');
    canvas.id = 'orderChart';

    // 組合 chart section
    chartSection.appendChild(chartHeader);
    chartSection.appendChild(canvas);

    // 將 chart section 插入到 main-content
    mainContent.appendChild(chartSection);

    // 初始化圖表
    initChart();
}

// 點擊"訂單管理"時生成內容的函數
function generateOrderManagementContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    // 動態生成訂單管理的標題和控制選項
    const orderManagementSection = `
        <section class="order-management">
            <h1>訂單管理</h1>
            <div class="orderControls">
                <label>每頁顯示結果數：</label>
                <select>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <label>排序：</label>
                <select>
                    <option value="date">訂單日期(遞增)</option>
                    <option value="amount">訂單金額(遞減)</option>
                </select>

                <label>狀態：</label>
                <select>
                    <option value="all">全部</option>
                    <option value="paid">已付款</option>
                    <option value="unpaid">尚未付款</option>
                    <option value="cancelled">取消</option>
                </select>
            </div>

            <!-- 訂單表格 -->
            <table class="order-table">
                <thead>
                    <tr>
                        <th>商品名稱</th>
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
        </section>
    `;
    mainContent.innerHTML = orderManagementSection;
    const tbody = document.querySelector('.order-table tbody');

    // 動態生成每筆訂單
    orders.forEach((order, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
                    <td>
                        <p>${order.name}</p>
                    </td>
                    <td>
                        訂單編號: ${order.orderNumber}<br>
                        配送方式: ${order.deliveryMethod}<br>
                        訂單金額: ${order.orderAmount}
                    </td>
                    <td class="${order.statusClass}">${order.status}</td>
                    <td>${order.date}</td>
                    <td><a href="#" class="details-link" data-index="${index}" style="color: white;">詳細</a></td>
                `;

        tbody.appendChild(tr);
    });

    // 綁定「詳細」按鈕的點擊事件
    document.querySelectorAll('.details-link').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // 防止預設行為
            const orderIndex = this.getAttribute('data-index');
            console.log("選擇的訂單索引:", orderIndex);  // 檢查是否獲取到正確的索引
            console.log("選擇的訂單資料:", orders[orderIndex]);  // 檢查對應的訂單資料是否存在
            generateOrderDetailsContent(orders[orderIndex]);  // 顯示該訂單的詳細頁面
        });
    });
}

// 點擊訂單的"詳細"連結後生成訂單詳情頁面的函數
function generateOrderDetailsContent(order) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    // 假設根據 order.userId 查找對應的用戶
    const user = users.find(u => u.userId === order.userId);

    // 如果未找到用戶，則用戶資訊顯示為 "未知"
    const userInfo = user ? `
        <p><strong>用戶名稱:</strong> ${user.username}</p>
        <p><strong>姓名:</strong> ${user.firstName} ${user.lastName}</p>
        <p><strong>電子郵件:</strong> ${user.email}</p>
        <p><strong>電話號碼:</strong> ${user.phoneNumber}</p>
    ` : `<p>無法找到該用戶資訊</p>`;

    // 生成訂單詳情的 HTML，並在右邊顯示用戶資訊
    const orderDetailsSection = `
        <section class="order-details">
            <h1>訂單詳情 - 訂單編號: ${order.orderNumber}</h1>

            <div class="order-and-user-info">
                <div class="order-info">
                    <h2>訂單資訊</h2>
                    <div class="order-summary">
                        <p><strong>訂單日期:</strong> ${order.orderDate}</p>
                        <p><strong>配送地址:</strong> ${order.address}</p>
                        <p><strong>訂單總金額:</strong> $${order.totalAmount}</p>
                        <p><strong>優惠券 ID:</strong> ${order.couponId || 'N/A'}</p>
                        <p><strong>百分比折扣:</strong> ${order.percentageDiscount}%</p>
                        <p><strong>折扣金額:</strong> $${order.amountDiscount}</p>
                        <p><strong>最終金額:</strong> $${order.finalAmount}</p>
                        <p><strong>訂單狀態:</strong> ${order.status}</p>
                        <p><strong>修改者:</strong> ${order.changedBy}</p>
                        <p><strong>修改時間:</strong> ${order.changedAt}</p>
                        <p><strong>備註:</strong> ${order.comment || '無'}</p>
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
                        <th>商品圖片</th>
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
    const tbody = document.querySelector('.order-items-table tbody');

    // 確認 items 存在且是陣列
    if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
                <td>${item.name}</td>
                <td>${item.sku}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
            `;
            tbody.appendChild(tr);  // 將每個商品插入到表格中
        });
    } else {
        console.warn("沒有購買商品");
    }
}


// 點擊"商品上傳"時生成內容的函數
function generateProductUploadForm() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    const productUploadForm = `
        <section class="product-upload">
            <h1>商品上傳</h1>
            <div class="image-upload">
                <div class="image-preview">
                <img src="橘大頭.png" alt="商品圖片" style="width: 100%; height: auto;">
                <img src="紅大頭.png" alt="商品圖片" style="width: 100%; height: auto;">
                <img src="深綠大頭.png" alt="商品圖片" style="width: 100%; height: auto;">
                <img src="黃大頭.png" alt="商品圖片" style="width: 100%; height: auto;">
                <button id="uploadImageButton">圖片上傳</button>
                </div>
            </div>

            <form>
                <div class="form-group">
                    <label for="sku" id="skulabel">SKU</label>
                    <textarea id="sku" rows="1"></textarea>
                </div>
                <div class="form-group">
                    <label for="description">商品名稱</label>
                    <textarea id="description" rows="1" placeholder="商品名稱"></textarea>
                </div>
            
                <!-- 類別選擇 -->
                <div class="form-group">
                    <label for="category">菜品分類</label>
                    <select id="category">
                        <option value="category1">家常料理</option>
                        <option value="category2">兒童友善</option>
                        <option value="category3">銀髮友善</option>
                        <option value="category4">異國料理</option>
                        <option value="category5">多人料理</option>
                    </select>
                </div>

                <!-- 人數、難度等選項 -->
                <div class="form-group row-group">
                    <div class="field">
                        <label for="people">人數</label>
                        <select id="people">
                            <option value="1">1人</option>
                            <option value="2">2人</option>
                            <option value="3">3人</option>
                            <option value="4">4人</option>
                            <option value="5">5人</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="difficulty">難度</label>
                        <select id="difficulty">
                            <option value="easy">簡單</option>
                            <option value="medium">中等</option>
                            <option value="hard">困難</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="vagan">素食</label>
                        <select id="vagan">
                            <option value="no">否</option>
                            <option value="vagen">全素</option>
                            <option value="halfvagen">奶蛋素</option>
                        </select>
                    </div>

                    <div class="field time">
                        <label for="time">製作時間</label>
                        <textarea id="time" rows="1" class="time"></textarea>
                    </div>
                </div>

                <!-- 食譜描述 -->
                <div class="form-group">
                    <label for="description">食譜描述</label>
                    <textarea id="description" rows="8"></textarea>
                </div>

                <!-- 食材與步驟 -->
                <div class="form-group">
                    <label for="ingredients">食材成分</label>
                    <textarea id="ingredients" rows="8"></textarea>
                </div>

                <div class="form-group">
                    <label for="steps">作法步驟</label>
                    <textarea id="steps" rows="8"></textarea>
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
}

// 點擊"商品管理"時生成內容的函數
function generateProductManagementWithActionsContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容    

    // 動態生成商品管理的標題和表格
    const productManagementSection = `
        <section class="product-management">
            <h1>商品管理</h1>
            <div class="orderControls">
                <label>搜尋商品：</label>
                <input type="text" id="productSearchInput" placeholder="輸入名稱或SKU" class="SearchInput">
                
                <label>每頁顯示結果數：</label>
                <select>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <label>排序：</label>
                <select>
                    <option value="skuASC">SKU (A-Z)</option>
                    <option value="skuDESC">SKU (Z-A)</option>
                    <option value="stockValuesASC">庫存量(遞增)</option>
                    <option value="stockValuesDESC">庫存量(遞減)</option>
                    <option value="priceASC">價格(遞增)</option>
                    <option value="priceDESC">價格(遞減)</option>
                </select>

                <label>狀態：</label>
                <select>
                    <option value="all">全部</option>
                    <option value="stockNull">零庫存</option>
                </select>
            </div>
            <table class="product-table">
                <thead>
                    <tr>
                        <th>商品圖片</th>
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
        </section>
    `;
    mainContent.innerHTML = productManagementSection;

    const tbody = document.querySelector('.product-table tbody');

    // 動態生成每個商品的表格行
    products.forEach((product, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.sku}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td class="actions">
                <button class="edit-button" data-index="${index}">修改</button>
                <button class="delete-button" data-index="${index}">刪除</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    // 重新為動態生成的「修改」按鈕綁定事件
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const productIndex = this.getAttribute('data-index');
            generateProductManagementEdit(products[productIndex]); // 調用商品修改頁面並傳入對應商品數據
        });
    });

    // 重新為動態生成的「刪除」按鈕綁定事件
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            const productIndex = this.getAttribute('data-index');
            if (confirm('確定要刪除這個商品嗎？')) {
                products.splice(productIndex, 1); // 刪除商品
                generateProductManagementWithActionsContent(); // 刷新商品管理頁面
            }
        });
    });
}

// 點擊"商品管理-修改"時生成內容的函數
function generateProductManagementEdit(product) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    // 動態生成商品修改的表單
    const productEditForm = `
        <section class="product-edit">
            <h1>修改商品 - ${product.name}</h1>
            <div class="image-upload">
                <div class="image-preview">
                    <img src="${product.image}" alt="商品圖片" style="width: 100%; height: auto;">
                    <button id="uploadImageButton">上傳新圖片</button>
                </div>
            </div>

            <form>
                <div class="form-group">
                     <label for="sku">SKU</label>
                     <textarea id="sku" rows="1" readonly>${product.sku}</textarea>
                </div>

                <div class="form-group">
                     <label for="name">商品名稱</label>
                     <textarea id="name" rows="1">${product.name}</textarea>
                </div>

                <div class="form-group">
                    <label for="category">類別</label>
                    <select id="category">
                        <option value="家常料理" ${product.category === '家常料理' ? 'selected' : ''}>家常料理</option>
                        <option value="兒童友善" ${product.category === '兒童友善' ? 'selected' : ''}>兒童友善</option>
                        <option value="銀髮友善" ${product.category === '銀髮友善' ? 'selected' : ''}>銀髮友善</option>
                        <option value="異國料理" ${product.category === '異國料理' ? 'selected' : ''}>異國料理</option>
                        <option value="多人料理" ${product.category === '多人料理' ? 'selected' : ''}>多人料理</option>
                    </select>
                </div>
                <div class="form-group row-group">
                    <div class="field">
                        <label for="servings">人數份量</label>
                        <select id="servings">
                            <option value="1" ${product.servings === 1 ? 'selected' : ''}>1人</option>
                            <option value="2" ${product.servings === 2 ? 'selected' : ''}>2人</option>
                            <option value="3" ${product.servings === 3 ? 'selected' : ''}>3人</option>
                            <option value="4" ${product.servings === 4 ? 'selected' : ''}>4人</option>
                            <option value="5" ${product.servings === 5 ? 'selected' : ''}>5人</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="difficulty">難度</label>
                        <select id="difficulty">
                            <option value="簡單" ${product.difficulty === '簡單' ? 'selected' : ''}>簡單</option>
                            <option value="中等" ${product.difficulty === '中等' ? 'selected' : ''}>中等</option>
                            <option value="困難" ${product.difficulty === '困難' ? 'selected' : ''}>困難</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="vegan">素食</label>
                        <select id="vegan">
                            <option value="否" ${product.vegan === '否' ? 'selected' : ''}>否</option>
                            <option value="全素" ${product.vegan === '全素' ? 'selected' : ''}>全素</option>
                            <option value="奶蛋素" ${product.vegan === '奶蛋素' ? 'selected' : ''}>奶蛋素</option>
                        </select>
                    </div>

                    <div class="field time">
                        <label for="time">製作時間 (分鐘)</label>
                        <textarea id="time" rows="1">${product.time}</textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label for="price">價格</label>
                    <textarea id="price" rows="1">${product.price}</textarea>
                </div>

                <div class="form-group">
                    <label for="description">食譜描述</label>
                    <textarea id="description" rows="4">${product.description}</textarea>
                </div>

                <div class="form-group">
                    <label for="ingredients">食材成分</label>
                    <textarea id="ingredients" rows="4">${product.Ingredients}</textarea>
                </div>

                <div class="form-group">
                    <label for="steps">作法步驟</label>
                    <textarea id="steps" rows="4">${product.steps}</textarea>
                </div>

                <div class="form-group">
                    <button type="submit" id="submitButton">保存修改</button>
                    <button type="button" id="cancelButton">取消</button>
                </div>
            </form>
        </section>
    `;
    mainContent.innerHTML = productEditForm;

    // **在生成表單後立即綁定事件**
    document.getElementById('submitButton').addEventListener('click', function (event) {
        event.preventDefault();

        // 更新商品屬性
        product.sku = document.getElementById('sku').value;
        product.name = document.getElementById('name').value;
        product.category = document.getElementById('category').value;
        product.servings = parseInt(document.getElementById('servings').value, 10);
        product.difficulty = document.getElementById('difficulty').value;
        product.vegan = document.getElementById('vegan').value;
        product.time = parseInt(document.getElementById('time').value, 10);
        product.price = parseFloat(document.getElementById('price').value);
        product.description = document.getElementById('description').value;
        product.Ingredients = document.getElementById('ingredients').value;
        product.steps = document.getElementById('steps').value;

        alert('商品已修改！');
        generateProductManagementWithActionsContent();  // 返回商品管理頁面
    });

    // 添加取消按鈕的功能
    document.getElementById('cancelButton').addEventListener('click', function () {
        generateProductManagementWithActionsContent();  // 返回商品管理頁面
    });

    // 如果需要處理圖片上傳，可以在這裡添加事件監聽器
    document.getElementById('uploadImageButton').addEventListener('click', function () {
        // 這裡可以添加圖片上傳的功能
        alert('上傳新圖片的功能尚未實現。');
    });
}

// 點擊"食譜上傳"時生成內容的函數
function generateRecipeUploadForm() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    const productUploadForm = `
        <section class="product-upload">
            <h1>食譜上傳</h1>
            <div class="image-upload">
                <div class="image-preview">
                <img src="橘大頭.png" alt="商品圖片" style="width: 100%; height: auto;">
                <img src="紅大頭.png" alt="商品圖片" style="width: 100%; height: auto;">
                <img src="深綠大頭.png" alt="商品圖片" style="width: 100%; height: auto;">
                <img src="黃大頭.png" alt="商品圖片" style="width: 100%; height: auto;">
                <button id="uploadImageButton">圖片上傳</button>
                </div>
            </div>

            <form>
                <div class="form-group">
                    <label for="description">食譜名稱</label>
                    <textarea id="description" rows="1" placeholder="食譜名稱"></textarea>
                </div>
            
                <!-- 類別選擇 -->
                <div class="form-group">
                    <label for="category">菜品分類</label>
                    <select id="category">
                        <option value="category1">家常料理</option>
                        <option value="category2">兒童友善</option>
                        <option value="category3">銀髮友善</option>
                        <option value="category4">異國料理</option>
                        <option value="category5">多人料理</option>
                    </select>
                </div>

                <!-- 人數、難度等選項 -->
                <div class="form-group row-group">
                    <div class="field">
                        <label for="people">人數</label>
                        <select id="people">
                            <option value="1">1人</option>
                            <option value="2">2人</option>
                            <option value="3">3人</option>
                            <option value="4">4人</option>
                            <option value="5">5人</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="difficulty">難度</label>
                        <select id="difficulty">
                            <option value="easy">簡單</option>
                            <option value="medium">中等</option>
                            <option value="hard">困難</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="vagan">素食</label>
                        <select id="vagan">
                            <option value="no">否</option>
                            <option value="vagen">全素</option>
                            <option value="halfvagen">奶蛋素</option>
                        </select>
                    </div>

                    <div class="field time">
                        <label for="time">製作時間</label>
                        <textarea id="time" rows="1" class="time"></textarea>
                    </div>
                </div>

                <!-- 食譜描述 -->
                <div class="form-group">
                    <label for="description">食材</label>
                    <textarea id="description" rows="8"></textarea>
                </div>

                <!-- 食材與步驟 -->
                <div class="form-group">
                    <label for="ingredients">食譜步驟</label>
                    <textarea id="ingredients" rows="8"></textarea>
                </div>

                <div class="form-group">
                    <label for="steps">貼心小提醒</label>
                    <textarea id="steps" rows="8"></textarea>
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
}

// 點擊"食譜管理"時生成內容的函數
function generateRecipeManagementContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容    

    // 動態生成食譜管理的標題和表格
    const recipeManagementSection = `
        <section class="recipe-management">
            <h1>食譜管理</h1>
            <div class="recipeControls">
                <label>搜尋商品：</label>
                <input type="text" id="productSearchInput" placeholder="輸入名稱" class="SearchInput">
                
                <label>每頁顯示結果數：</label>
                <select>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <label>分類：</label>
                <select id="category">
                     <option value="category1">家常料理</option>
                     <option value="category2">兒童友善</option>
                     <option value="category3">銀髮友善</option>
                      <option value="category4">異國料理</option>
                      <option value="category5">多人料理</option>
                </select>
            </div>
            <table class="recipe-table">
                <thead>
                    <tr>
                        <th>圖片</th>
                        <th>名稱</th>
                        <th>描述</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 這裡插入動態生成的食譜 -->
                </tbody>
            </table>
        </section>
    `;
    mainContent.innerHTML = recipeManagementSection;

    const tbody = document.querySelector('.recipe-table tbody');

    // 動態生成每個食譜的表格行
    recipes.forEach((recipe, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><img src="${recipe.image}" alt="${recipe.name}" class="recipe-image"></td>
            <td>${recipe.name}</td>
            <td style="max-width: 40vw;">${recipe.description}</td>
            <td class="actions">
                <button class="edit-button" data-index="${index}">修改</button>
                <button class="delete-button" data-index="${index}">刪除</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    // 重新為動態生成的「修改」按鈕綁定事件
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const recipeIndex = this.getAttribute('data-index');
            generateRecipeEditForm(recipes[recipeIndex]); // 調用食譜修改頁面並傳入對應食譜數據
        });
    });

    // 重新為動態生成的「刪除」按鈕綁定事件
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            const recipeIndex = this.getAttribute('data-index');
            if (confirm('確定要刪除這個食譜嗎？')) {
                recipes.splice(recipeIndex, 1); // 刪除食譜
                generateRecipeManagementContent(); // 刷新食譜管理頁面
            }
        });
    });
}

// 點擊"食譜管理-修改"時生成內容的函數
function generateRecipeEditForm(recipe) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    // 動態生成食譜修改的表單
    const recipeEditForm = `
        <section class="recipe-edit">
            <h1>修改食譜 - ${recipe.name}</h1>
            <div class="image-upload">
                <div class="image-preview">
                    <img src="${recipe.image}" alt="食譜圖片" style="width: 100%; height: auto;">
                    <button id="uploadImageButton">上傳新圖片</button>
                </div>
            </div>

            <form>
                <div class="form-group">
                     <label for="name">食譜名稱</label>
                     <textarea id="name" rows="1">${recipe.name}</textarea>
                </div>

                <div class="form-group">
                    <label for="category">類別</label>
                    <select id="category">
                        <option value="多人料理" ${recipe.category === '多人料理' ? 'selected' : ''}>多人料理</option>
                        <option value="兒童友善" ${recipe.category === '兒童友善' ? 'selected' : ''}>兒童友善</option>
                        <option value="異國料理" ${recipe.category === '異國料理' ? 'selected' : ''}>異國料理</option>
                    </select>
                </div>

                <div class="form-group row-group">
                    <div class="field">
                        <label for="people">人數</label>
                        <select id="people">
                            <option value="1" ${recipe.people === 1 ? 'selected' : ''}>1人</option>
                            <option value="2" ${recipe.people === 2 ? 'selected' : ''}>2人</option>
                            <option value="3" ${recipe.people === 3 ? 'selected' : ''}>3人</option>
                            <option value="4" ${recipe.people === 4 ? 'selected' : ''}>4人</option>
                            <option value="5" ${recipe.people === 5 ? 'selected' : ''}>5人</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="difficulty">難度</label>
                        <select id="difficulty">
                            <option value="簡單" ${recipe.difficulty === '簡單' ? 'selected' : ''}>簡單</option>
                            <option value="中等" ${recipe.difficulty === '中等' ? 'selected' : ''}>中等</option>
                            <option value="困難" ${recipe.difficulty === '困難' ? 'selected' : ''}>困難</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="vegan">素食</label>
                        <select id="vegan">
                            <option value="否" ${recipe.vegan === '否' ? 'selected' : ''}>否</option>
                            <option value="全素" ${recipe.vegan === '全素' ? 'selected' : ''}>全素</option>
                        </select>
                    </div>

                    <div class="field time">
                        <label for="time">製作時間 (分鐘)</label>
                        <textarea id="time" rows="1">${recipe.time}</textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label for="description">食譜描述</label>
                    <textarea id="description" rows="4">${recipe.description}</textarea>
                </div>

                <div class="form-group">
                    <label for="ingredients">食材成分</label>
                    <textarea id="ingredients" rows="4">${recipe.ingredients}</textarea>
                </div>

                <div class="form-group">
                    <label for="steps">作法步驟</label>
                    <textarea id="steps" rows="4">${recipe.steps}</textarea>
                </div>

                <div class="form-group">
                    <button type="submit" id="submitButton">保存修改</button>
                    <button type="button" id="cancelButton">取消</button>
                </div>
            </form>
        </section>
    `;
    mainContent.innerHTML = recipeEditForm;

    // 綁定保存按鈕事件
    document.getElementById('submitButton').addEventListener('click', function (event) {
        event.preventDefault();

        // 更新食譜屬性
        recipe.name = document.getElementById('name').value;
        recipe.category = document.getElementById('category').value;
        recipe.people = parseInt(document.getElementById('people').value, 10);
        recipe.difficulty = document.getElementById('difficulty').value;
        recipe.vegan = document.getElementById('vegan').value;
        recipe.time = parseInt(document.getElementById('time').value, 10);
        recipe.description = document.getElementById('description').value;
        recipe.ingredients = document.getElementById('ingredients').value;
        recipe.steps = document.getElementById('steps').value;

        alert('食譜已修改！');
        generateRecipeManagementContent();  // 返回食譜管理頁面
    });

    // 添加取消按鈕的功能
    document.getElementById('cancelButton').addEventListener('click', function () {
        generateRecipeManagementContent();  // 返回食譜管理頁面
    });
}

// 點擊"庫存管理"時生成內容的函數
function generateStockManagementContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    // 動態生成庫存管理的標題和表格
    const stockManagementSection = `
        <section class="stock-management">
            <h1>庫存管理</h1>
            <div class="stockControls">
                <label>搜尋商品：</label>
                <input type="text" id="productSearchInput" placeholder="輸入名稱或SKU" class="SearchInput">
                
                <label>每頁顯示結果數：</label>
                <select>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <label>排序：</label>
                <select>
                    <option value="dateASC">價格(遞增)</option>
                    <option value="dateDESC">價格(遞減)</option>
                    <option value="amountASC">庫存(遞增)</option>
                    <option value="amountDESC">庫存(遞減)</option>
                </select>

                <label>狀態：</label>
                <select>
                    <option value="all">全部</option>
                    <option value="nomore">無庫存</option>
                </select>
            </div>
            <!-- 庫存表格 -->
            <table class="stock-table">
                <thead>
                    <tr>
                        <th>商品圖片</th>
                        <th>SKU</th>
                        <th>商品名稱</th>
                        <th>價格</th>
                        <th>庫存數量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 這裡插入動態生成的商品庫存 -->
                </tbody>
            </table>
        </section>
    `;
    mainContent.innerHTML = stockManagementSection;
    const tbody = document.querySelector('.stock-table tbody');

    // 動態生成每個商品的庫存數量和操作按鈕
    products.forEach((product, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>
                <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">
            </td>
            <td>${product.sku}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td class="stock-quantity">${product.stock}</td>
            <td>
                <button class="details-link" data-index="${index}">詳情</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// 點擊"用戶管理"時生成內容的函數
function generateUserManagementContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容    

    // 動態生成用戶管理的標題和表格
    const userManagementSection = `
        <section class="user-management">
            <h1>用戶管理</h1>
            <div class="userControls">
                <label>搜尋：</label>
                <input type="text" id="productSearchInput" class="SearchInput">
                
                <label>每頁顯示結果數：</label>
                <select>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <label>排序：</label>
                <select>
                    <option value="dateASC">用戶名(遞增)</option>
                    <option value="dateDESC">價格(遞減)</option>
                    <option value="amountASC">庫存(遞增)</option>
                    <option value="amountDESC">庫存(遞減)</option>
                </select>
            </div>
            <table class="user-table">
                <thead>
                    <tr>
                        <th>用戶ID</th>
                        <th>用戶名</th>
                        <th>電子郵件</th>
                        <th>電話號碼</th>
                        <th>創建時間</th>
                        <th>更新時間</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 這裡插入動態生成的用戶 -->
                </tbody>
            </table>
        </section>
    `;
    mainContent.innerHTML = userManagementSection;

    const tbody = document.querySelector('.user-table tbody');

    // 動態生成每個用戶的表格行
    users.forEach((user, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${user.userId}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.createdAt}</td>
            <td>${user.updatedAt}</td>
            <td class="actions">
                <button class="edit-button" data-index="${index}">詳情</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    // 綁定詳情按鈕的事件
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const userIndex = this.getAttribute('data-index');
            generateUserEditForm(users[userIndex]);  // 調用用戶修改表單
        });
    });
}

// 點擊"用戶管理-詳情"時生成內容的函數
function generateUserEditForm(user) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    // 動態生成用戶修改的表單
    const userEditForm = `
        <section class="user-edit">
            <h1>修改用戶 - ${user.username}</h1>

            <form>
                <div class="form-group">
                    <label for="userId">用戶ID</label>
                    <textarea id="userId" rows="1" readonly>${user.userId}</textarea>
                </div>

                <div class="form-group">
                    <label for="username">用戶名</label>
                    <textarea id="username" rows="1">${user.username}</textarea>
                </div>
                <div class="form-group row-group">
                    <div class="field name">
                        <label for="firstName">姓氏</label>
                        <textarea id="firstName" rows="1">${user.lastName}</textarea>
                    </div>

                    <div class="field name">
                        <label for="lastName">名字</label>
                        <textarea id="lastName" rows="1">${user.firstName}</textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">電子郵件</label>
                    <textarea id="email" rows="1">${user.email}</textarea>
                </div>

                <div class="form-group">
                    <label for="password">密碼</label>
                    <textarea id="password" rows="1">${user.password}</textarea>
                </div>

                <div class="form-group">
                    <label for="phoneNumber">電話號碼</label>
                    <textarea id="phoneNumber" rows="1">${user.phoneNumber}</textarea>
                </div>
                
                <div class="form-group row-group">
                    <div class="field post">
                        <label for="city">城市</label>
                        <textarea id="city" rows="1">${user.city}</textarea>
                    </div>
                    
                    <div class="field post">
                        <label for="postalCode">郵遞區號</label>
                        <textarea id="postalCode" rows="1">${user.postalCode}</textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label for="address">地址</label>
                    <textarea id="address" rows="1">${user.address}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="createdAt">創建時間</label>
                    <textarea id="createdAt" rows="1" readonly>${user.createdAt}</textarea>
                </div>

                <div class="form-group">
                    <label for="updatedAt">更新時間</label>
                    <textarea id="updatedAt" rows="1" readonly>${user.updatedAt}</textarea>
                </div>

                <div class="form-group action-buttons">
                    <div>
                        <button id="saveButton">確認修改</button>
                        <button id="cancelButton">取消</button>
                    </div>
                    <div>
                        <button id="deleteButton">刪除用戶</button>
                    </div>
                </div>
            </form>
        </section>
    `;
    mainContent.innerHTML = userEditForm;

    // 綁定按鈕事件
    document.getElementById('saveButton').addEventListener('click', function (event) {
        event.preventDefault();

        // 更新用戶屬性
        user.username = document.getElementById('username').value;
        user.firstName = document.getElementById('firstName').value;
        user.lastName = document.getElementById('lastName').value;
        user.email = document.getElementById('email').value;
        user.password = document.getElementById('password').value;
        user.phoneNumber = document.getElementById('phoneNumber').value;
        user.address = document.getElementById('address').value;
        user.city = document.getElementById('city').value;
        user.postalCode = document.getElementById('postalCode').value;

        alert('用戶已修改！');
        generateUserManagementContent();  // 返回用戶管理頁面
    });

    document.getElementById('cancelButton').addEventListener('click', function () {
        generateUserManagementContent();  // 返回用戶管理頁面
    });

    document.getElementById('deleteButton').addEventListener('click', function () {
        if (confirm('確定要刪除這個用戶嗎？')) {
            const userIndex = users.indexOf(user);
            if (userIndex !== -1) {
                users.splice(userIndex, 1);  // 刪除用戶
                generateUserManagementContent();  // 返回用戶管理頁面
            }
        }
    });
}

// 點擊"優惠券管理"時生成內容的函數
function generateCouponManagementForm() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

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
                        <option value="fixed">固定金額折扣</option>
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
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody id="couponTableBody">
                        <!-- 這裡插入動態生成的優惠券 -->
                    </tbody>
                </table>
            </section>
        </section>
    `;
    mainContent.innerHTML = couponManagementForm;

    // 儲存優惠券的陣列
    let coupons = [];

    // 優惠券表單提交處理
    const couponForm = document.getElementById('couponForm');
    couponForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 阻止表單提交刷新

        // 獲取輸入的優惠券信息
        const code = document.getElementById('code').value;
        const name = document.getElementById('name').value;
        const discountType = document.getElementById('discountType').value;
        const discountValue = document.getElementById('discountValue').value;
        const expiryDate = document.getElementById('expiryDate').value;

        // 構造優惠券對象
        const coupon = {
            code,
            name,
            discountType,
            discountValue,
            expiryDate
        };

        // 儲存到陣列中
        coupons.push(coupon);

        // 重置表單
        couponForm.reset();

        // 更新優惠券表格
        displayCoupons();
    });

    // 顯示已新增的優惠券
    function displayCoupons() {
        const couponTableBody = document.getElementById('couponTableBody');
        couponTableBody.innerHTML = ''; // 清空之前的內容

        coupons.forEach((coupon, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${coupon.code}</td>
                <td>${coupon.name}</td>
                <td>${coupon.discountType === 'percentage' ? '百分比' : '固定金額'}</td>
                <td>${coupon.discountValue}</td>
                <td>${coupon.expiryDate}</td>
                <td>
                    <button id="delete-button" data-index="${index}">刪除</button>
                </td>
            `;
            couponTableBody.appendChild(tr);
        });

        // 綁定刪除按鈕的事件
        document.querySelectorAll('.delete-coupon-button').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                coupons.splice(index, 1); // 刪除該優惠券
                displayCoupons(); // 刷新優惠券表格
            });
        });
    }
}

// 初始化圖表的函數
function initChart() {
    const ctx = document.getElementById('orderChart').getContext('2d');

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
                label: '每周營業額',
                data: [3000, 4000, 3500, 5000, 4500, 6000, 5500], // 初始數據
                backgroundColor: 'rgba(136, 191, 75, 0.2)', // 綠色背景
                borderColor: 'rgba(136, 191, 75, 1)', // 綠色邊框
                borderWidth: 2,
                pointBackgroundColor: 'white',
                pointBorderColor: 'rgba(136, 191, 75, 1)',
                pointBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let currentCard = 'revenue'; // 初始化當前顯示的卡片類型

    // 為卡片添加點擊事件
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function () {
            currentCard = this.getAttribute('data-type'); // 更新當前卡片類型
            const timeRange = document.getElementById('timeRange').value; // 獲取當前選擇的時間範圍
            const selectedData = chartData[currentCard][timeRange];

            // 更新圖表數據
            chart.data.labels = selectedData.labels;
            chart.data.datasets[0].data = selectedData.data;
            chart.data.datasets[0].label = selectedData.label;
            chart.update(); // 更新圖表
        });
    });

    // 為下拉選單添加事件監聽器
    const timeRangeSelect = document.getElementById('timeRange');
    timeRangeSelect.addEventListener('change', function () {
        const timeRange = this.value;
        const selectedData = chartData[currentCard][timeRange]; // 根據當前卡片和時間範圍獲取數據

        // 更新圖表數據和標籤
        chart.data.labels = selectedData.labels;
        chart.data.datasets[0].data = selectedData.data;
        chart.data.datasets[0].label = selectedData.label;
        chart.update(); // 更新圖表
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initChart();
});

document.addEventListener('DOMContentLoaded', function () {
    // 點擊logo時生成內容
    const logo = document.getElementById('logo');
    logo.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateOverviewContent();   // 調用生成函數
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 點擊"總覽"按鈕時生成內容
    const overviewButton = document.getElementById('overviewButton');
    overviewButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateOverviewContent();   // 調用生成函數
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // 點擊"訂單管理"按鈕時生成內容
    const orderManagementButton = document.getElementById('orderManagementButton');
    orderManagementButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateOrderManagementContent();  // 調用生成訂單管理內容的函數
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 點擊"商品上傳"按鈕時生成內容
    const uploadProductButton = document.getElementById('uploadProductButton');
    uploadProductButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateProductUploadForm();  // 調用生成商品上傳表單的函數
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 點擊"食譜上傳"按鈕時生成內容
    const uploadRecipeButton = document.getElementById('uploadRecipeButton');
    uploadRecipeButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateRecipeUploadForm();  // 調用生成商品上傳表單的函數
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const editProductButton = document.getElementById('editProductButton');
    editProductButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateProductManagementWithActionsContent();  // 調用生成商品管理頁面的函數
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const editProductButton = document.getElementById('recipeEditButton');
    editProductButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateRecipeManagementContent();  // 調用生成食譜管理頁面的函數
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const manageStockButton = document.getElementById('manageStockButton');
    manageStockButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateStockManagementContent();  // 調用生成庫存管理頁面的函數
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const manageStockButton = document.getElementById('userManagementButton');
    manageStockButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateUserManagementContent();  // 調用生成用戶管理頁面的函數
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const manageStockButton = document.getElementById('couponManagementButton');
    manageStockButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateCouponManagementForm();  // 調用生成優惠券管理頁面的函數
    });
});

// 為 "詳情" 按鈕添加點擊事件
document.querySelectorAll('.details-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const productIndex = this.getAttribute('data-index');
        generateProductEditForm(products[productIndex]); // 調用商品修改頁面並傳入對應商品數據
    });
});

// 保存按鈕事件
document.getElementById('saveButton').addEventListener('click', function () {
    products.name = document.getElementById('productName').value;
    products.price = document.getElementById('productPrice').value;
    products.stock = document.getElementById('productStock').value;
    generateProductManagementContent();  // 返回商品管理頁面
});

// 取消按鈕事件
document.getElementById('cancelButton').addEventListener('click', function () {
    generateProductManagementContent();  // 返回商品管理頁面
});

// 綁定"商品修改"按鈕的點擊事件
document.getElementById('editProductButton').addEventListener('click', function (event) {
    event.preventDefault();
    generateProductManagementWithActionsContent();  // 生成商品管理頁面
});

