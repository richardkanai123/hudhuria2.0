'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React from 'react'
import { FaPeopleGroup } from 'react-icons/fa6'

type Props = {
    attendees: string[] | undefined,
    id: string,
    isOwnerViewing: boolean
}
const AttendanceCard = ({ attendees, id, isOwnerViewing }: Props) => {
    return (

        <div className='w-full flex flex-col p-4 max-w-screen-sm'>
            <Badge className=' w-[fit-content] flex align-middle justify-center items-center '>
                <p>{attendees?.length}</p>
                <FaPeopleGroup className='w-4 h-4 ml-2' />
                <span className='ml-2 text-sm'>attending</span>
            </Badge>
            {
                isOwnerViewing ? (
                    null
                ) : <Button onClick={() => console.log(id)} className="w-full mt-2 mx-auto max-w-[250px] hover:bg-opacity-35 transition-all ease-linear">
                    Mark Attendance
                </Button>
            }
        </div>
    )
}

export default AttendanceCard