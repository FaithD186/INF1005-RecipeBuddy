// Import express and cors
const express = require('express');
const cors = require('cors');

//Create an Express application
const app = express();

app.use(cors());
app.use(express.json());

//create a GET routes

const recipes = require('./recipes.json');
const websites = require('./websites.json');

app.get('/recipes', (req, res) => {
    res.json(recipes);
});
app.get('/websites', (req, res) => {
  res.json(websites);
});

app.post('/addwebsite', (req, res) => {
  console.log("Added website")
  const body = req.body;
  console.log(body);
  websites.push(body);
  res.json({ message: 'The website has been added' });
});

app.post('/addrecipe', (req, res) => {
    console.log("Added receipe")
    const body = req.body;
    console.log(body);
    recipes.push(body);
    res.json({ message: 'The recipe has been added' });
  });

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  recipes.forEach((recipe, index) => {
    if (recipe.id === parseInt(id)) {
        recipes.splice(index);
    }
  });
  res.json({ message: `Recipe with id #${id} has been deleted` });
});

// Start the server
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

