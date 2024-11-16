// src/App.js

import React, { useState } from 'react';
import './App.css';
import {
  insertAdministrador,
  updateAdministrador,
  deleteAdministrador,
  insertJefeTienda,
  updateJefeTienda,
  deleteJefeTienda,
  insertSede,
  updateSede,
  deleteSede,
  insertProveedor,
  updateProveedor,
  deleteProveedor,
  insertPedido,
  updatePedido,
  deletePedido,
  insertDetalle,
  updateDetalle,
  deleteDetalle,
  insertRecibe,
  deleteRecibe,
  insertTelefono,
  updateTelefono,
  deleteTelefono,
  insertDireccion,
  updateDireccion,
  deleteDireccion,
  insertProveedorDetalle,
  updateProveedorDetalle,
  deleteProveedorDetalle,
  insertSedeDetalle,
  updateSedeDetalle,
  deleteSedeDetalle,
} from './apiService';

function App() {
  // Estados para cada formulario

  // Administrador
  const [adminData, setAdminData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    id: '',
  });

  // Jefe de Tienda
  const [jefeTiendaData, setJefeTiendaData] = useState({
    correo: '',
    telefono: '',
    nombre: '',
    codigoadministrador: '',
    id: '',
  });

  // Sede
  const [sedeData, setSedeData] = useState({
    razonsocial: '',
    calle: '',
    ciudad: '',
    numero: '',
    telefono: '',
  });

  // Proveedor
  const [proveedorData, setProveedorData] = useState({
    ruc: '',
    razonsocial: '',
    correo: '',
  });

  // Pedido
  const [pedidoData, setPedidoData] = useState({
    correo: '',
    telefono: '',
    nombre: '',
    codigoadministrador: '',
    razonsocialsede: '',
    id: '',
  });

  // Detalle
  const [detalleData, setDetalleData] = useState({
    marca: '',
    tipo: '',
    cantidad: '',
    codigopedido: '',
    id: '',
  });

  // Recibe
  const [recibeData, setRecibeData] = useState({
    rucproveedor: '',
    codigopedido: '',
  });

  // Teléfono
  const [telefonoData, setTelefonoData] = useState({
    telefono: '',
    id: '',
  });

  // Dirección
  const [direccionData, setDireccionData] = useState({
    ruc: '',
    direccion: '',
  });

  // ProveedorDetalle
  const [proveedorDetalleData, setProveedorDetalleData] = useState({
    telefono: '',
    direccion: '',
    ruc: '',
  });

  // SedeDetalle
  const [sedeDetalleData, setSedeDetalleData] = useState({
    razonsocial: '',
    departamento: '',
    codigojefetienda: '',
  });

  // Manejo de cambios en los formularios
  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  // Funciones para Administrador
  const handleAdminInsert = async () => {
    try {
      const { nombre, telefono, correo } = adminData;
      const response = await insertAdministrador({ nombre, telefono, correo });
      alert(`Administrador insertado con ID: ${response.data.codigoadministrador}`);
    } catch (error) {
      console.error(error);
      alert('Error al insertar Administrador');
    }
  };

  const handleAdminUpdate = async () => {
    try {
      const { id, nombre, telefono, correo } = adminData;
      await updateAdministrador(id, { nombre, telefono, correo });
      alert('Administrador actualizado');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar Administrador');
    }
  };

  const handleAdminDelete = async () => {
    try {
      const { id } = adminData;
      await deleteAdministrador(id);
      alert('Administrador eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar Administrador');
    }
  };

  // Funciones para Jefe de Tienda
  const handleJefeTiendaInsert = async () => {
    try {
      const { correo, telefono, nombre, codigoadministrador } = jefeTiendaData;
      const response = await insertJefeTienda({ correo, telefono, nombre, codigoadministrador });
      alert(`Jefe de Tienda insertado con ID: ${response.data.codigoempleado}`);
    } catch (error) {
      console.error(error);
      alert('Error al insertar Jefe de Tienda');
    }
  };

  const handleJefeTiendaUpdate = async () => {
    try {
      const { id, correo, telefono, nombre, codigoadministrador } = jefeTiendaData;
      await updateJefeTienda(id, { correo, telefono, nombre, codigoadministrador });
      alert('Jefe de Tienda actualizado');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar Jefe de Tienda');
    }
  };

  const handleJefeTiendaDelete = async () => {
    try {
      const { id } = jefeTiendaData;
      await deleteJefeTienda(id);
      alert('Jefe de Tienda eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar Jefe de Tienda');
    }
  };

  // Funciones para Sede
  const handleSedeInsert = async () => {
    try {
      const { razonsocial, calle, ciudad, numero, telefono } = sedeData;
      await insertSede({ razonsocial, calle, ciudad, numero, telefono });
      alert('Sede insertada');
    } catch (error) {
      console.error(error);
      alert('Error al insertar Sede');
    }
  };

  const handleSedeUpdate = async () => {
    try {
      const { razonsocial, calle, ciudad, numero, telefono } = sedeData;
      await updateSede(razonsocial, { calle, ciudad, numero, telefono });
      alert('Sede actualizada');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar Sede');
    }
  };

  const handleSedeDelete = async () => {
    try {
      const { razonsocial } = sedeData;
      await deleteSede(razonsocial);
      alert('Sede eliminada');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar Sede');
    }
  };

  // Funciones para Proveedor
  const handleProveedorInsert = async () => {
    try {
      const { ruc, razonsocial, correo } = proveedorData;
      await insertProveedor({ ruc, razonsocial, correo });
      alert('Proveedor insertado');
    } catch (error) {
      console.error(error);
      alert('Error al insertar Proveedor');
    }
  };

  const handleProveedorUpdate = async () => {
    try {
      const { ruc, razonsocial, correo } = proveedorData;
      await updateProveedor(ruc, { razonsocial, correo });
      alert('Proveedor actualizado');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar Proveedor');
    }
  };

  const handleProveedorDelete = async () => {
    try {
      const { ruc } = proveedorData;
      await deleteProveedor(ruc);
      alert('Proveedor eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar Proveedor');
    }
  };

  // Funciones para Pedido
  const handlePedidoInsert = async () => {
    try {
      const { correo, telefono, nombre, codigoadministrador, razonsocialsede } = pedidoData;
      const response = await insertPedido({ correo, telefono, nombre, codigoadministrador, razonsocialsede });
      alert(`Pedido insertado con ID: ${response.data.codigopedido}`);
    } catch (error) {
      console.error(error);
      alert('Error al insertar Pedido');
    }
  };

  const handlePedidoUpdate = async () => {
    try {
      const { id, correo, telefono, nombre, codigoadministrador, razonsocialsede } = pedidoData;
      await updatePedido(id, { correo, telefono, nombre, codigoadministrador, razonsocialsede });
      alert('Pedido actualizado');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar Pedido');
    }
  };

  const handlePedidoDelete = async () => {
    try {
      const { id } = pedidoData;
      await deletePedido(id);
      alert('Pedido eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar Pedido');
    }
  };

  // Funciones para Detalle
  const handleDetalleInsert = async () => {
    try {
      const { marca, tipo, cantidad, codigopedido } = detalleData;
      const response = await insertDetalle({ marca, tipo, cantidad, codigopedido });
      alert(`Detalle insertado con ID: ${response.data.codigodetalle}`);
    } catch (error) {
      console.error(error);
      alert('Error al insertar Detalle');
    }
  };

  const handleDetalleUpdate = async () => {
    try {
      const { id, marca, tipo, cantidad, codigopedido } = detalleData;
      await updateDetalle(id, { marca, tipo, cantidad, codigopedido });
      alert('Detalle actualizado');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar Detalle');
    }
  };

  const handleDetalleDelete = async () => {
    try {
      const { id } = detalleData;
      await deleteDetalle(id);
      alert('Detalle eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar Detalle');
    }
  };

  // Funciones para Recibe
  const handleRecibeInsert = async () => {
    try {
      const { rucproveedor, codigopedido } = recibeData;
      await insertRecibe({ rucproveedor, codigopedido });
      alert('Recibe insertado');
    } catch (error) {
      console.error(error);
      alert('Error al insertar Recibe');
    }
  };

  const handleRecibeDelete = async () => {
    try {
      const { rucproveedor, codigopedido } = recibeData;
      await deleteRecibe(rucproveedor, codigopedido);
      alert('Recibe eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar Recibe');
    }
  };

  // Funciones para Teléfono
  const handleTelefonoInsert = async () => {
    try {
      const { telefono } = telefonoData;
      const response = await insertTelefono({ telefono });
      alert(`Teléfono insertado con ID: ${response.data.codigopedido}`);
    } catch (error) {
      console.error(error);
      alert('Error al insertar Teléfono');
    }
  };

  const handleTelefonoUpdate = async () => {
    try {
      const { id, telefono } = telefonoData;
      await updateTelefono(id, { telefono });
      alert('Teléfono actualizado');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar Teléfono');
    }
  };

  const handleTelefonoDelete = async () => {
    try {
      const { id } = telefonoData;
      await deleteTelefono(id);
      alert('Teléfono eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar Teléfono');
    }
  };

  // Funciones para Dirección
  const handleDireccionInsert = async () => {
    try {
      const { ruc, direccion } = direccionData;
      await insertDireccion({ ruc, direccion });
      alert('Dirección insertada');
    } catch (error) {
      console.error(error);
      alert('Error al insertar Dirección');
    }
  };

  const handleDireccionUpdate = async () => {
    try {
      const { ruc, direccion } = direccionData;
      await updateDireccion(ruc, { direccion });
      alert('Dirección actualizada');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar Dirección');
    }
  };

  const handleDireccionDelete = async () => {
    try {
      const { ruc } = direccionData;
      await deleteDireccion(ruc);
      alert('Dirección eliminada');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar Dirección');
    }
  };

  // Funciones para ProveedorDetalle
  const handleProveedorDetalleInsert = async () => {
    try {
      const { telefono, direccion, ruc } = proveedorDetalleData;
      await insertProveedorDetalle({ telefono, direccion, ruc });
      alert('ProveedorDetalle insertado');
    } catch (error) {
      console.error(error);
      alert('Error al insertar ProveedorDetalle');
    }
  };

  const handleProveedorDetalleUpdate = async () => {
    try {
      const { telefono, direccion, ruc } = proveedorDetalleData;
      await updateProveedorDetalle(telefono, { direccion, ruc });
      alert('ProveedorDetalle actualizado');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar ProveedorDetalle');
    }
  };

  const handleProveedorDetalleDelete = async () => {
    try {
      const { telefono } = proveedorDetalleData;
      await deleteProveedorDetalle(telefono);
      alert('ProveedorDetalle eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar ProveedorDetalle');
    }
  };

  // Funciones para SedeDetalle
  const handleSedeDetalleInsert = async () => {
    try {
      const { razonsocial, departamento, codigojefetienda } = sedeDetalleData;
      await insertSedeDetalle({ razonsocial, departamento, codigojefetienda });
      alert('SedeDetalle insertado');
    } catch (error) {
      console.error(error);
      alert('Error al insertar SedeDetalle');
    }
  };

  const handleSedeDetalleUpdate = async () => {
    try {
      const { razonsocial, departamento, codigojefetienda } = sedeDetalleData;
      await updateSedeDetalle(razonsocial, departamento, { codigojefetienda });
      alert('SedeDetalle actualizado');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar SedeDetalle');
    }
  };

  const handleSedeDetalleDelete = async () => {
    try {
      const { razonsocial, departamento } = sedeDetalleData;
      await deleteSedeDetalle(razonsocial, departamento);
      alert('SedeDetalle eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar SedeDetalle');
    }
  };

  // Retornar el JSX con todos los formularios
  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Aplicación de Consumo de API</h1>

      {/* Formulario para Administrador */}
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
              onChange={(e) => handleInputChange(e, setAdminData)}
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={adminData.telefono}
              onChange={(e) => handleInputChange(e, setAdminData)}
            />
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={adminData.correo}
              onChange={(e) => handleInputChange(e, setAdminData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleAdminInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar Administrador */}
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
              onChange={(e) => handleInputChange(e, setAdminData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handleAdminUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleAdminDelete}>
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario para Jefe de Tienda */}
      <div className="card mb-4">
        <div className="card-header">Jefe de Tienda</div>
        <div className="card-body">
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={jefeTiendaData.correo}
              onChange={(e) => handleInputChange(e, setJefeTiendaData)}
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={jefeTiendaData.telefono}
              onChange={(e) => handleInputChange(e, setJefeTiendaData)}
            />
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={jefeTiendaData.nombre}
              onChange={(e) => handleInputChange(e, setJefeTiendaData)}
            />
          </div>
          <div className="form-group">
            <label>Código Administrador</label>
            <input
              type="number"
              className="form-control"
              name="codigoadministrador"
              value={jefeTiendaData.codigoadministrador}
              onChange={(e) => handleInputChange(e, setJefeTiendaData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleJefeTiendaInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar Jefe de Tienda */}
      <div className="card mb-4">
        <div className="card-header">Actualizar/Eliminar Jefe de Tienda</div>
        <div className="card-body">
          <div className="form-group">
            <label>ID Empleado</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={jefeTiendaData.id}
              onChange={(e) => handleInputChange(e, setJefeTiendaData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handleJefeTiendaUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleJefeTiendaDelete}>
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario para Sede */}
      <div className="card mb-4">
        <div className="card-header">Sede</div>
        <div className="card-body">
          <div className="form-group">
            <label>Razón Social</label>
            <input
              type="text"
              className="form-control"
              name="razonsocial"
              value={sedeData.razonsocial}
              onChange={(e) => handleInputChange(e, setSedeData)}
            />
          </div>
          <div className="form-group">
            <label>Calle</label>
            <input
              type="text"
              className="form-control"
              name="calle"
              value={sedeData.calle}
              onChange={(e) => handleInputChange(e, setSedeData)}
            />
          </div>
          <div className="form-group">
            <label>Ciudad</label>
            <input
              type="text"
              className="form-control"
              name="ciudad"
              value={sedeData.ciudad}
              onChange={(e) => handleInputChange(e, setSedeData)}
            />
          </div>
          <div className="form-group">
            <label>Número</label>
            <input
              type="text"
              className="form-control"
              name="numero"
              value={sedeData.numero}
              onChange={(e) => handleInputChange(e, setSedeData)}
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={sedeData.telefono}
              onChange={(e) => handleInputChange(e, setSedeData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleSedeInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar Sede */}
      <div className="card mb-4">
        <div className="card-header">Actualizar/Eliminar Sede</div>
        <div className="card-body">
          <div className="form-group">
            <label>Razón Social</label>
            <input
              type="text"
              className="form-control"
              name="razonsocial"
              value={sedeData.razonsocial}
              onChange={(e) => handleInputChange(e, setSedeData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handleSedeUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleSedeDelete}>
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario para Proveedor */}
      <div className="card mb-4">
        <div className="card-header">Proveedor</div>
        <div className="card-body">
          <div className="form-group">
            <label>RUC</label>
            <input
              type="text"
              className="form-control"
              name="ruc"
              value={proveedorData.ruc}
              onChange={(e) => handleInputChange(e, setProveedorData)}
            />
          </div>
          <div className="form-group">
            <label>Razón Social</label>
            <input
              type="text"
              className="form-control"
              name="razonsocial"
              value={proveedorData.razonsocial}
              onChange={(e) => handleInputChange(e, setProveedorData)}
            />
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={proveedorData.correo}
              onChange={(e) => handleInputChange(e, setProveedorData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleProveedorInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar Proveedor */}
      <div className="card mb-4">
        <div className="card-header">Actualizar/Eliminar Proveedor</div>
        <div className="card-body">
          <div className="form-group">
            <label>RUC</label>
            <input
              type="text"
              className="form-control"
              name="ruc"
              value={proveedorData.ruc}
              onChange={(e) => handleInputChange(e, setProveedorData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handleProveedorUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleProveedorDelete}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">Pedido</div>
        <div className="card-body">
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={pedidoData.correo}
              onChange={(e) => handleInputChange(e, setPedidoData)}
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={pedidoData.telefono}
              onChange={(e) => handleInputChange(e, setPedidoData)}
            />
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={pedidoData.nombre}
              onChange={(e) => handleInputChange(e, setPedidoData)}
            />
          </div>
          <div className="form-group">
            <label>Código Administrador</label>
            <input
              type="number"
              className="form-control"
              name="codigoadministrador"
              value={pedidoData.codigoadministrador}
              onChange={(e) => handleInputChange(e, setPedidoData)}
            />
          </div>
          <div className="form-group">
            <label>Razón Social Sede</label>
            <input
              type="text"
              className="form-control"
              name="razonsocialsede"
              value={pedidoData.razonsocialsede}
              onChange={(e) => handleInputChange(e, setPedidoData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handlePedidoInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar Pedido */}
      <div className="card mb-4">
        <div className="card-header">Actualizar/Eliminar Pedido</div>
        <div className="card-body">
          <div className="form-group">
            <label>ID Pedido</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={pedidoData.id}
              onChange={(e) => handleInputChange(e, setPedidoData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handlePedidoUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handlePedidoDelete}>
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario para Detalle */}
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
              onChange={(e) => handleInputChange(e, setDetalleData)}
            />
          </div>
          <div className="form-group">
            <label>Tipo</label>
            <input
              type="text"
              className="form-control"
              name="tipo"
              value={detalleData.tipo}
              onChange={(e) => handleInputChange(e, setDetalleData)}
            />
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input
              type="number"
              className="form-control"
              name="cantidad"
              value={detalleData.cantidad}
              onChange={(e) => handleInputChange(e, setDetalleData)}
            />
          </div>
          <div className="form-group">
            <label>Código Pedido</label>
            <input
              type="number"
              className="form-control"
              name="codigopedido"
              value={detalleData.codigopedido}
              onChange={(e) => handleInputChange(e, setDetalleData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleDetalleInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar Detalle */}
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
              onChange={(e) => handleInputChange(e, setDetalleData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handleDetalleUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleDetalleDelete}>
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario para Recibe */}
      <div className="card mb-4">
        <div className="card-header">Recibe</div>
        <div className="card-body">
          <div className="form-group">
            <label>RUC Proveedor</label>
            <input
              type="text"
              className="form-control"
              name="rucproveedor"
              value={recibeData.rucproveedor}
              onChange={(e) => handleInputChange(e, setRecibeData)}
            />
          </div>
          <div className="form-group">
            <label>Código Pedido</label>
            <input
              type="number"
              className="form-control"
              name="codigopedido"
              value={recibeData.codigopedido}
              onChange={(e) => handleInputChange(e, setRecibeData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleRecibeInsert}>
            Insertar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleRecibeDelete}>
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario para Teléfono */}
      <div className="card mb-4">
        <div className="card-header">Teléfono</div>
        <div className="card-body">
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={telefonoData.telefono}
              onChange={(e) => handleInputChange(e, setTelefonoData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleTelefonoInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar Teléfono */}
      <div className="card mb-4">
        <div className="card-header">Actualizar/Eliminar Teléfono</div>
        <div className="card-body">
          <div className="form-group">
            <label>ID Pedido</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={telefonoData.id}
              onChange={(e) => handleInputChange(e, setTelefonoData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handleTelefonoUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleTelefonoDelete}>
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario para Dirección */}
      <div className="card mb-4">
        <div className="card-header">Dirección</div>
        <div className="card-body">
          <div className="form-group">
            <label>RUC</label>
            <input
              type="text"
              className="form-control"
              name="ruc"
              value={direccionData.ruc}
              onChange={(e) => handleInputChange(e, setDireccionData)}
            />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={direccionData.direccion}
              onChange={(e) => handleInputChange(e, setDireccionData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleDireccionInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar Dirección */}
      <div className="card mb-4">
        <div className="card-header">Actualizar/Eliminar Dirección</div>
        <div className="card-body">
          <div className="form-group">
            <label>RUC</label>
            <input
              type="text"
              className="form-control"
              name="ruc"
              value={direccionData.ruc}
              onChange={(e) => handleInputChange(e, setDireccionData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handleDireccionUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleDireccionDelete}>
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario para ProveedorDetalle */}
      <div className="card mb-4">
        <div className="card-header">Proveedor Detalle</div>
        <div className="card-body">
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={proveedorDetalleData.telefono}
              onChange={(e) => handleInputChange(e, setProveedorDetalleData)}
            />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={proveedorDetalleData.direccion}
              onChange={(e) => handleInputChange(e, setProveedorDetalleData)}
            />
          </div>
          <div className="form-group">
            <label>RUC</label>
            <input
              type="text"
              className="form-control"
              name="ruc"
              value={proveedorDetalleData.ruc}
              onChange={(e) => handleInputChange(e, setProveedorDetalleData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleProveedorDetalleInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar ProveedorDetalle */}
      <div className="card mb-4">
        <div className="card-header">Actualizar/Eliminar Proveedor Detalle</div>
        <div className="card-body">
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={proveedorDetalleData.telefono}
              onChange={(e) => handleInputChange(e, setProveedorDetalleData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handleProveedorDetalleUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleProveedorDetalleDelete}>
            Eliminar
          </button>
        </div>
      </div>

      {/* Formulario para SedeDetalle */}
      <div className="card mb-4">
        <div className="card-header">Sede Detalle</div>
        <div className="card-body">
          <div className="form-group">
            <label>Razón Social</label>
            <input
              type="text"
              className="form-control"
              name="razonsocial"
              value={sedeDetalleData.razonsocial}
              onChange={(e) => handleInputChange(e, setSedeDetalleData)}
            />
          </div>
          <div className="form-group">
            <label>Departamento</label>
            <input
              type="text"
              className="form-control"
              name="departamento"
              value={sedeDetalleData.departamento}
              onChange={(e) => handleInputChange(e, setSedeDetalleData)}
            />
          </div>
          <div className="form-group">
            <label>Código Jefe Tienda</label>
            <input
              type="number"
              className="form-control"
              name="codigojefetienda"
              value={sedeDetalleData.codigojefetienda}
              onChange={(e) => handleInputChange(e, setSedeDetalleData)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleSedeDetalleInsert}>
            Insertar
          </button>
        </div>
      </div>

      {/* Actualizar/Eliminar SedeDetalle */}
      <div className="card mb-4">
        <div className="card-header">Actualizar/Eliminar Sede Detalle</div>
        <div className="card-body">
          <div className="form-group">
            <label>Razón Social</label>
            <input
              type="text"
              className="form-control"
              name="razonsocial"
              value={sedeDetalleData.razonsocial}
              onChange={(e) => handleInputChange(e, setSedeDetalleData)}
            />
          </div>
          <div className="form-group">
            <label>Departamento</label>
            <input
              type="text"
              className="form-control"
              name="departamento"
              value={sedeDetalleData.departamento}
              onChange={(e) => handleInputChange(e, setSedeDetalleData)}
            />
          </div>
          <button className="btn btn-success mt-2 mr-2" onClick={handleSedeDetalleUpdate}>
            Actualizar
          </button>
          <button className="btn btn-danger mt-2" onClick={handleSedeDetalleDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
