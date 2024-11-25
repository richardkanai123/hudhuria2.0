import { NextResponse } from "next/server";
import { api } from "../../../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { fetchMutation } from "convex/nextjs";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";
export async function PATCH(request: Request) {
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

        // check if the event is already unpublished
        if (!ExistingEvent.isPublished) {
            return NextResponse.json({ message: "Event is already unpublished" }, { status: 400 });
        }

        // unpublish the event
        const unPublishEvent = fetchMutation(api.events.unpublishEvent,{ eventid:  ExistingEvent._id});
        if (!unPublishEvent) {
            return NextResponse.json({ message: "Failed to unpublish event" }, { status: 400 });
        }

        revalidateTag(ExistingEvent.slug)
        revalidatePath('/')

        return NextResponse.json({ message: `Unpublished: ${ExistingEvent.eventTitle}` }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}