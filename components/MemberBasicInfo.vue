<script setup>

</script>

<template>
  
<div class="memberBasicInfo">
    <p style="font-size:xx-large;">會員基本資料</p>
    <div>
        <p style="text-align: start; margin-bottom: 10px;">電子信箱</p>
        <input class="memberBasicInfoInput" type="email">
    </div>

    <div>
        <p style="text-align: start; margin-bottom: 10px;">密碼</p>
        <a class="memberBasicInfoA" href="">更新密碼</a>
    </div>

    <div class="memberBasicInfoName">
        <div class="memberBasicInfoFirstName">
            <p  style="text-align: left;">名字</p><input class="memberBasicInfoInput">
        </div>
        <div class="memberBasicInfoLastName">
            <p style="text-align: left;">姓氏</p><input class="memberBasicInfoInput">
        </div>
    </div>

    <div>
        <p style="text-align: start; margin-bottom: 10px;">性別</p>
        <input class="memberBasicInfoInput" type="text">
    </div>

    <div>
        <p style="text-align: start; margin-bottom: 10px;">生日</p>
        <input class="memberBasicInfoInput" type="date">
    </div>

    <div>
        <p style="text-align: start; margin-bottom: 10px;">電話</p>
        <input class="memberBasicInfoInput" type="tel">
    </div>

    <div>
        <p style="text-align: start; margin-bottom: 10px;">預設地址</p>
        <input class="memberBasicInfoInput" type="text">
    </div>

    


    <button class="updateButton">更新資料</button>
</div>


</template>

<style scoped>

.memberBasicInfo{
    padding: 3% 0;
    text-align: center;
    margin: 0 auto;
    width: 400px;
    font-weight: bold;
}

.memberBasicInfoInput{
    border: 1px solid #a1c14b;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
}

.memberBasicInfoName{
    display: flex;
    justify-content: space-between;
}

.memberBasicInfoFirstName{
    display: flex;
    flex-direction: column;
}
.memberBasicInfoLastName{
    display: flex;
    flex-direction: column;
}

.updateButton{
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

.updateButton:hover{
    color: black;
}

.memberBasicInfoA{
    margin-left: 50px;
    display: flex;
    justify-content: left;
    text-decoration: none;
    color: #e0912f;
}

.memberBasicInfoA:hover{
    text-decoration: none;
    color: #F3CE6E;
}

</style>
