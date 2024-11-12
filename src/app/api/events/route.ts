// api route for getting, creating, updating and deleting events

import { NextResponse, NextRequest } from "next/server";
import { fetchMutation, preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { validateEventSchema } from "@/lib/EventSchemaValidator";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary, UploadStream } from 'cloudinary'
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { Id } from "../../../../convex/_generated/dataModel";



interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any
}

export async function GET(request: NextRequest) {
    console.log(request.url)

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

        const bodyData =await request.json();
        console.log(bodyData)

        const { valid, error } = validateEventSchema(bodyData);
        if (!valid) {
            return NextResponse.json({ message: error as string }, { status: 400 })
        }

        // upload image to cloudinary

        const imageFile = bodyData.get('File') as File;

        if (!imageFile) {
            return NextResponse.json({ message: "Image file is required" }, { status: 400 })
        }
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)


        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "next-cloudinary-uploads" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                uploadStream.end(buffer)
            }
        )

        const eventData = {
            eventTitle: bodyData.get('eventTitle') as string,
            description: bodyData.get('description') as string,
            location: bodyData.get('location') as string,
            city: bodyData.get('city') as string,
            startDate: bodyData.get('startDate') as string,
            endDate: bodyData.get('endDate') as string,
            image_id: result.public_id,
            image_url: result.secure_url as string,
            category: bodyData.get('category') as string,
            isPaid: bodyData.get('isPaid') ==='true'? true : false,
            ticket_price: bodyData.get('ticket_price') as unknown as number,
            ticket_available: bodyData.get('ticket_available')  as unknown as number,
            organizer: bodyData.get('organizer')  as unknown as string,
            isPublished: true,
            isDeleted: false,
            isFeatured: false,
            uploadedBy: bodyData.get('uploadedBy') as unknown as Id<"usersTable">,
            attendees: [],
            likedBy: []
        }


        const NewEvent = await fetchMutation(api.events.AddNewEvent, eventData);



        if (!NewEvent) {
            return NextResponse.json({ message: `Failed to add new event` }, { status: 400 })
        }

        revalidatePath('/')

        return NextResponse.json({ message: `Added new event!` }, { status: 201 })

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}