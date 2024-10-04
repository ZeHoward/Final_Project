window.onload = () => {
	
	let finalNewPassword = '';
	let newPasswordDifferent = document.getElementById('newPasswordDifferent');
	let passwordRegexCheck = document.getElementById('passwordRegexCheck');
	let checkPassword = false;

	document.getElementById('newPassword').addEventListener('blur', () => {
		let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;      
		let newPassword = document.getElementById('newPassword').value;
		if(!regex.test(newPassword)){
			passwordRegexCheck.style.opacity = 1;
			newPasswordDifferent.style.opacity = 1;
			checkPassword = false;
		}else{
			passwordRegexCheck.style.opacity = 0;
			checkPassword = true;
		}
	})

	document.getElementById('checkNewPassword').addEventListener('blur',() => {
		let newPassword = document.getElementById('newPassword').value;
		let checkNewPassword = document.getElementById('checkNewPassword').value;
		
		if( newPassword === checkNewPassword){
			finalNewPassword = newPassword;
			newPasswordDifferent.style.opacity = 0;
		}else{
			newPasswordDifferent.style.opacity = 1;
		}
	})
	
	
	
	
	
	document.getElementById('updatePasswordButton').addEventListener('click', () => {
		let oldPassword = document.getElementById('oldPassword').value;
		if(finalNewPassword != '' && finalNewPassword != null && oldPassword != '' && oldPassword != null && checkPassword){
			fetch('http://localhost:8080/users/updatePassword',{
				method : 'POST',
				headers : {'Content-Type' : 'application/json'},
				body : JSON.stringify({
					oldPassword : oldPassword,
					newPassword : finalNewPassword
					})
			}).then(response => {
				if(!response.ok){
					throw new Error('Error :');
				}
				return response.json();
			}).then(data => {
				if( data == 1 ){
					alert('密碼修改成功,請重新登入');
					window.location.href = '/loginPage';
				}else if( data == 0){
					alert('伺服器忙碌中,請稍後在試!!');
				}else{
					alert('您輸入的目前密碼與舊密碼不同!!');
				}
			})
		}else{
			alert('請正確輸入完整的目前密碼與新密碼!!')
		}
		
	})
}