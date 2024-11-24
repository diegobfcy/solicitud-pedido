import React, { useState, useEffect } from 'react';
import { fetchTelefonos, insertTelefono, updateTelefono, deleteTelefono } from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function TelefonoForm() {
  const [telefonoData, setTelefonoData] = useState({
    codigopedido: '',
    telefono: '',
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
      const { codigopedido, telefono } = telefonoData;
      await insertTelefono({ codigopedido, telefono });
      alert('Teléfono insertado');
      loadTelefonos();
      setTelefonoData({ codigopedido: '', telefono: '' });
    } catch (error) {
      alert('Error al insertar Teléfono');
    }
  };

  const handleUpdate = async () => {
    try {
      const { codigopedido, telefono } = telefonoData;
      await updateTelefono(codigopedido, { telefono });
      alert('Teléfono actualizado');
      loadTelefonos();
      setTelefonoData({ codigopedido: '', telefono: '' });
    } catch (error) {
      alert('Error al actualizar Teléfono');
    }
  };

  const handleDelete = async () => {
    try {
      const { codigopedido } = telefonoData;
      await deleteTelefono(codigopedido);
      alert('Teléfono eliminado');
      loadTelefonos();
      setTelefonoData({ codigopedido: '', telefono: '' });
    } catch (error) {
      alert('Error al eliminar Teléfono');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Teléfonos</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Regresar al Menú
        </button>

        {/* Contenedor principal del formulario */}
        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          {/* Formulario para insertar */}
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Teléfono</div>
            <div className="card-body">
              <div className="form-group">
                <label>Código Pedido</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigopedido"
                  value={telefonoData.codigopedido}
                  onChange={handleInputChange}
                />
              </div>
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
              <button className="btn btn-primary mt-2" onClick={handleInsert}>
                Insertar
              </button>
            </div>
          </div>

          {/* Formulario para actualizar/eliminar */}
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Actualizar/Eliminar Teléfono</div>
            <div className="card-body">
              <div className="form-group">
                <label>Código Pedido</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigopedido"
                  value={telefonoData.codigopedido}
                  onChange={handleInputChange}
                />
              </div>
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
        <h2>Lista de Teléfonos</h2>
        <table>
          <thead>
            <tr>
              <th>Código Pedido</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {telefonos.map((telefono) => (
              <tr key={telefono.codigopedido}>
                <td>{telefono.codigopedido}</td>
                <td>{telefono.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TelefonoForm;
