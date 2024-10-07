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

  //展開菜單選項
  // menu toggle up/down 圖案
<<<<<<< HEAD
=======
<<<<<<< HEAD
  // window.togglePic1 = function () {
  //   var margin1 = document.getElementById("add");
  //   var img1 = document.getElementById("updown1");
  //   var childContent1 = document.getElementById("tem-dropdown-content1");
  //
  //   if (img1.src.includes("down.png")) {
  //     img1.src = "./material/icon/up.png";
  //     margin1.style.margin = "40px 0";
  //     childContent1.style.display = "block";
  //   } else if (img1.src.includes("up.png")) {
  //     img1.src = "./material/icon/down.png";
  //     margin1.style.margin = "";
  //     childContent1.style.display = "none";
  //   }
  // };
  //
  // window.togglePic2 = function () {
  //   var margin2 = document.getElementById("add");
  //   var img2 = document.getElementById("updown2");
  //   var childContent2 = document.getElementById("tem-dropdown-content2");
  //
  //   if (img2.src.includes("down.png")) {
  //     img2.src = "./material/icon/up.png";
  //     margin2.style.margin = "40px 0";
  //     childContent2.style.display = "block";
  //   } else if (img2.src.includes("up.png")) {
  //     img2.src = "./material/icon/down.png";
  //     margin2.style.margin = "";
  //     childContent2.style.display = "none";
  //   }
  // };
=======
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
  window.togglePic1 = function () {
    var margin1 = document.getElementById("add");
    var img1 = document.getElementById("updown1");
    var childContent1 = document.getElementById("tem-dropdown-content1");

    if (img1.src.includes("down.png")) {
      img1.src = "./material/icon/up.png";
      margin1.style.margin = "40px 0";
      childContent1.style.display = "block";
    } else if (img1.src.includes("up.png")) {
      img1.src = "./material/icon/down.png";
      margin1.style.margin = "";
      childContent1.style.display = "none";
    }
  };

  window.togglePic2 = function () {
    var margin2 = document.getElementById("add");
    var img2 = document.getElementById("updown2");
    var childContent2 = document.getElementById("tem-dropdown-content2");

    if (img2.src.includes("down.png")) {
      img2.src = "./material/icon/up.png";
      margin2.style.margin = "40px 0";
      childContent2.style.display = "block";
    } else if (img2.src.includes("up.png")) {
      img2.src = "./material/icon/down.png";
      margin2.style.margin = "";
      childContent2.style.display = "none";
    }
  };
<<<<<<< HEAD
=======
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5

  // 會員功能菜單顯示/隱藏
  let memberInfoDiv = document.getElementById("memberInfoDiv");
  let slideshowContainer = document.getElementById("slideshow-container");
  let isMemberDivVisible = false; // 初始為隱藏

  document.getElementById("memberIcon").addEventListener("click", (e) => {
    e.stopPropagation(); // 防止點擊會員圖標時觸發頁面其他地方的點擊事件
    if (isMemberDivVisible) {
      memberInfoDiv.style.display = "none";
      // slideshowContainer.style.zIndex = 5;
      isMemberDivVisible = false;
    } else {
      memberInfoDiv.style.display = "block";
      isMemberDivVisible = true;
      // slideshowContainer.style.zIndex = -1;
    }
  });

  // 點擊頁面其他地方時隱藏會員功能菜單
  document.addEventListener("click", function (e) {
    e.stopPropagation();
    if (isMemberDivVisible && !memberInfoDiv.contains(e.target)) {
      memberInfoDiv.style.display = "none";
      // slideshowContainer.style.zIndex = 5;
      isMemberDivVisible = false;
    }
  });

  // 搜索框顯示/隱藏
  // let isOpen = false;
  // let searchDiv = document.getElementById("searchDiv");
  // let searchIcon = document.getElementById("searchIcon");
  //
  // searchIcon.addEventListener("click", () => {
  //   if (!isOpen) {
  //     searchDiv.style.width = "200px";
  //     searchDiv.style.border = "1px solid #a1c14b";
  //     isOpen = true;
  //   } else {
  //     searchDiv.style.width = "0";
  //     searchDiv.style.border = "0";
  //     isOpen = false;
  //   }
  // });

  // 點擊頁面其他地方時隱藏搜索框和會員功能菜單
  document.getElementById("myContainer").addEventListener("click", () => {
    if (isMemberDivVisible) {
      memberInfoDiv.style.display = "none";
      // slideshowContainer.style.zIndex = 5;
      isMemberDivVisible = false;
    }
  });

  //header的logo點了會跳到首頁
  document.getElementById("logoDiv").addEventListener("click", () => {
    window.location.href = "/enjoyum";
  });

  //判斷使用者是否為登入狀態
  let loginDiv = document.getElementById("loginDiv");
  let logoutDiv = document.getElementById("logoutDiv");

  loginDiv.style.display = "none";
  logoutDiv.style.display = "none";

  fetch("http://localhost:8080/users/checkSession", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error : ");
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        loginDiv.style.display = "none";
        logoutDiv.style.display = "block";
      } else {
        loginDiv.style.display = "block";
        logoutDiv.style.display = "none";
      }
    })
    .catch((error) => {
      console.log("Error :" + error);
    });

  //登出
  document.getElementById("logout").addEventListener("click", () => {
    fetch("http://localhost:8080/users/logout", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error : ");
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data === "boolean") {
          if (data) {
            alert("成功登出");
            window.location.href = "/enjoyum";
          }
        } else {
          console.log("Unexpected response data:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
<<<<<<< HEAD
=======
<<<<<<< HEAD
  
  //聯絡我們
  
  let contactDiv = document.getElementById("contactDiv");
  
  document.getElementById("contactIcon").addEventListener("click", () => {
	contactDiv.style.display = 'block';
  })

  document.getElementById("close").addEventListener("click", () => {
      contactDiv.style.display = 'none';
  })

  document.getElementById("contactBtn").addEventListener("click", () => {
      let name = document.getElementById("name").value;
      let contactInfo = document.getElementById("contactInfo").value;
      let message = document.getElementById("message").value;

      if(name === '' || name == null){
          alert('請輸入姓名');
      }else if(contactInfo === '' || contactInfo == null){
          alert('請輸入聯絡方式');
      }else if(message === '' || message == null){
          alert('請輸入諮詢內容');
      }else{
          fetch('http://localhost:8080/users/consult', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name: name,
                  contactInfo: contactInfo,
                  message : message
              })
          }).then(response => {
              if(!response.ok){
                  throw new Error ('Error :');
                  alert('伺服器忙碌中,請稍後在試!!');
              }
              alert('感謝您的諮詢，我們我盡快回復您的問題！！');
          }).catch(error => {
              console.log('Error:', error);
          })
      }
  })
  
  
=======
>>>>>>> df1674c5fef1625551261257122acc83d3e42279
>>>>>>> c654e672b4e173558a1d0734ffe17e8f86b675e5
});
