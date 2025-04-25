import React from 'react'

const Books = (books) => {

  return (
    <div>
      <h1>Books...</h1>
      <div>{books.data.map((book) => {
        return <div key={book._id}>{book.title} {book.author} {book.ratting}</div>
      })
      }</div>

    </div>
  )
}

export default Books