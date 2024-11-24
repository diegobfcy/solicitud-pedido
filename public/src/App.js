import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Menu from './components/Menu';
import ProveedorForm from './components/ProveedorForm';
import PedidoForm from './components/PedidoForm';
import DetalleForm from './components/DetalleForm';
import RecibeForm from './components/RecibeForm';
import TelefonoForm from './components/TelefonoForm';
import DireccionForm from './components/DireccionForm';
import ProveedorDetalleForm from './components/ProveedorDetalleForm';
import SedeDetalleForm from './components/SedeDetalleForm';
import JefeTiendaForm from './components/JefeTiendaForm';
import SedeForm from './components/SedeForm';
import AdministradorForm from './components/AdministradorForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />

        <Route path="/administrador" element={<AdministradorForm />} />
        <Route path="/jefe-tienda" element={<JefeTiendaForm />} />
        <Route path="/sede" element={<SedeForm />} />
        <Route path="/proveedor" element={<ProveedorForm />} />
        <Route path="/pedido" element={<PedidoForm />} />
        <Route path="/detalle" element={<DetalleForm />} />
        <Route path="/recibe" element={<RecibeForm />} />
        <Route path="/telefono" element={<TelefonoForm />} />
        <Route path="/direccion" element={<DireccionForm />} />
        <Route path="/proveedor-detalle" element={<ProveedorDetalleForm />} />
        <Route path="/sede-detalle" element={<SedeDetalleForm />} />
      </Routes>
    </Router>
  );
}

export default App;
