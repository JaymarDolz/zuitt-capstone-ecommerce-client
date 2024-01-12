import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';



import UserContext from '../UserContext';
import '../styles/Form.css';





export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

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
        console.log(user);
        });
    };

    function loginUser(event){
           
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {'Content-Type' : "application/json"},
            body: JSON.stringify({
                email: email,
                password: password 
            })

        }) 
        .then((response) => response.json()) 
        .then((data) => {

            if (data.access) {
                setEmail('');
                setPassword('');
                
                localStorage.setItem('access', data.access);
                retrieveUserDetails(data.access);

                alert('Login Successful');

            } else {
                  alert(data.error || 'Login Failed');
            }
        }); // retrieve the data
    }

    return (

        (user.id)?
        <Navigate to="/"/>
        :
        <div className="wrap-login100">
            <form className="login100-form validate-form" onSubmit={loginUser}>
                <span className="login100-form-title">Log in</span>
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                    <input
                        className="input100"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                    <input
                        className="input100"
                        type="password"
                        name="pass"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
