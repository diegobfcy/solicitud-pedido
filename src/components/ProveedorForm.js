import React, { useState, useEffect } from 'react';
import {
  fetchProveedores,
  insertProveedor,
  updateProveedor,
  deleteProveedor,
} from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function ProveedorForm() {
  const [proveedorData, setProveedorData] = useState({
    ruc: '',
    razonsocial: '',
    correo: '',
    id: '',
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
      const { ruc, razonsocial, correo } = proveedorData;
      await insertProveedor({ ruc, razonsocial, correo });
      alert('Proveedor insertado');
      loadProveedores();
      setProveedorData({ ruc: '', razonsocial: '', correo: '', id: '' });
    } catch (error) {
      alert('Error al insertar proveedor');
    }
  };

  const handleUpdate = async () => {
    try {
      const { id, ruc, razonsocial, correo } = proveedorData;
      await updateProveedor(id, { ruc, razonsocial, correo });
      alert('Proveedor actualizado');
      loadProveedores();
      setProveedorData({ ruc: '', razonsocial: '', correo: '', id: '' });
    } catch (error) {
      alert('Error al actualizar proveedor');
    }
  };

  const handleDelete = async () => {
    try {
      const { id } = proveedorData;
      await deleteProveedor(id);
      alert('Proveedor eliminado');
      loadProveedores();
      setProveedorData({ ruc: '', razonsocial: '', correo: '', id: '' });
    } catch (error) {
      alert('Error al eliminar proveedor');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Proveedores</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Regresar al Menú
        </button>

        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Proveedor</div>
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
                <label>Razón Social</label>
                <input
                  type="text"
                  className="form-control"
                  name="razonsocial"
                  value={proveedorData.razonsocial}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  value={proveedorData.correo}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary mt-2" onClick={handleInsert}>
                Insertar
              </button>
            </div>
          </div>

          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Actualizar/Eliminar Proveedor</div>
            <div className="card-body">
              <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  value={proveedorData.id}
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
              <th>Razón Social</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.ruc}</td>
                <td>{proveedor.razonsocial}</td>
                <td>{proveedor.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProveedorForm;
