$(function () {
  if (window.innerWidth > 350) {
    $("#titleSvg").attr("viewBox", "0 0 270 130");
    $("#curve").attr("d", "M 5 110 C 100 133 231 132 325 72");
    $("#curve2").attr("d", "M 5 70 C 100 92 231 93 332 32");
  }

  var apiKey = ytKey;

  $.ajax({
    url:
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUGSGPehp0RWfca-kENgBJ9Q&key=" +
      apiKey,
    type: "get",
    success: function (response) {
      var dates = [];
      var videos = response.items;
      for (x in videos) {
        var info = videos[x].snippet;
        var date = info.publishedAt;
        dates.push(date);
      }
      /*
    dates.sort(function (a, b) {
      return a < b;
    });*/
      var initDate = new Date();
      var base = new Date(dates[0]);
      var timePassed = initDate - base;
      var sec = Math.floor(timePassed / 1000) % 60;
      var min = Math.floor(timePassed / 1000 / 60) % 60;
      var hrs = Math.floor(timePassed / 1000 / 3600) % 24;
      var days = Math.floor(timePassed / 1000 / 60 / 60 / 24);
      $("#days").html(days);
      $("#hours").html(hrs);
      $("#min").html(min);
      $("#secs").html(sec);
      setInterval(function () {
        sec += 1;
        $("#secs").html(sec);
        //sec += 1;
        if (sec == 60) {
          sec = 0;
          min += 1;
          $("#secs").html(sec);
          $("#min").html(min);
        }
        if (min == 60) {
          min = 0;
          hrs += 1;
          $("#min").html(min);
          $("#hours").html(hrs);
        }
        if (hrs == 24) {
          hrs = 0;
          days += 1;
          $("#hours").html(hrs);
          $("#days").html(days);
        }
      }, 1000);
    },
  });
});
