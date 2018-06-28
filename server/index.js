/**
 * Funcionalidad de Servidor Node.js
 * 
 * Importacion de paquetes instalados para inicializar servidor Node.js
 */
const bodyParser = require('body-parser'),
    http = require('http'),
    express = require('express'),
    routing = require('./routingSearcher.js');

// Configuracion de instancias y variables de Servidor
const port = 8081,
    searcher = express();
const Server = http.createServer(searcher);

/* Uso de instacia de body-parser y asignacion del uso del enrutador 
    mediante el routingSearhcer.js */
searcher.use(bodyParser.json());
searcher.use(bodyParser.urlencoded({ extended: true }));
searcher.use('/', routing);

// Asignación de carpeta publica para clientes
searcher.use(express.static('public'));

// Inicio y puesta en marcha de Servidor
Server.listen(port, () => console.log('Realty-Home Server is running and listening on port: ' + port));