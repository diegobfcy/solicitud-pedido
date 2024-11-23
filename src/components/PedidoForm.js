import React, { useState, useEffect } from 'react';
import {
  fetchPedidos,
  insertPedido,
  updatePedido,
  deletePedido,
} from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function PedidoForm() {
  const [pedidoData, setPedidoData] = useState({
    codigopedido: '',
    correo: '',
    telefono: '',
    nombre: '',
    codigoadministrador: '',
    razonsocialsede: '',
    id: '',
  });

  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  const loadPedidos = async () => {
    try {
      const response = await fetchPedidos();
      setPedidos(response.data);
    } catch (error) {
      console.error('Error fetching pedidos:', error);
    }
  };

  useEffect(() => {
    loadPedidos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPedidoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const { correo, telefono, nombre, codigoadministrador, razonsocialsede } = pedidoData;
      await insertPedido({ correo, telefono, nombre, codigoadministrador, razonsocialsede });
      alert('Pedido insertado');
      loadPedidos();
      setPedidoData({
        codigopedido: '',
        correo: '',
        telefono: '',
        nombre: '',
        codigoadministrador: '',
        razonsocialsede: '',
        id: '',
      });
    } catch (error) {
      alert('Error al insertar pedido');
    }
  };

  const handleUpdate = async () => {
    try {
      const { id, correo, telefono, nombre, codigoadministrador, razonsocialsede } = pedidoData;
      await updatePedido(id, { correo, telefono, nombre, codigoadministrador, razonsocialsede });
      alert('Pedido actualizado');
      loadPedidos();
      setPedidoData({
        codigopedido: '',
        correo: '',
        telefono: '',
        nombre: '',
        codigoadministrador: '',
        razonsocialsede: '',
        id: '',
      });
    } catch (error) {
      alert('Error al actualizar pedido');
    }
  };

  const handleDelete = async () => {
    try {
      const { id } = pedidoData;
      await deletePedido(id);
      alert('Pedido eliminado');
      loadPedidos();
      setPedidoData({
        codigopedido: '',
        correo: '',
        telefono: '',
        nombre: '',
        codigoadministrador: '',
        razonsocialsede: '',
        id: '',
      });
    } catch (error) {
      alert('Error al eliminar pedido');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Pedidos</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Regresar al Menú
        </button>

        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Pedido</div>
            <div className="card-body">
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  value={pedidoData.correo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  value={pedidoData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={pedidoData.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código Administrador</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigoadministrador"
                  value={pedidoData.codigoadministrador}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Razón Social Sede</label>
                <input
                  type="text"
                  className="form-control"
                  name="razonsocialsede"
                  value={pedidoData.razonsocialsede}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary mt-2" onClick={handleInsert}>
                Insertar
              </button>
            </div>
          </div>

          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Actualizar/Eliminar Pedido</div>
            <div className="card-body">
              <div className="form-group">
                <label>ID Pedido</label>
                <input
                  type="text"
                  className="form-control"
                  name="id"
                  value={pedidoData.id}
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
        <h2>Lista de Pedidos</h2>
        <table>
          <thead>
            <tr>
              <th>Código Pedido</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Nombre</th>
              <th>Código Administrador</th>
              <th>Razón Social Sede</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.codigopedido}>
                <td>{pedido.codigopedido}</td>
                <td>{pedido.correo}</td>
                <td>{pedido.telefono}</td>
                <td>{pedido.nombre}</td>
                <td>{pedido.codigoadministrador}</td>
                <td>{pedido.razonsocialsede}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PedidoForm;
