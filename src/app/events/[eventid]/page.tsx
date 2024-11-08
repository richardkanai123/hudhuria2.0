import CloudImage from '@/components/Custom/Events/CloudImage';
import { Event } from '@/lib/types';
import React from 'react'
import TimeAndDateDisplay from '@/components/Custom/Events/TimeAndDateDisplay';
import LocationDetails from '@/components/Custom/Events/LocationDetails';
import TicketCard from '@/components/Custom/Events/TicketCard';
import AttendanceCard from '@/components/Custom/Events/AttendanceCard';



const EventDetailsPage = async (props: { params: Promise<{ eventid: string }> }) => {
    const params = await props.params;
    const { eventid } = params;


    if (!eventid) {
        return (
            <div className='text-center w-full flex align-middle justify-center items-center  min-h-[75vh]'>
                <p className='text-xl'>Something went wrong</p>
                <span className='text-sm'>Missing eventid</span>
            </div>
        )
    }


    // get the event for the given id

    const EventURL = 'http://localhost:3000/api/events'
    const res = await fetch(`${EventURL}/${eventid}?eventid=${eventid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const event: Event | null = await res.json()

    if (res.status !== 200 || !event) {

        return (
            <div className='text-center w-full flex align-middle justify-center items-center  min-h-[75vh]'>
                <p className='text-xl'>Something went wrong</p>
                <span className='text-sm'>{(await res.json()).message as string}</span>
            </div>
        )
    }

    const { city, description, startDate, ticket_price, endDate, eventTitle, isPaid, _id, image_id, attendees, ticket_available, location } = event


    return (
        <div className='w-full h-fit min-h-[75vh] flex flex-col items-center align-middle justify-center pt-2' >
            <div className='w-full aspect-video max-h-[400px] relative object-contain'>
                <CloudImage image_id={image_id} />

            </div>
            <div className="w-full flex flex-col gap-4 md:flex-wrap p-4">

                <h1 className="text-2xl md:text-4xl font-extrabold text-primary md:leading-relaxed tracking-wide block mb-4">
                    {eventTitle}
                </h1>
                <p className='max-w-screen-lg text-lg text-secondary-foreground tracking-wide mb-2'>{description} </p>

                <AttendanceCard attendees={attendees} id={_id} />

                <TicketCard isPaid={isPaid} price={ticket_price} ticket_available={ticket_available} eventID={_id} />

                <TimeAndDateDisplay startDate={startDate} endDate={endDate} />

                <LocationDetails city={city} venue={location} />
            </div>

        </div >
    );
};

export default EventDetailsPage