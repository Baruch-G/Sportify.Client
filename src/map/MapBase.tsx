import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;

function MapBase() {
    return (
        <Map
            initialViewState={{
                longitude: 34.88796,
                latitude: 32.076701,
                zoom: 14
            }}
            style={{
                position: "absolute",
                top: "60px",
                left: 0,
                width: "100vw",
                height: "calc(100vh - 60px)",
                overflow: "hidden"
            }}
            mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}`}
            />
    );
}

export default MapBase;