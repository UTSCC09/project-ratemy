import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
    // const chartData = {
    //     labels: Object.keys(data),
    //     datasets: [{
    //         label: 'Count',
    //         data: Object.values(data),
    //         backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust the color as needed
    //         borderColor: 'rgba(75, 192, 192, 1)', // Adjust the color as needed
    //         borderWidth: 1,
    //     }],
    // };

    // const options = {
    //     scales: {
    //         y: { beginAtZero: true },
    //     },
    // };

    return (
        <div>
            {Object.entries(data).map(([subfield, values]) => (
                <div key={subfield} className="chart-container">
                    <h2>{subfield}</h2>
                    <Bar
                        data={{
                            labels: Object.keys(values),
                            datasets: [{
                                label: 'Count',
                                data: Object.values(values),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            }],
                        }}
                        options={{
                            scales: {
                                y: {
                                    type: 'linear',
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default BarChart;