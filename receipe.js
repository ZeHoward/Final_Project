
// 切換子選單的顯示與隱藏
function toggleSubmenu() {
  const submenu = document.querySelector(".submenu");
  const arrowIcon = document.getElementById("arrow-icon");

  if (submenu.style.display === "block") {
    submenu.style.display = "none";
    arrowIcon.classList.remove("fa-chevron-up");
    arrowIcon.classList.add("fa-chevron-down");
  } else {
    submenu.style.display = "block";
    arrowIcon.classList.remove("fa-chevron-down");
    arrowIcon.classList.add("fa-chevron-up");
  }
}

// 切換愛心按鈕的顯示狀態
function toggleHeart(heartIcon) {
  heartIcon.classList.toggle("liked");
}


const recipes = [
  {
      "id": 1,
      "name": "Spaghetti Carbonara",
      "img": "https://example.com/images/spaghetti_carbonara.jpg"
  },
  {
      "id": 2,
      "name": "Chicken Curry",
      "img": "https://example.com/images/chicken_curry.jpg"
  },
  {
      "id": 3,
      "name": "Beef Stroganoff",
      "img": "https://example.com/images/beef_stroganoff.jpg"
  },
  {
      "id": 4,
      "name": "Caesar Salad",
      "img": "https://example.com/images/caesar_salad.jpg"
  },
  {
      "id": 5,
      "name": "Vegetable Stir-fry",
      "img": "https://example.com/images/vegetable_stir_fry.jpg"
  },
  {
      "id": 6,
      "name": "Pancakes",
      "img": "https://example.com/images/pancakes.jpg"
  },
  {
      "id": 7,
      "name": "Margherita Pizza",
      "img": "https://example.com/images/margherita_pizza.jpg"
  },
  {
      "id": 8,
      "name": "Chicken Alfredo",
      "img": "https://example.com/images/chicken_alfredo.jpg"
  },
  {
      "id": 9,
      "name": "Tomato Soup",
      "img": "https://example.com/images/tomato_soup.jpg"
  },
  {
      "id": 10,
      "name": "Greek Salad",
      "img": "https://example.com/images/greek_salad.jpg"
  },
  {
      "id": 11,
      "name": "Baked Salmon",
      "img": "https://example.com/images/baked_salmon.jpg"
  },
  {
      "id": 12,
      "name": "Chocolate Brownies",
      "img": "https://example.com/images/chocolate_brownies.jpg"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const foodCardsContainer = document.getElementById('foodCards');

  recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'receipes';
      
      card.innerHTML = `
          <div class="card-content">
              <img src="${recipe.img}" alt="${recipe.name}" class="card-img" />
              <div class="card-title">${recipe.name}</div>
              <div class="card-details">
                  <div class="heart-btn" onclick="toggleHeart(this)"></div>
                  <button class="read-btn">閱讀食譜</button>
              </div>
          </div>
      `;

      foodCardsContainer.appendChild(card);
  });
});