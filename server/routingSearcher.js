/**
 * Funcionalidad y exportacion del Router mediante la creacion del Servidor con paquete Express -->
 */
let express = require('express');
let gettingData = require('./storage');
let Router = express.Router();
// Enrutamiento para la lectura y obtencion de todos los items de datos en el archivo json //
Router.get('/all', (req, res) => {
    // GET Ver Todos
    gettingData.getData()
        .then(allItem => {
            res.json(allItem);
        }).catch(error => {
            res.sendStatus(500).json(error);
        });
});
// Enrutamiento para el filtrado de los items de datos para las busquedas personalizadas //
Router.post('/filter', (req, res) => {
    // POST Personalizada
    let city = req.body.cdad,
        ctype = req.body.tipo,
        lowPrice = req.body.preciobj,
        topPrice = req.body.precioat;
    gettingData.getData()
        .then(allItems => {
            try {
                let fltItems = gettingData.filterData(allItems, city, ctype, lowPrice, topPrice);
                res.json(fltItems);
            } catch (error) {
                throw (error);
            }
        }).catch(error => {
            res.sendStatus(500).json(error);
        });
});

module.exports = Router;