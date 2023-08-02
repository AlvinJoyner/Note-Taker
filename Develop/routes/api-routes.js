const fs = require("fs");
const uniqid = require("uniqid");
const dataFilePath = "./Develop/data/db.json";

module.exports = function (app) {
  // API GET Requests
  app.get("/api/notes", (req, res) => {
    console.log("Execute GET notes request");
    let data = fs.readFileSync(dataFilePath, "utf8");
    res.json(JSON.parse(data));
  });

  // API POST Requests
  app.post("/api/notes", (req, res) => {
    const newNote = { ...req.body, id: uniqid() };
    console.log("Post Request for new notes");

    let data = fs.readFileSync(dataFilePath, "utf8");
    const dataJSON = JSON.parse(data);
    dataJSON.push(newNote);

    fs.writeFile(dataFilePath, JSON.stringify(dataJSON), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully added a new note");
    });

    res.json(newNote);
  });

  // API DELETE Request
  app.delete("/api/notes/:id", (req, res) => {
    let data = fs.readFileSync(dataFilePath, "utf8");
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => note.id !== req.params.id);

    fs.writeFile(dataFilePath, JSON.stringify(newNotes), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully deleted note with ID:", req.params.id);
    });

    res.json(newNotes);
  });
};
