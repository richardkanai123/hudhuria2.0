import CitiesCarousel from '@/components/Custom/Events/CitiesCarousel'
import FiltredEventsLister from '@/components/Custom/Events/FiltredEventsLister'
import EventLoadingCard from '@/components/Custom/loaders/EventLoadingCard'
import { Event } from '@/lib/types'
import React, { Suspense } from 'react'

const EventsPage = async () => {

    const eventsApiUrl = `${process.env.NEXT_PUBLIC_URL}/api/events`

    const res = await fetch(eventsApiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    const eventsList: Event[] | [] = await res.json()


    if (res.status !== 200) {
        return (
            <div className="w-full mx-auto h-fit flex items-center align-middle justify-center flex-col px-4 py-2">
                <h1 className="w-full text-3xl font-bold text-left text-primary mb-4 "> Featured Events</h1>
                <p className="text-yellow-600">
                    Something went wrong
                </p>
                <p>Refresh the page</p>

            </div>
        )

    }

    // 
    if (eventsList.length === 0) {
        return (
            <div className="w-full mx-auto h-fit flex items-center align-middle justify-center flex-col px-4 py-2">
                <h1 className="w-full text-3xl font-bold text-left text-primary mb-4 "> Featured Events</h1>
                <p className="text-yellow-600">
                    No events found
                </p>
                <p>Refresh the page</p>
            </div>
        )
    }

    return (
        <div className='w-full h-full px-4 py-2 flex flex-col align-middle justify-center'>
            <Suspense fallback={<EventLoadingCard />} >
                <FiltredEventsLister events={eventsList} />
            </Suspense>


            <div className="w-full h-fit p-4">
                <CitiesCarousel />
            </div>
        </div>
    )
}

export default EventsPage