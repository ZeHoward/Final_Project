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
        image: '紅大頭.png',
        name: '產品名稱1',
        orderNumber: 'XXXX1',
        deliveryMethod: '快遞',
        orderAmount: '1000',
        status: '已付款',
        statusClass: 'paid',
        date: '01/01/20',
        details: '詳細'
    },
    {
        image: '黃大頭.png',
        name: '產品名稱2',
        orderNumber: 'XXXX2',
        deliveryMethod: '快遞',
        orderAmount: '2000',
        status: '尚未付款',
        statusClass: 'unpaid',
        date: '01/01/20',
        details: '詳細'
    },
    {
        image: '橘大頭.png',
        name: '產品名稱3',
        orderNumber: 'XXXX3',
        deliveryMethod: '快遞',
        orderAmount: '1500',
        status: '取消',
        statusClass: 'cancelled',
        date: '01/01/20',
        details: '詳細'
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
    downloadButton.textContent = '下載圖表';

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
                        <th>訂單日期</th>
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
    orders.forEach(order => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
                    <td>
                        <img src="${order.image}" alt="${order.name}" style="width: 50px; height: 50px;">
                        <p>${order.name}</p>
                    </td>
                    <td>
                        訂單編號: ${order.orderNumber}<br>
                        配送方式: ${order.deliveryMethod}<br>
                        訂單金額: ${order.orderAmount}
                    </td>
                    <td class="${order.statusClass}">${order.status}</td>
                    <td>${order.date}</td>
                    <td><a href="#">${order.details}</a></td>
                `;

        tbody.appendChild(tr);
    });
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
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
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

// 生成商品管理頁面後，為「修改」按鈕重新綁定事件
// function generateProductManagementContent() {
//     const mainContent = document.querySelector('.main-content');
//     mainContent.innerHTML = '';  // 清空之前的內容

//     // 動態生成商品管理的標題和表格
//     const productManagementSection = `
//         <section class="product-management">
//             <h1>商品管理</h1>
//             <table class="product-table">
//                 <thead>
//                     <tr>
//                         <th>商品圖片</th>
//                         <th>商品名稱</th>
//                         <th>價格</th>
//                         <th>庫存</th>
//                         <th>操作</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <!-- 這裡插入動態生成的商品 -->
//                 </tbody>
//             </table>
//         </section>
//     `;
//     mainContent.innerHTML = productManagementSection;

//     const tbody = document.querySelector('.product-table tbody');

//     // 動態生成每個商品的表格行
//     products.forEach((product, index) => {
//         const tr = document.createElement('tr');

//         tr.innerHTML = `
//             <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
//             <td>${product.name}</td>
//             <td>${product.price}</td>
//             <td>${product.stock}</td>
//             <td class="actions">
//                 <button class="edit-button" data-index="${index}">修改</button>
//                 <button class="delete-button" data-index="${index}">刪除</button>
//             </td>
//         `;

//         tbody.appendChild(tr);
//     });

//     // 重新為動態生成的按鈕綁定事件
//     document.querySelectorAll('.edit-button').forEach(button => {
//         button.addEventListener('click', function () {
//             const productIndex = this.getAttribute('data-index');
//             generateProductManagementEdit(products[productIndex]); // 調用商品修改頁面並傳入對應商品數據
//         });
//     });
// }

// 刪除商品的函數
// function deleteProduct(index) {
//     products.splice(index, 1);  // 從數組中移除商品
//     generateProductManagementContent();  // 更新商品管理頁面
// }

// 點擊"庫存管理"時生成內容的函數
function generateStockManagementContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';  // 清空之前的內容

    // 動態生成庫存管理的標題和表格
    const stockManagementSection = `
        <section class="stock-management">
            <h1>庫存管理</h1>
            <div class="stockControls">
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
    const manageStockButton = document.getElementById('manageStockButton');
    manageStockButton.addEventListener('click', function (event) {
        event.preventDefault();  // 防止跳轉
        generateStockManagementContent();  // 調用生成庫存管理頁面的函數
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

document.addEventListener('keydown', function (event) {
    if (event.key === 'F12') {
        event.preventDefault();
    }
});
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});