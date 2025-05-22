import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import './Dashboard.css';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        if (!loggedInEmail) {
            navigate('/login');
            return;
        }

        fetch(`http://localhost:8080/api/users/by-email?email=${encodeURIComponent(loggedInEmail)}`)
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch user data');
                return response.json();
            })
            .then(data => {
                if (data) {
                    setUser(data);
                } else {
                    setErrorMessage('User not found');
                }
                setLoading(false);
            })
            .catch(() => {
                setErrorMessage('Error fetching user data');
                setLoading(false);
            });
    }, [navigate]);

    if (loading) return <div className="dashboard-container"><p className="loading-text">Loading...</p></div>;

    if (errorMessage) return <div className="dashboard-container"><p className="error-message">{errorMessage}</p></div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2 className="dashboard-title">Welcome, {user.name}!</h2>
                <TodoList user={user} />
            </div>
        </div>
    );
}

export default Dashboard;
