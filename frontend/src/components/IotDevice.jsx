import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import '../styles/TemperatureDashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TemperatureDashboard = () => {
    const [lastTemperature, setLastTemperature] = useState(null);
    const [lineChartData, setLineChartData] = useState(null);
    const [histogramData, setHistogramData] = useState(null);
    const [error, setError] = useState(null);

    const fetchTemperatureData = async () => {
        try {
            const response = await fetch('http://localhost:5000/temperaturas');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            const latest = data[data.length - 1];
            setLastTemperature(latest);

            setLineChartData({
                labels: data.map((item) =>
                    new Date(item.timestamp).toLocaleTimeString()
                ),
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        data: data.map((item) => item.temperatura),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        tension: 0.3,
                    },
                ],
            });

            const bins = Array(10).fill(0);
            const minTemp = Math.floor(
                Math.min(...data.map((item) => item.temperatura))
            );
            const maxTemp = Math.ceil(
                Math.max(...data.map((item) => item.temperatura))
            );
            const binWidth = (maxTemp - minTemp) / bins.length;

            data.forEach((item) => {
                const binIndex = Math.floor(
                    (item.temperatura - minTemp) / binWidth
                );
                bins[Math.min(binIndex, bins.length - 1)]++;
            });

            setHistogramData({
                labels: bins.map(
                    (_, i) =>
                        `${(minTemp + i * binWidth).toFixed(1)}-${(
                            minTemp +
                            (i + 1) * binWidth
                        ).toFixed(1)}`
                ),
                datasets: [
                    {
                        label: 'Frequency',
                        data: bins,
                        backgroundColor: 'rgba(255,99,132,0.5)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const controlLed = async (ledId, action) => {
        try {
            const response = await fetch(`http://localhost:5000/led/${ledId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            alert(`${data.message}`);
        } catch (err) {
            alert(`Failed to control LED: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchTemperatureData();
        const interval = setInterval(fetchTemperatureData, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="temperature-dashboard">
            <div className="temperature-header">
                {error && <p className="error-message">Error: {error}</p>}
                {lastTemperature ? (
                    <h1>
                        Current Temperature: {lastTemperature.temperatura}°C
                    </h1>
                ) : (
                    <p>Loading temperature...</p>
                )}
            </div>
            <div className="charts-section">
                {lineChartData && (
                    <div className="chart-container">
                        <h2>Temperature Over Time</h2>
                        <Line data={lineChartData} />
                    </div>
                )}
                {histogramData && (
                    <div className="chart-container">
                        <h2>Temperature Distribution</h2>
                        <Bar data={histogramData} />
                    </div>
                )}
            </div>
            <div className="led-control">
                <button onClick={() => controlLed('led1', 'on')}>Turn ON LED 1</button>
                <button onClick={() => controlLed('led1', 'off')}>Turn OFF LED 1</button>
                <button onClick={() => controlLed('led2', 'on')}>Turn ON LED 2</button>
                <button onClick={() => controlLed('led2', 'off')}>Turn OFF LED 2</button>
            </div>
        </div>
    );
};

export default TemperatureDashboard;
