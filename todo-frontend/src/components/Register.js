import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('All fields must be filled out.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Registration failed');
                return;
            }

            setErrorMessage('');
            navigate('/login');
        } catch (error) {
            setErrorMessage('Network error. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Create an Account</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="register-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="register-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-input"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="register-input"
                />
                <button onClick={handleRegister} className="register-button">
                    Register
                </button>
                <div className="login-link">
                    <p>Already have an account?</p>
                    <button onClick={() => navigate('/login')} className="login-button">
                        Login
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Register;
