import React, { useState, useEffect } from 'react';
import { fetchDirecciones, insertDireccion, updateDireccion, deleteDireccion } from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function DireccionForm() {
  const [direccionData, setDireccionData] = useState({
    ruc: '',
    direccion: '',
  });

  const navigate = useNavigate();
  const [direcciones, setDirecciones] = useState([]);

  const loadDirecciones = async () => {
    try {
      const response = await fetchDirecciones();
      setDirecciones(response.data);
    } catch (error) {
      console.error('Error fetching direcciones:', error);
    }
  };

  useEffect(() => {
    loadDirecciones();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDireccionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const { ruc, direccion } = direccionData;
      await insertDireccion({ ruc, direccion });
      alert('Dirección insertada');
      loadDirecciones();
      setDireccionData({ ruc: '', direccion: '' });
    } catch (error) {
      alert('Error al insertar Dirección');
    }
  };

  const handleUpdate = async () => {
    try {
      const { ruc, direccion } = direccionData;
      await updateDireccion(ruc, { direccion });
      alert('Dirección actualizada');
      loadDirecciones();
      setDireccionData({ ruc: '', direccion: '' });
    } catch (error) {
      alert('Error al actualizar Dirección');
    }
  };

  const handleDelete = async () => {
    try {
      const { ruc } = direccionData;
      await deleteDireccion(ruc);
      alert('Dirección eliminada');
      loadDirecciones();
      setDireccionData({ ruc: '', direccion: '' });
    } catch (error) {
      alert('Error al eliminar Dirección');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Direcciones</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Regresar al Menú
        </button>

        {/* Contenedor principal del formulario */}
        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          {/* Formulario para insertar */}
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Dirección</div>
            <div className="card-body">
              <div className="form-group">
                <label>RUC</label>
                <input
                  type="text"
                  className="form-control"
                  name="ruc"
                  value={direccionData.ruc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={direccionData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary mt-2" onClick={handleInsert}>
                Insertar
              </button>
            </div>
          </div>

          {/* Formulario para actualizar/eliminar */}
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Actualizar/Eliminar Dirección</div>
            <div className="card-body">
              <div className="form-group">
                <label>RUC</label>
                <input
                  type="text"
                  className="form-control"
                  name="ruc"
                  value={direccionData.ruc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="button-group">
                <button className="btn btn-success mt-2" onClick={handleUpdate}>
                  Actualizar
                </button>
                <button className="btn btn-danger mt-2" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h2>Lista de Direcciones</h2>
        <table>
          <thead>
            <tr>
              <th>RUC</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {direcciones.map((direccion) => (
              <tr key={direccion.ruc}>
                <td>{direccion.ruc}</td>
                <td>{direccion.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DireccionForm;
