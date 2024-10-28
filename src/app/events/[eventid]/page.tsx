import React from 'react'

const EventDetailsPage = async (props: { params: Promise<{ eventid: string }> }) => {
    const params = await props.params;
    const { eventid } = params;

    return (
        <div>Event Details Page: {eventid}</div>
    );
};

export default EventDetailsPage