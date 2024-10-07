import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  label: string;
  data: { labels: string[]; values: number[] };
}

const BarChart: React.FC<BarChartProps> = ({ label, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: label,
        data: data.values,
        backgroundColor: [
          'rgba(254, 215, 0, 0.8)', // Amarelo alaranjado
          'rgba(252, 189, 24, 0.8)',    // 
          'rgba(210, 153, 2, 0.8)',  // Tom mais claro de cinza
          'rgba(128, 128, 128, 0.8)', // Cinza
          'rgba(30, 30, 30, 0.8)',    // Quase preto
        ],
        borderColor: [
          'rgba(254, 215, 0, 1)', // Amarelo alaranjado
          'rgba(252, 189, 24, 1)',    // 
          'rgba(210, 153, 2, 1)',  // Tom mais claro de cinza
          'rgba(128, 128, 128, 1)', // Cinza
          'rgba(30, 30, 30, 1)',    // Quase preto
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(128, 128, 128, 0.2)', // Linhas de grade mais sutis
        },
      },
      x: {
        grid: {
          color: 'rgba(128, 128, 128, 0.2)', // Linhas de grade mais sutis
        },
      },
    },
    plugins: {
      legend: {
        display: true, // Exibir a legenda
        labels: {
          color: 'rgba(255, 255, 255, 0.8)', // Cor das legendas
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)', // Fundo dos tooltips
        titleColor: 'rgba(254, 215, 0, 1)', // Cor do título dos tooltips
        bodyColor: 'rgba(255, 255, 255, 1)', // Cor do corpo dos tooltips
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
