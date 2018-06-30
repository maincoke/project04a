/**
 * Funcionalidad de File System del Searcher.
 * Se exporta la funcion que realiza la lectura y filtrados de datos de los items.
 */
const fs = require('fs'),
    path = require('path');

module.exports = {
    // Funcion que realiza lectura de los datos del archivo json //
    getData: function() {
        var dataPath = __dirname + path.join('/data.json');
        return new Promise((resolve, reject) => {
            fs.readFile(dataPath, 'utf8', (error, dataReaded) => {
                if (error) reject(error)
                resolve(JSON.parse(dataReaded));
            });
        });
    },
    // Funcion que realiza el filtrado de datos para las busquedas personalizas //
    filterData: function(items, city, ctype, lprice, tprice) {
        let searchFiltered = Array(),
            dataFiltered = Array();
        searchFiltered = items.filter(item => item.Ciudad == city);
        let filterBycity = searchFiltered.length > 0 ? searchFiltered : items;
        searchFiltered = filterBycity.filter(item => item.Tipo == ctype);
        let filterBytype = searchFiltered.length > 0 ? searchFiltered : filterBycity;
        for (let idx = 0; idx < filterBytype.length; idx++) {
            let itmPrice = parseFloat(filterBytype[idx].Precio.substr(1).replace(',', ''));
            for (let i = 0; i < items.length; i++) {
                if (items[i].Id == filterBytype[idx].Id && itmPrice >= lprice && itmPrice <= tprice) {
                    dataFiltered.push(items[i]);
                }
            }
        }
        return dataFiltered;
    }
}