window.onload = function () {
	

	let emailInput = document.getElementById("emailInput");

	emailInput.addEventListener("change", () => {
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
	  let userEmail = document.getElementById("emailInput").value;
	  let userPassword = document.getElementById("passwordInput").value;
	    fetch('http://localhost:8080/users/login',{
	    method: 'POST',
	    headers:{
	      'Content-Type': 'application/json'
	    },
	    body:JSON.stringify({
	      email : userEmail,
	      password : userPassword
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
		if(data.mesg === 'Login Success'){
			
			window.location.href = '/enjoyum';
		}
	  }).catch(error => {
	    console.log('error:', error)
	  })
	})
		
};