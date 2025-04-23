import axios from 'axios';
import { Event } from '../models/Event';

const getEvents = async () => {
    try {
        const response = await axios.get('http://localhost:3000/events/');
        return response.data as Event[];
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export default getEvents;