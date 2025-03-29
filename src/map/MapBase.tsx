import * as React from 'react';
import { useState, useEffect } from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapboxgl from 'maplibre-gl';
import maplibregl from "maplibre-gl";
import EntityLoader from './EntityLoader';

const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;

mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', 
    true
);

function MapBase() {
    const [userPosition, setUserPosition] = useState<{ latitude: number; longitude: number } | null>(null);

    // Get user location
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(({ latitude, longitude }));
                    
                    setUserPosition({ latitude, longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div>
            <div style={{ position: 'absolute', top: 80, left: 10, height: '90%', width: '350px', backgroundColor: 'white', zIndex: 1 }}>
            </div>
            <Map
                initialViewState={{
                    longitude: userPosition?.longitude || 34.77262,
                    latitude: userPosition?.latitude || 31.99047,
                    zoom: 12
                }}
                localIdeographFontFamily="'Noto Sans', 'Noto Sans CJK SC', sans-serif"
                mapLib={maplibregl}
                style={{
                    position: "absolute",
                    top: "60px",
                    left: 0,
                    width: "100vw",
                    height: "calc(100vh - 60px)",
                    overflow: "hidden"
                }}
                mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}&language=he&fonts=Roboto,Arial,Open Sans`}
            >
                <EntityLoader />

                {/* Mark user's position if available */}
                {userPosition && (
                    <div
                        style={{
                            position: 'absolute',
                            background: 'red',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10
                        }}
                    />
                )}
            </Map>
        </div>
    );
}

export default MapBase;
