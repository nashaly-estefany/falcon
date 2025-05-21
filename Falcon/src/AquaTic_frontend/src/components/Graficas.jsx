import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { AquaTic_backend } from 'declarations/AquaTic_backend';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Graficas = () => {
  const [personData, setPersonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llama a la función del backend para obtener los datos JSON
        const response = await AquaTic_backend.fetchSensorData();
        const parsedResponse = JSON.parse(response); // Parsea el JSON retornado por el backend
        setPersonData(parsedResponse); // Guarda los datos en el estado
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Gráfica de Edades
  const ageData = {
    labels: personData.map(person => `ID: ${person.id}`), // Usa el ID como etiquetas
    datasets: [
      {
        label: 'Edad',
        data: personData.map(person => person.edad), // Mapea la edad de cada persona
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  // Gráfica de Emociones
  const emotionCounts = personData.reduce((acc, person) => {
    acc[person.emocion] = (acc[person.emocion] || 0) + 1;
    return acc;
  }, {});

  const emotionData = {
    labels: Object.keys(emotionCounts), // Usa las emociones como etiquetas
    datasets: [
      {
        label: 'Emociones',
        data: Object.values(emotionCounts), // Cuenta cuántas veces aparece cada emoción
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 2000,
    },
  };

  return (
    <div className="container mt-5">
      <h1>Gráficas de Datos de Personas</h1>
      {loading ? (
        <p>Consultando información...</p>
      ) : (
        <div className="charts-grid">
          <div className="chart-item">
            <h2>Edades</h2>
            <Bar data={ageData} options={chartOptions} />
          </div>
          <div className="chart-item">
            <h2>Emociones</h2>
            <Pie data={emotionData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Graficas;
