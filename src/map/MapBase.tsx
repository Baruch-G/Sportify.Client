import * as React from 'react';
import { useState, useEffect } from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapboxgl, { Padding } from 'maplibre-gl';
import maplibregl from "maplibre-gl";
import EntityLoader from './EntityLoader';
import EventCard, { Event } from "../components/EventCard";
import "./MapBase.css"

const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;

mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    true
);

function MapBase() {
    const [userPosition, setUserPosition] = useState<{ latitude: number; longitude: number } | null>(null);
    const [eventEntities, setEventEntities] = useState<Event[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch('https://sportify-qa-server.onrender.com/events');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json() as Event[];
                setEventEntities(data);
            } catch (err: any) {
            }
        };
        fetchData();
    }, [])

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
            <div id="map-side-bar">
                    {eventEntities.map(i => (<>
                        <div style={{ padding: 30 }}>
                            <EventCard {...i} />

                        </div>
                    </>))}
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
                    top: "55px",
                    left: 0,
                    width: "100vw",
                    height: "calc(100vh - 55px)",
                    overflow: "hidden"
                }}
                mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}&language=he&fonts=Roboto,Arial,Open Sans`}
            >
                <EntityLoader eventEntities={eventEntities} />
            </Map>
        </div>
    );
}

export default MapBase;
