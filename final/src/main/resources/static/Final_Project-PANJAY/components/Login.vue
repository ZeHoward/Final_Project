<script setup>
import {ref, onMounted } from 'vue';

let emailInput = ref(null);


onMounted(() => {
    
    emailInput.value.addEventListener('blur', () => {

        // let email = emailInput.value.value;
        
        // if(email != '123'){
        //     document.getElementById('noAccountP').style.opacity = 1;
        // }else{
        //     document.getElementById('noAccountP').style.opacity = 0;
        // }

        fetch('http://localhost:8080/brad02', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                    name: 'Alice',
                    age: 25
                })
             }).then(response => response.text())
             .then(data => console.log('回傳的值:' + data));
    });
});

</script>

<template>
  
  <div class="login">
        <p class="loginTopP">會員登入</p>
    
        <div class="emailDiv">
            <p  style="text-align: left;">電子信箱</p><input id="emailInput" type="email" class="loginInput" ref="emailInput">
            <p id="noAccountP">無此帳號</p>
        </div>
        <div>
            <p style="text-align: left;">密碼</p><input id="passwordInput" type="password" class="loginInput"><br>
            
            <a class="forgetPassword" style="margin-left: auto;" href="">忘記密碼?</a>
            
        </div>
        <button class="loginButton">登入</button>

        <div class="divider">
            <span class="dividerText">或使用第三方帳號登入</span>
        </div>
    
        <div class="socialButtons">
            <div class="socialButton">
              <img src="./material/icon/facebookIcon.jpg" alt="Facebook">
            </div>
            <div class="socialButton">
              <img src="./material/icon/google_PNG19635.png" alt="Google">
            </div>
            <div class="socialButton">
              <img src="./material/icon/LineIcon.jpg" alt="LINE">
            </div>
        </div>
    
    
        <p class="registP">還不是會員嗎?<a class="registA" href="">註冊會員</a></p>
    </div>


</template>

<style scoped>

.login{
    padding: 5% 0;
    text-align: center;
    /* border: 1px solid black; */
    margin: 0 auto;
    width: 400px;
}

.loginTopP{
    margin-bottom: 10%;
    text-align: start;
    font-size: 30px;
    font-weight: 500;
}

#noAccountP{
    opacity: 0;
    transition: opacity 0.5s ease, visibility 0.5s ease;
    color: red;
    text-align: start;
    font-size: 15px;
}

.loginInput{
    margin-top: 10px;
    border: 1px solid #a1c14b;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
}


.checkImg{
    margin: 0 3% 0;
    width: 8%;
}

.emailDiv{
    justify-content: start;
    margin-bottom: 20px;
}


.forgetPassword{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    text-decoration: none;
    color: black;
}

.forgetPassword:hover{
    text-decoration: none;
    color: #F3CE6E;
}

.loginButton{
    margin-top: 50px;
    margin-bottom: 20px;
    background-color: #a1c14b; 
    color: white; 
    border: none; 
    padding: 15px 60px;
    border-radius: 10px; 
    font-size: 16px; 
    cursor: pointer;
    width: 100%;
}

.loginButton:hover{
    color: black;
}

.divider{
    display:flex;
    align-items: center;
    margin:20px 0;
    
}

.dividerText{
    font-size: 14px;
    font-weight: normal;
    color: #656565;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #c8d365;
}
.registP{
    display: flex;
    justify-content: center;
    color: #656565;
}
.registA{
    text-decoration: none;
    color: black;
}
.registA:hover{
    text-decoration: none;
    color: #F3CE6E;
}


.socialButtons {
    padding-top: 20px;
    padding-bottom: 100px;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
  }

  .socialButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 60px;
    border: 2px solid #c8d365;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .socialButton img {
    width: 30px;
    height: 30px;
  }

  .socialButton:hover {
    transform: scale(1.05);
  } 

</style>
