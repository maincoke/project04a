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
    filterData: function(items, city) {
        var cities = Array();
        for (let idx = 0; idx < items.length; idx++) {
            if (items[idx].Ciudad == city) {
                cities.push(items[idx]);
            }
        }
        console.log(cities[0]);
        console.log(cities[1]);
        return cities;
    }
}