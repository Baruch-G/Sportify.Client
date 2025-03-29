import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapboxgl from 'maplibre-gl';

const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;
mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',true
);

function MapBase() {
    return (
        <Map
            initialViewState={{
                longitude: 34.77262,
                latitude: 31.99047,
                zoom: 14
            }}
            mapLib={mapboxgl}
            style={{
                position: "absolute",
                top: "60px",
                left: 0,
                width: "100vw",
                height: "calc(100vh - 60px)",
                overflow: "hidden"
            }}
            mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}&language=he&fonts=Roboto,Arial,Open Sans`}
            />
    );
}

export default MapBase;
