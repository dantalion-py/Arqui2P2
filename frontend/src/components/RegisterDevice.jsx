import React, { useState } from 'react';
import '../styles/Dashboard.css';

const RegisterDevice = ({ fetchDevices }) => {
    const [formData, setFormData] = useState({
        name: '',
        status: 'active',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return alert('Device name is required');
        try {
            const response = await fetch('http://35.193.61.252:5000/devices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({ name: '', status: 'active' });
                fetchDevices(); 
            } else {
                console.error('Error adding device:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding device:', error);
        }
    };

    return (
        <div className="dashboard-devices">
            <div className="add-device-form">
                <h3>Add New Device</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Device Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter device name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <button type="submit">Add Device</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterDevice;
