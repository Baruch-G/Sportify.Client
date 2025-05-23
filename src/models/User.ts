import { Event } from './Event';
import { Category } from './Category';

export type Role = "user" | "coach" | "admin";

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
    createdAt: Date;
    wheight: number;
    gender: "male" | "female";
    address: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        country: string;
      };
    birthDay: Date;
    city: string;
    height?: number;
    fitnessGoal?: string;
    activityLevel?: "sedentary" | "lightly active" | "moderately active" | "very active" | "extra active" | "athlete" | "bodybuilder";
    sportsInterests?: Category[];
    events?: Event[];
    image?: string;
    phone: string;
    phoneNumber?: string;
}

interface CoachProfile {
    aboutMe?: string;
    coachingStartDate?: Date;
    specializations?: Category[];
    certifications?: string[];
    coachingStyle?: string;
    hourlyRate?: number;
    languages?: string[];
    achievements?: string[];
}

export interface Coach extends User {
    coachProfile: CoachProfile;
} 