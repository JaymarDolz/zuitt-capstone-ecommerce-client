import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import UserContext from '../UserContext';
import '../styles/Form.css';

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsActive(
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      password >= 8 &&
      confirmPassword !== "" &&
      mobileNo.length == 11 &&
      password === confirmPassword
    );
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          setFirstName('');
          setLastName('');
          setEmail('');
          setMobileNo('');
          setPassword('');
          setConfirmPassword('');
          alert("Registration Successful");
        } else {
          alert(data.error || 'Login Failed');
        }
      });
  }

  return (
    (user.id) ?
      <Navigate to="/" />
      :
      <div className="wrap-login100">
        <form className="login100-form validate-form" onSubmit={registerUser}>
          <span className="login100-form-title">Register</span>

          <div className="wrap-input100 validate-input" data-validate="Enter first name">
            <Form.Label>First Name: </Form.Label>
            <input
              className="input100"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="wrap-input100 validate-input" data-validate="Enter last name">
            <Form.Label>Last Name: </Form.Label>
            <input
              className="input100"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="wrap-input100 validate-input" data-validate="Enter email">
            <Form.Label>Email Address: </Form.Label>
            <input
              className="input100"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="wrap-input100 validate-input" data-validate="Enter mobile number">
            <Form.Label>Mobile Number: </Form.Label>
            <input
              className="input100"
              type="tel"
              name="mobileNo"
              placeholder="Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>

          <div className="wrap-input100 validate-input" data-validate="Enter password">
            <Form.Label>Password: </Form.Label>
            <input
              className="input100"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="wrap-input100 validate-input" data-validate="Enter password confirmation">
            <Form.Label>Confirm Password: </Form.Label>
            <input
              className="input100"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="container-login100-form-btn">
              {
                  isActive === true ?
                  <button className = "login100-form-btn" type="submit" id="submitBtn">Submit</button>
                  :
                  <button className = "login100-form-btn-disabled" type="submit" id="submitBtn" disabled>Submit</button>
              }

          </div>
        </form>
      </div>
      
  );
}
