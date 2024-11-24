import React, { useState, useEffect } from 'react';
import {
  fetchRecibe,
  insertRecibe,
  deleteRecibe,
} from '../apiService';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function RecibeForm() {
  const [recibeData, setRecibeData] = useState({
    rucproveedor: '',
    codigopedido: '',
  });

  const navigate = useNavigate();
  const [recibeList, setRecibeList] = useState([]);

  const loadRecibe = async () => {
    try {
      const response = await fetchRecibe();
      setRecibeList(response.data);
    } catch (error) {
      console.error('Error fetching recibe:', error);
    }
  };

  useEffect(() => {
    loadRecibe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecibeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInsert = async () => {
    try {
      const { rucproveedor, codigopedido } = recibeData;
      await insertRecibe({ rucproveedor, codigopedido });
      alert('Recibe insertado');
      loadRecibe();
      setRecibeData({ rucproveedor: '', codigopedido: '' });
    } catch (error) {
      alert('Error al insertar recibe');
    }
  };

  const handleDelete = async () => {
    try {
      const { rucproveedor, codigopedido } = recibeData;
      await deleteRecibe(rucproveedor, codigopedido);
      alert('Recibe eliminado');
      loadRecibe();
      setRecibeData({ rucproveedor: '', codigopedido: '' });
    } catch (error) {
      alert('Error al eliminar recibe');
    }
  };

  return (
    <div className="form-and-table-container">
      <div className="form-container">
        <h2>Gestión de Recibe</h2>
        <button className="back-button" onClick={() => navigate('/')}>
          Regresar al Menú
        </button>

        <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Recibe</div>
            <div className="card-body">
              <div className="form-group">
                <label>RUC Proveedor</label>
                <input
                  type="text"
                  className="form-control"
                  name="rucproveedor"
                  value={recibeData.rucproveedor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código Pedido</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigopedido"
                  value={recibeData.codigopedido}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary mt-2" onClick={handleInsert}>
                Insertar
              </button>
            </div>
          </div>

          <div className="card mb-4" style={{ flex: 1 }}>
            <div className="card-header">Eliminar Recibe</div>
            <div className="card-body">
              <div className="form-group">
                <label>RUC Proveedor</label>
                <input
                  type="text"
                  className="form-control"
                  name="rucproveedor"
                  value={recibeData.rucproveedor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Código Pedido</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigopedido"
                  value={recibeData.codigopedido}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-danger mt-2" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h2>Lista de Registros de Recibe</h2>
        <table>
          <thead>
            <tr>
              <th>RUC Proveedor</th>
              <th>Código Pedido</th>
            </tr>
          </thead>
          <tbody>
            {recibeList.map((recibe) => (
              <tr key={`${recibe.rucproveedor}-${recibe.codigopedido}`}>
                <td>{recibe.rucproveedor}</td>
                <td>{recibe.codigopedido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecibeForm;
