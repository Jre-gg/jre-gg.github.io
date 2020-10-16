$(document).ready(function () {
  function isElementOutViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.bottom < 0 ||
      rect.right < 0 ||
      rect.left > window.innerWidth ||
      rect.top > window.innerHeight
    );
  }

  var tag2 = document.getElementById("tag2");
  var btcnSvg = document.getElementById("btcn-link-svg");
  var oyfsSvg = document.getElementById("oyfs-link-svg");

  $(window).on("scroll", function () {
    var tag2Invisible = isElementOutViewport(tag2);
    var btcnSvgInvisible = isElementOutViewport(btcnSvg);
    var oyfsSvgInvisible = isElementOutViewport(oyfsSvg);
    if (!tag2Invisible) {
      $("#tag2path").addClass("anim");
    }
    if (!btcnSvgInvisible) {
      $("#xpath1,#xpath2").addClass("anim");
    }
    if (!oyfsSvgInvisible) {
      $("#key").addClass("anim");
    }
    //check whether user has scrolled to bottom
    if ($("body").height() <= $(window).height() + $(window).scrollTop() + 30) {
      $("#arrow").hide();
    } else {
      $("#arrow").show();
    }
  });

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? true : false;
      if (msg) {
        alert("Bitcoin address copied!");
      }
    } catch (err) {
      alert("Unable to copy ;(");
    }
    document.body.removeChild(textArea);
  }

  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        alert("Bitcoin address copied!");
      },
      function (err) {
        alert("Unable to copy ;()");
      }
    );
  }

  var btc = "bc1qk608lg4f9n687jj7v962vq9ldalzwzyjrmcqv9";

  $("#btcAddr").click(function () {
    copyTextToClipboard(btc);
  });
});
