import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";
// import aircraft from "./assets/aircraft.svg";
// import { sources } from "./map/sources/source";
import { Event } from "../components/EventCard";
// import Events from "./map/Events";
import Map, { Source, Layer, CircleLayerSpecification } from 'react-map-gl/maplibre';
import { Geometry, Point, type FeatureCollection, type GeoJsonProperties } from 'geojson';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface EntityLoaderProps {
    eventEntities : Event[]
}

const EntityLoader = (props: EntityLoaderProps) => {
    //   const entities = useSelector((state: RootState) => state.entities).features;
    const { current: map } = useMap();
    const [source, setSource] = useState<FeatureCollection>({ type: 'FeatureCollection', features: [] });

    

    useEffect(() => {
        if (props.eventEntities.length) {
            const updatedGeojson: FeatureCollection = {
                type: "FeatureCollection",
                features: props.eventEntities.map(e => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [e.location.longitude, e.location.latitude] // Correct order
                    },
                    properties: {
                        title: e.address.addressLine1 || "Event Location"
                    }
                }))
            };

            setSource(updatedGeojson);
        }
    }, [props.eventEntities]);


    useEffect(() => {
        let img = new Image(40, 40);
        img.onload = () => map?.addImage("loacation", img);
        // img.src = aircraft; // TODO: add location image 
    }, []);


    const layerStyle: CircleLayerSpecification = {
        id: 'point',
        source: "my-data",
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };

    return <>
        <Source id="my-data" type="geojson" data={source}>
            <Layer {...layerStyle} />
        </Source>
    </>;
};

export default EntityLoader;