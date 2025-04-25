const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bookModel = require('./models/book-model');

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/api', (req, res) => {
  res.send(' Welcome to the Book API');
});

// Create Book
app.post('/api/create', async (req, res) => {
  try {
    const { title, author, rating, content } = req.body;
    const createdBook = await bookModel.create({ title, author, rating, content });
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
});

// Read Books
app.get('/api/read', async (req, res) => {
  try {
    const books = await bookModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Delete Book
app.delete('/api/delete/:id', async (req, res) => {
  try {
    const deletedBook = await bookModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted', deletedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
});

// Get Book by ID for Editing
app.get('/api/edit/:id', async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
});

// Update Book
app.post('/api/update/:id', async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { newBookName, newAuthorName, newRating, newContent } = req.body;

    if (newBookName) book.title = newBookName;
    if (newAuthorName) book.author = newAuthorName.toLowerCase();
    if (newRating) book.rating = newRating;
    if (newContent) book.content = newContent;

    await book.save();
    res.json({ message: 'Book updated', book });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));