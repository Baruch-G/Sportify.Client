import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState, useEffect, useRef } from 'react';
import { MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapLayerMouseEvent } from 'maplibre-gl';
import EntityLoader from './EntityLoader';
import "./MapBase.css";
import MapSideBar from '../components/MapSideBar';
import mapboxgl from 'maplibre-gl';
import { Event } from '../models/Event';
import { useSearchParams } from 'react-router-dom';

const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;
const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    true
);

function MapBase() {
    const [searchParams] = useSearchParams();
    const [userPosition, setUserPosition] = useState<{ latitude: number; longitude: number } | null>(null);
    const [eventEntities, setEventEntities] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<string>();
    const mapRef = useRef<MapRef | null>(null);
    const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Get coordinates from URL parameters
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    // Set initial view state based on URL parameters or user position
    const initialViewState = {
        longitude: lng ? parseFloat(lng) : (userPosition?.longitude || 34.77262),
        latitude: lat ? parseFloat(lat) : (userPosition?.latitude || 31.99047),
        zoom: lat && lng ? 15 : 12
    };

    const setSelectFeature = (e: MapLayerMouseEvent) => {
        const map = mapRef.current?.getMap();
        const features = map?.queryRenderedFeatures(e.point);

        if (features?.length && features[0]?.properties._id) {
            setSelectedEvent(features[0]?.properties._id);

            // Scroll to the selected event
            const index = eventEntities.findIndex(event => event._id === features[0]?.properties._id || event._id === features[0]?.properties._id);
            eventRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const onEventSelected = (id: string) => {
        setSelectedEvent(id);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${serverURL}/events`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json() as Event[];
                setEventEntities(data);
            } catch (err: any) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
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
        <div style={{ display: "flex" }}>
            <Map
                id='EventMap'
                ref={mapRef}
                initialViewState={initialViewState}
                onClick={setSelectFeature}
                localIdeographFontFamily="'Noto Sans', 'Noto Sans CJK SC', sans-serif"
                style={{
                    position: "absolute",
                    top: "55px",
                    left: 0,
                    width: "100vw",
                    height: "calc(100vh - 55px)",
                    overflow: "auto"
                }}
                mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}&language=he&fonts=Roboto,Arial,Open Sans`}
            >
                <MapSideBar
                    eventEntities={eventEntities}
                    selectedEvent={selectedEvent}
                    onEventSelected={onEventSelected}
                    eventRefs={eventRefs}
                />
                <EntityLoader eventEntities={eventEntities} />
            </Map>
        </div>
    );
}

export default MapBase;