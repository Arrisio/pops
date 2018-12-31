ymaps.ready(init);

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
    const btnSend = document.getElementById('btnSend');
    btnSend.addEventListener('click', () => {
        console.log('CLICK!!')
        console.log(myPolygon.getCoordinates())
    })
}

