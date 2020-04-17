$(document).on("click", ".favorite-button", function () {
  let id = $(this).attr("data-id");
  let favorite = $(this).attr("data-favorited");
  console.log(favorite);
  if (favorite) {
    $.ajax({
      type: "PUT",
      url: "/favorites/" + id,
      data: { favorite: false },
    }).then(function (err, res) {
      if (err) {
        console.log(err);
      }
      console.log(res);
    });
  } else {
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
  }
});
