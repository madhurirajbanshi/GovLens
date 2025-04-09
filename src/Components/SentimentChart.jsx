import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const SentimentChart = () => {
  const [sentimentData, setSentimentData] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  useEffect(() => {
    axios
      .get(
        "https://scrapgov-weapi-service-288217385136.asia-southeast1.run.app/api/article/count"
      )
      .then((res) => {
        setSentimentData({
          positive: res.data.positive || 0,
          negative: res.data.negative || 0,
          neutral: res.data.neutral || 0,
        });
      })
      .catch((err) => console.error("Error fetching sentiment data:", err));
  }, []);

  // Data for the line chart
  const chartData = {
    labels: ["Sentiment"], // You could add more labels for time if needed
    datasets: [
      {
        label: "Positive Sentiment",
        data: [sentimentData.positive], // This is where you add your data points
        borderColor: "#4caf50", // Green color
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Light green
        fill: true, // Fills the area under the line
      },
      {
        label: "Negative Sentiment",
        data: [sentimentData.negative],
        borderColor: "#f44336", // Red color
        backgroundColor: "rgba(244, 67, 54, 0.2)", // Light red
        fill: true,
      },
      {
        label: "Neutral Sentiment",
        data: [sentimentData.neutral],
        borderColor: "#ffeb3b", // Yellow color
        backgroundColor: "rgba(255, 235, 59, 0.2)", // Light yellow
        fill: true,
      },
    ],
  };

  // Options for the line chart
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sentiment Distribution</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default SentimentChart;
