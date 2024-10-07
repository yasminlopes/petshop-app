import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  label: string;
  data: { labels: string[], values: number[] };
}

const PieChart: React.FC<PieChartProps> = ({ label, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: label,
        data: data.values,
        backgroundColor: [
          'rgba(254, 215, 0, 0.8)', // Amarelo alaranjado
          'rgba(252, 189, 24, 0.8)',    // 
          'rgba(210, 153, 2, 0.8)', // Cinza claro
          'rgba(128, 128, 128, 0.8)', // Cinza escuro
          'rgba(30, 30, 30, 0.8)',    // Quase preto
        ],
        borderColor: [
          'rgba(254, 215, 0, 1)', // Amarelo alaranjado
          'rgba(252, 189, 24, 1)',    // 
          'rgba(210, 153, 2, 1)', // Cinza claro
          'rgba(128, 128, 128, 1)', // Cinza escuro
          'rgba(30, 30, 30, 1)',    // Quase preto
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
