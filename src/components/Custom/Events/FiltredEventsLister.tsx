'use client'
import { Event } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import EventCard from './EventCard'
const FiltredEventsLister = ({ events }: { events: Event[] | [] }) => {
    const searchParams = useSearchParams()
    const city = searchParams.get('city')
    const existingEvents = events.filter((event) => !event.isDeleted && event.isPublished)
    const filteredEvents = city ? existingEvents.filter((event) => event.city.toLowerCase() === (city?.toLowerCase())) : existingEvents

    if (filteredEvents.length === 0) {
        return (
            <div className="w-full mx-auto h-fit flex items-center align-middle justify-center flex-col px-4 py-2">
                <p className="text-yellow-600">
                    No events found for <span className='first-letter:uppercase'>{city || 'this city'}</span>
                </p>
            </div>
        )
    }

    return (
        <div className="w-full h-fit flex flex-col px-4 py-2">
            {
                city && <h1 className="w-full text-3xl font-bold text-left text-primary mb-4 "> Events in <span className='first-letter:uppercase '>{city.toLocaleUpperCase()}</span></h1>
            }
            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-center align-middle  ">
                {
                    filteredEvents.map((event) => (
                        event ? <EventCard key={event._id} eventData={event} /> : null
                    ))
                }
            </div>

        </div>
    )
}




export default FiltredEventsLister