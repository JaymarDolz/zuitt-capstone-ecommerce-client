import React, { useState, useContext } from 'react';
import { Navigate, Link} from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import '../styles/Form.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');


  // useEffect(() => {
  //   setIsActive(email !== '' && password !== '');
  // }, [email, password]);

  const retrieveUserDetails = (access) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
        });

      });
  };

  function loginUser(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access) {
          setEmail('');
          setPassword('');
          localStorage.setItem('access', data.access);
          retrieveUserDetails(data.access);
          Swal.fire({
            title: `Welcome!`,
            icon: 'success',
            text: "You are now logged In"
          })
        } else if (!email) {
          setMessage(data.error || data.message);
          document.querySelector('.wrap-input-email').classList.add('shake');

          setTimeout(() => {
            document.querySelector('.wrap-input-email').classList.remove('shake');
          }, 200);
        } else if (!password) {
          setMessage(data.error || data.message);
          document.querySelector('.wrap-input-password').classList.add('shake');

          setTimeout(() => {
            document.querySelector('.wrap-input-password').classList.remove('shake');
          }, 200);
        } else {
          setMessage(data.error || data.message);
        }
      });
  }




  return (
    user.id ? (
      <Navigate to="/" />
    ) : (
      <div>
      <div className="wrap-form">
        <div className="form-overlay"></div>
        <form className="form-card" >
          <span className="form-title">Log in</span>
          <div className="wrap-input wrap-input-email">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="wrap-input wrap-input-password">
            <input
              className="input"
              type="password"
              name="pass"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {message && <div className="alert alert-danger">{message}</div>}
          <div className="container-form-btn gap-3">
              <button className="form-btn" onClick={loginUser} id="submitBtn">
                Submit
              </button>
              <Link to="/register" className="form-btn">
                Sign Up
              </Link>
            </div>
        </form>
      </div>
      </div>
    )
  );
}
