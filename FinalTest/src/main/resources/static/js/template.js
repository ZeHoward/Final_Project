document.addEventListener("DOMContentLoaded", function () {
    // 菜單展開、關閉功能
    window.openSidenav = function () {
        document.getElementById("sidenav").style.width = "100%";
        document.body.style.overflow = "hidden";
    };

    window.closeSidenav = function () {
        document.getElementById("sidenav").style.width = "0%";
        document.body.style.overflow = "";
    };

    // 展開菜單選項
    var dropdowns = document.getElementsByClassName("tem-dropdown-btn");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener("click", function () {
            this.classList.toggle("tem-active");
            var dropdownContent = this.nextElementSibling;
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        });
    }

    // menu toggle up/down 圖案
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

    // 會員功能菜單
    let memberInfoDiv = document.getElementById("memberInfoDiv");
    document.getElementById('memberIcon').addEventListener('click', () => {
        memberInfoDiv.style.opacity = (memberInfoDiv.style.opacity == 0 ? 1 : 0);
    });

    // 搜索框
    let isOpen = false;
    let searchDiv = document.getElementById('searchDiv');
    let searchIcon = document.getElementById('searchIcon');
    searchIcon.addEventListener('click', () => {
        if (!isOpen) {
            searchDiv.style.width = '200px';
            searchDiv.style.border = '1px solid #a1c14b';
            isOpen = true;
        } else {
            searchDiv.style.width = '0';
            searchDiv.style.border = '0';
            isOpen = false;
        }
    });

    // 搜索框的 Enter 事件
    let searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            let keyword = searchInput.value;
            alert('您輸入的關鍵字是 : ' + keyword);
        }
    });

    // 點擊頁面其他地方時隱藏搜索框和會員功能菜單
    document.getElementById('myContainer').addEventListener('click', () => {
        searchDiv.style.width = '0';
        searchDiv.style.border = '0';
        isOpen = false;
        memberInfoDiv.style.opacity = 0;
		memberInfoDiv.style.visibility = 'hidden';
    });
});
