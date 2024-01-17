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
import ItemView from './pages/ItemView';
import Register from './pages/Register';
import Login from './pages/Login'
import Logout from './pages/Logout';
import Error from './pages/Error'

export default function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null, loading: true });
  const [carts, setCarts] = useState([]);
  let [cartItemCount, setCartItemCount] = useState(0);
  const [total, setTotal] = useState(0);


  const unsetUser = () => {
    localStorage.clear();
  }

  
  const fetchCartData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        
        // console.log(data)
        if (data.cart){
          setCartItemCount(data.cart.cartItems.length)
          setCarts(data.cart.cartItems);
          setTotal(data.cart.totalPrice);
        } else {
          setCartItemCount()
          // console.log(cartItemCount)
        }
      })
      .catch((error) => {
        // console.error(error);
      });
  };


  useEffect(()=>{
    fetchCartData()
  });



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
          <AppNavbar fetchCartData={fetchCartData} carts={carts} total={total} cartItemCount={cartItemCount}/>
          {!user.loading ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop fetchCartData={fetchCartData} />} />
              <Route path="/products/:productId" element={<ItemView fetchCartData={fetchCartData}/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          ) : (
            <p>Loading...</p>
          )}
        </Container>
      </Router>
    </UserProvider>
  );
}