/**
 * Funcionalidad de File System del Searcher.
 * Se exporta la funcion que realiza la lectura de datos de los items.
 */
const fs = require('fs'),
    path = require('path');

module.exports = {

    getData: function() {
        var dataPath = __dirname + path.join('/data.json');
        return new Promise((resolve, reject) => {
            fs.readFile(dataPath, 'utf8', (error, dataReaded) => {
                if (error) reject(error)
                resolve(JSON.parse(dataReaded));
            });
        });
    },
    filterData: function(items, city, ctype, lprice, tprice) {
        let dataFiltered = Array();
        for (let idx = 0; idx < items.length; idx++) {
            let itmPrice = parseFloat(items[idx].Precio.substr(1).replace(',', ''));
            if (items[idx].Ciudad == city && items[idx].Tipo == ctype && itmPrice >= lprice && itmPrice <= tprice) {
                dataFiltered.push(items[idx]);
            }
        }
        return dataFiltered;
    }
}