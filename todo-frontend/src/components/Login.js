import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrorMessage('');
        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('loggedInEmail', user.email);
                navigate('/dashboard');
            } else {
                const error = await response.text();
                setErrorMessage(error || 'Login failed');
            }
        } catch (error) {
            setErrorMessage('Network error');
        }
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome to TodoApp</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>
                <p className="login-text">Don't have an account?</p>
                <button className="register-button" onClick={goToRegister}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Login;
