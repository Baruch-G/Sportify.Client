export interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
}

export interface Location {
    longitude: number;
    latitude: number;
}

export interface Event {
    address: Address;
    location: Location;
    date: string;
    duration: number;
    difficultyLevel: number;
    organizer: string;
    title: string;
}

export interface EventErrors {
    [key: string]: string;
} 