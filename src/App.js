import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Books from './components/Books';
import { signOut } from "firebase/auth"
import { auth } from "./firebase-config"

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
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? <Link to="/login">Login</Link> : <button onClick={signUserOut}>Sign Out</button>}
        <Link to="/books">Books</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path='/books' element={<Books />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
