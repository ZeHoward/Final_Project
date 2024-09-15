<script setup>
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
</script>

<template>
  
<!-- footer start -->
<footer class="tem-footer">
      <div class="tem-footer-content">
        <div class="tem-about-us">
          <h2>關於我們</h2>
          <ul>
            <li>公司簡介</li>
            <li>使命與願景</li>
            <li>品牌故事</li>
          </ul>
        </div>
        <div class="tem-customer-service">
          <h2>客戶服務</h2>
          <ul>
            <li>常見問題</li>
            <li>送貨與退貨政策</li>
            <li>隱私政策</li>
          </ul>
        </div>
        <div class="tem-contact-info">
          <h2>聯絡我們</h2>
          <p>電話: 04-2326-5860</p>
          <p>電郵: service@fastgourmet.com</p>
          <p>地址: 台中市南屯區公益路二段51號18樓</p>
          <span class="tem-social-media">
            <a href="#"
              ><img src="./material/icon/facebook.png" alt="Facebook"
            /></a>
            <a href="#"
              ><img src="./material/icon/instagram.png" alt="Instagram"
            /></a>
            <a href="#"
              ><img src="./material/icon/youtube.png" alt="YouTube"
            /></a>
          </span>
        </div>
        <div class="tem-registration-info">
          <h2>登錄字號</h2>
          <p>即食享熱餐飲無限公司</p>
          <p>食品業者登錄字號: A-123456789-54321-0</p>
          <p>本公司產品皆投保產品責任保險</p>
        </div>
      </div>
    </footer>


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
