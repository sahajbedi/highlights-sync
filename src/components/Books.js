import React from "react";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Books() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://europe-west1-highlights-sync.cloudfunctions.net/api/v1/books"
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setBooks(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const rowClick = (bookId) => {
    console.log("Row Clicked");
    console.log(bookId);
    navigate('/books/' + bookId + "/highlights");
  };

  return (
    <div>
      <div>Books</div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Highlights</th>
            <th>Created At</th>
            <th>Last Date Added</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.bookId} onClick={() => rowClick(book.bookId)}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.highlights}</td>
                <td>{book.createdAt}</td>
                <td>{book.lastHighlighted}</td>
              </tr>
            );
          })}
          {/* <tr>
            <td>Why We Sleep</td>
            <td>Matthew Walker</td>
            <td>55</td>
            <td>2nd August '22</td>
          </tr>
          <tr>
            <td>Sapiens</td>
            <td>Yuval Noah Harari</td>
            <td>100</td>
            <td>1st Septmeber '22</td>
          </tr>
          <tr>
            <td>Moonwalking with Einstein</td>
            <td>Joshua Foer</td>
            <td>45</td>
            <td>1st Feb '22</td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
}

export default Books;
