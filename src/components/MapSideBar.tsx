import React from 'react'
import EventCard from './EventCard'
import "./MapSideBar.css"
import { useMap } from 'react-map-gl/maplibre';
import { Event } from '../models/Event';

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
                        map?.flyTo({ speed: 1.5, zoom: 15, center: [event.location.longitude, event.location.latitude] })
                    }} selected={props.selectedEvent} event={event} />
                </div>
            ))}
        </div>
    )
}

export default MapSideBar