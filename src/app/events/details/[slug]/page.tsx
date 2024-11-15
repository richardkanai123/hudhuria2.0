import { Event } from '@/lib/types'
import Link from 'next/link'


const getEventDetails = async (slug: string) => {
    const EventURL = `${process.env.NEXT_PUBLIC_URL}/api/events`
    const res = await fetch(`${EventURL}/${slug}?slug=${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            tags: ['events', slug],
        }
    })

    return res
}

const EventsDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params
    console.log(slug)

    if (!slug) {
        return (
            <div className='text-center w-full flex align-middle justify-center items-center  min-h-[75vh]' >
                <p className='text-xl'>Something went wrong!</p>
                <span className='text-sm'>Missing event</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }


    const res = await getEventDetails(slug)
    const event: Event | null = await res.json()

    if (res.status !== 200 || !event) {
        return (
            <div className='text-center w-full flex align-middle justify-center items-center  min-h-[75vh]' >
                <p className='text-xl'>Something went wrong!</p>
                <span className='text-sm'>Missing event</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }




    return (
        <div className='w-full min-h-[75vh] max-h-fit flex flex-col items-center align-middle'>
            <h1>Event Details</h1>
            <h1>{event.eventTitle}</h1>

        </div>
    )
}

export default EventsDetails  