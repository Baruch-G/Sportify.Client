import axios from 'axios';
import { Event } from '../models/Event';

const serverURL = import.meta.env.VITE_SPORTIFY_SERVER_URL;

const getEvents = async () => {
    try {
        const response = await axios.get(`${serverURL}/events/`);
        return response.data as Event[];
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export default getEvents;