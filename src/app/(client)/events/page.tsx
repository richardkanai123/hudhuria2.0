import CitiesCarousel from '@/components/Custom/Events/CitiesCarousel'
import MainEventsLister from '@/components/Custom/Events/MainEventsLister'
import EventLoadingCard from '@/components/Custom/loaders/EventLoadingCard'
import { Suspense } from 'react'
const EventsPage = async () => {

    return (
        <div className='w-full h-full px-4 py-2 flex flex-col align-middle justify-center'>
            <Suspense fallback={<div className='w-full mx-auto h-fit flex items-center align-middle justify-center flex-col px-4 py-2'>
                <h1>Upcoming Events</h1>
                <EventLoadingCard />
                <h2>Featured Events</h2>
                <EventLoadingCard />
            </div>} >
                <MainEventsLister />
            </Suspense>

            <div className="w-full h-fit p-4">
                <CitiesCarousel />
            </div>
        </div>
    )
}

export default EventsPage
