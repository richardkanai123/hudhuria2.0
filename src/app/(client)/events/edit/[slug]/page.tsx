import React from 'react'
import Link from 'next/link'
import { Event } from '@/lib/types'
import EventEditor from '@/components/Custom/Events/Event-Editor'
import { auth } from '@/Auth'


const getEventDetails = async (slug: string) => {
    const EventURL = `${process.env.NEXT_PUBLIC_URL}/api/events`
    const res = await fetch(`${EventURL}/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['events', slug],
        }
    })

    return res
}

const EventsDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params
    const session = await auth()

    if (!slug) {
        return (
            <div className='text-center w-full flex flex-col align-middle justify-center items-center  min-h-[75vh]' >
                <p className='text-xl'>Something went wrong!</p>
                <span className='text-sm'>Missing event</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }

    const res = await getEventDetails(slug)

    const event: Event | null = await res.json()

    if (res.status !== 200 || !event) {
        return (
            <div className='text-center w-full flex flex-col align-middle justify-center items-center  min-h-[75vh]' >
                <p className='text-xl'>Something went wrong!</p>
                <span className='text-sm'>Missing event</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }


    // ensure user has access to edit
    if (event.uploadedBy !== session?.user.id || !session) {
        return (
            <div className='text-center w-full flex flex-col align-middle justify-center items-center  min-h-[75vh]' >
                <p className='text-xl'>You do not have access to edit this event</p>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }


    return (
        <div className='w-full p-2'>
            <p className='text-xl text-primary text-center font-semibold'>Editing : {event.eventTitle}</p>

            <EventEditor eventData={event} />

        </div>
    )
}

export default EventsDetailsPage