import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Highlights.css";

function Highlights() {
  const params = useParams();
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    console.log("Highlights page loaded");
    const bookId = params["bookId"];
    console.log(`Book ID: ${bookId}`);

    const url = `https://europe-west1-highlights-sync.cloudfunctions.net/api/v1/books/${bookId}/highlights`;
    console.log(`URL is ${url}`);

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPageInfo(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!pageInfo || Object.keys(pageInfo).length === 0) {
    return <div className="highlightsPage">Nothing here</div>;
  }

  if (pageInfo["book"] == undefined) {
    return <div className="highlightsPage">Couldn't find book info</div>;
  }

  if (pageInfo["highlights"] == undefined) {
    return <div className="highlightsPage">Couldn't find highlights</div>;
  }

  const bookInfo = pageInfo["book"];
  const highlights = pageInfo["highlights"];

  if (highlights.length == 0) {
    return (
      <div className="highlightsPage">
        <Container fluid="md">
          <Row className="highlightsPageRow">
            <Col>
              <h1>{bookInfo.title}</h1>
            </Col>
          </Row>
          <Row className="highlightsPageRow">
            <Col>
              <h4>{bookInfo.author}</h4>
            </Col>
          </Row>
          <Row className="highlightsPageRow">
            <Col>
              <h6>No Highlights Found for this book</h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="highlightsPage">
      <Container fluid="md">
        <Row className="highlightsPageRow">
          <Col>
            <h1>{bookInfo.title}</h1>
          </Col>
        </Row>
        <Row className="highlightsPageRow">
          <Col>
            <h4>{bookInfo.author}</h4>
          </Col>
        </Row>
        {highlights.map((highlight) => {
          return (
            <Row key={highlight.id} className="highlightsPageRow">
              <Col>
                <Card className="highlightsRowCard">
                  <Card.Body>
                    <Card.Text>{highlight.text}</Card.Text>
                    {highlight.note && (
                      <Card.Footer className="text-muted">
                        {highlight.note}
                      </Card.Footer>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
}

export default Highlights;
