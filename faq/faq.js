$(document).ready(function () {
  $(".navbar-burger").click(function () {
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
  var colorArray = ["red", "blue", "purple", "green"];
  var prevColor = colorArray[s];
  var color = colorArray[i];
  $(".toggle").addClass(color).removeClass(prevColor);
  $(".faq").addClass(color).removeClass(prevColor);

  i = (i + 1) % colorArray.length;

  if (i == 0) {
    s = 3;
  } else {
    s = i - 1;
  }
}
setInterval(themeChanger, 3000);
