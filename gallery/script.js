var dpi = window.devicePixelRatio;
var after = "";
var imgSrcs = [];
var topOrNew = "top";
var artists = [];
var sortTime = "all";
var $sizer = $("<div class='grid-sizer'></div>");
var wall = $("#grid");
var container = $("#slide");
var prvImgSet = 0;
var curImgSet = 9;
var artworks = $(".grid-item");
var wallIsoObj = $(".grid").isotope({
  layoutMode: "masonryHorizontal",
  itemSelector: ".grid-item",
  masonryHorizontal: {
    rowHeight: ".grid-sizer"
  }
});
var delayApi = false;
var $grid = wallIsoObj;
var numOfPosts = 0;
var numOfArtwk = 0;
var test = 0;
var min;
$(document).ready(function () {
  loadImg();
  $grid.imagesLoaded().progress(function () {
    $grid.isotope("layout");
  });
  $("body").on("click", ".speech-bubble, #hn", function (e) {
    alert("Taking a beauty nap...sorry~");
    /*$("body").chardinJs("start").refresh();*/
  });
});

$("#mode").on("change", modeChange);
$("#timeSelect").on("change", timeSelChange);
wall.on("click", ".grid-item", function () {
  $("#artModal").addClass("is-active");
  var id = $(this).attr("id");
  var intId = Number(id);
  var artist = artists[intId - 1];
  var art = imgSrcs[intId - 1];
  $("#artwork").attr("src", art);
  //alert(intId);
  $("#artist").html("Artist: /u/" + artist);
  $("#fullImg").attr("href", art);
});

$(".modal-close, .modal-background, .delete, #hn").click(function () {
  $(".modal").removeClass("is-active");
});

//mode change stuff

function reset() {
  numOfArtwk = 0;
  numOfPosts = 0;
  test = 0;
  artists = [];
  imgSrcs = [];
  prvImgSet = 0;
  curImgSet = 9;
  after = "";
  delayApi = false;
  showLoading();
}

function clearImg() {
  wall.html("");
  wall.append($sizer).isotope("appended", $sizer);
  wall.isotope("remove", wall.isotope(".grid-item"));
  wall.isotope("layout");
}

function modeChange() {
  var mode = $(this).val();
  reset();
  $(".lllll").html(numOfPosts);
  $(".ttt").html(test);
  topOrNew = mode;
  after = "";
  toggleTimeSelect();
  clearImg();
  loadImg();
}

function showLoading() {
  $("#loading").show();
}

function hideLoading() {
  $("#packing,#loading").hide();
}

function toggleTimeSelect() {
  var sel = $("#timeSelWrap");
  if (topOrNew == "top") {
    sel.show();
  } else {
    sel.hide();
  }
}

function timeSelChange() {
  reset();
  $(".lllll").html(numOfPosts);
  $(".ttt").html(test);
  var time = $(this).val();
  sortTime = time;
  after = "";
  clearImg();
  loadImg();
}

function minUrl() {
  var res;
  var user;
  var size;
  var avWidth = $(window).width();
  if (dpi > 1) {
    res = "2x";
    if (avWidth <= 400) {
      user = "bpmgbkqwkp";
      size = "400x400";
    } else if (avWidth <= 600) {
      user = "wcmwmkwxpt";
      size = "600x600";
    } else if (avWidth <= 800) {
      user = "rxthrwrpkz";
      size = "800x800";
    } else if (avWidth > 800) {
      user = "dcrddzxjlb";
      size = "1000x1000";
    } else {
    }
  } else {
    res = "1x";
    if (avWidth <= 400) {
      user = "kbbpdgwvxk";
      size = "400x400";
    } else if (avWidth <= 600) {
      user = "fnkfghcfjw";
      size = "600x600";
    } else if (avWidth <= 800) {
      user = "ptjtpbzzkg";
      size = "800x800";
    } else if (avWidth > 800) {
      user = "jmjnpqkxls";
      size = "1000x1000";
    } else {
    }
  }
  min = "https://img.gs/" + user + "/" + size + "," + res + ",quality=low/";
}

function refresh() {
  $(".grid").isotope("layout");
  delayApi = false;
  changeTutorialImg();
  hideLoading();
if (wall.width() < container.width() && sortTime != "day") {
    test += 1;
    loadImg();
  }
}

function changeTutorialImg() {
  $(".grid-item:first").attr(
    "data-intro",
    "zzzzzzz Click to enlarge...~ zzzzzzzzz"
  );
  $(".grid-item:first").attr("data-position", "right");
  //$('body').chardinJs('start').refresh();
}
//api related stuff

var param;
function paramSet() {
  if (topOrNew == "top") {
    param = {
      t: sortTime,
      sort: "top",
      q: "flair:fanart",
      limit: 5,
      restrict_sr: true,
      after: after
    };
    // return t;
  } else {
    param = {
      sort: "new",
      q: "flair:fanart",
      limit: 10,
      restrict_sr: true,
      after: after
    };
  }
}

function apiProcessing(response) {
  var r = response.data.children;
  after = response.data.after;
  var x;
  for (x in r) {
    numOfPosts += 1;
    var p = r[x].data.post_hint;
    var u = r[x].data.url;
    var artist = r[x].data.author;
    var con = arrayContains(min + u, imgSrcs);
    hideLoading();
    if (u != null && p == "image" && !con) {
      numOfArtwk += 1;
      var $content = $(
        "<div id=" +
          numOfArtwk +
          " " +
          "class='grid-item'><img src=" +
          min +
          u +
          "></img></div>"
      );
      wall.append($content).isotope("appended", $content);
      imgSrcs.push(min + u);
      artists.push(artist);
      //  appendImgs();
      wall.imagesLoaded(refresh);
    } else {
    }
  }
}

function appendImgs() {
  var i;
  for (i = prvImgSet; i < curImgSet; i++) {
    var u = imgSrcs[i];
    var z = i + 1;
    var $content = $(
      "<div id=" + z + " " + "class='grid-item'><img src=" + u + "></img></div>"
    );
    wall.append($content).isotope("appended", $content);
    //wall.imagesLoaded(refresh);
  }
  wall.imagesLoaded(refresh);
  prvImgSet += 10;
  curImgSet += 10;
}

function loadImg() {
  paramSet();
  minUrl();
  // console.log(param);
  if (!delayApi) {
    delayApi = true;
    showLoading();
    if (after != null) {
      $.ajax({
        url: "https://www.reddit.com/r/jreg/search.json",
        type: "get", //send it through get method
        data: param,
        success: function (response) {
          apiProcessing(response);
        },
        error: function (xhr) {
          //Do Something to handle error
          console.log("err");
        }
      });
    } else {
      alert(
        "You've reached the end. Congratulations? (Change the sort parameters for more)"
      );
      // delayApi=false;
    }
    // delayApi = true;
  }
}

function arrayContains(needle, arrhaystack) {
  return arrhaystack.indexOf(needle) > -1;
}

var elem = $("#slide");
var inner = $("#grid");

elem.scroll(function () {
  if (elem.scrollLeft() + elem.width() + 200 >= inner.width()) {
    loadImg();
    // delayApi = true;
    // console.log("9494");
  }
});