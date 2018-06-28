//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
});

function queryAjax(url, type, data) {
    return $.ajax({
        url: url,
        type: type,
        data: data
    });
}

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

function buscarTodos() {
    $(".lista").children("div").remove();
    queryAjax('/all', 'GET', {})
        .done(data => {
            let viewAll = data;
            viewAll.forEach(item => renderItem(item));
        })
        .fail(error => {
            console.log(error);
        });
}

function buscarPersonal() {
    $('.lista').children('div').remove();
    let rango = $('#rangoPrecio').prop("value").split(";");
    console.log(rango[0]);
    console.log(typeof(rango[0]));
    queryAjax('/filter', 'POST', { cdad: 'New York', tipo: 'Casa', preciobj: 2000, precioat: 40000 })
        .done(data => {
            let viewAll = data;
            viewAll.forEach(item => renderItem(item));
        })
        .fail(error => {
            console.log(error);
        });
}



function setSearch() {
    let busqueda = $('#checkPersonalizada');
    let btnBusqueda = $('#buscar');
    busqueda.on('change', (e) => {
        btnBusqueda.off();
        if (this.customSearch == false) {
            this.customSearch = true
            $('#buscar').text('Ver Todos')
            btnBusqueda.on('click', () => buscarTodos());
        } else {
            this.customSearch = false
            $('#buscar').text('Buscar')
            btnBusqueda.on('click', () => buscarPersonal());
        }
        $('#personalizada').toggleClass('invisible')
    });
    btnBusqueda.on('click', () => buscarTodos());
}

setSearch();