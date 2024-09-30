window.onload = function () {
	let registPassword = false;
    let checkPassword = false;
    let finallyPassword = '';
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


    document.getElementById('registPasswordCheckInput').addEventListener('blur', async () => {
      let password01 = document.getElementById('registPasswordInput').value;
      let password02 = document.getElementById('registPasswordCheckInput').value;
      let passwordDifferent = document.getElementById('passwordDifferent').style;
      if(password01 !== password02){
        registPassword = false;
        finallyPassword = '';
        passwordDifferent.opacity = 1;
      }else{
        registPassword = true;
        finallyPassword = password02;
        passwordDifferent.opacity = 0;
      }
      
    });

    

    document.getElementById('registPasswordInput').addEventListener('blur',async () => {
	  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;      
	  let password = document.getElementById('registPasswordInput').value;
      if(!regex.test(password)){
        document.getElementById('passwordRegexCheck').style.opacity = 1;
        checkPassword = false;
        finallyPassword = '';
      }else{
        document.getElementById('passwordRegexCheck').style.opacity = 0;
        checkPassword = true;
        finallyPassword = password;
      }
    });



    document.getElementById('regist').addEventListener('click', () => {
      let telephone = document.getElementById('registTelephoneInput').value;
      let userName = document.getElementById('registUserName').value;
     // let birthday = document.getElementById('registBirthday').value;

      if(finallyEmail != '' && finallyPassword != '' && userName != ''){
        fetch('http://localhost:8080/users/regist',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            username : userName,
            email : finallyEmail,
            password : finallyPassword,
			phoneNumber : telephone
			//birthday : birthday
          })}).then(response => {
            if(!response.ok){
              throw new Error('Error : ')
            }
            return response.json();
          }).then(data => {
            if(data.usersStatus == 'EXIST'){
				alert('此電子信箱帳號已註冊過!!');
			}
			if(data.usersStatus == 'ADD_FAILURE'){
				alert('伺服器忙碌中,請稍後在試!!');
			}
			if(data.usersStatus == 'ADD_SUCCESS'){
				alert('已送出驗證碼,請到電子信箱查看並開通!!')
				window.location.href = '/loginPage';
			}
          }).catch(error => {
            console.log('error:', error)
          })
      }else{
        alert("註冊失敗,請再檢查電子信箱、密碼、使用者名稱是否輸入有誤!!");
      }
      
    });
	

	};