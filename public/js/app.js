// Inicializador del elemento Slider para el input del Rango de Precios //
$("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    step: 100,
    prefix: "$"
});
// Funcion de obtencion de datos desde el servidor //
function queryAjax(url, type, data) {
    return $.ajax({ url: url, type: type, data: data });
}
// Funcion que realiza un mensaje de busqueda fallida en caso de no retornar items de vivienda //
function renderFailSearch() {
    let itemList = $('.lista');
    return itemList.append(
        `<div class="card horizontal"><div class="card-stacked"><div class="card-content">
            <div><p><b>Esta búsqueda no encontró información de viviendas con los criterios seleccionados!<b></p></div>
        </div></div></div>`);
}
// Funcion que renderiza cada item de vivienda obtenido de la busqueda //
function renderItem(item, img = '../img/home.jpg') {
    if (item !== undefined) {
        let itemList = $('.lista');
        return itemList.append(
            `<div class="card horizontal">
                <div class="card-image"><img src=${img} ></div>
                <div class="card-stacked">
                    <div class="card-content">
                        <div><p><b>Direccion: </b>${item.Direccion}</p></div>
                        <div><p><b>Ciudad: </b>${item.Ciudad}</p></div>
                        <div><p><b>Telefono: </b>${item.Telefono}</p></div>
                        <div><p><b>Código postal: </b>${item.Codigo_Postal}</p></div>
                        <div><p><b>Tipo: </b>${item.Tipo}</p></div>
                        <div><p><b>Precio: </b>${item.Precio}</p></div>
                    </div>
                </div>
            </div>`);
    }
}
// Funcion que muestra el resto de los items de vivienda cuando son mas de 20 items //
function showRestItems(items) {
    let itemList = $('.lista'),
        btnVermas = $('#vermas');
    btnVermas.off();
    itemList.children('div')[20].remove();
    for (let i = 20; i <= items.length; i++) { renderItem(items[i]) }
}
// Funcion que muestra los primeros items de vivienda hasta un maximo de 20 items //
function showingItems(items) {
    let itemList = $('.lista'),
        numItems = items.length >= 20 ? 20 : items.length;
    for (let i = 0; i < numItems; i++) { renderItem(items[i]) }
    if (items.length > itemList.children().length) {
        itemList.append(`<div class="card-action center-align"><button id="vermas" class="btn" type="button">Ver más...</button></div>`);
        $('#vermas').on('click', () => showRestItems(items))
    }
}
// Renderizacion de las opciones para los elementos Selects de la busqueda personalizada //
function renderOptionsSelect(select, options) {
    let getSelect = $('#' + select.toLowerCase()),
        firstOption = select == 'Ciudad' ? 'a ' + select.toLowerCase() : ' ' + select.toLowerCase();
    getSelect.material_select();
    getSelect.on('contentChanged', function() { $(this).material_select() });
    getSelect.children("option").remove();
    getSelect.append(`<option value="" selected>Escoge un${firstOption}</option>`)
    options.forEach(option => getSelect.append(`<option value="${option}">${option}</option>`));
    getSelect.trigger('contentChanged');
}
// Inicializador y filtrado de las opciones para los elementos Selects de la busqueda personalizada //
function setOptions(select) {
    queryAjax('/all', 'GET', {})
        .done(data => {
            let allItems = Array();
            if (select == 'Ciudad') {
                allItems = data.map(items => items.Ciudad);
            } else {
                allItems = data.map(items => items.Tipo);
            }
            let optionItems = [...new Set(allItems)].sort();
            renderOptionsSelect(select, optionItems);
        })
        .fail(error => console.log(error));
}
// Ejecutor de la busqueda general de todos los items de vivienda //
function searchAll() {
    $(".lista").children("div").remove();
    queryAjax('/all', 'GET', {})
        .done(data => showingItems(data))
        .fail(error => console.log(error));
}
// Ejecutor de la busqueda personaliza de los items de vivienda segun criterios seleccionados //
function searchCustom() {
    $('.lista').children('div').remove();
    let rango = $('#rangoPrecio').prop("value").split(";"),
        opc_cdad = $('#ciudad').val(),
        opc_tipo = $('#tipo').val();
    queryAjax('/filter', 'POST', { cdad: opc_cdad, tipo: opc_tipo, preciobj: parseFloat(rango[0]), precioat: parseFloat(rango[1]) })
        .done(data => {
            if (data.length != 0) { showingItems(data); } else { renderFailSearch(); }
        })
        .fail(error => console.log(error));
}
// Inicializador del Buscador y asignacion de eventos en los dos tipos de busqueda //
function setSearch() {
    let busqueda = $('#checkPersonalizada'),
        btnBusqueda = $('#buscar'),
        barRango = $('#rangoPrecio').data('ionRangeSlider');
    busqueda.on('change', (e) => {
        e.preventDefault();
        btnBusqueda.off();
        if (this.customSearch == false) {
            this.customSearch = true
            $('#buscar').text('Ver Todos');
            btnBusqueda.on('click', () => searchAll());
        } else {
            this.customSearch = false
            $('#buscar').text('Buscar');
            setOptions('Tipo');
            setOptions('Ciudad');
            btnBusqueda.on('click', () => searchCustom());
        }
        $('#personalizada').toggleClass('invisible');
        barRango.reset();
    });
    btnBusqueda.on('click', () => searchAll());
}
// Ejecucion de Buscador //
setSearch();