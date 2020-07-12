$(document).ready(function () {
  var activeForm = $("#form1");
  var activeBackgroundClass = "red";
  var page = $("#app");
  $(".form").hide();
  $("#form1").show();
  //all fields are required
  $("input, textarea").prop("required", true).addClass("f");

  $("#formSel").on("change", formChange);

  function formChange() {
    activeForm.hide();
    page.removeClass(activeBackgroundClass);
    activeForm = $($(this).val());
    activeBackgroundClass = $(this).find("option:selected").data("class");
    activeForm.show();
    page.addClass(activeBackgroundClass);
  }

  //validate form
  $("form").each(function () {
    $(this).validate({
      errorClass: "error",
      highlight: function (element, errorClass) {
        $(element).closest(".f").addClass("is-danger");
      },
      unhighlight: function (element, errorClass) {
        $(element).closest(".f").removeClass("is-danger");
      }
    });
  });
});
