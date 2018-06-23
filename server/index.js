/**
 * Funcionalidad de Servidor Node.js
 * 
 * Importacion de paquetes instalados para inicializar servidor Node.js
 */
let http = require('http'),
    express = require('express');

// Configuracion de instancias y variables de Servidor
const port = 8081,
    app = express();
const Server = http.createServer(app);

// Asignación de carpeta publica para clientes
app.use(express.static('public'));

// Inicio y puesta en marcha de Servidor
Server.listen(port, () => console.log('Realty-Home Server is running and listening on port: ' + port));