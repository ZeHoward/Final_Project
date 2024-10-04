let finalEmail = '';
document.getElementById("emailInput").addEventListener("blur", () => {
  finalEmail = '';
  let emailInput = document.getElementById("emailInput");
  let checkEmailUrl = 'http://localhost:8080/users/checkEmail?email=' + emailInput.value
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

document.getElementById("birthday").addEventListener("change", () => {
	let birthday = document.getElementById("birthday").value;
	
	let checkBirthdayUrl = 'http://localhost:8080/users/checkEmail?email=' + finalEmail + '&birthday=' + birthday
	fetch(checkBirthdayUrl, {
		method : 'GET'
	}).then(response => {
		if(!response.ok){
			throw new Error ('Error : ')
		}
		return response.json();
	}).then(data  => {
		
	})
})
	
document.getElementById("loginButton").addEventListener("click", () => {
	fetch()
})
