'use client'
import { compareDates, formatDateToReadableVersion } from '@/lib/utils';
import { CalendarCheck, Timer } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';


interface PropsType {
    startDate: string
    endDate: string
}

const TimeAndDateDisplay = ({ startDate, endDate }: PropsType) => {
    const formatedStartDate = formatDateToReadableVersion(startDate)
    const formatedEndDate = formatDateToReadableVersion(endDate)
    const comparedDatesResult = compareDates(startDate, endDate)

    // if same day, then show only date and time.
    // if different day, then show start date and end date separately
    if (!startDate || !endDate) {
        return <div className='text-lg text-secondary-foreground tracking-wide w-full'>
            <p className='text-lg text-secondary-foreground'>Date information not available</p>
        </div>
    }
    return (
        <Card className='w-full flex flex-col p-4 max-w-screen-sm'>
            <CardHeader className="text-xl text-primary font-bold flex"> <CalendarCheck className="w-6 h-6 mr-2" /> Time and Date </CardHeader>
            <div className='md:text-lg text-secondary-foreground tracking-wide'>
                {
                    comparedDatesResult === true ? <p className='font-semibold text-center'>
                        {formatedStartDate?.formatedDate} from {formatedStartDate?.time} to {formatedEndDate?.time}
                    </p> :
                        <>
                            <p className='font-semibold text-center'>Start :{formatedStartDate?.formatedDate} at {formatedStartDate?.time} </p>
                            <p className='font-semibold text-center'>End : {formatedEndDate?.formatedDate} at {formatedEndDate?.time} </p>
                        </>

                }
                <p className='text-sm flex justify-center align-middle items-center text-primary my-1 '>
                    <Timer className="w-3 animate-pulse h-3 mr-2 delay-1000" />
                    {formatDistanceToNow(new Date(startDate), { addSuffix: true })}
                </p>
            </div>
        </Card>
    )
}

export default TimeAndDateDisplay