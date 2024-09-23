<script setup>

</script>

<template>
  
<div class="updatePassword">
    <p style="font-size: xx-large;" class="updatePasswordTopP" >更改密碼</p>
    <div>
        <p style="text-align: left; margin-bottom: 10px;">目前密碼</p><input class="updatePasswordInput" type="password">
    </div>
    <div>
        <p style="text-align: left; margin-bottom: 10px;">新密碼</p><input class="updatePasswordInput" type="password">
    </div>
    <div>
        <p style="text-align: left; margin-bottom: 10px;">確認新密碼</p><input class="updatePasswordInput" type="password">
    </div>
    
    <button class="updatePasswordButton">更改密碼</button>
</div>


</template>

<style scoped>
.updatePassword{
    padding: 2% 0;
    text-align: center;
    margin: 0 auto;
    width: 400px;
    font-weight: bold;
}

.updatePasswordInput{
    border: 1px solid #a1c14b;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
}

.updatePasswordButton{
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

.updatePasswordButton:hover{
    color: black;
}
</style>
