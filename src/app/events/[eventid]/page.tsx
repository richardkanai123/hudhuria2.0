import CloudImage from '@/components/Custom/Events/CloudImage';
import { Event } from '@/lib/types';
import React from 'react'

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

    const { city, description, startDate, ticket_price, eventTitle, likedBy, isPaid, _id, image_id } = event


    return (
        <div className='w-full h-fit min-h-[75vh] flex flex-col items-center align-middle justify-center'>
            <div className='w-full h-[400px] mb-4 relative object-contain'>
                <CloudImage image_id={image_id} />
            </div>

            <div className="w-full flex flex-col md:flex-row md:flex-wrap p-4">
                <p>{description}  </p>
            </div>


        </div>
    );
};

export default EventDetailsPage