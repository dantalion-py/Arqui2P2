import React from 'react';
import { useLocation } from 'react-router-dom'; 
import '../styles/IotDevice.css';
const IotSetting = () => {
    const location = useLocation(); 
    const { device } = location.state || {}; 

    if (!device) {
        return <div className="error-message">Device not found.</div>;
    }

    const { id_device, name, status } = device;

    return (
        <div className="iot-settings-container">
            <div className="iot-settings-header">
                <h2>Device Settings</h2>
                <p>Manage and configure the settings of your IoT device.</p>
            </div>
            <div className="iot-settings-details">
                <h3>Device ID: <span>{id_device}</span></h3>
                <h3>Name: <span>{name}</span></h3>
                <h3>Status: <span>{status}</span></h3>
            </div>
            <div className="iot-settings-actions">
                <button className="action-button">Edit Settings</button>
                <button className="action-button">Delete Device</button>
            </div>
        </div>
    );
};

export default IotSetting;
