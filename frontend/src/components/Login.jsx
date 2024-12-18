import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError('Email and Password are required');
            return;
        }
    
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
    
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            navigate('/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };
    

    const handleCreateAccount = () => {
        navigate('/FormRegister');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <h2 className="Leders">Login</h2>
                    {error && <p className="error-message">{error}</p>} {}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <button
                        type="button"
                        className="newAccount-button"
                        onClick={handleCreateAccount}
                    >
                        Create Account
                    </button>
                </form>
            </div>
            <div className="image-container">
                <img
                    src="https://raw.githubusercontent.com/laynH/Anime-Girls-Holding-Programming-Books/master/C%2B%2B/Sakura_Nene_CPP.jpg"
                    alt="Description"
                    className="login-image"
                />
            </div>
        </div>
    );
};

export default Login;
