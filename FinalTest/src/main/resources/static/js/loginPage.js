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
			   console.log(idToken);
	           fetch('http://localhost:8080/users/googleLogin', {
	               method: 'POST',
	               headers: {
	                   'Content-Type': 'application/json',
	               },
	               body: JSON.stringify({ idToken: idToken }),
	           }).then(response => {
				console.log('google登入返回');
				if(!response.ok){
					console.error('Error:', error);
				}
				 return response.json()
				 }).then(data => {
	                 if(data.mesg === 'Firebase獲取使用者訊失敗'){
						alert('Google伺服器忙線中,請稍後在試');
					 }
					 if(data.mesg === 'google登入註冊失敗'){
					 	alert('本網站伺服器忙線中,請稍後在試')	
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

	emailInput.addEventListener("change", () => {
	  finalEmail = '';
	  let emailInput = document.getElementById("emailInput");
	  let checkEmailUrl = 'http://localhost:8080/users/checkEmail?email=' + emailInput.value
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
	  console.log(finalEmail + "," + finalPassword);
	  if(finalEmail != '' && finalEmail != null && finalPassword != '' && finalPassword != null){
		fetch('http://localhost:8080/users/login',{
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
					alert('登入失敗,請稍後在試!!');
				}
				if(data.mesg === 'Login Failure : 密碼錯誤'){
					alert('密碼錯誤!!');
				}
				if(data.mesg === 'Login Failure: 您的帳號尚未驗證'){
					alert('您的帳號尚未驗證成功!!')
				}
				if(data.mesg === 'Login Success'){
					window.location.href = '/enjoyum';
				}
			  }).catch(error => {
			    console.log('error:', error);
			  })
	  }else{
		alert('請輸入正確的帳號與密碼!!');
	  }
	    
	})
		
};