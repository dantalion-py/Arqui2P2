import React, { useState } from 'react';
import '../styles/FormRegister.css';

const FormRegister = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !lastName || !email || !password) {
            setError('All fields are required!');
            return;
        }

        const formData = {
            name: name,
            last_name: lastName,
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:5000/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setError(''); 
                alert("User registered successfully!");
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Error registering user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setError('An error occurred, please try again later');
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <form onSubmit={handleRegister} className="register-form">
                    <h2>Register</h2>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
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
                    <button type="submit" className="register-button" >Register</button>
                </form>
                <a href="/" className="account-link">Already have an account? Log in</a>
            </div>
        </div>
    );
};

export default FormRegister;
