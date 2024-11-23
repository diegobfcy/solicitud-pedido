import React, { useState, useEffect } from 'react';
import { fetchDetalles, insertDetalle, updateDetalle, deleteDetalle } from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function DetalleForm() {
  const [detalleData, setDetalleData] = useState({
    marca: '',
    tipo: '',
    cantidad: '',
    codigopedido: '',
    id: '',
  });

  const navigate = useNavigate();

  const [detalles, setDetalles] = useState([]);

  const loadDetalles = async () => {
    try {
      const response = await fetchDetalles();
      setDetalles(response.data);
    } catch (error) {
      console.error('Error fetching detalles:', error);
    }
  };

  useEffect(() => {
    loadDetalles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetalleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const { marca, tipo, cantidad, codigopedido } = detalleData;
      await insertDetalle({ marca, tipo, cantidad, codigopedido });
      alert('Detalle insertado');
      loadDetalles();
    } catch (error) {
      alert('Error al insertar Detalle');
    }
  };

  const handleUpdate = async () => {
    try {
      const { id, marca, tipo, cantidad, codigopedido } = detalleData;
      await updateDetalle(id, { marca, tipo, cantidad, codigopedido });
      alert('Detalle actualizado');
      loadDetalles();
    } catch (error) {
      alert('Error al actualizar Detalle');
    }
  };

  const handleDelete = async () => {
    try {
      const { id } = detalleData;
      await deleteDetalle(id);
      alert('Detalle eliminado');
      loadDetalles();
    } catch (error) {
      alert('Error al eliminar Detalle');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Detalles</h2>
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          Regresar al Menú
        </button>

        <div className="card mb-4">
          <div className="card-header">Detalle</div>
          <div className="card-body">
            <div className="form-group">
              <label>Marca</label>
              <input
                type="text"
                className="form-control"
                name="marca"
                value={detalleData.marca}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <input
                type="text"
                className="form-control"
                name="tipo"
                value={detalleData.tipo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Cantidad</label>
              <input
                type="number"
                className="form-control"
                name="cantidad"
                value={detalleData.cantidad}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Código Pedido</label>
              <input
                type="number"
                className="form-control"
                name="codigopedido"
                value={detalleData.codigopedido}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn btn-primary mt-2" onClick={handleInsert}>
              Insertar
            </button>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Actualizar/Eliminar Detalle</div>
          <div className="card-body">
            <div className="form-group">
              <label>ID Detalle</label>
              <input
                type="text"
                className="form-control"
                name="id"
                value={detalleData.id}
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

      <div className="table-container">
        <h2>Lista de Detalles</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Código Pedido</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((detalle) => (
              <tr key={detalle.id}>
                <td>{detalle.id}</td>
                <td>{detalle.marca}</td>
                <td>{detalle.tipo}</td>
                <td>{detalle.cantidad}</td>
                <td>{detalle.codigopedido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetalleForm;
