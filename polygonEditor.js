ymaps.ready(init);
service_url = 'https://service-integr.jet.su/rst/calcpops'

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.73, 37.75],
        zoom: 10
    }, {
            searchControlProvider: 'yandex#search'
        });

    // Создаем многоугольник без вершин.
    var myPolygon = new ymaps.Polygon([], {}, {
        // Курсор в режиме добавления новых вершин.
        editorDrawingCursor: "crosshair",
        // Максимально допустимое количество вершин.
        editorMaxPoints: 25,
        // Цвет заливки.
        fillColor: '#00FF00AA',
        // fillOpacity: 0.5,
        // Цвет обводки.
        strokeColor: '#0000FF',
        // Ширина обводки.
        strokeWidth: 2
    });
    // Добавляем многоугольник на карту.
    myMap.geoObjects.add(myPolygon);

    // В режиме добавления новых вершин меняем цвет обводки многоугольника.
    var stateMonitor = new ymaps.Monitor(myPolygon.editor.state);
    stateMonitor.add("drawing", function (newValue) {
        myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#000022');

    });

    // Включаем режим редактирования с возможностью добавления новых вершин.
    myPolygon.editor.startDrawing();

    const btn_area_download = document.getElementById('btn_area_download');
    btn_area_download.addEventListener('click', () => {
        // console.log(myPolygon.geometry._coordPath._coordinates);
        // console.log(myPolygon.geometry.getCoordinates());

        // address = $(".ymaps-2-1-72-searchbox-input__input").val()
        // radius = $("#input-area__raius").val()
        address = radius = ''
        area = myPolygon.geometry.getCoordinates()[0]
        area.pop()
        window.location = `${service_url}?address=${address}&radius=${radius}&area=${area}`;
    })
    const btn_radius_download = document.getElementById('btn_radius_download');
    btn_radius_download.addEventListener('click', () => {

        address = $(".ymaps-2-1-72-searchbox-input__input").val()
        radius = $("#input-area__raius").val()
        area = ''
        window.location = `${service_url}?address=${address}&radius=${radius}&area=${area}`;
    })
}

