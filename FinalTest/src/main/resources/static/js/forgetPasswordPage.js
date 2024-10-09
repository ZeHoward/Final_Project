let finalEmail = '';
document.getElementById("emailInput").addEventListener("blur", () => {
  finalEmail = '';
  let emailInput = document.getElementById("emailInput");
  let checkEmailUrl = '/users/checkEmail?email=' + emailInput.value
  if(emailInput.value != null && emailInput.value != ''){
    fetch(checkEmailUrl, {
      method : 'GET'
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

	
document.getElementById("resetButton").addEventListener("click", () => {
	if(finalEmail != '' || finalEmail != null){
		let birthday = document.getElementById("birthday").value;
		fetch('/users/forgetPassword',{
			method : 'POST',
			headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify({ 
				email : finalEmail,
				birthday : birthday
			})
		}).then(response => {
			if(!response.ok){
				console.error('Error:', error);
			}
			return response.json();
		}).then(data => {
			if(data){
				alert("已將重設密碼連結發送至電子信箱!!");
				window.location.href = '/enjoyum';
			}else{
				alert('您輸入正確的生日!!')
			}
		}).catch((error) => {
			console.error('查詢失敗:', error);
		})
	}else{
		alert('請輸入已註冊過的電子信箱!!');
	}
})
