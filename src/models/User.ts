import { Event } from "./Event";
import { Category } from "./Category";

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
  isCoach: boolean;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    country: string;
  };
  birthDay: Date;
  height?: number;
  fitnessGoal?: string;
  activityLevel?:
    | "sedentary"
    | "lightly active"
    | "moderately active"
    | "very active"
    | "extra active"
    | "athlete"
    | "bodybuilder";
  sportsInterests?: Category[];
  events?: Event[];
  image?: string;
  phone: string;
}

export interface Review {
  _id: string;
  coach: string;
  reviewer: {
    _id: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
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
  averageRating?: number;
  totalReviews?: number;
  detailedReviews?: Review[];
}

export interface Coach extends User {
  coachProfile: CoachProfile;
}
