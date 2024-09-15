<script setup>

window.onload = () => {

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
</script>

<template>
  
<div>
    <!-- menu start-->
    <div id="sidenav" class="tem-overlay">
      <div class="tem-nav">
        <button class="tem-closebtn" onclick="closeSidenav()">
          <img src="./material/icon/close.png" alt="" />
        </button>
      </div>
      <div class="tem-overlay-content">
        <a href="#home">首頁</a>
        <a href="#about">關於我們</a>

        <div class="tem-dropdown-div">
          <button class="tem-dropdown-btn" onclick="togglePic1()">
            商品列表&nbsp;<img
              src="./material/icon/down.png"
              alt="down"
              id="updown1"
            />
          </button>
          <div class="tem-dropdown-content">
            <a href="#ready">調理包專區</a>
            <a href="#mealkit">生鮮食材包專區</a>
          </div>
        </div>

        <div class="tem-dropdown-div">
          <button class="tem-dropdown-btn" onclick="togglePic2()">
            常見問題&nbsp;<img
              src="./material/icon/down.png"
              alt="down"
              id="updown2"
            />
          </button>
          <div class="tem-dropdown-content">
            <a href="#QA">Ｑ＆Ａ</a>
            <a href="#noticet">購買須知</a>
            <a href="#contact">聯絡我們</a>
          </div>
        </div>
        <a href="#share">響食部落格</a>
        <a href="#join">登入 / 註冊</a>
      </div>
      <div id="add"></div>
      <div class="tem-end-photo">
        <img src="./material/cook.png" alt="" />
      </div>
    </div>
    <!-- menu end-->

    <!-- header start -->
    <header class="tem-header">
      <div class="tem-header-content">
        <div class="tem-header-icons">
          <div class="tem-icon tem-menu-icon" onclick="openSidenav()">
            <a href="#"><img src="./material/icon/menu.png" alt="menu" /></a>
          </div>
        </div>
        <div class="tem-logo">
          <img src="./material/logo.png" alt="Logo" class="" />
        </div>
        <div class="tem-header-icons">
          <a href="#" class="tem-icon tem-cart-icon"
            ><img src="./material/icon/cart.png" alt="cart"
          /></a>
          <a href="#" class="tem-icon tem-user-icon"
            ><img src="./material/icon/account.png" alt="sign in"
          /></a>
          <a href="#" class="tem-icon tem-search-icon"
            ><img src="./material/icon/search.png" alt="search"
          /></a>
        </div>
      </div>
      <div class="tem-breadcrumb">
        <a href="#">首頁</a>
      </div>
    </header>
    <!-- header end -->

</div>

</template>

<style scoped>
* {
  font-family: "Noto Sans TC", system-ui;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  width: 100vw;
  max-width: 100%;
  overflow-x: hidden;
}

.tem-nav {
  height: 80px;
  display: block;
}

.tem-closebtn {
  position: absolute;
  border: none;
  background-color: transparent;
  right: 15px;
  top: 15px;
}

.tem-closebtn > img {
  height: 35px;
  width: 35px;
}

.tem-end-photo {
  justify-content: center;
}

.tem-end-photo img {
  width: 65%;
}

.tem-overlay {
  position: fixed;
  height: 100%;
  width: 0;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #fff6d0;
  backdrop-filter: blur(10px);
  overflow-x: hidden; /*移除水平卷軸*/
  transition: 0.5s;
  text-align: center;
}

.tem-overlay-content {
  padding-top: 2vh;
  width: 100%;
  margin-bottom: 0;
}

.tem-overlay-content > a,
.tem-dropdown-btn {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: black;
  display: block;
  transition: 0.3s;
  font-weight: bolder;
}

.tem-sidenav a,
.tem-dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  display: block;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  outline: none;
}

.tem-dropdown-content {
  display: none; /*讓下拉選單一開始保持閉合*/
}

.tem-dropdown-content a {
  font-size: 24px;
  padding: 8px;
  text-decoration: none;
  display: block;
  color: black;
  transition: 0.3s;
  font-weight: 700;
}

.tem-overlay-content > a:hover,
.tem-dropdown-btn:hover,
.tem-dropdown-content > a:hover {
  background-color: #e0912f;
}

.tem-active {
  background-color: #e0902fbe;
}

.tem-dropdown-btn {
  font-size: 36px;
}

.tem-dropdown-btn img {
  height: 25px;
}

/* header */
.tem-header {
  text-align: center;
  position: sticky;
}

.tem-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 80px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("./material/Vorderrhein3.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: 1500px 3197px;
  padding: 20px;
}

.tem-menu-icon {
  font-size: 24px;
  cursor: pointer;
}

.tem-logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  animation-duration: 2s;
}

.tem-logo img {
  height: 50px;
}

.tem-header-icons img {
  height: 30px;
}

.tem-icon :hover {
  height: 35px;
}

.tem-header-icons a {
  margin: 0 10px;
  font-size: 24px;
  text-decoration: none;
  color: black;
  justify-content: center;
}

.tem-breadcrumb {
  padding: 10px 20px;
  text-align: left;
  font-size: 14px;
}

.tem-breadcrumb a {
  color: black;
  text-decoration: none;
}

.tem-breadcrumb a:hover {
  text-decoration: underline;
}

/* footer */
.tem-footer {
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  position: relative;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url("./material/Vorderrhein3.png");
  background-repeat: repeat;
  background-size: auto;
  background-position: 1940px 774px;
}

.tem-footer-content {
  display: flex;
  justify-content: space-around;
}

.tem-footer-content div {
  padding: 20px 30px;
  text-align: left;
  min-width: 200px;
  box-sizing: border-box;
  text-align: left;
}

.tem-footer-content div span {
  /* 社群icon */
  float: left;
  text-align: left;
  padding-top: 10px;
}

.tem-footer-content h2 {
  margin-bottom: 10px;
  color: black;
}

.tem-footer-content ul {
  list-style: none;
}

.tem-footer-content ul li {
  margin-bottom: 5px;
  color: black;
  font-weight: 700;
}

.tem-contact-info p,
.tem-registration-info p {
  color: black;
  margin-bottom: 5px;
  font-weight: 700;
}

.tem-social-media {
  display: flex;
  justify-content: center;
}

.tem-social-media a {
  margin: 0 10px;
}

.tem-social-media img {
  height: 30px;
  width: 30px;
}

/*響應式*/
@media ((min-width: 400px) and (max-width: 1100px)) {
  .tem-footer-content {
    justify-content: center;
    flex-direction: column;
  }

  .tem-sidenav {
    padding-top: 15px;
  }

  .tem-overlay-content > a,
  .tem-dropdown-btn {
    font-size: 20px;
  }

  .tem-dropdown-btn img {
    height: 16px;
  }

  .tem-dropdown-content {
    font-size: 16px;
  }
}
</style>
