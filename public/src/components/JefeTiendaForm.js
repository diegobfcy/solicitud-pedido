import React, { useState, useEffect } from 'react';
import {
  fetchJefesTienda,
  insertJefeTienda,
  updateJefeTienda,
  deleteJefeTienda,
} from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function JefeTiendaForm() {
  const [jefeTiendaData, setJefeTiendaData] = useState({
    id: '',
    correo: '',
    telefono: '',
    nombre: '',
    codigoadministrador: '',
  });

  const navigate = useNavigate();
  const [jefesTienda, setJefesTienda] = useState([]);

  const loadJefesTienda = async () => {
    try {
      const response = await fetchJefesTienda();
      setJefesTienda(response.data);
    } catch (error) {
      console.error('Error fetching jefes de tienda:', error);
    }
  };

  useEffect(() => {
    loadJefesTienda();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJefeTiendaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const { correo, telefono, nombre, codigoadministrador } = jefeTiendaData;
      await insertJefeTienda({ correo, telefono, nombre, codigoadministrador });
      alert('Jefe de tienda insertado');
      loadJefesTienda();
      setJefeTiendaData({ id: '', correo: '', telefono: '', nombre: '', codigoadministrador: '' });
    } catch (error) {
      alert('Error al insertar jefe de tienda');
    }
  };

  const handleUpdate = async () => {
    try {
      const { id, correo, telefono, nombre, codigoadministrador } = jefeTiendaData;
      await updateJefeTienda(id, { correo, telefono, nombre, codigoadministrador });
      alert('Jefe de tienda actualizado');
      loadJefesTienda();
      setJefeTiendaData({ id: '', correo: '', telefono: '', nombre: '', codigoadministrador: '' });
    } catch (error) {
      alert('Error al actualizar jefe de tienda');
    }
  };

  const handleDelete = async () => {
    try {
      const { id } = jefeTiendaData;
      await deleteJefeTienda(id);
      alert('Jefe de tienda eliminado');
      loadJefesTienda();
      setJefeTiendaData({ id: '', correo: '', telefono: '', nombre: '', codigoadministrador: '' });
    } catch (error) {
      alert('Error al eliminar jefe de tienda');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Jefes de Tienda</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Regresar al Menú
        </button>

        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Jefe de Tienda</div>
            <div className="card-body">
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  value={jefeTiendaData.correo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  value={jefeTiendaData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={jefeTiendaData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código Administrador</label>
                <input
                  type="number"
                  className="form-control"
                  name="codigoadministrador"
                  value={jefeTiendaData.codigoadministrador}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary mt-2" onClick={handleInsert}>
                Insertar
              </button>
            </div>
          </div>

          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Actualizar/Eliminar Jefe de Tienda</div>
            <div className="card-body">
              <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  value={jefeTiendaData.id}
                  onChange={handleInputChange}
                />
              </div>
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
        <h2>Lista de Jefes de Tienda</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Código Empleado</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Nombre</th>
              <th>Código Administrador</th>
            </tr>
          </thead>
          <tbody>
            {jefesTienda.map((jefe) => (
              <tr key={jefe.id}>
                <td>{jefe.id}</td>
                <td>{jefe.codigoempleado}</td>
                <td>{jefe.correo}</td>
                <td>{jefe.telefono}</td>
                <td>{jefe.nombre}</td>
                <td>{jefe.codigoadministrador}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JefeTiendaForm;
