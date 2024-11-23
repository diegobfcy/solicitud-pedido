import React, { useState, useEffect } from 'react';
import { fetchTelefonos, insertTelefono, updateTelefono, deleteTelefono } from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function TelefonoForm() {
  const [telefonoData, setTelefonoData] = useState({
    telefono: '',
    id: '',
  });

  const navigate = useNavigate();

  const [telefonos, setTelefonos] = useState([]);

  const loadTelefonos = async () => {
    try {
      const response = await fetchTelefonos();
      setTelefonos(response.data);
    } catch (error) {
      console.error('Error fetching telefonos:', error);
    }
  };

  useEffect(() => {
    loadTelefonos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTelefonoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const { telefono } = telefonoData;
      await insertTelefono({ telefono });
      alert('Teléfono insertado');
      loadTelefonos();
    } catch (error) {
      alert('Error al insertar Teléfono');
    }
  };

  const handleUpdate = async () => {
    try {
      const { id, telefono } = telefonoData;
      await updateTelefono(id, { telefono });
      alert('Teléfono actualizado');
      loadTelefonos();
    } catch (error) {
      alert('Error al actualizar Teléfono');
    }
  };

  const handleDelete = async () => {
    try {
      const { id } = telefonoData;
      await deleteTelefono(id);
      alert('Teléfono eliminado');
      loadTelefonos();
    } catch (error) {
      alert('Error al eliminar Teléfono');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Teléfonos</h2>
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          Regresar al Menú
        </button>

        <div className="card mb-4">
          <div className="card-header">Teléfono</div>
          <div className="card-body">
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={telefonoData.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>ID</label>
              <input
                type="text"
                className="form-control"
                name="id"
                value={telefonoData.id}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-group">
              <button className="btn btn-primary mt-2" onClick={handleInsert}>
                Insertar
              </button>
              <button className="btn btn-success mt-2 mr-2" onClick={handleUpdate}>
                Actualizar
              </button>
              <button className="btn btn-danger mt-2" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h2>Lista de Teléfonos</h2>
        <table>
          <thead>
            <tr>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {telefonos.map((tel) => (
              <tr key={tel.telefono}>
                <td>{tel.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TelefonoForm;
