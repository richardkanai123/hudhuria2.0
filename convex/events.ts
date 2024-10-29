import {  query,mutation } from "./_generated/server";
import {v} from "convex/values"
export const getAllEvent = query(async ({ db }) => { 

    const events = await db.query("eventsTable").collect()

    return events
})

// add a new event

export const AddNewEvent = mutation({
    args: {
        // event schema here
        eventTitle: v.string(),
        description: v.string(),
        location: v.string(),
        city: v.string(),
        startDate: v.string(),
        endDate: v.string(),
        image_id: v.string(),
        image_url: v.string(),
        category: v.string(),
        isPaid: v.boolean(),
        ticket_price: v.number(),
        ticket_available: v.number(),
         organizer: v.string(),
        attendees: v.optional(v.array(v.string())),
        likedBy: v.optional(v.array(v.string())),
        isPublished: v.boolean(),
        isDeleted: v.boolean(),
        isFeatured: v.boolean(),
    },
    handler: async ({ db },  args ) => {
        const { eventTitle,
        description,
        location,
        city,
        startDate,
        endDate,
        image_id,
        image_url,
        category,
        isPaid,
        ticket_price,
        ticket_available,
        organizer, 
        attendees,
        likedBy,
        isPublished,
        isDeleted,
        isFeatured,
        } = args
        const newEvent = await db.insert('eventsTable', {
        eventTitle,
        description,
        location,
        city,
        startDate,
        endDate,
        image_id,
        image_url,
        category,
        isPaid,
        ticket_price,
        ticket_available,
        organizer, 
        attendees,
        likedBy,
        isPublished,
        isDeleted,
        isFeatured,
      });
      return newEvent;
    },

})


// get specific event given its id

export const getEventById = query({
   args: { eventid: v.id("eventsTable") },
    handler: async (ctx, args) => {

        const eventid = args.eventid;

        if (typeof eventid !== 'string' || !eventid) { 
            throw new Error("Invalid event id");
        }
        const task = await ctx.db.get(eventid);

        return task;
    }
})