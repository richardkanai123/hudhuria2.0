export type EventType = {
    eventId: string;
    title: string;
    description: string;
    organizerId: string;
    category: string;
    city: string;
    venue: string;
    eventDate: string;
    ticketPrice: number;
    isFree: boolean;
    maxAttendees: number;
    registeredAttendees: string[] | [],
    eventImage: string,
    status: string,
    createdAt: string,
    updatedAt: string
}


export interface Event {
    id: string; // Unique identifier for the event
    title: string; // Title of the event
    description: string; // Detailed description of the event
    category: string; // Category of the event (e.g., music, business, etc.)
    city: string; // The city where the event takes place
    venue: string; // Venue of the event
    imageUrl: string; // URL of the event's image
    eventDate: string; // Date and time of the event
    organizer: {
        id: string; // Unique identifier for the event organizer
        name: string; // Name of the organizer
        contactEmail: string; // Organizer's contact email
    };
    ticket: {
        price: number; // Ticket price (if free, set to 0)
        totalTickets: number; // Total number of tickets available
        soldTickets: number; // Number of tickets sold
    };
    isPaidEvent: boolean; // Whether the event is paid or free
    tags: string[]; // List of tags related to the event (e.g., #festival, #workshop)
    attendees: string[]; // List of user IDs of attendees
    isCancelled: boolean; // Whether the event has been cancelled
    createdAt: Date; // Timestamp for when the event was created
    updatedAt?: Date; // Optional: Timestamp for when the event was last updated

}