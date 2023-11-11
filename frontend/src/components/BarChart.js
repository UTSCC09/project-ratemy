import React from 'react';
import { Bar } from 'react-chartjs-2';
const ratingsMappings = {
    difficulty: "Difficulty of content",
    quality_of_teaching: "Quality of teaching",
    staff_responsiveness: "Teaching team responsiveness",
    usefulness_real_world: "Usefulness in real world",
    workload: "Workload",
};

const BarChart = ({ data }) => {
    return (
        <div className="flex flex-wrap">
            {Object.entries(data).map(([subfield, values]) => (
                <div key={subfield} className="chart-container m-3">
                    {/* <h2>{subfield}</h2> */}
                    <Bar
                        // Citation: https://www.educative.io/answers/how-to-use-chartjs-to-create-charts-in-react
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
                        // Citation: https://www.chartjs.org/docs/latest/configuration/title.html
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: `${ratingsMappings[subfield]}`,
                                },
                            },
                            scales: {
                                y: {
                                    type: 'linear',
                                    beginAtZero: true,
                                },
                            },
                            responsive: true,
                        }}
                        width={200}
                        height={200}
                    />
                </div>
            ))}
        </div>
    );
};

export default BarChart;