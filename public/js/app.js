$(document).on("click", ".favorite-button", function () {
  let id = $(this).attr("data-id");
  $.ajax({
    type: "PUT",
    url: "/favorites/" + id,
    data: { favorite: true },
  }).then(function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
});
