"use client";
import EventCard from "@/components/Custom/Events/EventCard";
import { Event } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    eventsList: Event[];
};

const Client_Events_Lister = ({ eventsList }: Props) => {
    const FutureEvents = eventsList
        .sort(
            (a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
        .filter((event) => {
            const eventDate = new Date(event.startDate);
            const currentDate = new Date();
            return eventDate > currentDate;
        });

    const FeaturedEvents = FutureEvents.filter(
        (event) =>
            event.isFeatured === true && event.isPublished && !event.isDeleted
    );

    const UpcomingUnfeaturedEvents = FutureEvents.filter(
        (event) => !event.isFeatured && event.isPublished && !event.isDeleted
    );

    const searchParams = useSearchParams();
    const city = searchParams.get("city");

    const FilteredEventsByCity = UpcomingUnfeaturedEvents.filter(
        (event) => event.city.toLowerCase() === city?.toLowerCase()
    );

    if (city !== null) {
        return (
            <>
                <h1 className="w-full text-3xl font-bold text-left text-primary my-4 ">

                    Upcoming Events in{" "}
                    <span className="first-letter:uppercase">
                        {city.toString().toWellFormed()}
                    </span>{" "}
                </h1>

                <div className="w-full mx-auto mt-4 flex justify-center flex-col items-center md:flex-row md:flex-wrap gap-4 md:items-stretch place-content-center place-items-center align-middle  ">
                    {FilteredEventsByCity.length === 0 ? (
                        <h1 className="w-full text-2xl font-bold text-center text-primary my-4 ">

                            No events found in this city
                        </h1>
                    ) : (
                        FilteredEventsByCity.map((event) =>
                            event ? (
                                <EventCard
                                    key={event._id}
                                    eventData={event}
                                />
                            ) : null
                        )
                    )}
                </div>

                <h1 className="w-full text-3xl font-bold text-left text-primary my-4 ">

                    Featured Events
                </h1>
                <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-stretch place-content-center place-items-center align-middle  ">
                    {FeaturedEvents.map((event) =>
                        <EventCard
                            key={event._id}
                            eventData={event}
                        />
                    )}
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="w-full text-3xl font-bold text-left text-primary mb-4 ">

                Featured Events
            </h1>
            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-stretch place-content-center place-items-center align-middle  ">
                {FeaturedEvents.map((event) =>
                    event ? (
                        <EventCard
                            key={event._id}
                            eventData={event}
                        />
                    ) : null
                )}
            </div>

            <h1 className="w-full text-3xl font-bold text-left text-primary my-4 ">

                Upcoming Events
            </h1>

            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-stretch place-content-center place-items-center align-middle  ">
                {UpcomingUnfeaturedEvents.map((event) =>
                    event ? (
                        <EventCard
                            key={event._id}
                            eventData={event}
                        />
                    ) : null
                )}
            </div>
        </>
    );
};

export default Client_Events_Lister;
