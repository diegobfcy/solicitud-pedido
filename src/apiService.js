// src/apiService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Ajusta si tu API está en otro puerto

// tblAdministrador
export const insertAdministrador = (data) => {
  return axios.post(`${API_BASE_URL}/administrador`, data);
};

export const updateAdministrador = (id, data) => {
  return axios.put(`${API_BASE_URL}/administrador/${id}`, data);
};

export const deleteAdministrador = (id) => {
  return axios.delete(`${API_BASE_URL}/administrador/${id}`);
};

// tblJefeTienda
export const insertJefeTienda = (data) => {
  return axios.post(`${API_BASE_URL}/jefetienda`, data);
};

export const updateJefeTienda = (id, data) => {
  return axios.put(`${API_BASE_URL}/jefetienda/${id}`, data);
};

export const deleteJefeTienda = (id) => {
  return axios.delete(`${API_BASE_URL}/jefetienda/${id}`);
};

// tblSede
export const insertSede = (data) => {
  return axios.post(`${API_BASE_URL}/sede`, data);
};

export const updateSede = (razonSocial, data) => {
  return axios.put(`${API_BASE_URL}/sede/${encodeURIComponent(razonSocial)}`, data);
};

export const deleteSede = (razonSocial) => {
  return axios.delete(`${API_BASE_URL}/sede/${encodeURIComponent(razonSocial)}`);
};

// tblProveedor
export const insertProveedor = (data) => {
  return axios.post(`${API_BASE_URL}/proveedor`, data);
};

export const updateProveedor = (ruc, data) => {
  return axios.put(`${API_BASE_URL}/proveedor/${encodeURIComponent(ruc)}`, data);
};

export const deleteProveedor = (ruc) => {
  return axios.delete(`${API_BASE_URL}/proveedor/${encodeURIComponent(ruc)}`);
};

// tblPedido
export const insertPedido = (data) => {
  return axios.post(`${API_BASE_URL}/pedido`, data);
};

export const updatePedido = (id, data) => {
  return axios.put(`${API_BASE_URL}/pedido/${id}`, data);
};

export const deletePedido = (id) => {
  return axios.delete(`${API_BASE_URL}/pedido/${id}`);
};

// tblDetalle
export const insertDetalle = (data) => {
  return axios.post(`${API_BASE_URL}/detalle`, data);
};

export const updateDetalle = (id, data) => {
  return axios.put(`${API_BASE_URL}/detalle/${id}`, data);
};

export const deleteDetalle = (id) => {
  return axios.delete(`${API_BASE_URL}/detalle/${id}`);
};

// tblRecibe
export const insertRecibe = (data) => {
  return axios.post(`${API_BASE_URL}/recibe`, data);
};

export const deleteRecibe = (rucProveedor, codigoPedido) => {
  return axios.delete(`${API_BASE_URL}/recibe/${encodeURIComponent(rucProveedor)}/${codigoPedido}`);
};

// tblTelefono
export const insertTelefono = (data) => {
  return axios.post(`${API_BASE_URL}/telefono`, data);
};

export const updateTelefono = (id, data) => {
  return axios.put(`${API_BASE_URL}/telefono/${id}`, data);
};

export const deleteTelefono = (id) => {
  return axios.delete(`${API_BASE_URL}/telefono/${id}`);
};

// tblDireccion
export const insertDireccion = (data) => {
  return axios.post(`${API_BASE_URL}/direccion`, data);
};

export const updateDireccion = (ruc, data) => {
  return axios.put(`${API_BASE_URL}/direccion/${encodeURIComponent(ruc)}`, data);
};

export const deleteDireccion = (ruc) => {
  return axios.delete(`${API_BASE_URL}/direccion/${encodeURIComponent(ruc)}`);
};

// tblProveedorDetalle
export const insertProveedorDetalle = (data) => {
  return axios.post(`${API_BASE_URL}/proveedordetalle`, data);
};

export const updateProveedorDetalle = (telefono, data) => {
  return axios.put(`${API_BASE_URL}/proveedordetalle/${encodeURIComponent(telefono)}`, data);
};

export const deleteProveedorDetalle = (telefono) => {
  return axios.delete(`${API_BASE_URL}/proveedordetalle/${encodeURIComponent(telefono)}`);
};

// tblSedeDetalle
export const insertSedeDetalle = (data) => {
  return axios.post(`${API_BASE_URL}/sededetalle`, data);
};

export const updateSedeDetalle = (razonSocial, departamento, data) => {
  return axios.put(`${API_BASE_URL}/sededetalle/${encodeURIComponent(razonSocial)}/${encodeURIComponent(departamento)}`, data);
};

export const deleteSedeDetalle = (razonSocial, departamento) => {
  return axios.delete(`${API_BASE_URL}/sededetalle/${encodeURIComponent(razonSocial)}/${encodeURIComponent(departamento)}`);
};
