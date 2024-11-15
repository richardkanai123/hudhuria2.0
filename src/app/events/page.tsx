import CitiesCarousel from '@/components/Custom/Events/CitiesCarousel'
import MainEventsLister from '@/components/Custom/Events/MainEventsLister'
import EventLoadingCard from '@/components/Custom/loaders/EventLoadingCard'
import { Suspense } from 'react'
const EventsPage = async () => {

    return (
        <div className='w-full h-full px-4 py-2 flex flex-col align-middle justify-center'>
            <h1 className='text-xl font-bold text-left text-primary mb-4'>Events</h1>
            <Suspense fallback={<EventLoadingCard />} >
                <MainEventsLister />
            </Suspense>

            <div className="w-full h-fit p-4">
                <CitiesCarousel />
            </div>
        </div>
    )
}

export default EventsPage
