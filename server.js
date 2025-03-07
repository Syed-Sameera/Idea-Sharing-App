const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());
app.use(express.static('public'));

let ideas = [];

app.get('/ideas', (req, res) => {
  res.json(ideas);
});

app.post('/submit', (req, res) => {
  const idea = req.body;
  ideas.push(idea);
  res.json({ message: 'Idea submitted successfully!' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});