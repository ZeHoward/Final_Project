window.onload = function() {
    // Sidenav functions
    window.openSidenav = function() {
        document.getElementById("sidenav").style.width = "100%";
    }
    
    window.closeSidenav = function() {
        document.getElementById("sidenav").style.width = "0%";
    }

    // Dropdown menu logic
    var dropdowns = document.getElementsByClassName("dropdown-btn");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }

    // Slideshow 
    let slideIndex = 1;
    showSlides(slideIndex);

    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" dotActive", "");
        }
        
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " dotActive";
    }

//精選生鮮食材包專區
    const products = [
        { id: 1, name: '日式豬排飯', price: 130, image: './material/mealkit/katsudon.jpg' },
        { id: 2, name: '義大利餃', price: 120, image: './material/mealkit/dumpling.jpg' },
        { id: 3, name: '南洋叻沙海鮮湯麵', price: 135, image: './material/mealkit/laksa.jpg' },
        { id: 4, name: '奶油松露百菇燉飯', price: 220, image: './material/mealkit/奶油松露百菇燉飯.jpg' },
        { id: 5, name: '泰式冬蔭功酸辣海鮮湯', price: 170, image: './material/mealkit/soup.png' },
        { id: 6, name: '印度雞肉香飯', price: 140, image: './material/mealkit/印度雞肉香飯.jpg' },
        { id: 7, name: '新加坡海南雞飯', price: 150, image: './material/mealkit/新加坡海南雞飯.jpg' },
    ];

    let currentIndex = 0;

    function renderProducts() {
        const container = document.getElementById('productContainer');
        container.innerHTML = '';
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + products.length) % products.length;
            const product = products[index];
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
                <button class="add-to-cart">加入購物車</button>
                <button class="add-to-favorite">收藏商品</button>
            `;
            container.appendChild(productElement);
        }

        // 加入購物車按鈕事件處理
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.closest('.product').querySelector('h4').textContent;
                alert(`已將 ${productName} 加入購物車！`);
            });
        });

        // 收藏商品按鈕事件處理
        document.querySelectorAll('.add-to-favorite').forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.closest('.product').querySelector('h4').textContent;
                alert(`已將 ${productName} 加入收藏！`);
            });
        });
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + products.length) % products.length;
        renderProducts();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % products.length;
        renderProducts();
    });

    renderProducts();

    //menu toggle up/down
    window.togglePic1 = function () {
        var img1 = document.getElementById("updown1");
        if (img1.src.includes("down.png")) {
        img1.src = "./material/icon/upload.png";
        } else {
        img1.src = "./material/icon/down.png";
        }
    };
    window.togglePic2 = function () {
        var img2 = document.getElementById("updown2");
        if (img2.src.includes("down.png")) {
        img2.src = "./material/icon/upload.png";
        } else {
        img2.src = "./material/icon/down.png";
        }
    };
};

