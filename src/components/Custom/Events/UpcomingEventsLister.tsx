import { EventType } from "@/lib/types"
import EventCard from "./EventCard"

const UpcomingEventsLister = ({ eventsList }: { eventsList: EventType[] | null }) => {

    if (!eventsList || eventsList.length === 0) return <div>No upcoming events</div>

    // filter eventsList to only include events with status "upcoming"
    const upcomingEvents = eventsList.filter((event) => event?.status === "upcoming")
    // sort eventsList by eventDate
    const sortedUpcomingEvents = upcomingEvents.sort((a, b) => {
        if (!a || !b) return 0
        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    })

    return (
        <div className="w-full h-fit flex flex-col px-4 py-2">
            <h1 className="w-full text-3xl font-bold text-left text-primary mb-4 "> Featured Events</h1>

            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-center align-middle ">
                {
                    sortedUpcomingEvents.map((event) => (
                        event ? <EventCard eventData={event} key={event.eventId} /> : null
                    ))
                }
            </div>
        </div>
    )
}

export default UpcomingEventsLister