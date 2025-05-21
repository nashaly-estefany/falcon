import React, { useEffect } from 'react';

const ConsultarPersonData = ({ personData }) => {
  useEffect(() => {
    if (personData) {
      const tableContainer = document.querySelector('.table-container');
      if (tableContainer) {
        tableContainer.classList.add('show');
      }
    }
  }, [personData]);

  return (
    <div className="d-flex justify-content-center">
      <div className="table-container">
        {personData && (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-sm custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Edad</th>
                  <th>Sexo</th>
                  <th>Emoción</th>
                </tr>
              </thead>
              <tbody>
                {personData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.edad}</td>
                    <td>{data.sexo}</td>
                    <td>{data.emocion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultarPersonData;
