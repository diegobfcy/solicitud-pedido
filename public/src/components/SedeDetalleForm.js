import React, { useState, useEffect } from 'react';
import {
  fetchSedeDetalles,
  insertSedeDetalle,
  updateSedeDetalle,
  deleteSedeDetalle,
} from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function SedeDetalleForm() {
  const [sedeDetalleData, setSedeDetalleData] = useState({
    razonsocial: '',
    departamento: '',
    codigojefetienda: '',
  });

  const navigate = useNavigate();
  const [sedeDetalles, setSedeDetalles] = useState([]);

  const loadSedeDetalles = async () => {
    try {
      const response = await fetchSedeDetalles();
      setSedeDetalles(response.data);
    } catch (error) {
      console.error('Error fetching sede detalles:', error);
    }
  };

  useEffect(() => {
    loadSedeDetalles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSedeDetalleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const { razonsocial, departamento, codigojefetienda } = sedeDetalleData;
      await insertSedeDetalle({ razonsocial, departamento, codigojefetienda });
      alert('Sede Detalle insertado');
      loadSedeDetalles();
      setSedeDetalleData({ razonsocial: '', departamento: '', codigojefetienda: '' });
    } catch (error) {
      alert('Error al insertar Sede Detalle');
    }
  };

  const handleUpdate = async () => {
    try {
      const { razonsocial, departamento, codigojefetienda } = sedeDetalleData;
      await updateSedeDetalle(razonsocial, departamento, { codigojefetienda });
      alert('Sede Detalle actualizado');
      loadSedeDetalles();
      setSedeDetalleData({ razonsocial: '', departamento: '', codigojefetienda: '' });
    } catch (error) {
      alert('Error al actualizar Sede Detalle');
    }
  };

  const handleDelete = async () => {
    try {
      const { razonsocial, departamento } = sedeDetalleData;
      await deleteSedeDetalle(razonsocial, departamento);
      alert('Sede Detalle eliminado');
      loadSedeDetalles();
      setSedeDetalleData({ razonsocial: '', departamento: '', codigojefetienda: '' });
    } catch (error) {
      alert('Error al eliminar Sede Detalle');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Detalles de Sedes</h2>
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          Regresar al Menú
        </button>

        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Sede Detalle</div>
            <div className="card-body">
              <div className="form-group">
                <label>Razón Social</label>
                <input
                  type="text"
                  className="form-control"
                  name="razonsocial"
                  value={sedeDetalleData.razonsocial}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Departamento</label>
                <input
                  type="text"
                  className="form-control"
                  name="departamento"
                  value={sedeDetalleData.departamento}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código del Jefe de Tienda</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigojefetienda"
                  value={sedeDetalleData.codigojefetienda}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary mt-2" onClick={handleInsert}>
                Insertar
              </button>
            </div>
          </div>

          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Actualizar/Eliminar Sede Detalle</div>
            <div className="card-body">
              <div className="form-group">
                <label>Razón Social</label>
                <input
                  type="text"
                  className="form-control"
                  name="razonsocial"
                  value={sedeDetalleData.razonsocial}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Departamento</label>
                <input
                  type="text"
                  className="form-control"
                  name="departamento"
                  value={sedeDetalleData.departamento}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código del Jefe de Tienda</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigojefetienda"
                  value={sedeDetalleData.codigojefetienda}
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
        <h2>Lista de Detalles de Sedes</h2>
        <table>
          <thead>
            <tr>
              <th>Razón Social</th>
              <th>Departamento</th>
              <th>Código del Jefe de Tienda</th>
            </tr>
          </thead>
          <tbody>
            {sedeDetalles.map((detalle) => (
              <tr key={`${detalle.razonsocial}-${detalle.departamento}`}>
                <td>{detalle.razonsocial}</td>
                <td>{detalle.departamento}</td>
                <td>{detalle.codigojefetienda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SedeDetalleForm;
