// dependencies
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {UserProvider} from './UserContext'

// files
import './App.css';
import AppNavbar from './components/AppNavbar'
import Home from './pages/Home';
import Shop from './pages/Shop';
import Register from './pages/Register';
import Login from './pages/Login'
import Logout from './pages/Logout';

export default function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null, loading: true });
  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin,
            loading: false
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
            loading: false
          });
        }
      })
      .catch(error => {
        console.error("Error fetching user details:", error);
        setUser({
          id: null,
          isAdmin: null,
          loading: false
        });
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar />
          {!user.loading ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />

            </Routes>
          ) : (
            <p>Loading...</p>
          )}
        </Container>
      </Router>
    </UserProvider>
  );
}