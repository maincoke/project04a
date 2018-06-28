// Funcionalidad de Router mediante la creacion de Servidor con paquete Express --->
let express = require('express');
let gettingData = require('./storage');
let Router = express.Router();

Router.get('/all', (req, res) => {
    // GET Ver Todos
    gettingData.getData()
        .then(allItem => {
            res.json(allItem);
        }).catch(error => {
            res.sendStatus(500).json(error);
        });
});

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