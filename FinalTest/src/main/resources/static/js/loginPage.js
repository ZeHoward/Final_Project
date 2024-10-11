import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";


window.onload = function () {
	
	const firebaseConfig = {
		apiKey: "AIzaSyCou9dEUoA0cCkG67g8Z0OCfOX6OzF2tX0",
		authDomain: "ee85enjoyum.firebaseapp.com",
		projectId: "ee85enjoyum",
		storageBucket: "ee85enjoyum.appspot.com",
		messagingSenderId: "374416641237",
		appId: "1:374416641237:web:e3f3bee11bc313c7c5265c",
		measurementId: "G-M1RFS9X3DG"
	};

	// Initialize Firebase
	   const app = initializeApp(firebaseConfig);
	   const analytics = getAnalytics(app);
	
	   // 初始化 Firebase Authentication 物件
	   const auth = getAuth(app);
	
	   // 設定 Google 登入提供者
	   const provider = new GoogleAuthProvider();
	
	   // 綁定 Google 登入按鈕點擊事件
	   document.getElementById('googleLogin').addEventListener('click', function() {
	       signInWithPopup(auth, provider)
	       .then((result) => {
	           // 成功登入，取得使用者資訊
	           const user = result.user;
	           console.log("使用者資訊: ", user);
	           console.log("登入成功: " + user.displayName);
			   return user.getIdToken();
	       }).then((idToken) => {
               // 將 ID Token 發送到後端進行驗證
	           fetch('/users/googleLogin', {
	               method: 'POST',
	               headers: {
	                   'Content-Type': 'application/json',
	               },
	               body: JSON.stringify({ idToken: idToken }),
	           }).then(response => {
				if(!response.ok){
					console.error('Error:', error);
				}
				 return response.json()
				 }).then(data => {
	                 if(data.mesg === 'Firebase獲取使用者訊失敗'){
						Swal.fire({
					        title: "登入失敗",
					        text: "Google伺服器忙線中,請稍後在試!!",
					        icon: "error"
					    });	
					 }
					 if(data.mesg === 'google登入註冊失敗'){
						Swal.fire({
					        title: "登入失敗",
					        text: "Google伺服器忙線中,請稍後在試!!",
					        icon: "error"
					    }); 					 
					}
					 if(data.mesg === 'google登入註冊成功' || data.mesg ==='帳號已存在'){
						window.location.href = '/enjoyum';
					 }
	             }).catch((error) => {
	                 console.error('登入失敗:', error);
	             });
		       })
		       .catch((error) => {
		           console.error('登入失敗:', error);
		       });
		   });
	
	
	let finalEmail = '';

	emailInput.addEventListener("blur", () => {
	  finalEmail = '';
	  let emailInput = document.getElementById("emailInput");
	  let checkEmailUrl = '/users/checkEmail?email=' + emailInput.value
	  if(emailInput.value != null && emailInput.value != ''){
	    fetch(checkEmailUrl, {
	      method : 'GET',
	    }).then(response => {
	      if(!response.ok){
	        throw new Error('Error : ')
	      }
	      return response.json();
	    }).then(data => {
	      if(data == true){
	        document.getElementsByClassName("noAccountP")[0].style.opacity = 0;
			finalEmail = document.getElementById("emailInput").value;
	      }else{
	        document.getElementsByClassName("noAccountP")[0].style.opacity = 1;
	      }
	    }).catch(error => {
	      console.log('error:', error)
	    })
	  }else{
	    document.getElementsByClassName("noAccountP")[0].style.opacity = 1;
	  }

	});

	document.getElementsByClassName("loginButton")[0].addEventListener('click',() =>{

	  let finalPassword = document.getElementById("passwordInput").value;
	  if(finalEmail != '' && finalEmail != null && finalPassword != '' && finalPassword != null){
		fetch('/users/login',{
			    method: 'POST',
			    headers:{
			      'Content-Type': 'application/json'
			    },
			    body:JSON.stringify({
			      email : finalEmail,
			      password : finalPassword
			    })
			  }).then(response => {
			    if(!response.ok){
			      throw new Error('Error : ');
			    }
			    return response.json();
			  }).then(data => {
				if(data.mesg === 'Login Failure'){
					Swal.fire({
	 					title:"登入失敗",
	 					text:"請再嘗試一次!!",
	 					icon:"error"
	 				})
				}
				if(data.mesg === 'Login Failure : 密碼錯誤'){
					Swal.fire({
	 					title:"登入失敗",
	 					text:"密碼錯誤!!,請重新輸入密碼!!",
	 					icon:"warning"
	 				})
				}
				if(data.mesg === 'Login Failure: 您的帳號尚未驗證'){
					Swal.fire({
	 					title:"帳號尚未驗證",
	 					text:"您的帳號尚未驗證,請麻煩到電子信箱收取驗證信件或者到網頁下方重發驗證信!!",
	 					icon:"warning"
	 				})
				}
				if(data.mesg === 'Login Success'){
					window.location.href = '/enjoyum';
				}
			  }).catch(error => {
			    console.log('error:', error);
			  })
	  }else{
		Swal.fire({
			title:"登入失敗",
			text:"請再嘗試一次!!",
			icon:"error"
		})
	  }
	    
	})
	
	document.getElementById("revalidate").addEventListener("click", () => {
		if(finalEmail != '' && finalEmail != null){
			let revalidateUrl = '/users/revalidate?email=' + finalEmail;
			
			fetch(revalidateUrl,{
			    method: 'GET'
			  }).then(response => {
				if(!response.ok){
					throw new Error('Error : ');
				}
				return response.json();
			  }).then(data => {
				switch(data){
					case 'NOT_EXIST':
						Swal.fire({
					        title: "此帳號尚未註冊!!",
					        text: "請前往註冊頁面註冊會員",
					        icon: "warning"
					    });	
						break;
					case 'ADD_FAILURE':
						Swal.fire({
					        title: "重置驗證信件失敗!!",
					        text: "請稍後在試!!",
					        icon: "error"
					    });	
						break;
					case 'ADD_SUCCESS':
						Swal.fire({
					        title: "驗證信件已發送!!",
					        text: "請前往電子信箱收取驗證信!!",
					        icon: "success"
					    });
						break;
					default : 
						Swal.fire({
					        title: "伺服器忙碌中!!",
					        text: "請稍後在試!!",
					        icon: "error"
					    });	
				}
			  }).catch(error => {
				console.log('error:', error);
			  })
			
		}else{			
			Swal.fire({
		        title: "請輸入已註冊過的電子信箱!!",
		        text: "若尚未註冊,請前往註冊頁面",
		        icon: "warning"
		    });	
		}
	});
		
};