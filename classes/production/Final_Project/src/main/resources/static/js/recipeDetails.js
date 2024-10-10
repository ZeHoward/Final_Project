document.addEventListener('DOMContentLoaded', async () => {
    console.log("HI~");
    
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get('id');

        if (!recipeId) {
            throw new Error('未提供食譜 ID');
        }

        const response = await fetch(`/api/recipes/view?id=${recipeId}`);

        if (!response.ok) {
            throw new Error(`HTTP 錯誤！狀態：${response.status}`);
        }

        const data = await response.json();
        
        if (!data.recipe) {
            throw new Error('食譜數據未定義');
        }

        const recipe = data.recipe;

        // 使用輔助函數安全地更新 DOM
        updateElement('recipeName', recipe.title);
        updateElement('foodName', recipe.title);
        updateElement('cookingTime', `烹飪時間：${recipe.cookTime} 分鐘`);
        updateElement('level', `難度：${recipe.level}`);
        updateElement('servings', `份量：${recipe.servings} 人份`);

        updateList('ingredientsList', recipe.ingredients.split('\r\n'));
        updateList('stepsList', recipe.steps.split('\r\n'), true);
        updateList('notesList', recipe.notes.split('\r\n'));

        // 添加事件監聽器
        addButtonListener('saveRecipe', () => console.log('收藏食譜', recipe.recipeId));
        addButtonListener('viewProduct', () => window.location.href = `/product?id=${recipe.productId}`);

    } catch (error) {
        console.error('載入食譜數據時出錯：', error);
        alert('載入食譜數據時出錯，請稍後再試');
    }
});

// 輔助函數
function updateElement(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = content;
    } else {
        console.warn(`未找到 ID 為 '${id}' 的元素`);
    }
}

function updateList(id, items, numbered = false) {
    const list = document.getElementById(id);
    if (list) {
        list.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = numbered ? `${index + 1}. ${item}` : item;
            list.appendChild(li);
        });
    } else {
        console.warn(`未找到 ID 為 '${id}' 的列表`);
    }
}

function addButtonListener(id, callback) {
    const button = document.getElementById(id);
    if (button) {
        button.addEventListener('click', callback);
    } else {
        console.warn(`未找到 ID 為 '${id}' 的按鈕`);
    }
}