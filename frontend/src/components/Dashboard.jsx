import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import RegisterDevice from './RegisterDevice';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [showForm, setShowForm] = useState(false);



    const fetchDevices = async () => {
        try {
            const response = await fetch('http://35.193.61.252:5000/devices');
            const data = await response.json();
            setDevices(data);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };
    useEffect(() => {fetchDevices()});

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const deleteDevice = async (deviceId) => {
        console.log("ID del dispositivo a eliminar:", deviceId);
        try {
            const response = await fetch(`http://35.193.61.252:5000/devices/${deviceId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchDevices(); 
            } else {
                console.error('Error deleting device');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const openDevice = (device) => {
        navigate(`/iotsetting/${device.id_device}`, { state: { device } });
    };

    return (
        <div className='dashboard-main'>
            <h2 className='title-dashboard'>IoT Admin</h2>
            <button onClick={toggleForm}>
                {showForm ? 'Cancel' : 'Add Device'}
            </button>

            {showForm && <RegisterDevice fetchDevices={fetchDevices} />}
            
            <div className="all-devices">
                {devices.map((device, index) => (
                    <div className="device" key={index}>
                        <h3>{device.name}</h3>
                        <p>Status: <strong className='act_res'>{device.status}</strong></p>
                        <button onClick={() => deleteDevice(device.id_device)}>
                            Remove
                        </button>
                        <button onClick={() => openDevice(device)}>
                            details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
