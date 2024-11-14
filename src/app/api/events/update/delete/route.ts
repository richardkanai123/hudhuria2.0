// deletes an event given its id and user id
import { NextRequest, NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api"; 
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { Id } from "../../../../../../convex/_generated/dataModel";


export async function DELETE(request: NextRequest) { 
    const { searchParams } = new URL(request.url);
    const eventid = searchParams.get("eventid") as Id<"eventsTable">;
    const userid = searchParams.get("userid") as Id<"usersTable">;
    if (!eventid) {
        return NextResponse.json({ message: "Missing event id" }, { status: 400 });
    }

    if (!userid) {
        return NextResponse.json({ message: "Missing user id" }, { status: 400 });
    }

    try {
        // fetch the event 
        const ExistingEvent = await fetchQuery(api.events.getEventById, { eventid: eventid });
        if (!ExistingEvent) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        
        // check if the user is the owner of the event
        if (ExistingEvent.uploadedBy !== userid) {
            return NextResponse.json({ message: "You are not the owner of this event" }, { status: 403 });
        }

        // check if the event is already deleted
        if (ExistingEvent.isDeleted) {
            return NextResponse.json({ message: "Event is already deleted" }, { status: 400 });
        }

        // delete the event
        const deletedEvent = await fetchMutation(api.events.deleteEvent, { eventid: eventid })

        if (!deletedEvent) {
            return NextResponse.json({ message: "Unable to delete event" }, { status: 404 });
        }
        revalidatePath('/events');
        return NextResponse.json({ message: "Event deleted" }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}