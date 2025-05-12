import { useEffect, useState } from "react";
import { SymbolLayerSpecification, useMap } from "react-map-gl/maplibre";
// import aircraft from "./assets/aircraft.svg";
// import { sources } from "./map/sources/source";
import { Event } from "../models/Event";
// import Events from "./map/Events";
import { Source, Layer } from 'react-map-gl/maplibre';
import { type FeatureCollection } from 'geojson';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface EntityLoaderProps {
    eventEntities: Event[]
}

const EntityLoader = (props: EntityLoaderProps) => {
    //   const entities = useSelector((state: RootState) => state.entities).features;
    const { EventMap } = useMap();
    const [source, setSource] = useState<FeatureCollection>({ type: 'FeatureCollection', features: [] });
    const { current: map } = useMap();


    useEffect(() => {
        if (props.eventEntities.length) {
            const updatedGeojson: FeatureCollection = {
                type: "FeatureCollection",
                features: props.eventEntities.map(e => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [e.location.longitude, e.location.latitude]
                    },
                    properties: {
                        _id: e._id,
                        title: e.address.addressLine1 || "Event Location",
                        category: e.category.name.replace(" ", "-").toLowerCase() // Assuming category has icon reference
                    }
                }))
            };

            setSource(updatedGeojson);
        }
    }, [props.eventEntities]);

    useEffect(() => {
        if (!map || !props.eventEntities.length) return;

        const loadImages = async () => {
            console.log(props.eventEntities);
            
            [...new Set(props.eventEntities.map(e => e.category.name.replace(" ", "-").toLocaleLowerCase()))].forEach((iconName: string) => {
                const image = new Image(80, 80);
                image.src = "gemini/" + iconName + ".png";
                image.onload = () => {
                    map?.addImage(iconName, image);
                }
            });
        }

        loadImages();
    }, [map, props.eventEntities]);

    const locationLayer: SymbolLayerSpecification = {
        id: 'event-locations',
        source: "events-source",
        type: 'symbol',
        layout: {
            'icon-image': 'location-icon',
            'icon-size': 1,
            'icon-allow-overlap': true
        }
    };

    const sportLayer: SymbolLayerSpecification = {
        id: 'event-sport-icons',
        source: "events-source",
        type: 'symbol',
        layout: {
            'icon-image': ['get', 'category'],
            'icon-size': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10, 0.7,
                16, 1
            ],
            'icon-allow-overlap': true,
            'icon-offset': [0, -15]
        }
    };

    return <>
        <Source id="events-source" type="geojson" data={source}>
            {/* <Layer {...locationLayer} /> */}
            <Layer {...sportLayer} />
        </Source>

        <button style={{ position: "absolute", bottom: 100, right: 10 }} onClick={() => map?.flyTo({ center: [-122.4, 37.8]})}>Search in this area</button>
    </>;
};

export default EntityLoader;
