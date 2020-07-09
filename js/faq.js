$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});

$(".toggle").click(function (e) {
  e.preventDefault();

  var $this = $(this);

  if ($this.next().hasClass("show")) {
    $this.next().removeClass("show");
    $this.next().slideUp(350);
  } else {
    $this.parent().parent().find("li .inner").removeClass("show");
    $this.parent().parent().find("li .inner").slideUp(350);
    $this.next().toggleClass("show");
    $this.next().slideToggle(350);
  }
});

var i = 1;
var s = i - 1;
var index;
function themeChanger() {
  //var doc = document.getElementsByClassName("toggle");
  // var doc = document.querySelectorAll('.toggle');
  //console.log(doc.length);
  var colorArray = ["red", "blue", "purple", "green"];
  var prevColor = colorArray[s];
  var color = colorArray[i];
  $(".toggle").addClass(color).removeClass(prevColor);
  $(".faq").addClass(color).removeClass(prevColor);
  /*
  for (index = 0; index < doc.length; index++) { 
    doc[index].style.backgroundColor = color[i];
  } */
  //doc.style.backgroundColor = color[i];
  i = (i + 1) % colorArray.length;

  if (i == 0) {
    s = 3;
  } else {
    s = i - 1;
  }

  // s = i - 1;
  /*
  console.log(i+"i"+color);
  console.log(s+"s"+color);*/
}
setInterval(themeChanger, 3000);