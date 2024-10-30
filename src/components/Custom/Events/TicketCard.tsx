'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { CheckCircle2Icon, TicketIcon } from 'lucide-react'
import React from 'react'

const TicketCard = ({ isPaid, price, ticket_available, eventID }: { isPaid: boolean, price: number, ticket_available: number, eventID: string }) => {

    if (isPaid === false) {

        return (<Badge className="p-2 flex bg-lime-500 items-center align-middle justify-center text-center  w-20">
            Free <CheckCircle2Icon className="w-4 h-4 inline-block" />
        </Badge>)
    }

    return (
        <Card className='w-full flex flex-col p-4 max-w-screen-sm'>
            <CardHeader className="text-xl text-primary font-bold flex " > <TicketIcon className="w-6 h-6 mr-2" /> Ticket Details </ CardHeader>

            <p className='text-lg text-center text-secondary-foreground font-semibold'> <span className="text-sm font-thin">KSH.</span> {price}</p>

            <p className='text-lg text-secondary-foreground tracking-wide text-center'>{ticket_available} <span className="text-sm">Tickets Available</span></p>

            <Button onClick={() => console.log(eventID)} className="w-full mt-2 mx-auto max-w-[250px] hover:bg-opacity-35 transition-all ease-linear">Buy Ticket</Button>
        </Card >

    )
}

export default TicketCard