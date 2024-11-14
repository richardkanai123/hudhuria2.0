import CloudImage from '@/components/Custom/Events/CloudImage'
import EventPreviewButtons from '@/components/Custom/Events/EventPreviewButtons'
import LocationDetails from '@/components/Custom/Events/LocationDetails'
import TicketCard from '@/components/Custom/Events/TicketCard'
import TimeAndDateDisplay from '@/components/Custom/Events/TimeAndDateDisplay'
import { Event } from '@/lib/types'
import Link from 'next/link'
import React from 'react'

const EventPreviewPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    if (!slug) {
        return (
            <div className='text-center w-full flex align-middle justify-center items-center  min-h-[75vh]'>
                <p className='text-xl'>Something went wrong!</p>
                <span className='text-sm'>Missing event</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }

    // get the event for the given id

    const EventURL = `${process.env.NEXT_PUBLIC_URL}/api/events`
    const res = await fetch(`${EventURL}/${slug}?slug=${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['event', slug],
        }
    })

    const event: Event | null = await res.json()

    if (res.status !== 200 || !event) {

        return (
            <div className='text-center w-full flex align-middle justify-center items-center  min-h-[75vh]'>
                <p className='text-xl'>Something went wrong</p>
                <span className='text-sm'>{(await res.json()).message as string}</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }

    const { city, description, startDate, ticket_price, endDate, eventTitle, isPaid, _id, image_id, ticket_available, location, isPublished, isFeatured, uploadedBy } = event


    return (
        <div className='w-full h-fit min-h-[75vh] flex flex-col items-center align-middle justify-center pt-2' >
            <div className='w-full aspect-video max-h-[400px] md:max-h-[500px] relative object-contain'>
                <CloudImage image_id={image_id} />

            </div>
            <div className="w-full flex flex-col gap-4 md:flex-wrap p-4">
                <h1 className="text-2xl md:text-4xl font-extrabold text-primary md:leading-relaxed tracking-wide block mb-4">
                    {eventTitle}
                </h1>
                <p className='max-w-screen-lg text-lg text-secondary-foreground tracking-wide mb-2'>{description} </p>
                <LocationDetails city={city} venue={location} />
                <TicketCard isPaid={isPaid} price={ticket_price} ticket_available={ticket_available} eventID={_id} />
                <TimeAndDateDisplay startDate={startDate} endDate={endDate} />
            </div>

            <EventPreviewButtons slug={slug} isPublished={isPublished} owerID={uploadedBy} eventID={_id} isFeatured={isFeatured} />
        </div>
    );
}

export default EventPreviewPage