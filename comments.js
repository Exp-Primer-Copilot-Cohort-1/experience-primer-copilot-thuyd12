// Create web server
// -----------------

import express from 'express';
import bodyParser from 'body-parser';

import comments from './comments';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/api/comments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const comment = comments.filter(comment => comment.id === id);
  if (comment.length > 0) {
    res.json(comment[0]);
  } else {
    res.status(404).json({ error: `Comment with id ${id} not found` });
  }
});

// Create a comment
app.post('/api/comments', (req, res) => {
  if (!req.body.author || !req.body.text) {
    res.status(400).json({ error: 'Please provide author and text' });
  } else {
    const newComment = {
      id: comments.length + 1,