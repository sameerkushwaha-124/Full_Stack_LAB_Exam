import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/read').then(res => setBooks(res.data));
  }, []);

  const deleteBook = async (id) => {
    await axios.delete(`/api/delete/${id}`);
    setBooks(books.filter(book => book._id !== id));
  };

  return (
    <div>
      <Link to="/create" className="text-blue-500">+ Add Book</Link>
      <ul className="mt-4 space-y-2">
        {books.map(book => (
          <li key={book._id} className="border p-2 rounded">
            <h2 className="font-bold text-lg">{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Rating: {book.rating}</p>
            <Link to={`/edit/${book._id}`} className="text-green-500 mr-2">Edit</Link>
            <button onClick={() => deleteBook(book._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
