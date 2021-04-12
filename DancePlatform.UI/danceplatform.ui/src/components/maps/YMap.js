import {React, useEffect, useState, Component} from 'react';
import { YMaps, Map } from 'react-yandex-maps';

export default class YMap extends Component{
    init = () => {
    // Создание карты.
    window.ymaps.geocode('Минск, 8, Аранская').then(res => {
        const coords = res.geoObjects.get(0).geometry.getCoordinates();

        var myMap = new window.ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [coords[0], coords[1]],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 15
        });


        const myGeoObject = new window.ymaps.GeoObject({
            geometry: {
                type: "Point", // тип геометрии - точка
                coordinates: [coords[0], coords[1]] // координаты точки
            }
        });
        
        // Размещение геообъекта на карте.
        myMap.geoObjects.add(myGeoObject);
    })
}
    componentDidMount(){
        window.ymaps.ready(this.init);
    }
render(){
    return(
        // <YMaps>
        //     <div>
        //     My awesome application with maps!
        //     <Map defaultState={{ center: [53.8999964, 27.5666644], zoom: 9 }} />
        //     </div>
        // </YMaps>
        <>
        <div id="map" style={{width: 1198, height: 400}}></div>

        </>
    );
}
}