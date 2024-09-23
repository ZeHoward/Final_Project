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
    var dropdowns = document.getElementsByClassName("dropdown-btn");
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
  
    //menu toggle up/down
    window.togglePic1 = function () {
      var margin1 = document.getElementById("add");
      var img1 = document.getElementById("updown1");
      if (img1.src.includes("down.png")) {
        img1.src = "./material/icon/upload.png";
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
        img2.src = "./material/icon/upload.png";
        margin2.style.margin = "40px 0";
      } else {
        img2.src = "./material/icon/down.png";
        margin2.style.margin = "";
      }
    };


// ///////////////////////////////////////////////////////


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
          console.log(data);
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
      // alert("您輸入的帳號 : " + userEmail + "\n密碼 : " + userPassword);
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
          throw new Error('Error : ')
        }
        return response.json();
      }).then(data => {
        console.log('Success:', data)
      }).catch(error => {
        console.log('error:', error)
      })
    })
  };


