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
  
  
  window.onload = function () {
    //菜單展開、關閉
    window.openSidenav = function () {
      document.getElementById("sidenav").style.width = "100%";
      document.body.style.overflow = "hidden";
    };
  
    window.closeSidenav = function () {
      document.getElementById("sidenav").style.width = "0%";
      document.body.style.overflow = "";
    };
  
    //展開菜單選項
    var dropdowns = document.getElementsByClassName("tem-dropdown-btn");
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener("click", function () {
        this.classList.toggle("tem-active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  
    //menu toggle up/down 圖案
    window.togglePic1 = function () {
      var margin1 = document.getElementById("add");
      var img1 = document.getElementById("updown1");
      if (img1.src.includes("down.png")) {
        img1.src = "./material/icon/up.png";
        margin1.style.margin = "40px 0";
      } else {
        img1.src = "./material/icon/down.png";
        margin1.style.margin = "";
      }
    };
    window.togglePic2 = function () {
      var margin2 = document.getElementById("add");
      var img2 = document.getElementById("updown2");
      if (img2.src.includes("down.png")) {
        img2.src = "./material/icon/up.png";
        margin2.style.margin = "40px 0";
      } else {
        img2.src = "./material/icon/down.png";
        margin2.style.margin = "";
      }
    };
  };
  
  
  //現在的位置
  document.addEventListener("DOMContentLoaded", function() {
    // 使用 Fetch API 讀取 JSON 檔案
    fetch('recipeDetails.json')
      .then(response => response.json())
      .then(data => {
        // 假設 JSON 檔案包含的資料欄位是 name
        const recipeName = data.name;
        
        // 更新面包屑導航中的食譜名稱
        document.getElementById('recipeName').textContent = recipeName;
      })
      .catch(error => {
        console.error('錯誤:', error);
        document.getElementById('recipeName').textContent = '無法加載食譜名稱';
      });
  });