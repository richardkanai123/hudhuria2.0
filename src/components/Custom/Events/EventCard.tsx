'use client'
import { CalendarCheck, MapPinHouseIcon, UsersRound } from "lucide-react"
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import CloudImage from "./CloudImage";
import { Event } from "@/lib/types";
import { useRouter } from "next/navigation";
const EventCard = ({ eventData }: { eventData: Event }) => {
    const { city, description: eventDescription, startDate, ticket_price, eventTitle, isPaid, image_id, slug } = eventData;
    const truncatedDescription = eventDescription.slice(0, 80);
    const Router = useRouter()

    return (
        <div onClick={() => Router.push(`/events/details/${slug}`)} className="sm:max-w-[320px] md:w-[350px] aspect-auto flex flex-col gap-2 rounded-md  cursor-pointer bg-accent transition-all ease-linear group hover:shadow-lg hover:bg-gray-200 justify-around bg-white shadow-sm  overflow-hidden">
            <div className="w-full min-h-[200px] text-left flex flex-col items-end bg-opacity-25 bg-sky-100 bg-blend-overlay group-hover:bg-blend-normal transition-all ease-in delay-500 relative pt-1 overflow-hidden">
                <CloudImage image_id={image_id} />
                <Badge variant='secondary' className={`text-primary z-10 px-2 shadow-lg absolute top-2 left-2 ${isPaid ? '' : 'bg-lime-200'}`}>
                    {isPaid ? `Ksh. ${ticket_price}` : "Free"}
                </Badge>
            </div>

            <div className="w-full px-2 h-fit pb-4 flex flex-col gap-2 bg-transparent">
                <h2 className="w-full text-lg font-semibold text-primary max-w-prose">{eventTitle}</h2>
                <p className="w-full text-sm text-gray-500">
                    {truncatedDescription}...
                </p>

                <div className="w-full flex justify-around flex-wrap text-gray-700 self-end">
                    <Link href={`/events?city=${city}`} className="text-base flex items-center gap-1 hover:underline">
                        <MapPinHouseIcon className="w-4 h-4 inline-block mr-1" />
                        {city}
                    </Link>
                    <p className="text-base flex items-center gap-1">
                        <CalendarCheck className="w-4 h-4 inline-block mr-1" />
                        {formatDistance(new Date(startDate), new Date(), { addSuffix: true })}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EventCard