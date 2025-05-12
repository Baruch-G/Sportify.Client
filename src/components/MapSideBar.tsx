import React from 'react'
import "./MapSideBar.css"
import { useMap } from 'react-map-gl/maplibre';
import { Event } from '../models/Event';
import EventCard from './EventCard/EventCard';

interface MapSideBarProps {
    eventEntities: Event[];
    selectedEvent: string | undefined;
    onEventSelected: (id: string) => void;
    eventRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const MapSideBar = (props: MapSideBarProps) => {
    const { current: map } = useMap();

    return (
        <div id="map-side-bar">
            {props.eventEntities.map((event, index) => (
                <div
                    key={event._id}
                    ref={(el) => (props.eventRefs.current[index] = el)}
                    style={{ padding: 20 }}
                >
                    <EventCard onSelect={() => {
                        props.onEventSelected(event._id);
                        map?.flyTo({ speed: 1.5, zoom: 18, center: [event.location.longitude, event.location.latitude], pitch: 50 })
                    }} selected={props.selectedEvent === event._id} event={event} />
                </div>
            ))}
        </div>
    )
}

export default MapSideBar