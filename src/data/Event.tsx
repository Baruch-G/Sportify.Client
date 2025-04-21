export class Event {
    address: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        country: string;
    };
    location: {
        longitude: number;
        latitude: number;
    };
    _id: string;
    id: string;
    duration: number;
    difficultyLevel: number;
    organizer: string;
    date: string;
    category: string;

    constructor(data: any) {
        this.address = {
            addressLine1: data.address?.addressLine1 || '',
            addressLine2: data.address?.addressLine2 || '',
            city: data.address?.city || '',
            country: data.address?.country || '',
        };
        this.location = {
            longitude: data.location?.longitude || 0,
            latitude: data.location?.latitude || 0,
        };
        this._id = data._id || '';
        this.id = data.id || '';
        this.duration = data.duration || 0;
        this.difficultyLevel = data.difficultyLevel || 0;
        this.organizer = data.organizer || '';
        this.date = data.date || '';
        this.category = data.category || '';
    }
}