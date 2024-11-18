// get specific event given the event id from request body
import { NextRequest, NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    
console.log('params:',params)
  const { slug } = await params

    console.log('awaited slug:',slug)

    // const { searchParams } = new URL(request.url);
    //      const slug = searchParams.get("slug") as string;
    if (!slug) {
        return NextResponse.json({ message: "Missing slug" }, { status: 400 });
    }
    try {
    const event = await fetchQuery(api.events.getEventBySlug, { slug: slug });
    if (!event) {
        return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json( event[0] , { status: 200 });
    } catch (error) {
         if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
        
    }
}
