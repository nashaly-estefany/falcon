import React, { useState } from 'react';
import ConsultarPersonData from './ConsultarPersonData'; // Importar el componente de personas
import EnviarSensorData from './EnviarSensorData'; // Mantener el componente de envío de datos
import { AquaTic_backend } from 'declarations/AquaTic_backend';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [personData, setPersonData] = useState(null); // Cambiar sensorData a personData
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AquaTic_backend.fetchSensorData(); // Llamada al backend
      const parsedResponse = JSON.parse(response); // Parsear la cadena JSON a un objeto
      setPersonData(parsedResponse); // Guardar los datos en el estado
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <h1 className="text-center">FALCON</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Obtener Datos Recabados</h2>
          <div className="d-flex justify-content-center mb-3">
            <button className="btn btn-primary" onClick={fetchData}>
              Obtener Datos
            </button>
            <button className="btn btn-secondary ml-2" onClick={() => navigate('/graficas')}>
              Ver Gráficas
            </button>
          </div>
          {loading && <div className="spinner-container">Consultando información...</div>}
          {error && <p className="text-danger mt-3">{error}</p>}
          <ConsultarPersonData personData={personData} /> {/* Usar el componente para mostrar datos de personas */}
        </div>
        <div className="col-md-6">
          <EnviarSensorData />
        </div>
      </div>
    </div>
  );
};

export default Home;
