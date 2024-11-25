import { FetchEvents } from "@/lib/actions/EventsActions"
import { Event } from "@/lib/types"
import EventCard from "./EventCard"

const UserUpcomingEvents = async ({ userid }: { userid: string }) => {

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

    console.log(userid)
    const FutureEvents = eventsList.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).filter((event) => {
        const eventDate = new Date(event.startDate)
        const currentDate = new Date()
        return eventDate > currentDate
    })
    const UpcomingNonFeaturedEvents = FutureEvents.filter((event) => !event.isFeatured)


    const userUpcomingEvents = UpcomingNonFeaturedEvents.filter((event) => event.attendees?.includes(userid))

    if (!userUpcomingEvents || userUpcomingEvents.length === 0) return <div>No upcoming events</div>


    return (
        <>
            <h1 className="w-full text-3xl font-bold text-left text-primary mb-4 "> Your Upcoming Events</h1>

            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-stretch place-content-center place-items-center align-middle ">
                {
                    userUpcomingEvents.map((event) => (
                        event ? <EventCard key={event._id} eventData={event} /> : null
                    ))
                }
            </div></>
    )
}

export default UserUpcomingEvents