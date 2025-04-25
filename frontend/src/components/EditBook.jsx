import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ newBookName: '', newAuthorName: '', newRating: '', newContent: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/edit/${id}`).then(res => {
      const book = res.data;
      setForm({
        newBookName: book.title,
        newAuthorName: book.author,
        newRating: book.rating,
        newContent: book.content
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/update/${id}`, form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="newBookName" placeholder="Title" value={form.newBookName} onChange={handleChange} className="border p-2 w-full" />
      <input name="newAuthorName" placeholder="Author" value={form.newAuthorName} onChange={handleChange} className="border p-2 w-full" />
      <input name="newRating" placeholder="Rating" value={form.newRating} onChange={handleChange} className="border p-2 w-full" />
      <textarea name="newContent" placeholder="Content" value={form.newContent} onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Update</button>
    </form>
  );
}

export default EditBook;