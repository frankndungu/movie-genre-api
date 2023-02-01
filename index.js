const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Horror" },
  { id: 5, name: "Scifi" },
  { id: 6, name: "Comedy" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

//list the genres
app.get("/v1/genres", (req, res) => {
  res.send(genres);
});

//returning a single genre
//if genre does not exist - 404
app.get("/v1/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("This movie genre does not exist");
    return;
  }
  res.send(genre);
});

//creating a new genre & input
app.post("/v1/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

//updating a genre
app.put("/v1/genres/:id", (req, res) => {
  //look up the genre
  //if not found - return 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("This movie genre does not exist");
    return;
  }

  //validate genre
  //if invalid - 400 Bad request
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //update genre
  //return updated genre to client
  genre.name = req.body.name;
  res.send(genre);
});

//deleting a genre
app.delete("/v1/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("This movie genre does not exist");
    return;
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  //return response to client
  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));
