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

Router.post('/city', (req, res) => {
    // POST Ciudad
    let city = req.body.data;
    gettingData.getData()
        .then(cityItems => {
            /*return new Promise(reject => {
                gettingData.filterData(cityItems, city)
                    .then(cityItems => {
                        resolve(cityItems)
                    }).catch(error => {
                        reject(error);
                    })
            });*/
        }).then(cityItems => {
            res.json(cityItems);
        }).catch(error => {
            res.sendStatus(500).json(error);
        });
});

module.exports = Router;