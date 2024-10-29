import { Id } from "../../convex/_generated/dataModel";

export interface Event {
    _id: Id<"eventsTable">;
    eventTitle: string;
    description: string;
    location: string;
    city: string;
    startDate: string; // You may also use `Date` if you parse strings into Date objects
    endDate: string;   // Same here
    image_id: string;
    image_url: string;
    category: string;
    isPaid: boolean;
    ticket_price: number;
    ticket_available: number;
    organizer: string;
    attendees?: string[]; // Optional array of user IDs
    likedBy?: string[];   // Optional array of user IDs
    isPublished: boolean;
    isDeleted: boolean;
    isFeatured: boolean;
    _creationTime: string;
}
