import EventLikesandMarks from '@/components/Custom/Events/EventLikesandMarks'
import EventPreviewButtons from '@/components/Custom/Events/EventPreviewButtons'
import LocationDetails from '@/components/Custom/Events/LocationDetails'
import TicketCard from '@/components/Custom/Events/TicketCard'
import TimeAndDateDisplay from '@/components/Custom/Events/TimeAndDateDisplay'
import { Event } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'


const getEventDetails = async (slug: string) => {
    const EventURL = `${process.env.NEXT_PUBLIC_URL}/api/events`
    const res = await fetch(`${EventURL}/${slug}`, {
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
    if (!slug) {
        return (
            <div className='text-center w-full flex flex-col align-middle justify-center items-center  min-h-[75vh]' >
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
            <div className='text-center w-full flex flex-col align-middle justify-center items-center  min-h-[75vh]' >
                <p className='text-xl'>Something went wrong!</p>
                <span className='text-sm'>Missing event</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }


    const { eventTitle, description, location, city, startDate, endDate, image_url, category, isPaid, ticket_price, ticket_available, organizer, attendees, likedBy, isPublished, isFeatured, uploadedBy, _id } = event





    return (
        <div className='w-full min-h-[80vh] max-h-fit flex flex-col items-center align-middle'>
            {/* event image */}
            <div className='w-full aspect-video sm:max-h-[400px] md:max-h-[75vh] relative object-cover rounded-b-md overflow-hidden '>
                <Image src={image_url} sizes='100%' fill alt={eventTitle} objectFit='cover' objectPosition='center' />

                {
                    !isPaid && <div className='absolute top-2 z-10 left-2'>
                        <TicketCard isPaid={isPaid} price={ticket_price} ticket_available={ticket_available} eventID={_id} />
                    </div>
                }
            </div>

            {/* event description */}
            <div className="w-full flex flex-col md:flex-wrap gap-0 px-4">
                <h1 className="text-2xl md:text-4xl font-extrabold text-primary  tracking-wide block">
                    {eventTitle}
                </h1>
                <p className='text-sm align-sub'>Organized by : {organizer}</p>


                <p className='max-w-screen-lg text-lg text-secondary-foreground tracking-wide text-pretty my-2'>{description}</p>

                <EventLikesandMarks uploader={uploadedBy} attendees={attendees} likedBy={likedBy} />


                <div className="w-full my-2">
                    <EventPreviewButtons eventID={_id} isFeatured={isFeatured} isPublished={isPublished} slug={slug} owerID={uploadedBy} />
                </div>
            </div>

            <div className="w-full p-2 flex flex-col gap-4 align-middle justify-centeritems-center md:items-start ">
                {/* ticket card */}
                {isPaid && <TicketCard isPaid={isPaid} price={ticket_price} ticket_available={ticket_available} eventID={_id} />}
                {/* location details */}
                <LocationDetails venue={location} city={city} />
                {/* time and date details */}
                <TimeAndDateDisplay startDate={startDate} endDate={endDate} />

            </div>

        </div>
    )
}

export default EventsDetails  