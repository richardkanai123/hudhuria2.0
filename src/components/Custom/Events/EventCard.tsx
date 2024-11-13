'use client'

import { CalendarCheck, MapPinHouseIcon, UsersRound } from "lucide-react"
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import CloudImage from "./CloudImage";
import { Event } from "@/lib/types";
const EventCard = ({ eventData }: { eventData: Event }) => {
    const { city, description: eventDescription, startDate, ticket_price, eventTitle, isPaid, image_id, slug } = eventData
    const today = new Date()
    const truncatedDescription = eventDescription.slice(0, 100)

    return (
        <Link prefetch href={`/events/${slug}`} className="flex-1 w-full md:min-w-[300px] max-w-[350px] max-h-[400px] aspect-square flex flex-col gap-2 rounded-md overflow-hidden cursor-pointer bg-accent transition-all ease-linear  group hover:shadow-lg">
            {/* image */}
            <div className="w-full min-h-[200px] text-left flex flex-col items-end bg-opacity-25 bg-sky-200 bg-blend-overlay group-hover:bg-blend-normal transition-all ease-in delay-500 relative">
                <CloudImage image_id={image_id} />
                {isPaid ? <Badge variant='secondary' className="text-primary z-10 px-2 shadow-lg bg-lime-600 absolute top-2 left-2">Ksh. {ticket_price}</Badge> : <Badge className="z-10 px-2 shadow-lg  absolute top-2 left-2">Free</Badge>}
            </div>

            <div className="w-full px-2 pb-4 flex flex-col gap-2 bg-transparent">
                <h2 className="w-full text-xl font-semibold text-primary">{eventTitle}</h2>

                {/* description */}
                <p className="w-full text-sm text-gray-500">
                    {truncatedDescription}
                    ...
                </p>

                {/* payment and  date details */}
                <div className="w-full flex justify-around flex-wrap text-gray-700 ">
                    <p className="text-base flex items-center gap-1">
                        <MapPinHouseIcon className="w-4 h-4 inline-block mr-1" />
                        {city}
                    </p>
                    <p className="text-base flex items-center gap-1">
                        <CalendarCheck className="w-4 h-4 inline-block mr-1" />
                        {formatDistance(new Date(startDate), today, { addSuffix: true })}
                    </p>

                </div>

            </div>
        </Link>
    )
}

export default EventCard