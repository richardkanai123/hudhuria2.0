// api route for getting, creating, updating and deleting events

import { NextResponse, NextRequest } from "next/server";
import { fetchMutation, preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { validateEventSchema } from "@/lib/EventSchemaValidator";
import { revalidatePath } from "next/cache";
export async function GET(request: NextRequest) {
    console.log(request.url)

    try {
        const events = await preloadQuery(api.events.getAllEvents);
        if (!events) {
            return NextResponse.json({ message: `Failed to get events` }, { status: 400 })
        }

        return NextResponse.json(events._valueJSON , { status: 200 })
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
        
    }
 }

//  add new event

export async function POST(request: NextRequest) {
    try {
        const bodyData = await request.json();
        console.table(bodyData)
        // validate body
        const { valid, error } = validateEventSchema(bodyData);
        if (!valid) {
            return NextResponse.json({ message: error }, { status: 400 })
        }
        // add new event
        const NewEvent = await fetchMutation(api.events.AddNewEvent, bodyData);
       
        if(!NewEvent) {
            return NextResponse.json({ message: `Failed to add new event` }, { status: 400 })
        }

        revalidatePath('/')

        return NextResponse.json({ message: `Added new event!` }, { status: 201 })
       
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}