import React, { useState, useEffect } from 'react';
import { fetchJefesTienda, insertJefeTienda, updateJefeTienda, deleteJefeTienda } from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function JefeTiendaForm() {
  const [jefeTiendaData, setJefeTiendaData] = useState({
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
      alert('Jefe de Tienda insertado');
      loadJefesTienda();
      setJefeTiendaData({ correo: '', telefono: '', nombre: '', codigoadministrador: '' });
    } catch (error) {
      alert('Error al insertar Jefe de Tienda');
    }
  };

  const handleUpdate = async () => {
    try {
      const { codigoadministrador, correo, telefono, nombre } = jefeTiendaData;
      await updateJefeTienda(codigoadministrador, { correo, telefono, nombre });
      alert('Jefe de Tienda actualizado');
      loadJefesTienda();
      setJefeTiendaData({ correo: '', telefono: '', nombre: '', codigoadministrador: '' });
    } catch (error) {
      alert('Error al actualizar Jefe de Tienda');
    }
  };

  const handleDelete = async () => {
    try {
      const { codigoadministrador } = jefeTiendaData;
      await deleteJefeTienda(codigoadministrador);
      alert('Jefe de Tienda eliminado');
      loadJefesTienda();
      setJefeTiendaData({ correo: '', telefono: '', nombre: '', codigoadministrador: '' });
    } catch (error) {
      alert('Error al eliminar Jefe de Tienda');
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
                  type="text"
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
                <label>Código Administrador</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigoadministrador"
                  value={jefeTiendaData.codigoadministrador}
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
              <th>Código Administrador</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {jefesTienda.map((jefe) => (
              <tr key={jefe.codigoadministrador}>
                <td>{jefe.codigoadministrador}</td>
                <td>{jefe.correo}</td>
                <td>{jefe.telefono}</td>
                <td>{jefe.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JefeTiendaForm;
