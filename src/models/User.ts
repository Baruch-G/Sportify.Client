import { Event } from './Event';

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    createdAt: Date;
    age: number;
    wheight: number;
    gender: "male" | "female";
    addresse: string;
    city: string;
    height?: number;
    fitnessGoal?: string;
    activityLevel?: "low" | "moderate" | "high";
    sportsInterests?: string[];
    events?: Event[];
}

export interface Coach extends User {
    rating: number;
} 