import React, { useState, useEffect } from 'react';
import { fetchProveedores, insertProveedor, updateProveedor, deleteProveedor } from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function ProveedoresForm() {
  const [proveedorData, setProveedorData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ruc: '',
  });

  const navigate = useNavigate();
  const [proveedores, setProveedores] = useState([]);

  const loadProveedores = async () => {
    try {
      const response = await fetchProveedores();
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching proveedores:', error);
    }
  };

  useEffect(() => {
    loadProveedores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProveedorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const { nombre, telefono, direccion, ruc } = proveedorData;
      await insertProveedor({ nombre, telefono, direccion, ruc });
      alert('Proveedor insertado');
      loadProveedores();
      setProveedorData({ nombre: '', telefono: '', direccion: '', ruc: '' });
    } catch (error) {
      alert('Error al insertar Proveedor');
    }
  };

  const handleUpdate = async () => {
    try {
      const { ruc, nombre, telefono, direccion } = proveedorData;
      await updateProveedor(ruc, { nombre, telefono, direccion });
      alert('Proveedor actualizado');
      loadProveedores();
      setProveedorData({ nombre: '', telefono: '', direccion: '', ruc: '' });
    } catch (error) {
      alert('Error al actualizar Proveedor');
    }
  };

  const handleDelete = async () => {
    try {
      const { ruc } = proveedorData;
      await deleteProveedor(ruc);
      alert('Proveedor eliminado');
      loadProveedores();
      setProveedorData({ nombre: '', telefono: '', direccion: '', ruc: '' });
    } catch (error) {
      alert('Error al eliminar Proveedor');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Proveedores</h2>
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          Regresar al Menú
        </button>

        {/* Contenedor principal del formulario */}
        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          {/* Formulario para insertar */}
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Proveedor</div>
            <div className="card-body">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={proveedorData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  value={proveedorData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={proveedorData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>RUC</label>
                <input
                  type="text"
                  className="form-control"
                  name="ruc"
                  value={proveedorData.ruc}
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
            <div className="card-header">Actualizar/Eliminar Proveedor</div>
            <div className="card-body">
              <div className="form-group">
                <label>RUC</label>
                <input
                  type="text"
                  className="form-control"
                  name="ruc"
                  value={proveedorData.ruc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={proveedorData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  value={proveedorData.telefono}
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
        <h2>Lista de Proveedores</h2>
        <table>
          <thead>
            <tr>
              <th>RUC</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.ruc}>
                <td>{proveedor.ruc}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProveedoresForm;
