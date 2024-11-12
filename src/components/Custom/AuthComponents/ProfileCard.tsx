'use client'
import React from 'react'
import SignOutBtn from '@/components/Custom/AuthComponents/SignOutBtn'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Edit, EditIcon, MailIcon, TagIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const ProfileCard = () => {
    const session = useSession()
    const Router = useRouter()
    const avatarUrl = `https://ui-avatars.com/api/?name=${session.data?.user?.name}&background=random`
    return (

        <div className="w-full p-2 flex flex-col md:flex-row gap-4 justify-around align-middle mx-auto max-w-screen-xl" style={{
            backgroundImage: `url('/conference_banner.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundBlendMode: 'overlay',
            backfaceVisibility: 'revert',

        }}>
            <Card className=" flex flex-col align-middle items-center justify-center bg-sky-300 bg-opacity-70 backdrop:blur-lg shadow-sm">
                <CardHeader className="text-xl text-primary font-bold flex">
                    <Avatar className='w-20 h-20 '>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>{session.data?.user?.name as string}</AvatarFallback>
                    </Avatar>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 align-middle items-center justify-center">
                    <h1 className='text-xl font-semibold'>{session.data?.user?.name}</h1>
                    <p className='font-bold'>
                        <TagIcon className="w-5 h-5 inline-block mr-2 bg-sky-600 text-white rounded-full p-1 " />
                        {session.data?.user?.bio}
                    </p>
                </CardContent>
            </Card>

            <Card className="flex flex-col align-middle items-center justify-center  bg-sky-300 bg-opacity-70 backdrop:blur-lg shadow-sm">
                <CardHeader className="text-xl text-primary font-bold flex">
                    Info
                </CardHeader>
                <CardContent className="flex flex-col gap-2 align-middle items-center justify-center">
                    <p className='font-semibold'>
                        <MailIcon className="w-5 h-5 inline-block mr-2 bg-sky-600 text-white rounded-full p-1 " />
                        {session.data?.user?.email}
                    </p>


                    <section className="w-full flex flex-col gap-4 align-middle justify-around items-center p-2">
                        <Button variant='secondary' className='w-full  ' > <EditIcon className="w-6 h-6 inline-block mr-2 bg-sky-600 text-white rounded-full p-1 " /> Edit Profile</Button>
                        <SignOutBtn />
                    </section>
                </CardContent>
            </Card>
        </div>


    )
}

export default ProfileCard