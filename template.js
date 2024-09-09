window.onload = function () {
  // Sidenav functions
  window.openSidenav = function () {
    document.getElementById("sidenav").style.width = "100%";
  };

  window.closeSidenav = function () {
    document.getElementById("sidenav").style.width = "0%";
  };

  // dropdown menu
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
    var img1 = document.getElementById("updown1");
    if (img1.src.includes("down.png")) {
      img1.src = "./material/icon/upload.png";
    } else {
      img1.src = "./material/icon/down.png";
    }
  };
  window.togglePic2 = function () {
    var img2 = document.getElementById("updown2");
    if (img2.src.includes("down.png")) {
      img2.src = "./material/icon/upload.png";
    } else {
      img2.src = "./material/icon/down.png";
    }
  };
};
