<script setup>

import axios from 'axios'

let f1 = () => {
  let promise = axios({
    method:"POST",
    url:"http://localhost:8080/brad02",
    data:{
      "name":"panjay111",
      "age":"100"
    }
  }).then( 
  resolve => {console.dir("回傳結果:" + resolve.data);
  }).catch(error => {console.error("錯誤", error)});
  
}



</script>

<template>

<div>
  

  <button id="btn" @click="f1">按鈕</button>
</div>


</template>

<style scoped>

</style>
