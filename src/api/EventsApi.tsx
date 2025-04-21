import axios from 'axios';
import { Event } from '../data/Event';

const getEvents = async () => {
    try {
        const response = await axios.get('http://localhost:3000/events/');
        return response.data.map((event: any) => new Event(event));
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export default getEvents;