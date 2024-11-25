// like an event
import { NextRequest, NextResponse } from "next/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api"; 
import { Id } from "../../../../../../convex/_generated/dataModel";
import { revalidateTag } from "next/cache";

export async function PATCH(request: NextRequest) {
    try {
        const bodyData = await request.json();
        console.log(bodyData)
        
        const eventid = bodyData.eventid as Id<"eventsTable">;
        const userid = bodyData.userid as Id<"usersTable">;

        if (!eventid) {
            return NextResponse.json({ message: "Missing event id" }, { status: 400 })
        }
        
        if (!userid) {
            return NextResponse.json({ message: "Missing user id" }, { status: 400 })
        }

    //    call the mutation to like an event
        const LikedEvent = await fetchMutation(api.events.RemoveAttendance, { eventid: eventid, userid: userid });
        if (!LikedEvent) {
            return NextResponse.json({ message: "Failed to remove attendance" }, { status: 400 })
        }
         revalidateTag('events')
        revalidateTag(LikedEvent)
        return NextResponse.json({ message: `Removed Attendance` }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}