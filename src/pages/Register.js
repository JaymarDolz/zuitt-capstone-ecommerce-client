import React, { useState, useEffect, useContext  } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import '../styles/Form.css';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

    console.log("confirm " + confirmPassword);
    console.log("pass " + password);
    


    function registerUser(event) {
        event.preventDefault();
        setSubmitButtonClicked(true);
    }

    // ductTape FIX for STILL REGISTERING WHILE confirmPassword at fetch is not equal
    useEffect(() => {
        if (confirmPassword !== password) {
            setMessage("Passwords do not match");
        } else {
            setMessage('');  // Clear the error message if passwords match
        }
    }, [submitButtonClicked]);

    function registerUser(event) {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/`, {
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
            Swal.fire({
                title: `Successfully registered`,
                icon: 'success',
                text: "You are now registered"
              })

            navigate('/login')    

            }  else if (!firstName) {
                setMessage(data.error || data.message);
                document.querySelector('.wrap-input-firstName').classList.add('shake');
      
                setTimeout(() => {
                  document.querySelector('.wrap-input-firstName').classList.remove('shake');
                }, 200);
            } else if (!lastName) {
                setMessage(data.error || data.message);
                document.querySelector('.wrap-input-lastName').classList.add('shake');
      
                setTimeout(() => {
                  document.querySelector('.wrap-input-lastName').classList.remove('shake');
                }, 200);
            } else if (!email) {
                setMessage(data.error || data.message);
                document.querySelector('.wrap-input-email').classList.add('shake');
      
                setTimeout(() => {
                  document.querySelector('.wrap-input-email').classList.remove('shake');
                }, 200);
            } else if (!mobileNo) {
                setMessage(data.error || data.message);
                document.querySelector('.wrap-input-mobileNo').classList.add('shake');
      
                setTimeout(() => {
                  document.querySelector('.wrap-input-mobileNo').classList.remove('shake');
                }, 200);
            } else if (!password) {
                setMessage(data.error || data.message);
                document.querySelector('.wrap-input-password').classList.add('shake');
      
                setTimeout(() => {
                  document.querySelector('.wrap-input-password').classList.remove('shake');
                }, 200);
            } else if (!confirmPassword) {
                setMessage(data.error || data.message);
                document.querySelector('.wrap-input-confirmPassword').classList.add('shake');
      
                setTimeout(() => {
                  document.querySelector('.wrap-input-confirmPassword').classList.remove('shake');
                }, 200);
            } else if (confirmPassword !== password){
                setMessage("Passwords do not match");
                return; 
            } else {
                setMessage(data.error || data.message);
            }
        });
    }

    return (
        (user.id) ?
        <Navigate to="/" />
        :
        <div className="wrap-form">
            <div className="form-overlay"></div>
            <form className="form-card" onSubmit={registerUser}>
            <span className="form-title">Register</span>

            <div className="wrap-input wrap-input-firstName">
                <Form.Label>First Name: </Form.Label>
                <input
                className="input"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div className="wrap-input wrap-input-lastName">
                <Form.Label>Last Name: </Form.Label>
                <input
                className="input"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className="wrap-input wrap-input-email">
                <Form.Label>Email Address: </Form.Label>
                <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="wrap-input wrap-input-mobileNo" >
                <Form.Label>Mobile Number: </Form.Label>
                <input
                className="input"
                type="tel"
                name="mobileNo"
                placeholder="Mobile Number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                />
            </div>

            <div className="wrap-input wrap-input-password">
                <Form.Label>Password: </Form.Label>
                <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="wrap-input wrap-input-confirmPassword">
                <Form.Label>Confirm Password: </Form.Label>
                <input
                className="input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            {message && <div className="alert alert-danger">{message}</div>}
            <div className="container-form-btn gap-3">
                <button className = "form-btn" type="submit" id="submitBtn">Submit</button>
                <Link to="/login" className="form-btn">
                    Log In
                 </Link>
            </div>
            </form>
        </div>

    );
}
