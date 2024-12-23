// api route for getting, creating, updating and deleting events

import { NextResponse, NextRequest } from "next/server";
import { fetchMutation, preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api"; 
import { validateEventSchema } from "@/lib/EventSchemaValidator";
import { revalidatePath, revalidateTag } from "next/cache";
import { Id } from "../../../../../convex/_generated/dataModel";




export async function PATCH(request: NextRequest) {

    try {
        const NewEventData = await request.formData()
        // create-slug from event title
        const CreateEventSlug = (eventTitle: string, location: string, organizer: string) => { 
            const slug = eventTitle.toLowerCase().replace(/\s+/g,'-').replace(/\s/g,'-')+"-"+`${location.toLowerCase().replace(/\s+/g,'-').replace(/\s/g,'-')}-${organizer.toLowerCase().replace(/\s+/g,'-').replace(/\s/g,'-')}`;
            return slug;
        }

        const NewEventObject = {
            eventid: NewEventData.get('eventid') as string as Id<"eventsTable">,
            eventTitle: NewEventData.get('eventTitle') as string,
            description: NewEventData.get('description') as string,
            location: NewEventData.get('location') as string,
            city: NewEventData.get('city') as string,
            isPaid: NewEventData.get('isPaid') === 'true' ? true : false,
            startDate: NewEventData.get('startDate') as string,
            endDate: NewEventData.get('endDate') as string,
            category: NewEventData.get('category') as string,
            organizer: NewEventData.get('organizer') as string,
            ticket_available: parseInt(NewEventData.get('totalTickets') as string),
            ticket_price: parseInt(NewEventData.get('ticketPrice') as string),
            slug: CreateEventSlug(NewEventData.get('eventTitle') as string, NewEventData.get('location') as string, NewEventData.get('organizer') as string),
            isPublished: NewEventData.get('isPublished') === 'true' ? true : false,
            isFeatured: NewEventData.get('isFeatured') === 'true' ? true : false,
            isDeleted: NewEventData.get('isDeleted') === 'true' ? true : false,
        }

        const { valid, error } = validateEventSchema(NewEventObject);
        if (!valid) {
            return NextResponse.json({ message: error as string }, { status: 400 })
        }

        const NewEvent = await fetchMutation(api.events.updateEventDatabyId,NewEventObject);

        if (!NewEvent) {
            return NextResponse.json({ message: `Failed to add new event` }, { status: 400 })
        }

        revalidatePath('/')
        revalidateTag('events')


        // get the newly updated event to send back to the client and redirect to the updated event page
        const newlyUpdatedEvent = await preloadQuery(api.events.getEventById, { eventid: NewEventObject.eventid });

        if (!newlyUpdatedEvent) {
            return NextResponse.json({ message: `Failed to get updated event` }, { status: 400 })
        }

        const UpdatedEvent = await fetchMutation(api.events.updateEventDatabyId,NewEventObject);

        if (!UpdatedEvent.updated) {
            return NextResponse.json({ message: `Failed to update event` }, { status: 400 })
        }
        return NextResponse.json({
            message: `Event updated successfully!`, 
            slug: UpdatedEvent.slug,
         }, { status: 201 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}