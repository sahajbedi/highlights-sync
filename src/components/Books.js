import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddBookForm from "./AddBookForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Book component loaded");
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
    navigate("/books/" + bookId + "/highlights");
  };

  return (
    <div className="booksPage">
      <Button variant="primary" onClick={handleShow} style={{ float: "right" }}>
        Add Book
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddBookForm />
        </Modal.Body>
      </Modal>
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
                <td>
                  {book.coverUrl && (
                    <img
                      width="30px"
                      src={book.coverUrl}
                    />
                  )}
                  {book.title}
                </td>
                <td>{book.author}</td>
                <td>{book.highlights}</td>
                <td>{book.createdAt}</td>
                <td>{book.lastHighlighted}</td>
              </tr>
            );
          })}
          {/* <tr>
            <td>
              <img
                width="30px"
                src="https://books.google.com/books/content?id=1EiJAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
              />
              Why We Sleep
            </td>
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
