'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Edit, EditIcon, MailIcon, TagIcon, UserIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { BsEnvelope } from 'react-icons/bs'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
const ProfileCard = () => {
    const session = useSession()
    const Router = useRouter()
    const avatarUrl = `https://ui-avatars.com/api/?name=${session.data?.user?.name}&background=random`
    return (


        <Card className="w-full max-w-screen-sm p-2 flex flex-col align-middle items-center justify-center  bg-opacity-70 backdrop:blur-lg shadow-sm">
            <CardHeader className="text-xl text-primary font-bold flex overflow-hidden">
                <Avatar className='w-24 h-24 '>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{session.data?.user?.name as string}</AvatarFallback>
                </Avatar>
            </CardHeader>
            <CardContent className="w-full  flex flex-col gap-4 items-center justify-center">
                <div className="w-full flex flex-col px-2">
                    <h3 className="text-gray-800 font-light text-xl flex items-center"> <UserIcon className="w-4 h-4 mr-2" /> Full Name</h3>
                    <p className="text-xl font-semibold w-full border rounded-sm p-2">{session.data?.user?.name}</p>
                </div>

                <div className="w-full flex flex-col px-2">
                    <h3 className="text-gray-800 font-light flex text-xl items-center"> <BsEnvelope className="w-4 h-4 mr-2" /> Email</h3>
                    <p className="text-xl font-bold w-full border rounded-sm p-2">{session.data?.user?.email}</p>
                </div>


                <div className="w-full flex flex-col px-2">
                    <h3 className="text-gray-800 font-light flex text-xl items-center"> <TagIcon className="w-4 h-4 mr-2" /> Bio</h3>
                    <p className="text-xl font-bold w-full border rounded-sm p-2">{session.data?.user?.bio}</p>
                </div>

                <div className="flex flex-row gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button ><EditIcon className="w-4 h-4 mr-2" /> Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        defaultValue={session.data?.user?.name as string}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Bio
                                    </Label>
                                    <Input
                                        id="username"
                                        defaultValue={session.data?.user?.bio as string}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>

    )
}

export default ProfileCard