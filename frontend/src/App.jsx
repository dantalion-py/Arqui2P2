import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FormRegister from './components/FormRegister';
import IotDevice from './components/IotDevice'
const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/iotsetting/:id_device" element={<IotDevice />} />
            <Route path="/formRegister" element={<FormRegister />} />
        </Routes>
    </Router>
);

export default App;
