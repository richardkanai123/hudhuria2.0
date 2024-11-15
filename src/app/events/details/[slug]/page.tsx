import CloudImage from '@/components/Custom/Events/CloudImage';
import { Event } from '@/lib/types';
import TimeAndDateDisplay from '@/components/Custom/Events/TimeAndDateDisplay';
import LocationDetails from '@/components/Custom/Events/LocationDetails';
import TicketCard from '@/components/Custom/Events/TicketCard';
import AttendanceCard from '@/components/Custom/Events/AttendanceCard';
import Link from 'next/link';
import { auth } from '@/Auth';
import EventPreviewButtons from '@/components/Custom/Events/EventPreviewButtons';

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

const EventDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
    const params = await props.params;
    const { slug } = params;
    const Session = await auth();

    if (!slug) {
        return (
            <div className='text-center w-full flex align-middle justify-center items-center  min-h-[75vh]'>
                <p className='text-xl'>Something went wrong!</p>
                <span className='text-sm'>Missing event or not logged in</span>
                <span className='text-sm'>Missing event</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }


    const res = await getEventDetails(slug)
    const event: Event | null = await res.json()

    if (res.status !== 200 || !event) {

        return (
            <div className='text-center w-full flex align-middle justify-center items-center  min-h-[75vh]'>
                <p className='text-xl'>Something went wrong</p>
                <span className='text-sm'>{(await res.json()).message as string}</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }

    const { city, description, startDate, ticket_price, endDate, eventTitle, isPaid, _id, image_id, attendees, ticket_available, location, uploadedBy } = event


    if (!Session?.user.id || !uploadedBy) {
        return (
            <div className='text-center w-full flex align-middle justify-center items-center  min-h-[75vh]'>
                <p className='text-xl'>Something went wrong!</p>
                <span className='text-sm'>No user or owner detected</span>
                <Link href="/events" className="text-sm hover:text-primary">Go to events</Link>
            </div>
        )
    }


    return (
        <div className='w-full h-fit min-h-[75vh] flex flex-col items-center align-middle justify-center pt-2' >
            <div className='w-full aspect-video max-h-[400px] md:max-h-[500px] relative object-contain'>
                <CloudImage image_id={image_id} />

            </div>
            <div className="w-full flex flex-col gap-4 md:flex-wrap p-4">

                <h1 className="text-2xl md:text-4xl font-extrabold text-primary md:leading-relaxed tracking-wide block mb-4">
                    {eventTitle}
                </h1>
                {
                    Session?.user.id as string === uploadedBy ? (
                        <EventPreviewButtons eventID={_id} isPublished={event.isPublished} isFeatured={event.isFeatured} slug={event.slug} owerID={event.uploadedBy} />
                    ) : null
                }
                <TicketCard isPaid={isPaid} price={ticket_price} ticket_available={ticket_available} eventID={_id} />
                <p className='max-w-screen-lg text-lg text-secondary-foreground tracking-wide mb-2'>{description} </p>


                <AttendanceCard isOwnerViewing={Session?.user.id === uploadedBy} attendees={attendees} id={_id} />


                <TimeAndDateDisplay startDate={startDate} endDate={endDate} />

                <LocationDetails city={city} venue={location} />


            </div>



        </div >
    );
};

export default EventDetailsPage