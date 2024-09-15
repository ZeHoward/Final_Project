<script setup>

</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">

  <div class="accountCenter">
        <p class="accountCenterTopP">會員中心</p>
        <img src="./material/黃大頭.png" style="width: 80px; margin-left: 110px ;" alt="">
        <p class="memberName" style="font-weight: bold;"><span style="font-weight: normal;">你好我好大家好</span> 先生/小姐</p>
        <br>
        <div class="divOfAccountCenter">
          <i class="fa-solid fa-user"></i><a class="accountCenterA" href="">會員基本資料</a>
        </div>
        <div class="divOfAccountCenter">
          <i class="fa-solid fa-unlock"></i><a class="accountCenterA" href="">更改密碼</a>
        </div>
        <div class="divOfAccountCenter">
          <i class="fa-regular fa-heart"></i><a class="accountCenterA" href="">我的收藏</a>
        </div>
        <div class="divOfAccountCenter">
          <i class="fa-solid fa-bars"></i><a class="accountCenterA" href="">訂單管理</a>
        </div>
        <div class="divOfAccountCenter">
          <i class="fa-solid fa-tag"></i><a class="accountCenterA" href="">優惠券</a>
        </div>
  </div>


</template>

<style scoped>

.memberName{
  text-align: center;
}
.accountCenter>div{
  margin-bottom: 50px;
}
.accountCenterA{
  text-decoration: none;
  color: black;
}

.accountCenterA:hover{
  cursor: pointer;
  color: #f3ce6e;
}

.divOfAccountCenter>i{
  margin-left: 70px;
}

.divOfAccountCenter>a{
  margin-left: 40px;
}

.divOfAccountCenter{
  padding-bottom: 20px;
  border-bottom: 1px solid #D1DE74;
}

.accountCenter{
    padding: 3% 0;
    margin: 0 auto;
    width: 300px;
    
}

.accountCenterTopP{
    margin-bottom: 10%;
    text-align: center;
    font-size: 30px;
}

.fa-solid{
  font-size: 15px;
  color: black;
}

</style>
