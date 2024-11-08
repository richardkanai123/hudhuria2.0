import { Event } from "@/lib/types"
import EventCard from "./EventCard"

const FetchEvents = async (): Promise<Response> => {
    const eventsApiUrl = `${process.env.NEXT_PUBLIC_URL}/api/events`

    const res = await fetch(eventsApiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    return res
}
const UpcomingEventsLister = async () => {

    const res = await FetchEvents()
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


    if (!eventsList || eventsList.length === 0) return <div>No upcoming events</div>

    const FeaturedEvents = eventsList.filter((event) => event.isFeatured)
    const FutureEvents = eventsList.filter((event) => {
        const eventDate = new Date(event.startDate)
        const currentDate = new Date()
        return eventDate > currentDate
    })



    return (
        <div className="w-full h-fit flex flex-col px-4 py-2">
            <h1 className="w-full text-3xl font-bold text-left text-primary mb-4 "> Featured Events</h1>

            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-center align-middle ">
                {
                    FeaturedEvents.map((event) => (
                        event ? <EventCard key={event._id} eventData={event} /> : null
                    ))
                }
            </div>
            <h1 className="w-full text-3xl font-bold text-left text-primary mt-6 "> Upcoming Events</h1>

            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-center align-middle ">
                {
                    FutureEvents.filter((event) => event.isPublished && !event.isDeleted).map((event) => (
                        event ? <EventCard key={event._id} eventData={event} /> : null
                    ))
                }
            </div>

        </div>
    )
}

export default UpcomingEventsLister