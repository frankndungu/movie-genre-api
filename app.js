const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Drama" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

//list the genres
app.get("/v1/genres", (req, res) => {
  res.send(genres);
});

//single genre
app.get("/v1/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("GenreID not found");
    return;
  }
  res.send(genre);
});

//post a genre
app.post("/v1/genres", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on ${port}...`));
