// api route for getting, creating, updating and deleting events

import { NextResponse, NextRequest } from "next/server";
import { fetchMutation, preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { validateEventSchema } from "@/lib/EventSchemaValidator";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary'
import { Id } from "../../../../convex/_generated/dataModel";



interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any
}

const fileSizeLimit = 5 * 1024 * 1024

export async function GET(request: NextRequest) {

    try {
        const events = await preloadQuery(api.events.getAllEvents);
        if (!events) {
            return NextResponse.json({ message: `Failed to get events` }, { status: 400 })
        }

        return NextResponse.json(events._valueJSON, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }

    }
}


export async function POST(request: NextRequest) {

    cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,

    })

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return NextResponse.json({ message: "Missing cloudinary credentials" }, { status: 400 })
    }

    try {

        const NewEventData = await request.formData()

        const imageFile = NewEventData.get('imageFile') as File;
        if (!imageFile) {
            return NextResponse.json({ message: "Image file is required" }, { status: 400 })
        }

        // check file size
        if (imageFile.size > fileSizeLimit) {
            return NextResponse.json({ message: "File size should not exceed 5MB" }, { status: 400 })
        }

        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)


        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "hudhuria",
                        allowed_formats: ["jpg", "png", "jpeg", "webp"]
                     },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                uploadStream.end(buffer)
            }
        )

        // create-slug from event title
        const CreateEventSlug = (eventTitle: string, location: string, organizer: string) => { 
            const slug = eventTitle.toLowerCase().replace(/\s+/g,'-').replace(/\s/g,'-')+"-"+`${location.toLowerCase().replace(/\s+/g,'-').replace(/\s/g,'-')}-${organizer.toLowerCase().replace(/\s+/g,'-').replace(/\s/g,'-')}`;
            return slug;
        }

        const NewEventObject = {
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
            uploadedBy: NewEventData.get('uploadedBy') as Id<"usersTable">,
            attendees: [],
            likedBy: [],
            isPublished: true,
            isDeleted: false,
            isFeatured: false,
            image_id: result.public_id,
            image_url: result.secure_url,
            slug: CreateEventSlug(NewEventData.get('eventTitle') as string, NewEventData.get('location') as string, NewEventData.get('organizer') as string)
        }

        const { valid, error } = validateEventSchema(NewEventObject);
        if (!valid) {
            return NextResponse.json({ message: error as string }, { status: 400 })
        }

        const NewEvent = await fetchMutation(api.events.AddNewEvent, NewEventObject);

        if (!NewEvent) {
            return NextResponse.json({ message: `Failed to add new event` }, { status: 400 })
        }

        revalidatePath('/')
        revalidatePath('/events')

        return NextResponse.json({
            message: `Added new event!`, 
            slug: NewEventObject.slug
         }, { status: 201 })

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}