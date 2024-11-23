import React, { useState, useEffect } from 'react';
import {
  fetchSedes,
  insertSede,
  updateSede,
  deleteSede,
} from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function SedeForm() {
  const [sedeData, setSedeData] = useState({
    razonsocial: '',
    calle: '',
    ciudad: '',
    numero: '',
    telefono: '',
  });

  const navigate = useNavigate();

  const [sedes, setSedes] = useState([]);

  const loadSedes = async () => {
    try {
      const response = await fetchSedes();
      setSedes(response.data);
    } catch (error) {
      console.error('Error fetching sedes:', error);
    }
  };

  useEffect(() => {
    loadSedes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSedeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSedeInsert = async () => {
    try {
      const { razonsocial, calle, ciudad, numero, telefono } = sedeData;
      await insertSede({ razonsocial, calle, ciudad, numero, telefono });
      alert('Sede insertada');
      loadSedes();
    } catch (error) {
      alert('Error al insertar sede');
    }
  };

  const handleSedeUpdate = async () => {
    try {
      const { razonsocial, calle, ciudad, numero, telefono } = sedeData;
      await updateSede(razonsocial, { calle, ciudad, numero, telefono });
      alert('Sede actualizada');
      loadSedes();
    } catch (error) {
      alert('Error al actualizar sede');
    }
  };

  const handleSedeDelete = async () => {
    try {
      const { razonsocial } = sedeData;
      await deleteSede(razonsocial);
      alert('Sede eliminada');
      loadSedes();
    } catch (error) {
      alert('Error al eliminar sede');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Sedes</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Regresar al Menú
        </button>

        {/* Formulario para insertar sede */}
        <div className="card mb-4">
          <div className="card-header">Sede</div>
          <div className="card-body">
            <div className="form-group">
              <label>Razón Social</label>
              <input
                type="text"
                className="form-control"
                name="razonsocial"
                value={sedeData.razonsocial}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Calle</label>
              <input
                type="text"
                className="form-control"
                name="calle"
                value={sedeData.calle}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Ciudad</label>
              <input
                type="text"
                className="form-control"
                name="ciudad"
                value={sedeData.ciudad}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Número</label>
              <input
                type="text"
                className="form-control"
                name="numero"
                value={sedeData.numero}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={sedeData.telefono}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <button className="btn btn-primary mt-2" onClick={handleSedeInsert}>
              Insertar
            </button>
          </div>
        </div>

        {/* Formulario para actualizar/eliminar sede */}
        <div className="card mb-4">
          <div className="card-header">Actualizar/Eliminar Sede</div>
          <div className="card-body">
            <div className="form-group">
              <label>Razón Social</label>
              <input
                type="text"
                className="form-control"
                name="razonsocial"
                value={sedeData.razonsocial}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="button-group">
              <button
                className="btn btn-success mt-2 mr-2"
                onClick={handleSedeUpdate}
              >
                Actualizar
              </button>
              <button
                className="btn btn-danger mt-2"
                onClick={handleSedeDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h2>Lista de Sedes</h2>
        <table>
          <thead>
            <tr>
              <th>Razón Social</th>
              <th>Calle</th>
              <th>Ciudad</th>
              <th>Número</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {sedes.map((sede) => (
              <tr key={sede.razonsocial}>
                <td>{sede.razonsocial}</td>
                <td>{sede.calle}</td>
                <td>{sede.ciudad}</td>
                <td>{sede.numero}</td>
                <td>{sede.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SedeForm;
