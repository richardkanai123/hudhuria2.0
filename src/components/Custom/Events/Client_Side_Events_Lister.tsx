'use client'

import { Event } from "@/lib/types"
import EventCard from "./EventCard"
const Client_Side_Events_Lister = ({ events, userid }: { events: Event[], userid: string }) => {
    const FutureEvents = events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).filter((event) => {
        const eventDate = new Date(event.startDate)
        const currentDate = new Date()
        return eventDate > currentDate
    })
    const UpcomingNonFeaturedEvents = FutureEvents.filter((event) => !event.isFeatured)


    const userUpcomingEvents = UpcomingNonFeaturedEvents.filter((event) => event.attendees?.includes(userid))

    if (!userUpcomingEvents || userUpcomingEvents.length === 0) return <div>No upcoming events</div>
    return (
        <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-stretch place-content-center place-items-center align-middle ">
            {
                userUpcomingEvents.map((event) => (
                    event ? <EventCard key={event._id} eventData={event} /> : null
                ))
            }
        </div>
    )
}

export default Client_Side_Events_Lister