import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [useremail, setUseremail] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [confirmuserpassword, setconfirmUserpassword] = useState('');
    const [Login, setLogin] = useState(true);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (Login) {
            const users = JSON.parse(localStorage.getItem('users')) || [];

            const foundUser = users.find(
                (user) => user.name === useremail && user.password === userpassword
            );

            if (foundUser) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                alert('Login successful!');
                navigate('/todo', { state: { username: useremail } });
            } else {
                alert('Invalid email or password');
            }
        } else {
            if (!useremail.trim() || !userpassword || !confirmuserpassword) {
                alert('Please fill in all fields');
                return;
            }

            if (userpassword !== confirmuserpassword) {
                alert('Passwords do not match');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const existingUser = users.find((user) => user.name === useremail);
            if (existingUser) {
                alert('User already exists!');
                return;
            }
            const newUser = {
                name: useremail,
                password: userpassword,
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Sign up successful! You can now login.');
            setLogin(true); 
            // switch to login mode
            setUseremail('');
            setUserpassword('');
            setconfirmUserpassword('');
        }
    };

    const handleSign = () => {
        setLogin(!Login);
        setUseremail('');
        setUserpassword('');
        setconfirmUserpassword('');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{Login ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={useremail}
                        onChange={(e) => setUseremail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        value={userpassword}
                        onChange={(e) => setUserpassword(e.target.value)}
                    />
                    {!Login && (
                        <input
                            type="password"
                            placeholder="Re-Enter your Password"
                            value={confirmuserpassword}
                            onChange={(e) => setconfirmUserpassword(e.target.value)}
                        />
                    )}
                    {Login ? (
                        <p>
                            Don't have an account?{' '}
                            <span
                                onClick={handleSign}
                                style={{ cursor: 'pointer', color: 'blue' }}
                            >
                                Sign Up
                            </span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <span
                                onClick={handleSign}
                                style={{ cursor: 'pointer', color: 'blue' }}
                            >
                                Login
                            </span>
                        </p>
                    )}
                    <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
