function getNotes(id) {
  $("#note-holder").empty();
  $.get("/api/article/" + id).then(function (data, err) {
    if (err) {
      console.log(err);
    }
    if (data.note) {
      for (let i = 0; i < data.note.length; i++) {
        let newNote = $(
          "<div class = 'note-well' id = 'note-" +
            data.note[i]._id +
            "'> <div> <h5>" +
            data.note[i].title +
            "</h5> <button class = 'delete-note-button bg-danger' data-article-id = '" +
            id +
            "'data-id = '" +
            data.note[i]._id +
            "'> &times; </button> </div> <hr class = 'w-100' style = 'background-color: black'> <div> <p>" +
            data.note[i].body +
            " </p></div></div>"
        );
        $("#note-holder").append(newNote);
      }
    }
  });
}

$(document).on("click", ".favorite-button", function () {
  let id = $(this).attr("data-id");
  let favorite = $(this).attr("data-favorited");
  console.log(favorite);
  if (favorite === "false") {
    $.ajax({
      type: "PUT",
      url: "/favorites/" + id,
      data: { favorite: true },
    }).then(function (err, res) {
      if (err) {
        console.log(err);
      }
      console.log("Please?");
      console.log(res);
    });
  } else {
    $.ajax({
      type: "PUT",
      url: "/favorites/" + id,
      data: { favorite: false },
    }).then(function (err, res) {
      console.log("C'mon...");
      if (err) {
        console.log(err);
      }
      console.log(res);
    });
  }
});

$(document).on("click", "#scrape-button", function (event) {
  event.preventDefault();
  console.log("Retrieving articles...");
  $.get("/scrapenews").then(function (res, err) {
    console.log("Inside the then");
    if (err) {
      console.log(err);
    }
    console.log(res);
    location.reload();
  });
});

$(document).on("click", "#delete-articles-button", function (event) {
  event.preventDefault();
  $.ajax({ type: "DELETE", url: "/api/articles" }).then(function (res, err) {
    console.log("Yeet yeet");
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
});

var testObject;

$(document).on("click", ".notes-button", function (event) {
  let id = $(this).attr("data-id");
  console.log("Note opened. Article ID is " + id);
  $("#add-note-button").attr("data-id", id);
  getNotes(id);
});

$(document).on("click", ".delete-note-button", function (event) {
  event.preventDefault();
  let id = $(this).attr("data-id");
  let articleId = $(this).attr("data-article-id");
  $.ajax({
    url: "/api/note/" + id,
    type: "DELETE",
  }).then(function (res, err) {
    if (err) {
      console.log(err);
    }
    getNotes(articleId);
  });
});

$(document).on("click", "#add-note-button", function (event) {
  let id = $(this).attr("data-id");
  let newNote = {
    title: $("#note-title").val().trim(),
    body: $("#note-body").val().trim(),
  };
  $.post("/api/notes/" + id, newNote).then(function (res, err) {
    if (err) {
      console.log(err);
    }
    getNotes(id);
  });
});
