// 菜單展開、關閉功能
  window.openSidenav = function () {
    document.getElementById("sidenav").style.width = "100%";
    document.body.style.overflow = "hidden";
  };

  window.closeSidenav = function () {
    document.getElementById("sidenav").style.width = "0%";
    document.body.style.overflow = "";
  };

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

  fetch("/users/checkSession", {
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
    fetch("/users/logout", {
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
	  let questionType = document.getElementById("questionType").value;
      let message = document.getElementById("message").value;

      if(name === '' || name == null){
		  Swal.fire({
			title:"請輸入姓名",
			text:"",
			icon:"warning",
			timer:"1000"
		})
      }else if(contactInfo === '' || contactInfo == null){
		  Swal.fire({
  			title:"請輸入聯絡方式",
  			text:"",
  			icon:"warning",
  			timer:"1000"
  		})
      }else if(message === '' || message == null){
		  Swal.fire({
  			title:"請輸入諮詢內容",
  			text:"",
  			icon:"warning",
  			timer:"1000"
  		})
      }else{

		Swal.fire({
		  title: '正在發送中...',
		  text: '請稍後',
		  allowOutsideClick: false,
		  width: 600,
		   padding: '3em',
		   color: '#716add',
		   background: '#fff',
		  didOpen: () => {
		    Swal.showLoading();
		  },

		});

          fetch('/users/consult', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name: name,
                  contactInfo: contactInfo,
				  questionType : questionType,
                  message : message
              })
          }).then(response => {
			Swal.close();
              if(!response.ok){
                  throw new Error ('Error :');

              }else{
				contactDiv.style.display = 'none';
                Swal.fire({
					title:"已收到您的諮詢",
					text:"感謝您的諮詢，我們我盡快回復您的問題！！",
					icon:"success",
					timer:"2000"
				})
			  }
          }).catch(error => {
			Swal.close();
		    Swal.fire({
		        title: "發送失敗",
		        text: "伺服器忙碌中,請稍後再試!!",
		        icon: "error"
		    });
              console.log('Error:', error);
          })
      }
  })

// ChatGPT小幫手聊天室
function initChatApp() {
    const chatWindow = document.getElementById('chatWindow');
    const chatIcon = document.getElementById('webSocketIcon');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const sendButton = document.getElementById('sendButton');
    const closeButton = document.getElementById('closeButton');
    const maximizeButton = document.getElementById('maximizeButton');  // 新增放大按鈕

    let isMaximized = false; // 狀態標誌，用來判斷是否放大視窗

    // 綁定點擊圖片事件，顯示對話框
    chatIcon.addEventListener('click', function () {
        toggleChatWindow('show');
    });

    // 綁定發送按鈕事件，發送訊息
    sendButton.addEventListener('click', function () {
        const userMessage = chatInput.value.trim();
        if (userMessage !== '') {
            appendMessage('user', userMessage);
            sendMessageToGPT(userMessage);
            chatInput.value = ''; // 清空輸入框
        }
    });

    // 綁定關閉按鈕事件，隱藏對話框並恢復原狀
    closeButton.addEventListener('click', function () {
        toggleChatWindow('hide');
    });

    // 綁定放大按鈕事件
    maximizeButton.addEventListener('click', function () {
        if (!isMaximized) {
            chatWindow.style.width = '60vw';
            chatWindow.style.height = '80vh';
            isMaximized = true;
        } else {
            chatWindow.style.width = '35vw';
            chatWindow.style.height = '40vh';
            isMaximized = false;
        }
    });

    // 顯示或隱藏對話框
    function toggleChatWindow(action) {
        const chatWindow = document.getElementById('chatWindow');

        if (action === 'show') {
            chatWindow.style.display = 'flex';  // 彈出對話框，使用 flexbox 布局
            chatIcon.style.display = 'none';    // 隱藏聊天圖標
        } else if (action === 'hide') {
            chatWindow.style.display = 'none';  // 隱藏對話框
            chatIcon.style.display = 'block';   // 顯示聊天圖標
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        chatWindow.style.display = 'none'; // 確保初始隱藏對話框
    });

    // 格式化訊息：處理換行和段落
    function formatMessage(message) {
        const paragraphs = message.split('\n\n');  // 將雙換行符視為段落
        return paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');  // 單換行符轉換為 <br>
    }

    // 顯示訊息在對話框，帶有逐字打字機效果並處理格式化
    function appendMessage(role, message) {
        const newMessage = document.createElement('div');
        newMessage.textContent = role === 'user' ? '你: ' : '料理鼠王： ';
        chatMessages.appendChild(newMessage);

        // 如果是用戶訊息，直接顯示
        if (role === 'user') {
            newMessage.textContent = '你: ' + message;
            chatMessages.scrollTop = chatMessages.scrollHeight; // 自動滾動到底部
            return;
        }

        // 將 GPT 回覆進行格式化並解析為純文本
        const formattedMessage = formatMessage(message);
        const tempElement = document.createElement('div');
        tempElement.innerHTML = formattedMessage;

        const fullText = tempElement.textContent;  // 獲取純文本內容
        let charIndex = 0;  // 字符索引
        const speed = 50;  // 調整打字速度，單位為毫秒

        function typeWriter() {
            if (charIndex < fullText.length) {
                newMessage.textContent += fullText.charAt(charIndex);  // 逐字添加
                charIndex++;
                chatMessages.scrollTop = chatMessages.scrollHeight;  // 自動滾動到底部
                setTimeout(typeWriter, speed);
            } else {
                // 當打字機效果結束後，將完整的 HTML 格式化應用
                newMessage.innerHTML = '料理鼠王：' + formattedMessage;
                chatMessages.scrollTop = chatMessages.scrollHeight;  // 自動滾動到底部
            }
        }

        typeWriter();  // 開始打字效果
    }

    // 送出訊息給後端處理 GPT 回應
    function sendMessageToGPT(userMessage) {
        fetch(`/RemyChat?prompt=${encodeURIComponent(userMessage)}`, {
            method: 'GET',
            headers: {
                'accept': '*/*'
            }
        })
            .then(response => response.json())
            .then(data => {
                // 根據 API 回應結構解析數據
                const assistantMessage = data.choices[0].message.content;
                appendMessage('AI', assistantMessage);  // 顯示 AI 回應，帶打字機效果和格式化支援
            })
            .catch(error => {
                appendMessage('AI', '發生錯誤，請聯繫開發商');
                console.error('Error:', error);
            });
    }
}

// 初始化聊天應用
document.addEventListener("DOMContentLoaded", initChatApp);


// 廣告視窗
document.addEventListener('DOMContentLoaded', function() {
  const closeAdBtn = document.getElementById('closeAdBtn');
  const adSlideContainer = document.getElementById('adSlideContainer');
  const adImage = document.getElementById('adImage');
  const adLink = document.getElementById('adLink');

  // 廣告數據
  const ads = [
      { image: 'https://enjoyum.s3.ap-northeast-1.amazonaws.com/DTad.png', link: 'https://www.youtube.com/@DietTomorrowFood/shorts' },
      { image: 'https://enjoyum.s3.amazonaws.com/632b0c41-db6a-4af6-955b-25c841669d7b-LOGO.png', link: 'https://shopee.tw/-%E6%A8%82%E4%B9%83%E8%BE%B2%E5%A0%B4-%E5%86%B7%E5%87%8D%E9%A6%99%E8%8A%8B%E7%8D%85%E5%AD%90%E9%A0%AD%E7%82%8A%E7%B2%89%E6%B9%AF%E8%AA%BF%E7%90%86%E5%8C%85(600%E5%85%AC%E5%85%8B)-i.82185121.25582336313?srsltid=AfmBOopkAN_W8fu5GCjX3c-D4OPr6tF1c7wgJTw9YRTvs6WW3R4zim7b' },
      { image: 'https://enjoyum.s3.ap-northeast-1.amazonaws.com/%E6%A8%82%E4%B9%83ad.png', link: 'https://shopee.tw/-%E6%A8%82%E4%B9%83%E8%BE%B2%E5%A0%B4-%E5%86%B7%E5%87%8D%E9%A6%99%E8%8A%8B%E7%8D%85%E5%AD%90%E9%A0%AD%E7%82%8A%E7%B2%89%E6%B9%AF%E8%AA%BF%E7%90%86%E5%8C%85(600%E5%85%AC%E5%85%8B)-i.82185121.25582336313?srsltid=AfmBOopkAN_W8fu5GCjX3c-D4OPr6tF1c7wgJTw9YRTvs6WW3R4zim7b' },
      { image: 'https://down-tw.img.susercontent.com/file/tw-11134207-7r990-lykvpxdrk7ase9@resize_w450_nl.webp', link: 'https://shopee.tw/-%E6%A8%82%E4%B9%83%E8%BE%B2%E5%A0%B4-%E5%86%B7%E5%87%8D%E7%B6%93%E5%85%B8%E8%A5%BF%E9%A4%90%E7%8E%89%E7%B1%B3%E6%BF%83%E6%B9%AF%E8%AA%BF%E7%90%86%E5%8C%85(500g)-i.82185121.27057086799?srsltid=AfmBOoo0JgHZkpwUIl37pIT236BwhWIWAn00OYrn1kJhuwmxPSoqcC_S' },
      { image: 'https://down-tw.img.susercontent.com/file/tw-11134207-7r98w-lwutn0ygpvdy5c@resize_w450_nl.webp', link: 'https://shopee.tw/-%E6%A8%82%E4%B9%83%E8%BE%B2%E5%A0%B4-%E7%B6%93%E5%85%B8%E8%BE%A6%E6%A1%8C%E5%86%B7%E5%87%8D%E6%AB%BB%E8%8A%B1%E8%9D%A6%E7%B1%B3%E7%B3%95(350%E5%85%8B-%E7%9B%92)-i.82185121.28553535006?srsltid=AfmBOooL2WdbPUfmS4UmuywDOsEjkvRBVy0nAl2YODX-kotBGxyp2YRb' },
      { image: 'https://enjoyum.s3.ap-northeast-1.amazonaws.com/%E6%8A%BD%E7%8D%8E%E5%BB%A3%E5%91%8A.gif', link: '/luckyWheel' }
      // { image: '/material/icon/DTlogo.png', link: 'https://www.youtube.com/@DietTomorrowFood/shorts' },
      // { image: '/material/icon/DTlogo.png', link: 'https://www.youtube.com/@DietTomorrowFood/shorts' },
      // { image: '/material/icon/DTlogo.png', link: 'https://www.youtube.com/@DietTomorrowFood/shorts' },
      // { image: '/material/icon/DTlogo.png', link: 'https://www.youtube.com/@DietTomorrowFood/shorts' },
      // { image: '/material/icon/DTlogo.png', link: 'https://www.youtube.com/@DietTomorrowFood/shorts' },

  ];

  // 隨機選擇廣告
  function chooseRandomAd() {
      const randomIndex = Math.floor(Math.random() * ads.length);
      return ads[randomIndex];
  }

  // 設置廣告
  function setAd() {
      const ad = chooseRandomAd();
      adImage.src = ad.image;
      adLink.href = ad.link;
  }

    // 在什麼頁面不顯示廣告
    function shouldShowAd() {
        const currentPath = window.location.pathname;
        const excludedPaths = ['/enjoyum', '/loginPage', '/updatePasswordPage', '/about', '/registPage', '/forgetPasswordPage', '/', '/memberBasicInfoPage'];
        return !excludedPaths.includes(currentPath);
    }

    // 顯示廣告
    function showAd() {
        if (shouldShowAd()) {
            adSlideContainer.style.left = '20px';
        }
    }

    // 隱藏廣告
    function hideAd() {
        adSlideContainer.style.left = '-320px';
    }

    // 初始化廣告
    setAd();
    showAd();

  // 關閉廣告
    closeAdBtn.addEventListener('click', function() {
        hideAd();
        setTimeout(function() {
            setAd();
            showAd();
        }, 30000);
    });
});

document.getElementById("luckyWheel").addEventListener("click", () => {
    checkLoginStatus()
        .then((isLoggedIn) => {
            if (isLoggedIn) {
                getUserId().then(userId => {
                    console.log(userId);
                    // 檢查使用者是否已經玩過旋轉盤領取過優惠券
                    fetch(`/api/coupons/user/${userId}`)
                        .then(response => response.json())
                        .then(coupons => {
                            console.log(coupons);
                            const restrictedCoupons = [5, 6, 7, 8, 9, 10, 11, 12];
                            const hasRestrictedCoupon = coupons.some(couponData =>
                                restrictedCoupons.includes(couponData.coupon.couponId)
                            );
                            if (hasRestrictedCoupon) {
                                Swal.fire({
                                    title: "提示",
                                    text: "您已經領取過特定優惠券，無法再次抽取。",
                                    icon: "warning",
                                    timer:1500
                                });
                                setTimeout(()=>{
                                    window.location.href='/couponPage';
                                },2500)
                            }else{
                                window.location.href="/luckyWheel"
                            }
                        })
                        .catch(error => {
                            console.error('取得使用者優惠券資訊時發生錯誤:', error);
                        });
                })
            } else {
                Swal.fire({
                    title: "尚未登入",
                    text: "請先登入才能玩遊戲取得優惠券",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: '登入',
                    cancelButtonText: '取消',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/loginPage";
                    }
                });
            }
        })
})

function checkLoginStatus() {
    return fetch('users/checkSession').then(response => {
        if (!response.ok) {
            throw new Error("無法檢查登入狀態");
        }
        return response.json();
        console.log(data);
    })
        .catch(error => {
            console.error("登入時發生錯誤", error);
            return false;
        })
}

//取得userId
function getUserId() {
    return fetch('/users/userAllInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error("無法獲取用戶 ID");
            }
            return response.json(); // 返回 UserAllInfo 包含 userId
        })
        .then(data => data.userId) // 假設返回的數據中包含 userId
        .catch(error => {
            console.error("獲取用戶 ID 時發生錯誤", error);
            return null;
        });
}