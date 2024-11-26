'use client'

import { Event } from "@/lib/types"
import EventCard from "./EventCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
const Client_Side_Events_Lister = ({ events, userid }: { events: Event[], userid: string }) => {
    const FutureEvents = events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).filter((event) => {
        const eventDate = new Date(event.startDate)
        const currentDate = new Date()
        return eventDate > currentDate
    })
    const UpcomingNonFeaturedEvents = FutureEvents.filter((event) => !event.isFeatured && !event.isDeleted)


    const userUpcomingEvents = UpcomingNonFeaturedEvents.filter((event) => event.attendees?.includes(userid))
    const UserUploadedEvents = events.filter((event) => event.uploadedBy === userid)

    return (
        <>
            <h2 className=' font-semibold text-primary text-xl'>Your Upcoming Events</h2>
            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-stretch place-content-center place-items-center align-middle ">
                {
                    userUpcomingEvents.length > 0 ? userUpcomingEvents?.map((event) => (
                        <EventCard key={event._id} eventData={event} />
                    )) : <div className="w-full h-fit flex items-center align-middle justify-center flex-col gap-4 px-4 py-2">
                        <p className="text-yellow-600">You have no upcoming events found</p>
                        <p className="text-yellow-600 font-semibold">Please mark attendance for any of the listed events</p>
                        <Button asChild>
                            <Link href='/events' className="w-fit text-sm hover:text-sky-400 font-semibold cursor-pointer">View all events</Link>
                        </Button>
                    </div>
                }
            </div>
            <h2 className=' font-semibold text-primary text-xl mt-4'>Your events</h2>
            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-stretch place-content-center place-items-center align-middle ">
                {
                    UserUploadedEvents.length > 0 ? UserUploadedEvents.map((event) => (
                        <EventCard key={event._id} eventData={event} />
                    )) : <div className="w-full h-fit flex items-center align-middle justify-center flex-col gap-4 px-4 py-2">
                        <p className="text-yellow-600">No events found</p>
                        <p>Please create an event</p>
                        <Button asChild>
                            <Link href='/events/create' className="w-fit text-sm hover:text-sky-400 font-semibold cursor-pointer">Create event</Link>
                        </Button>
                    </div>
                }
            </div>
        </>
    )
}

export default Client_Side_Events_Lister