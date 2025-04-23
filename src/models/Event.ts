import { Category } from "./Category";

interface Address {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    country: string;
}

interface Location {
    longitude: number;
    latitude: number;
}

export interface Event {
    _id: string;
    category: Category;
    duration: number;
    difficultyLevel: number;
    organizer: string;
    address: Address;
    location: Location;
    date: string;
    __v: number;
}
