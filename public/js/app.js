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

$(document).on("click", "#scrape-button", function (event) {
  event.preventDefault();
  $.get("/scrapenews").then(function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
    location.reload();
  });
});

$(document).on("click", "#delete-articles-button", function (event) {
  event.preventDefault();
  $.ajax({ type: "DELETE", url: "/api/articles" }).then(function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
    location.reload();
  });
});

$(document).on("click", ".notes-button", function (event) {
  let id = $(this).attr("data-id");
  console.log("Note opened. Article ID is " + id);
});
