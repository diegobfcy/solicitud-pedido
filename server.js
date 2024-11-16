const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',      
  host: 'localhost',
  database: 'solicitud_pedido',   
  password: 'root', 
  port: 5432,
});

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

const server = http.createServer(async (req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  const urlParts = req.url.split('/');
  const method = req.method;

  if (urlParts[1] === 'administrador') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { nombre, telefono, correo } = data;

        const result = await pool.query(
          'SELECT sp_insert_tblAdministrador($1, $2, $3) AS codigoadministrador',
          [nombre, telefono, correo]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ codigoadministrador: result.rows[0].codigoadministrador }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting administrador' }));
      }
    } else if (method === 'PUT' && urlParts.length === 3) {
      try {
        const codigoadministrador = parseInt(urlParts[2]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { nombre, telefono, correo } = data;

        await pool.query(
          'SELECT sp_update_tblAdministrador($1, $2, $3, $4)',
          [codigoadministrador, nombre, telefono, correo]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Administrador updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating administrador' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 3) {
      try {
        const codigoadministrador = parseInt(urlParts[2]);

        await pool.query(
          'SELECT sp_delete_tblAdministrador($1)',
          [codigoadministrador]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Administrador deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting administrador' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }

  else if (urlParts[1] === 'jefetienda') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { correo, telefono, nombre, codigoadministrador } = data;

        const result = await pool.query(
          'SELECT sp_insert_tblJefeTienda($1, $2, $3, $4) AS codigoempleado',
          [correo, telefono, nombre, codigoadministrador]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ codigoempleado: result.rows[0].codigoempleado }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting jefe de tienda' }));
      }
    } else if (method === 'PUT' && urlParts.length === 3) {
      try {
        const codigoempleado = parseInt(urlParts[2]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { correo, telefono, nombre, codigoadministrador } = data;

        await pool.query(
          'SELECT sp_update_tblJefeTienda($1, $2, $3, $4, $5)',
          [codigoempleado, correo, telefono, nombre, codigoadministrador]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Jefe de tienda updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating jefe de tienda' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 3) {
      try {
        const codigoempleado = parseInt(urlParts[2]);

        await pool.query(
          'SELECT sp_delete_tblJefeTienda($1)',
          [codigoempleado]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Jefe de tienda deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting jefe de tienda' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }
  else if (urlParts[1] === 'sede') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { razonsocial, calle, ciudad, numero, telefono } = data;

        await pool.query(
          'SELECT sp_insert_tblSede($1, $2, $3, $4, $5)',
          [razonsocial, calle, ciudad, numero, telefono]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Sede inserted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting sede' }));
      }
    } else if (method === 'PUT' && urlParts.length === 3) {
      try {
        const razonsocial = decodeURIComponent(urlParts[2]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { calle, ciudad, numero, telefono } = data;

        await pool.query(
          'SELECT sp_update_tblSede($1, $2, $3, $4, $5)',
          [razonsocial, calle, ciudad, numero, telefono]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Sede updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating sede' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 3) {
      try {
        const razonsocial = decodeURIComponent(urlParts[2]);

        await pool.query(
          'SELECT sp_delete_tblSede($1)',
          [razonsocial]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Sede deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting sede' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }
  else if (urlParts[1] === 'proveedor') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { ruc, razonsocial, correo } = data;

        await pool.query(
          'SELECT sp_insert_tblProveedor($1, $2, $3)',
          [ruc, razonsocial, correo]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Proveedor inserted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting proveedor' }));
      }
    } else if (method === 'PUT' && urlParts.length === 3) {
      try {
        const ruc = decodeURIComponent(urlParts[2]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { razonsocial, correo } = data;

        await pool.query(
          'SELECT sp_update_tblProveedor($1, $2, $3)',
          [ruc, razonsocial, correo]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Proveedor updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating proveedor' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 3) {
      try {
        const ruc = decodeURIComponent(urlParts[2]);

        await pool.query(
          'SELECT sp_delete_tblProveedor($1)',
          [ruc]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Proveedor deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting proveedor' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }

  else if (urlParts[1] === 'pedido') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { correo, telefono, nombre, codigoadministrador, razonsocialsede } = data;

        const result = await pool.query(
          'SELECT sp_insert_tblPedido($1, $2, $3, $4, $5) AS codigopedido',
          [correo, telefono, nombre, codigoadministrador, razonsocialsede]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ codigopedido: result.rows[0].codigopedido }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting pedido' }));
      }
    } else if (method === 'PUT' && urlParts.length === 3) {
      try {
        const codigopedido = parseInt(urlParts[2]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { correo, telefono, nombre, codigoadministrador, razonsocialsede } = data;

        await pool.query(
          'SELECT sp_update_tblPedido($1, $2, $3, $4, $5, $6)',
          [codigopedido, correo, telefono, nombre, codigoadministrador, razonsocialsede]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Pedido updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating pedido' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 3) {
      try {
        const codigopedido = parseInt(urlParts[2]);

        await pool.query(
          'SELECT sp_delete_tblPedido($1)',
          [codigopedido]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Pedido deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting pedido' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }
  else if (urlParts[1] === 'detalle') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { marca, tipo, cantidad, codigopedido } = data;

        const result = await pool.query(
          'SELECT sp_insert_tblDetalle($1, $2, $3, $4) AS codigodetalle',
          [marca, tipo, cantidad, codigopedido]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ codigodetalle: result.rows[0].codigodetalle }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting detalle' }));
      }
    } else if (method === 'PUT' && urlParts.length === 3) {
      try {
        const codigodetalle = parseInt(urlParts[2]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { marca, tipo, cantidad, codigopedido } = data;

        await pool.query(
          'SELECT sp_update_tblDetalle($1, $2, $3, $4, $5)',
          [codigodetalle, marca, tipo, cantidad, codigopedido]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Detalle updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating detalle' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 3) {
      try {
        const codigodetalle = parseInt(urlParts[2]);

        await pool.query(
          'SELECT sp_delete_tblDetalle($1)',
          [codigodetalle]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Detalle deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting detalle' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }

  else if (urlParts[1] === 'recibe') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { rucproveedor, codigopedido } = data;

        await pool.query(
          'SELECT sp_insert_tblRecibe($1, $2)',
          [rucproveedor, codigopedido]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Recibe inserted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting recibe' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 4) {
      try {
        const rucproveedor = decodeURIComponent(urlParts[2]);
        const codigopedido = parseInt(urlParts[3]);

        await pool.query(
          'SELECT sp_delete_tblRecibe($1, $2)',
          [rucproveedor, codigopedido]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Recibe deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting recibe' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }

  else if (urlParts[1] === 'telefono') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { telefono } = data;

        const result = await pool.query(
          'SELECT sp_insert_tblTelefono($1) AS codigopedido',
          [telefono]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ codigopedido: result.rows[0].codigopedido }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting telefono' }));
      }
    } else if (method === 'PUT' && urlParts.length === 3) {
      try {
        const codigopedido = parseInt(urlParts[2]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { telefono } = data;

        await pool.query(
          'SELECT sp_update_tblTelefono($1, $2)',
          [codigopedido, telefono]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Telefono updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating telefono' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 3) {
      try {
        const codigopedido = parseInt(urlParts[2]);

        await pool.query(
          'SELECT sp_delete_tblTelefono($1)',
          [codigopedido]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Telefono deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting telefono' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }

  else if (urlParts[1] === 'direccion') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { ruc, direccion } = data;

        await pool.query(
          'SELECT sp_insert_tblDireccion($1, $2)',
          [ruc, direccion]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Direccion inserted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting direccion' }));
      }
    } else if (method === 'PUT' && urlParts.length === 3) {
      // Update direccion
      try {
        const ruc = decodeURIComponent(urlParts[2]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { direccion } = data;

        await pool.query(
          'SELECT sp_update_tblDireccion($1, $2)',
          [ruc, direccion]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Direccion updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating direccion' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 3) {
      try {
        const ruc = decodeURIComponent(urlParts[2]);

        await pool.query(
          'SELECT sp_delete_tblDireccion($1)',
          [ruc]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Direccion deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting direccion' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }

  else if (urlParts[1] === 'proveedordetalle') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { telefono, direccion, ruc } = data;

        await pool.query(
          'SELECT sp_insert_tblProveedorDetalle($1, $2, $3)',
          [telefono, direccion, ruc]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Proveedor detalle inserted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting proveedor detalle' }));
      }
    } else if (method === 'PUT' && urlParts.length === 3) {
      try {
        const telefono = decodeURIComponent(urlParts[2]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { direccion, ruc } = data;

        await pool.query(
          'SELECT sp_update_tblProveedorDetalle($1, $2, $3)',
          [telefono, direccion, ruc]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Proveedor detalle updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating proveedor detalle' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 3) {
      try {
        const telefono = decodeURIComponent(urlParts[2]);

        await pool.query(
          'SELECT sp_delete_tblProveedorDetalle($1)',
          [telefono]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Proveedor detalle deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting proveedor detalle' }));
      }
    } else {
      // Not Found
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }

  else if (urlParts[1] === 'sededetalle') {
    if (method === 'POST' && urlParts.length === 2) {
      try {
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { razonsocial, departamento, codigojefetienda } = data;

        await pool.query(
          'SELECT sp_insert_tblSedeDetalle($1, $2, $3)',
          [razonsocial, departamento, codigojefetienda]
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Sede detalle inserted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error inserting sede detalle' }));
      }
    } else if (method === 'PUT' && urlParts.length === 4) {
      try {
        const razonsocial = decodeURIComponent(urlParts[2]);
        const departamento = decodeURIComponent(urlParts[3]);
        const body = await getRequestBody(req);
        const data = JSON.parse(body);
        const { codigojefetienda } = data;

        await pool.query(
          'SELECT sp_update_tblSedeDetalle($1, $2, $3)',
          [razonsocial, departamento, codigojefetienda]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Sede detalle updated' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error updating sede detalle' }));
      }
    } else if (method === 'DELETE' && urlParts.length === 4) {
      try {
        const razonsocial = decodeURIComponent(urlParts[2]);
        const departamento = decodeURIComponent(urlParts[3]);

        await pool.query(
          'SELECT sp_delete_tblSedeDetalle($1, $2)',
          [razonsocial, departamento]
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Sede detalle deleted' }));
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error deleting sede detalle' }));
      }
    } else {

      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }

  else {

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
