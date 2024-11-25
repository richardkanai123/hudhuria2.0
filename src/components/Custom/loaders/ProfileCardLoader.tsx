'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TagIcon, UserIcon } from 'lucide-react'
import { BsEnvelope } from 'react-icons/bs'
const ProfileCardLoader = () => {

    return (
        <Card className="w-full max-w-screen-sm p-2 flex flex-col align-middle items-center justify-center  bg-opacity-70 backdrop:blur-lg shadow-sm animate-pulse delay-150">
            <CardHeader className="text-xl text-primary font-bold flex overflow-hidden">
                <div className="w-30 rounded-full bg-slate-200 animate-pulse"></div>
            </CardHeader>
            <CardContent className="w-full  flex flex-col gap-4 items-center justify-center">
                <div className="w-full flex flex-col px-2">
                    <h3 className="text-gray-800 font-light text-xl flex items-center"> <UserIcon className="w-4 h-4 mr-2" /> Full Name</h3>
                    <p className="text-xl font-semibold w-full border rounded-sm p-2"> </p>
                </div>

                <div className="w-full flex flex-col px-2">
                    <h3 className="text-gray-800 font-light flex text-xl items-center"> <BsEnvelope className="w-4 h-4 mr-2" /> Email</h3>
                    <p className="text-xl font-bold w-full border rounded-sm p-2"> </p>
                </div>


                <div className="w-full flex flex-col px-2">
                    <h3 className="text-gray-800 font-light flex text-xl items-center"> <TagIcon className="w-4 h-4 mr-2" /> Bio</h3>
                    <p className="text-xl font-bold w-full border rounded-sm p-2"> </p>
                </div>

            </CardContent>
        </Card>

    )
}

export default ProfileCardLoader