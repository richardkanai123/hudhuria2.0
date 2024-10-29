import { z } from 'zod';

const eventSchema = z.object({
  eventTitle: z.string().min(1, 'Event title is required'),
  description: z.string().min(1, 'Event description is required'),
  location: z.string().min(1, 'Event location is required'),
  city: z.string().min(1, 'Event city is required'),
  startDate: z.string().min(1, 'Event start date is required'),
  endDate: z.string().min(1, 'Event end date is required'),
  image_id: z.string().min(1, 'Event image ID is required'),
  image_url: z.string().min(1, 'Event image URL is required'),
  category: z.string().min(1, 'Event category is required'),
  isPaid: z.boolean(),
  ticket_price: z.number(),
  ticket_available: z.number(),
  organizer: z.string().min(1, 'Event organizer is required'),
  attendees: z.array(z.string()).optional(),
  likedBy: z.array(z.string()).optional(),
  isPublished: z.boolean(),
  isDeleted: z.boolean(),
  isFeatured: z.boolean(),
}).refine(
  (data) => data.startDate < data.endDate, // Ensure startDate is before endDate
    {
    path: ["endDate"], // Where the error message will be displayed
    message: "End date cannot be before start date",
    }
).refine(
    (data) => 
        !data.isPaid || (data.ticket_price > 0 && data.ticket_available > 0), // Ensure price and totalTickets > 0 if event is paid
    {
    path: ["isPaid"], // Where the error message will be displayed
    message: "For paid events, ticket price and total tickets must be greater than zero",
    }
)


export const validateEventSchema = (data: unknown) => {
  try {
    const result = eventSchema.parse(data);
    return { valid: true, data: result };
  } catch (error) {
      if(error instanceof z.ZodError) {
        return { valid: false, error: error.issues };
      }
      else {
           return { valid: false, error: "Unknow error has occured" };
      }
   
  }
};