import React, { useState, useEffect } from 'react';
import {
  fetchAdministradores,
  insertAdministrador,
  updateAdministrador,
  deleteAdministrador,
} from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function AdministradorForm() {
  const [adminData, setAdminData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    id: '',
  });

  const navigate = useNavigate();

  const [administradores, setAdministradores] = useState([]);

  const loadAdministradores = async () => {
    try {
      const response = await fetchAdministradores();
      setAdministradores(response.data);
    } catch (error) {
      console.error('Error fetching administradores:', error);
    }
  };

  useEffect(() => {
    loadAdministradores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminInsert = async () => {
    try {
      const { nombre, telefono, correo } = adminData;
      await insertAdministrador({ nombre, telefono, correo });
      alert('Administrador insertado');
      loadAdministradores();
    } catch (error) {
      alert('Error al insertar Administrador');
    }
  };

  const handleAdminUpdate = async () => {
    try {
      const { id, nombre, telefono, correo } = adminData;
      await updateAdministrador(id, { nombre, telefono, correo });
      alert('Administrador actualizado');
      loadAdministradores();
    } catch (error) {
      alert('Error al actualizar Administrador');
    }
  };

  const handleAdminDelete = async () => {
    try {
      const { id } = adminData;
      await deleteAdministrador(id);
      alert('Administrador eliminado');
      loadAdministradores();
    } catch (error) {
      alert('Error al eliminar Administrador');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Administradores</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Regresar al Menú
        </button>

        {/* Formulario para insertar administrador */}
        <div className="card mb-4">
          <div className="card-header">Administrador</div>
          <div className="card-body">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={adminData.nombre}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={adminData.telefono}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input
                type="email"
                className="form-control"
                name="correo"
                value={adminData.correo}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <button className="btn btn-primary mt-2" onClick={handleAdminInsert}>
              Insertar
            </button>
          </div>
        </div>

        {/* Formulario para actualizar/eliminar administrador */}
        <div className="card mb-4">
          <div className="card-header">Actualizar/Eliminar Administrador</div>
          <div className="card-body">
            <div className="form-group">
              <label>ID Administrador</label>
              <input
                type="text"
                className="form-control"
                name="id"
                value={adminData.id}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="button-group">
              <button
                className="btn btn-success mt-2 mr-2"
                onClick={handleAdminUpdate}
              >
                Actualizar
              </button>
              <button
                className="btn btn-danger mt-2"
                onClick={handleAdminDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h2>Lista de Administradores</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {administradores.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.nombre}</td>
                <td>{admin.telefono}</td>
                <td>{admin.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdministradorForm;