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

function formClear() {
  $("#note-title").val("");
  $("#note-body").val("");
}

$(document).on("click", ".favorite-button", function () {
  let id = $(this).attr("data-id");
  let favorite = $(this).attr("data-favorited");
  if (favorite === "false") {
    $(this).removeClass("bg-success");
    $(this).addClass("bg-warning");
    $(this).text("In Favorites");
    $(this).attr("data-favorited", "true");
    $.ajax({
      type: "PUT",
      url: "/favorites/" + id,
      data: { favorite: true },
    }).then(function (err, res) {
      if (err) {
        console.log(err);
      }
    });
  } else {
    $(this).removeClass("bg-warning");
    $(this).addClass("bg-success");
    $(this).text("Favorite");
    $(this).attr("data-favorited", "false");
    $.ajax({
      type: "PUT",
      url: "/favorites/" + id,
      data: { favorite: false },
    }).then(function (err, res) {
      console.log("C'mon...");
      if (err) {
        console.log(err);
      }
    });
  }
});

$(document).on("click", "#scrape-button", function (event) {
  event.preventDefault();
  $.get("/scrapenews").then(function (res, err) {
    if (err) {
      console.log(err);
    }
    location.reload();
  });
});

$(document).on("click", "#scrape-nyt-button", function (event) {
  event.preventDefault();
  $.get("/scrapenyt").then(function (res, err) {
    if (err) {
      console.log(err);
    }
    location.reload();
  });
});

$(document).on("click", "#scrape-fox-button", function (event) {
  event.preventDefault();

  $.get("/scrapefox").then(function (res, err) {
    if (err) {
      console.log(err);
    }
    location.reload();
  });
});

$(document).on("click", "#delete-articles-button", function (event) {
  event.preventDefault();
  $.ajax({ type: "DELETE", url: "/api/articles" }).then(function (res, err) {
    if (err) {
      console.log(err);
    }
    location.reload();
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
    formClear();
  });
});
