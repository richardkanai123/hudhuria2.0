import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

//event schema

export default defineSchema({
    eventsTable: defineTable({
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
    })
        .index("by_event_title", ["eventTitle"])
        .index("by_city", ["city"])
        .index("by_category", ["category"])
        .index("by_organizer", ["organizer"])
        .index("by_uploadedBy", ["uploadedBy"])
        .index("by_slug", ["slug"]),
    
    
    paymentsTable: defineTable({
        id: v.id('paymentsTable'),
        trans_id: v.string(),
        // identify event being paid for
        event_id: v.id('eventsTable'),
        amount: v.number(),
        phoneNumber: v.string(),
        createdAt: v.string(),
    }),
    usersTable: defineTable({
        email: v.string(),
        name: v.string(),
        bio: v.string(),
        password: v.string(),
        isVerified: v.boolean(),
        isAdmin: v.boolean(),
    }).index("by_email", ["email"])
    
})