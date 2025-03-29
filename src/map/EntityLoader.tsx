import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";
// import aircraft from "./assets/aircraft.svg";
// import { sources } from "./map/sources/source";
import { Event } from "../components/EventCard";
// import Events from "./map/Events";
import Map, { Source, Layer, CircleLayerSpecification } from 'react-map-gl/maplibre';
import { Geometry, Point, type FeatureCollection, type GeoJsonProperties } from 'geojson';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const EntityLoader = () => {
    //   const entities = useSelector((state: RootState) => state.entities).features;
    const [eventEntities, setEventEntities] = useState<Event[]>([])
    const { current: map } = useMap();
    const [source, setSource] = useState<FeatureCollection>({ type: 'FeatureCollection', features: [] });

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

    useEffect(() => {
        if (eventEntities.length) {
            const updatedGeojson: FeatureCollection = {
                type: "FeatureCollection",
                features: eventEntities.map(e => ({
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
    }, [eventEntities]);


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


    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => { }}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return <>
        <Source id="my-data" type="geojson" data={source}>
            <Layer {...layerStyle} />
        </Source>
    </>;
};

export default EntityLoader;