const path = require("path");

// sends user the notes or index page use sendFile() method in function
module.exports = function (app) {
  // for notes page
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/notes.html"));
  });

  // for index page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });
};
