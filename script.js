$(function () {
  var menuActive = !1;
  var scrWidth = $(window).width();
  var scrHeight = $(window).height();
  var scrRatio = scrWidth / scrHeight;
  var playAnim = localStorage.getItem("play");
  console.log(scrRatio);
  $("#menuBtn").click(function () {
    if (!menuActive) {
      $("#menuBtn, #links").addClass("active");
    } else {
      $("#menuBtn, #links").removeClass("active");
    }
    menuActive = !menuActive;
  });
  if (playAnim === !1 || playAnim === "false" || scrRatio > 2.6) {
    noPlayAnim();
  } else {
    anim();
  }
  getLatestVid();
});
function anim() {
  var screenWidth = $(window).width();
  var cardPos = $("#card").offset();
  var logoPos = $("#mainLogo").offset();
  $("#crosshair").offset({ top: 0, left: 0 });
  var chDur = 10000;
  let startCh = anime.timeline({ duration: chDur });
  var cpw = cardPos.left;
  var cph = cardPos.top;
  var lpw = logoPos.left + "px";
  /*anim breaks if vws combined*/
  var hOffArr = [
    "6vw + " + lpw + " - 27vw",
    "3vw + " + lpw + " - 10vw",
    "42vw + " + lpw + " - 4vw",
    "11vw + " + lpw + " - 6vw",
    "11vw + " + lpw + " - 6vw"
  ];
  var vOffArr = [0.5, 2.1, 1.2, 1, 1.24];
  var chKf = [
    {
      translateX: "calc(2vw + " + hOffArr[0] + ")",
      translateY: "calc(2vw + " + vOffArr[0] * cph + "px)",
      scale: ".2",
      duration: 0
    }
  ];
  var z = "calc(" + "24vw" + " + " + vOffArr[0] * cph + "px), ";
  var zz = "calc(0% + " + hOffArr[0] + ") ";
  var zzz = "calc(" + "24vw" + " + " + hOffArr[0] + ")" + " ";
  var zzzz = "calc(0% + " + vOffArr[0] * cph + "px), ";
  var coverKf = [
    {
      clipPath:
        "polygon(0 0, " +
        zz +
        "0, " +
        zz +
        z +
        zzz +
        z +
        zzz +
        z +
        zzz +
        zzzz +
        zz +
        zzzz +
        zz +
        "0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0
    }
  ];
  var durArr = [
    chDur * 0.1,
    chDur * 0.1,
    chDur * 0.1,
    chDur * 0.1,
    chDur * 0.1
  ];
  var chDelArr = [0, 200, 200, 200, 200];
  var cvDelArr = [0, 200, 200, 200, chDur * 0.1];
  for (var x in hOffArr) {
    var hOff = hOffArr[x];
    var vOff = vOffArr[x] * cph + "px";
    if (vOffArr[x] === 1.24) {
      chKf.push({ opacity: 0, duration: 500 }, { opacity: 1, duration: 500 });
      coverKf.push({ opacity: 0, delay: 1000 });
    }
    chKf.push({
      translateX: "calc(2vw + " + hOff + ")",
      translateY: "calc(2vw + " + vOff + ")",
      duration: durArr[x],
      delay: chDelArr[x]
    });
    var dim = "24vw";
    var v1 = "calc(" + dim + " + " + vOff + ")" + ", ";
    var v2 = "calc(0% + " + vOff + "), ";
    var h1 = "calc(" + dim + " + " + hOff + ")" + " ";
    var h2 = "calc(0% + " + hOff + ") ";
    coverKf.push({
      clipPath:
        "polygon(0 0, " +
        h2 +
        "0, " +
        h2 +
        v1 +
        h1 +
        v1 +
        h1 +
        v1 +
        h1 +
        v2 +
        h2 +
        v2 +
        h2 +
        " 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: durArr[x],
      delay: cvDelArr[x]
    });
  }
  chKf.push({ scale: 0.7 });
  startCh.add({
    targets: "#crosshair",
    keyframes: chKf,
    easing: "easeInOutExpo"
  });
  anime({ targets: "#cross", delay: 6200, opacity: 0, duration: 1200 });
  let cover = anime.timeline({ duration: 7000, easing: "easeInOutExpo" });
  cover.add({ targets: "#cover", keyframes: coverKf });

  var playAnim = localStorage.setItem("play", false);
}

function noPlayAnim() {
  var logoPos = $("#mainLogo").offset();
  var lpw = logoPos.left + "px";
  var tOff = .39*logoPos.top;
  var lph = tOff + "px";
  anime({
    targets: "#cover, #cross",
    opacity: 0,
    duration: 1
  });
  anime({
    targets: "#crosshair",
    scale: 0.7,
    translateX: "calc(6vw + " + lpw + " - 39vw)",
    translateY: lph,
    duration: 1
  });
}

function getLatestVid() {
  var apiKey = "AIzaSyDJHhBXf64SmXO57JILxoPj4obJ_MgKxj8";
  $.ajax({
    url:
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUGSGPehp0RWfca-kENgBJ9Q&key=" +
      apiKey,
    type: "get",
    success: function (response) {
      var videoInfo = [];
      var videos = response.items;
      var latestVid = videos[0].snippet.resourceId.videoId;
      var embedLink = "https://www.youtube.com/embed/" + latestVid;
      $("#ytVidLinkWrap").html(
        "<a id='ytVidLink' href=" +
          "https://www.youtube.com/watch?v=" +
          latestVid +
          ">WATCH →</a>"
      );
      $("#vidWrap").html('<iframe id="latestVid" src=' + embedLink + " />");
    }
  });
}
/*var compare = function (a, b) {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  };*/