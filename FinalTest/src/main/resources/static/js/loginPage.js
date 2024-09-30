window.onload = function () {
	
	
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