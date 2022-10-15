import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Books from './components/Books';
import { signOut } from "firebase/auth"
import { auth } from "./firebase-config"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap'
import Highlights from './components/Highlights';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    })
  };
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Highlights Sync</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
                </LinkContainer>
              <LinkContainer to="/books">
                <Nav.Link>Books</Nav.Link>
              </LinkContainer>
              {!isAuth ? 
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                :
                <Button variant="link" onClick={signUserOut}>Logout</Button>
              }
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <nav>
        <Link to="/">Home</Link>
        {!isAuth ? <Link to="/login">Login</Link> : <button onClick={signUserOut}>Sign Out</button>}
        <Link to="/books">Books</Link>
      </nav> */}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path='/books' element={<Books />}></Route>
        <Route path="/books/:bookId/highlights" element={<Highlights />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
