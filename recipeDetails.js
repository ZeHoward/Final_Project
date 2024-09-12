document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('recipeDetails.json');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        // 確認響應內容
        const text = await response.text();
        console.log('Raw Response Text:', text);
        
        // 嘗試將響應解析為 JSON
        const data = JSON.parse(text);
        console.log('Parsed Data:', data);

        // 確認 data 是否為對象
        if (typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('Expected data to be an object.');
        }

        const recipe = data;
        if (!recipe) {
            throw new Error('Recipe data is undefined');
        }

        document.getElementById('foodName').textContent = recipe.name || '無名稱';
        document.getElementById('foodImage').src = recipe.img || 'default-image.jpg';
        document.getElementById('cookingTime').textContent = recipe.cookingTime || '未提供';
        document.getElementById('difficulty').textContent = recipe.difficulty || '未提供';
        document.getElementById('quantity').textContent = recipe.quantity || '未提供';

        const ingredientsList = document.getElementById('ingredientsList');
        if (Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ingredientsList.appendChild(li);
            });
        } else {
            console.error('Ingredients is not an array');
        }

        const stepsList = document.getElementById('stepsList');
        if (Array.isArray(recipe.steps)) {
            recipe.steps.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                stepsList.appendChild(li);
            });
        } else {
            console.error('Steps is not an array');
        }

        const noteList = document.getElementById('noteList');
        if (Array.isArray(recipe.note)) {
            recipe.note.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                noteList.appendChild(li);
            });
        } else {
            console.error('Note is not an array');
        }
    } catch (error) {
        console.error('載入配方數據時出錯：', error);
    }
});
