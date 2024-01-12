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
import Register from './pages/Register';
import Login from './pages/Login'
import Logout from './pages/Logout';

function App() {

    const[user, setUser] = useState({id: null, isAdmin: null})
    const unsetUser = () => {
        localStorage.clear();
    }


    useEffect(() => {
      console.log(user);
      console.log(localStorage);
    },[user]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('access') }`
            }
            })
        .then(res => res.json())
        .then(data => {
            if (data.user){
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                })
            } else {
                setUser({
                    id: null,
                    isAdmin: null
                })
            }
        })
    },[])






  // XML Page
    return (
        <UserProvider value = {{user, setUser, unsetUser}}>
        
          <Router>
          {/*note the forward slash after appNavbar*/}

            <Container fluid>
              <AppNavbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />


              </Routes>
            </Container>
          </Router>

        </UserProvider>

    );
}

export default App;
