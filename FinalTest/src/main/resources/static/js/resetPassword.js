window.onload = () => {
    let email = new URLSearchParams(window.location.search).get('email');
	console.log(email);
	let finalNewPassword = '';
	let newPasswordDifferent = document.getElementById('newPasswordDifferent');
	let passwordRegexCheck = document.getElementById('passwordRegexCheck');
	let checkPassword = false;

	document.getElementById('newPassword').addEventListener('blur', () => {
        finalNewPassword = '';
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
		if(finalNewPassword != '' && finalNewPassword != null  && checkPassword){
			fetch('/users/resetPassword',{
				method : 'POST',
				headers : {'Content-Type' : 'application/json'},
				body : JSON.stringify({
                    email : email,
					newPassword : finalNewPassword
					})
			}).then(response => {
				if(!response.ok){
					throw new Error('Error :');
				}
				return response.json();
			}).then(data => {
				if( data == 1 ){
					Swal.fire({
						title:"修改成功",
						text:"密碼修改成功,請重新登入!!",
						icon:"success"
					}).then((result) => {
		                if (result.isConfirmed) {
		                    window.location.href = '/loginPage';
		                }
		            });
				}else if( data == 0){
					Swal.fire({
				        title: "修改失敗",
				        text: "伺服器忙線中，請稍後在試!!",
				        icon: "error"
				    });
				}
			})
		}else{
			Swal.fire({
		        title: "修改失敗",
		        text: "請正確輸入完整的新密碼!!",
		        icon: "warning"
		    });
		}
		
	})
}