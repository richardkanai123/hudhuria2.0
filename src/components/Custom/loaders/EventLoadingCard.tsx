'use client'
import { Badge } from '@/components/ui/badge'
import { CalendarCheck, MapPinHouseIcon, UsersRound } from 'lucide-react'

const EventLoadingCard = () => {

    const LoadingArray = new Array(5).fill(0)
    return (
        <div className="w-full h-fit flex flex-col px-4 py-2">
            <div className="w-full mx-auto mt-4 flex justify-center flex-col md:flex-row md:flex-wrap gap-4 items-center align-middle ">
                {
                    LoadingArray.map((LoadingArray, index) =>
                    (

                        <div key={index} className="flex-1 w-full md:min-w-[300px] max-w-[350px] aspect-square flex flex-col gap-2 rounded-md overflow-hidden cursor-pointer shadow-sm bg-accent transition-all ease-in duration-700 group hover:shadow-md">
                            <div className="w-full h-[200px] text-left flex flex-col items-end bg-opacity-25 bg-sky-200 bg-blend-overlay group-hover:bg-blend-normal transition-all ease-in delay-500 object-cover relative animate-pulse ">

                            </div>
                            <div className="w-full px-1 pb-4 flex flex-col gap-2">
                                <h2 className="w-full text-xl font-semibold text-primary text-slate-200 animate-pulse delay-1000">Event Title</h2>


                                <p className="w-full text-xs text-gray-500">
                                    Event Description
                                </p>

                                <div className="w-full flex justify-around flex-wrap text-gray-700 ">
                                    <p className="text-base flex items-center gap-1">
                                        <MapPinHouseIcon className="w-4 h-4 inline-block mr-1" />
                                        City
                                    </p>
                                    <p className="text-base flex items-center gap-1">
                                        <CalendarCheck className="w-4 h-4 inline-block mr-1" />
                                        Date and time
                                    </p>

                                </div>

                                <div className="w-full flex justify-around flex-wrap ">
                                    <div className="text-base flex items-center gap-1 px-2">
                                        <Badge className="bg-lime-600 animate-pulse ">Free</Badge>
                                    </div>
                                    <p className="flex items-center gap-1 text-sm">
                                        <UsersRound className="w-4 h-4 inline-block mr-1" />
                                        people
                                    </p>

                                </div>

                            </div>
                        </div>
                    )

                    )
                }
            </div>
        </div>
    )
}

export default EventLoadingCard