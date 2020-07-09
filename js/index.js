$(document).ready(function(){
    function dropdownOpen(cover, label, content) {
  $(cover).addClass("open").removeClass("close");
  $(label).addClass("labelOpen").removeClass("labelClose");
  $(content).removeClass("contentClose");
}

function dropdownClose(cover, label, content) {
  $(cover).addClass("close").removeClass("open");
      $(label).addClass("labelClose").removeClass("labelOpen");
  $(content).addClass("contentClose");
}

$("#videos").click(function () {
  dropdownOpen("#videoCover", "#videos", "#videoContent");
  $("#videoflavorText").removeClass("hide");
});

$("#vidClo").click(function () {
  dropdownClose("#videoCover", "#videos", "#videoContent");
  $("#videoflavorText").addClass("hide");
});

$("#annou").click(function () {
  dropdownOpen("#blueCover", "#annou", "#blueContent");
  $("#blueflavorText").removeClass("hide");
});

$("#blueClo").click(function () {
  dropdownClose("#blueCover", "#annou", "#blueContent");
  $("#blueflavorText").addClass("hide");
});

$("#donate").click(function () {
  dropdownOpen("#donateCover", "#donate", "#donateContent");
});

$("#donaClo").click(function () {
  dropdownClose("#donateCover", "#donate", "#donateContent");
});

$("#shop").click(function () {
  dropdownOpen("#shopCover", "#shop", "#shopContent");
});

$("#shopClo").click(function () {
  dropdownClose("#shopCover", "#shop", "#shopContent");
});
    });
