<script setup>

</script>

<template>
  
  <div class="regist">
        <p class="registTopP">會員註冊</p>
        <div>
            <p  style="text-align: left;">電子信箱</p><input id="registEmailInput" type="email" class="registInput" placeholder="example@gmail.com">
        </div>

        <div>
            <p  style="text-align: left;">建立密碼</p><input type="password" class="registInput" placeholder="必須有包含數字、英文字母大小寫">
        </div>

        <div>
            <p  style="text-align: left;">確認密碼</p><input type="password" class="registInput">
        </div>

        <div class="registName">
            <div class="registFirstName">
                <p  style="text-align: left;">名字</p><input class="registInput">
            </div>
            <div class="registLastName">
                <p  style="text-align: left;">姓氏</p><input class="registInput">
            </div>
        </div>

        <div>
          <p  style="text-align: left;">生日</p><input id="registEmailInput" type="date" class="registInput">
      </div>


      <button class="registButton">註冊</button>

      <p class="isMemberP">已經是會員嗎?<a class="isMemberA" href="">登入</a></p>
    </div>


</template>

<style scoped>
.regist>div{
    margin-bottom: 30px;
  }

  .regist{
    padding: 2% 0;
    text-align: center;
    margin: 0 auto;
    width: 400px;
    
  }

  .registTopP{
    margin-bottom: 10%;
    text-align: start;
    font-size: 30px;
  }

  .registInput{
    margin-top: 10px;
    border: 1px solid #a1c14b;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
}

.registName{
    display: flex;
    justify-content: space-between;
}

.registFirstName{
    display: flex;
    flex-direction: column;
}

.registLastName{
    display: flex;
    flex-direction: column;
}

.registButton{
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

.registButton:hover{
  color: black;
}

.isMemberP{
  margin-top: 50px;
  display: flex;
  justify-content: center;
  color: #656565;
}

.isMemberA{
  text-decoration: none;
  color: black;
}

.isMemberA:hover{
  color: #f3ce6e ;
}

</style>
