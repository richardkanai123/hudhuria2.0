import { Event } from '@/lib/types'
import EventCard from './EventCard'
import { FetchEvents } from '@/lib/actions/EventsActions'

const MainEventsLister = async () => {

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

    if (res.status === 200 && eventsList.length === 0) {
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
        <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-stretch place-content-center place-items-center align-middle  ">
            {
                eventsList.map((event) => (
                    event ? <EventCard key={event._id} eventData={event} /> : null
                ))
            }
        </div>
    )
}

export default MainEventsLister