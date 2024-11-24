import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <div className="container">
      <h1 className="menu-title">Menú Principal</h1>

      <nav className="menu">
        <div className="menu-column">
          <h2 className="menu-subtitle">Gestión de Personal</h2>
          <Link to="/administrador" className="menu-item">Administrador</Link>
          <Link to="/jefe-tienda" className="menu-item">Jefe de Tienda</Link>

          <h2 className="menu-subtitle">Gestión de Sedes y Proveedores</h2>
          <Link to="/sede" className="menu-item">Sede</Link>
          <Link to="/proveedor" className="menu-item">Proveedor</Link>

          <h2 className="menu-subtitle">Gestión de Pedidos</h2>
          <Link to="/pedido" className="menu-item">Pedido</Link>
          <Link to="/detalle" className="menu-item">Detalle</Link>
        </div>

        <div className="menu-column">
          <h2 className="menu-subtitle">Gestión de Pedidos (cont.)</h2>
          <Link to="/recibe" className="menu-item">Recibe</Link>

          <h2 className="menu-subtitle">Gestión de Contactos</h2>
          <Link to="/telefono" className="menu-item">Teléfono</Link>
          <Link to="/direccion" className="menu-item">Dirección</Link>

          <h2 className="menu-subtitle">Detalles Relacionados</h2>
          <Link to="/proveedor-detalle" className="menu-item">Proveedor Detalle</Link>
          <Link to="/sede-detalle" className="menu-item">Sede Detalle</Link>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
