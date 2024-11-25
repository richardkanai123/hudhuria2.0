import {  query,mutation } from "./_generated/server";
import {v} from "convex/values"
export const getAllEvents = query(async ({ db }) => { 

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
        uploadedBy: v.id('usersTable'),
        slug: v.string(),
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
            uploadedBy,
        slug
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
            uploadedBy,
        slug
        
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

// getEvent by slug
export const getEventBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const slug = args.slug;
        if (typeof slug !== 'string' || !slug) {
            throw new Error("Invalid slug");
        }
        const event = await ctx.db.query("eventsTable").filter(q => q.eq(q.field("slug"), slug)).collect();
        return event;
    }
})


// get events by a certain user
export const getEventsByUser = query({
    args: { userid: v.id("usersTable") },
    handler: async (ctx, args) => {
        const userid = args.userid;
        if (typeof userid !== 'string' || !userid) {
            throw new Error("Invalid user id");
        }
        const events = await ctx.db.query("eventsTable").filter(q => q.eq(q.field("uploadedBy"), userid)).collect();
        return events;
    }
})

// delete an event given its id
export const deleteEvent = mutation({
    args: { eventid: v.id("eventsTable") },
    handler: async (ctx, args) => {
        const eventid = args.eventid;
        if (typeof eventid !== 'string' || !eventid) {
            throw new Error("Invalid event id");
        }
        const event = await ctx.db.get(eventid);
        if (!event) {
            throw new Error("Event not found");
        }
        await ctx.db.patch(eventid, { isDeleted: true });
        return true;
    }
})

// unpublish an event given its id
export const unpublishEvent = mutation({
    args: { eventid: v.id("eventsTable") },
    handler: async (ctx, args) => {
        const eventid = args.eventid;
        if (typeof eventid !== 'string' || !eventid) {
            throw new Error("Invalid event id");
        }
        const event = await ctx.db.get(eventid);
        if (!event) {
            throw new Error("Event not found");
        }
        await ctx.db.patch(eventid, { isPublished: false });
        return event;
    }
})

// publish an event given its id
export const publishEvent = mutation({
    args: { eventid: v.id("eventsTable") },
    handler: async (ctx, args) => {
        const eventid = args.eventid;
        if (typeof eventid !== 'string' || !eventid) {
            throw new Error("Invalid event id");
        }
        const event = await ctx.db.get(eventid);
        if (!event) {
            throw new Error("Event not found");
        }
        await ctx.db.patch(eventid, { isPublished: true });
        return event;
    }
})



// get events by a certain user given the user id
export const getEventsByUserId = query({
    args: { userid: v.id("usersTable") },
    handler: async (ctx, args) => {
        const userid = args.userid;
        if (typeof userid !== 'string' || !userid) {
            throw new Error("Invalid user id");
        }
        const events = await ctx.db.query("eventsTable").filter(q => q.eq(q.field("uploadedBy"), userid)).collect();
        return events;
    }
})

// upadate an event given its id and new data
export const updateEvent = mutation({
    args: {
        eventid: v.id("eventsTable"),
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
        uploadedBy: v.id('usersTable'),
        slug: v.string(),
    },
    handler: async (ctx, args) => {
        const eventid = args.eventid;
        if (typeof eventid !== 'string' || !eventid) {
            throw new Error("Invalid event id");
        }
        const event = await ctx.db.get(eventid);
        if (!event) {
            throw new Error("Event not found");
        }
        await ctx.db.patch(eventid, args);
        return event;
    }
})
    

// like an event 
export const LikeEvent = mutation({
    args: { eventid: v.id("eventsTable"), userid: v.id("usersTable") },
    handler: async (ctx, args) => {
        const eventid = args.eventid;
        const userid = args.userid;
        if (typeof eventid !== 'string' || !eventid) {
            throw new Error("Invalid event id");
        }
        if (typeof userid !== 'string' || !userid) {
            throw new Error("Invalid user id");
        }
        const event = await ctx.db.get(eventid);
        if (!event) {
            throw new Error("Event not found");
        }
        // check if the user has already liked the event
        if (event.likedBy?.includes(userid)) {
            throw new Error("You have already liked this event");
        }
        await ctx.db.patch(eventid, { likedBy: event.likedBy ? [...event.likedBy, userid] : [userid] });
        return event.slug;
    }
})

// Unlike an already liked event
export const UnlikeEvent = mutation({
    args: { eventid: v.id("eventsTable"), userid: v.id("usersTable") },
    handler: async (ctx, args) => {
        const eventid = args.eventid;
        const userid = args.userid;
        if (typeof eventid !== 'string' || !eventid) {
            throw new Error("Invalid event id");
        }
        if (typeof userid !== 'string' || !userid) {
            throw new Error("Invalid user id");
        }
        const event = await ctx.db.get(eventid);
        if (!event) {
            throw new Error("Event not found");
        }
        
        // check if the user has already liked the event
        if (!event.likedBy?.includes(userid)) {
            throw new Error("You have not liked this event");
        }
        await ctx.db.patch(eventid, { likedBy: event.likedBy?.filter(likedUser => likedUser !== userid) });

        return event.slug;
    }
})


// mark an event as attending
export const MarkAttendance = mutation({
    args: { eventid: v.id("eventsTable"), userid: v.id("usersTable") },
    handler: async (ctx, args) => {
        const eventid = args.eventid;
        const userid = args.userid;
        if (typeof eventid !== 'string' || !eventid) {
            throw new Error("Invalid event id");
        }
        if (typeof userid !== 'string' || !userid) {
            throw new Error("Invalid user id");
        }
        const event = await ctx.db.get(eventid);
        if (!event) {
            throw new Error("Event not found");
        }
        await ctx.db.patch(eventid, { attendees: event.attendees ? [...event.attendees, userid] : [userid] });
        return event.slug;
    }
})


// remove attendance from an event
export const RemoveAttendance = mutation({
    args: { eventid: v.id("eventsTable"), userid: v.id("usersTable") },
    handler: async (ctx, args) => {
        const eventid = args.eventid;
        const userid = args.userid;
        if (typeof eventid !== 'string' || !eventid) {
            throw new Error("Invalid event id");
        }
        if (typeof userid !== 'string' || !userid) {
            throw new Error("Invalid user id");
        }
        const event = await ctx.db.get(eventid);
        if (!event) {
            throw new Error("Event not found");
        }

        // check if the user has already marked attendance
        if (!event.attendees?.includes(userid)) {
            throw new Error("You are not on the attendace list");
        }
        await ctx.db.patch(eventid, { attendees: event.attendees?.filter(attendee => attendee !== userid) });
        return event.slug;
    }
})
