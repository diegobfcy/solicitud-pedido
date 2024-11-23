import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchProveedorDetalles,
  insertProveedorDetalle,
  updateProveedorDetalle,
  deleteProveedorDetalle,
} from '../apiService';
import './Form.css';

function ProveedorDetalleForm() {
  const [proveedorDetalleData, setProveedorDetalleData] = useState({
    telefono: '',
    direccion: '',
    ruc: '',
  });

  const navigate = useNavigate();

  const [proveedorDetalles, setProveedorDetalles] = useState([]);

  const loadProveedorDetalles = async () => {
    try {
      const response = await fetchProveedorDetalles();
      setProveedorDetalles(response.data);
    } catch (error) {
      console.error('Error fetching proveedor detalles:', error);
    }
  };

  useEffect(() => {
    loadProveedorDetalles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProveedorDetalleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const { telefono, direccion, ruc } = proveedorDetalleData;
      await insertProveedorDetalle({ telefono, direccion, ruc });
      alert('ProveedorDetalle insertado');
      loadProveedorDetalles();
    } catch (error) {
      alert('Error al insertar ProveedorDetalle');
    }
  };

  const handleUpdate = async () => {
    try {
      const { telefono, direccion, ruc } = proveedorDetalleData;
      await updateProveedorDetalle(telefono, { direccion, ruc });
      alert('ProveedorDetalle actualizado');
      loadProveedorDetalles();
    } catch (error) {
      alert('Error al actualizar ProveedorDetalle');
    }
  };

  const handleDelete = async () => {
    try {
      const { telefono } = proveedorDetalleData;
      await deleteProveedorDetalle(telefono);
      alert('ProveedorDetalle eliminado');
      loadProveedorDetalles();
    } catch (error) {
      alert('Error al eliminar ProveedorDetalle');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Detalles de Proveedores</h2>
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          Regresar al Menú
        </button>

        <div className="form-group-container">
          {/* Formulario para insertar */}
          <div className="form-card">
            <div className="form-header">Proveedor Detalle</div>
            <div className="form-body">
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={proveedorDetalleData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={proveedorDetalleData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>RUC</label>
                <input
                  type="text"
                  name="ruc"
                  value={proveedorDetalleData.ruc}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary mt-2" onClick={handleInsert}>
                Insertar
              </button>
            </div>
          </div>

          {/* Formulario para actualizar/eliminar */}
          <div className="form-card">
            <div className="form-header">Actualizar/Eliminar Proveedor Detalle</div>
            <div className="form-body">
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={proveedorDetalleData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={proveedorDetalleData.direccion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>RUC</label>
                <input
                  type="text"
                  name="ruc"
                  value={proveedorDetalleData.ruc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="button-group">
                <button
                  className="btn btn-success mt-2 mr-2"
                  onClick={handleUpdate}
                >
                  Actualizar
                </button>
                <button
                  className="btn btn-danger mt-2"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h2>Lista de Detalles de Proveedores</h2>
        <table>
          <thead>
            <tr>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>RUC</th>
            </tr>
          </thead>
          <tbody>
            {proveedorDetalles.map((detalle) => (
              <tr key={detalle.telefono}>
                <td>{detalle.telefono}</td>
                <td>{detalle.direccion}</td>
                <td>{detalle.ruc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProveedorDetalleForm;
