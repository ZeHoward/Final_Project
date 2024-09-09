window.onload = function () {
  // Sidenav functions
  window.openSidenav = function () {
    document.getElementById("sidenav").style.width = "100%";
  };

  window.closeSidenav = function () {
    document.getElementById("sidenav").style.width = "0%";
  };

  // Dropdown menu logic
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
};
