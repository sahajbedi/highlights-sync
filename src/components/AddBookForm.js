import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

function AddBookForm() {
  const [title, setTitle] = useState("");
  const [fullTitle, setFullTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    console.log("Add book form component loaded");
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFullTitleChange = (event) => {
    setFullTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleCoverUrlChange = (event) => {
    setCoverUrl(event.target.value);
  };

  const saveBook = (event) => {
    console.log("Save book clicked");
    if (!title || !fullTitle || !author) {
      console.log("Error");
      alert("Invalid submission");
      return;
    }

    const requestObject = {
      title: title,
      fullTitle: fullTitle,
      author: author,
      coverUrl: coverUrl,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestObject)
    };
    fetch("https://europe-west1-highlights-sync.cloudfunctions.net/api/v1/books", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response " + data)
        alert("Book successfully added");
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
        alert("Request failed");
      });
  };

  return (
    <div className="addBookForm">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            onChange={handleTitleChange}
          />
          <Form.Text className="text-muted">Title</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicFullTitle">
          <Form.Label>Full Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full title"
            onChange={handleFullTitleChange}
          />
          <Form.Text className="text-muted">Full Title</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author name"
            onChange={handleAuthorChange}
          />
          <Form.Text className="text-muted">Author</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCoverUrl">
          <Form.Label>Cover URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter cover URL"
            onChange={handleCoverUrlChange}
          />
          <Form.Text className="text-muted">Cover URL</Form.Text>
        </Form.Group>
        <Button variant="primary" type="button" onClick={saveBook}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddBookForm;
