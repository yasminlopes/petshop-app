import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  label: string;
  data: { labels: string[]; values: number[] };
}

const LineChart: React.FC<LineChartProps> = ({ label, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: label,
        data: data.values,
        fill: true, // Preencher abaixo da linha
        backgroundColor: 'rgba(254, 215, 0, 0.3)', // Amarelo alaranjado suave
        borderColor: 'rgba(254, 215, 0, 1)', // Amarelo alaranjado
        tension: 0.4, // Suavizar a linha
        pointBackgroundColor: 'rgba(210, 153, 2, 1)', // Vermelho para os pontos
        pointBorderColor: 'rgba(255, 255, 255, 1)', // Branco para os bordes dos pontos
        pointBorderWidth: 2,
        pointRadius: 5, // Tamanho dos pontos
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
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
