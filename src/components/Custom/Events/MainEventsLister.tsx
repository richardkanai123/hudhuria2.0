import { Event } from '@/lib/types'
import { FetchEvents } from '@/lib/actions/EventsActions'
import Client_Events_Lister from '@/components/Custom/Events/Client_Events_Lister'
import { Suspense } from 'react'
import EventLoadingCard from '../loaders/EventLoadingCard'

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
            </div>
        )
    }

    return (
        <div className="w-full h-fit flex flex-col px-4 py-2">
            <Suspense fallback={
                <div className='w-full mx-auto h-fit flex items-center align-middle justify-center flex-col px-4 py-2'>
                    <h1 className='w-full text-2xl font-bold text-left text-primary my-4 '>Upcoming Events</h1>
                    <EventLoadingCard />
                    <h2 className='w-full text-2xl font-bold text-left text-primary my-4 '>Featured Events</h2>
                    <EventLoadingCard />
                </div>
            }>
                <Client_Events_Lister eventsList={eventsList} />
            </Suspense>
        </div>
    )
}

export default MainEventsLister