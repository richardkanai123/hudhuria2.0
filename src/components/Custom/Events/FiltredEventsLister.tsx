'use client'
import { Event } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import EventCard from './EventCard'
import CitiesCarousel from './CitiesCarousel'
const FiltredEventsLister = ({ events }: { events: Event[] | [] }) => {
    const searchParams = useSearchParams()
    const city = searchParams.get('city')
    const existingEvents = events.filter((event) => !event.isDeleted && event.isPublished)
    const filteredEvents = city ? existingEvents.filter((event) => event.city.toLowerCase() === city.toLowerCase()) : existingEvents

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
            <h1 className='text-xl font-bold text-primary'>Upcoming in {city?.toUpperCase() || 'all cities'}</h1>
            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-center align-middle  ">
                {
                    filteredEvents.map((event) => (
                        event ? <EventCard key={event._id} eventData={event} /> : null
                    ))
                }
            </div>

            <CitiesCarousel />
        </div>
    )
}




export default FiltredEventsLister