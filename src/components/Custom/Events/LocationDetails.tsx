import { Card, CardHeader } from '@/components/ui/card'
import { MapPinCheckInsideIcon } from 'lucide-react'
interface LocationDetailsProps {
    city: string,
    venue: string
}
const LocationDetails = ({ city, venue }: LocationDetailsProps) => {
    return (
        <Card className='w-full flex flex-col p-4 max-w-screen-sm'>
            <CardHeader className="text-xl text-primary font-bold flex"> <MapPinCheckInsideIcon className="w-6 h-6 mr-2" /> Venue </CardHeader>
            <p className='text-lg text-secondary-foreground tracking-wide text-center'>
                {venue}</p>
            <p className='text-lg text-secondary-foreground tracking-wide text-center'>{city}</p>

        </Card>
    )
}

export default LocationDetails