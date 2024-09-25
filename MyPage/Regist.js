window.onload = function () {
    //菜單展開、關閉
    window.openSidenav = function () {
      document.getElementById("sidenav").style.width = "100%";
      document.body.style.overflow = "hidden";
    };
  
    window.closeSidenav = function () {
      document.getElementById("sidenav").style.width = "0%";
      document.body.style.overflow = "";
    };
  
    //展開菜單選項
    var dropdowns = document.getElementsByClassName("tem-dropdown-btn");
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  
    //menu toggle up/down 圖案
    window.togglePic1 = function () {
      var margin1 = document.getElementById("add");
      var img1 = document.getElementById("updown1");
      if (img1.src.includes("down.png")) {
        img1.src = "./material/icon/up.png";
        margin1.style.margin = "40px 0";
      } else {
        img1.src = "./material/icon/down.png";
        margin1.style.margin = "";
      }
    };
    window.togglePic2 = function () {
      var margin2 = document.getElementById("add");
      var img2 = document.getElementById("updown2");
      if (img2.src.includes("down.png")) {
        img2.src = "./material/icon/up.png";
        margin2.style.margin = "40px 0";
      } else {
        img2.src = "./material/icon/down.png";
        margin2.style.margin = "";
      }
    };

    ////////////////////////////////////////////////////////
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
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{10,}$/;
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
      

      if(finallyEmail != '' && finallyPassword != '' && userName != ''){
        fetch('http://localhost:8080/users/regist',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
            username : userName,
            email : finallyEmail,
            password : finallyPassword,
            phoneNumber : telephone
          })}).then(response => {
            if(!response.ok){
              throw new Error('Error : ')
            }
            return response.json();
          }).then(data => {
            console.log('Success:', data)
          }).catch(error => {
            console.log('error:', error)
          })
          }else{
            console.log('console註冊失敗')
          }
      
    });

  };