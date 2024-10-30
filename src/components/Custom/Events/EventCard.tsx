import { CalendarCheck, MapPinHouseIcon, UsersRound } from "lucide-react"
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import CloudImage from "./CloudImage";
import { Event } from "@/lib/types";

// next js dynamic import

const EventCard = ({ eventData }: { eventData: Event }) => {
    const { city, description: eventDescription, startDate, ticket_price, eventTitle, likedBy, isPaid, _id, image_id } = eventData
    const today = new Date()
    const truncatedDescription = eventDescription.slice(0, 100)

    return (
        <Link href={`/events/${_id}`} className="flex-1 w-full md:min-w-[300px] max-w-[350px] aspect-square flex flex-col gap-2 rounded-md overflow-hidden cursor-pointer shadow-sm bg-accent transition-all ease-in duration-700 group hover:shadow-md">
            {/* image */}
            <div className="w-full h-[200px] text-left flex flex-col items-end bg-opacity-25 bg-sky-200 bg-blend-overlay group-hover:bg-blend-normal transition-all ease-in delay-500 relative">
                <CloudImage image_id={image_id} />
            </div>

            {/* eventTitle within Image  */}
            <div className="w-full px-1 pb-4 flex flex-col gap-2">
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

                {/* payment details */}
                <div className="w-full flex justify-around flex-wrap ">
                    <div className="text-base flex items-center gap-1 px-2">
                        {isPaid ? <span className="text-primary">Ksh. {ticket_price}</span> : <Badge className="bg-lime-600">Free</Badge>}
                    </div>
                    <p className="text-base flex items-center gap-1">
                        <UsersRound className="w-4 h-4 inline-block mr-1" />
                        {likedBy?.length}
                    </p>

                </div>

            </div>
        </Link>
    )
}

export default EventCard