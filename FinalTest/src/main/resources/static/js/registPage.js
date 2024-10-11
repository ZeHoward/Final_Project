window.onload = function () {
	let registPassword = false;
    let checkPassword = false;
    let finallyPassword = '';
	let finallyPassword2 = '';
    let finallyEmail = '';

    document.getElementById('registEmailInput').addEventListener('blur', async (event) => {
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let emailRegexCheck = document.getElementById('emailRegexCheck');
      if(!emailRegex.test(event.target.value)){
        emailRegexCheck.style.opacity = 1;
        finallyEmail = '';
      }else{
        finallyEmail = event.target.value;
        emailRegexCheck.style.opacity = 0;
      }
    });
	
	
	document.getElementById('registPasswordInput').addEventListener('input',async () => {
		  finallyPassword = '';
		  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;      
		  let password = document.getElementById('registPasswordInput').value;
	      if(!regex.test(password)){
	        document.getElementById('passwordRegexCheck').style.opacity = 1;
	      }else{
	        document.getElementById('passwordRegexCheck').style.opacity = 0;
			finallyPassword = password;
	      }

	    });


    document.getElementById('registPasswordCheckInput').addEventListener('input', async () => {
	  finallyPassword2 = '';
      //let password01 = document.getElementById('registPasswordInput').value;
      let password02 = document.getElementById('registPasswordCheckInput').value;
      let passwordDifferent = document.getElementById('passwordDifferent').style;
      if(finallyPassword !== password02){
        //finallyPassword = '';
        passwordDifferent.opacity = 1;
      }else{
        finallyPassword2 = password02;
        passwordDifferent.opacity = 0;
      }
      
    });

	

    document.getElementById('regist').addEventListener('click', () => {
      let userName = document.getElementById('registUserName').value;
	  let birthday = document.getElementById('registBirthday').value || '';
	  //alert('username:' + userName + 'finalEmail:' + finallyEmail + 'finallyPassword2' + finallyPassword2)	  

      if(finallyEmail != '' && finallyPassword2 != '' && userName != '' && birthday != ''){
		Swal.fire({
			  title: '正在發送中...',
			  text: '請稍後',
			  allowOutsideClick: false,
			  width: 600, 
			   padding: '3em',
			   color: '#716add',
			   background: '#fff', 
			   
			   backdrop: `
			     rgba(0,0,123,0.4)
			     url("https://sweetalert2.github.io/images/nyan-cat.gif")
			     left top
			     no-repeat
			   `,
			  didOpen: () => {
			    Swal.showLoading();
			  },
			});
        fetch('/users/regist',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            username : userName,
            email : finallyEmail,
            password : finallyPassword,
			birthday : birthday
          })}).then(response => {
			Swal.close();
            if(!response.ok){
              throw new Error('Error : ')
            }
            return response.json();
          }).then(data => {
            if(data.usersStatus == 'EXIST'){
				Swal.close(); 
			    Swal.fire({
			        title: "註冊失敗",
			        text: "此帳號已被註冊!!",
			        icon: "warning"
			    });			
			}
			if(data.usersStatus == 'ADD_FAILURE'){
				Swal.close(); 
			    Swal.fire({
			        title: "註冊失敗",
			        text: "伺服器忙碌中,請稍後再試!!",
			        icon: "error"
			    });
			}
			if(data.usersStatus == 'ADD_SUCCESS'){
				Swal.close(); 
				Swal.fire({
					title:"註冊成功",
					text:"感謝您成為我們的會員，請到註冊的電子信箱收去驗證信件！！",
					icon:"success"
				}).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/enjoyum';
                    }
                });
			}
          }).catch(error => {
            console.log('error:', error)
			Swal.close(); 
		    Swal.fire({
		        title: "註冊失敗",
		        text: "伺服器忙碌中,請稍後再試!!",
		        icon: "error"
		    });	
          })
      }else{
		Swal.fire({
			title:"註冊失敗",
			text:"請再檢查電子信箱、密碼、使用者名稱、生日是否輸入有誤!!",
			icon:"warning"
		})
      }
      
    });
	

	};