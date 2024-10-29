// get specific event given the event id from request body

import { NextRequest, NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export async function GET(request: NextRequest) { 
    const { searchParams } = new URL(request.url);
    try {
        const eventid = searchParams.get("eventid") as Id<"eventsTable">;
    if (!eventid) {
        return NextResponse.json({ message: "Missing eventid" }, { status: 400 });
    }
    // get event by id
    const event = await fetchQuery(api.events.getEventById, { eventid });

    if (!event) {
        return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json( event , { status: 200 });
    } catch (error) {
         if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
        
    }
}
