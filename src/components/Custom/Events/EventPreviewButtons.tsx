'use client'
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ImBoxRemove } from "react-icons/im";
import { FaTrashAlt } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IoWarningSharp } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { FaSquareCheck } from "react-icons/fa6";
import { Trash2Icon } from "lucide-react";
type PropsType = {
    eventID: string,
    isPublished: boolean,
    isFeatured: boolean
    slug: string
    owerID: string
}
const EventPreviewButtons = ({ eventID, isPublished, isFeatured, slug, owerID }: PropsType) => {

    const session = useSession()
    const Router = useRouter()
    const EventURL = `${process.env.NEXT_PUBLIC_URL}/api/events`

    const deleteEvent = async () => {
        const res = await fetch(`${EventURL}/update/delete/?eventid=${eventID}&userid=${session.data?.user?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['events', slug],
            }
        })

        const ReposeMessage = await res.json()

        if (res.status !== 200) {
            toast.error(ReposeMessage.message as string, { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
        }

        toast.success(ReposeMessage.message as string, { theme: 'colored', position: 'top-center', icon: <FaSquareCheck /> })

        Router.replace('/events')
    }

    const UnpublishEvent = async () => {

        try {
            if (!session.data?.user) {
                toast.info('You are not logged in!', { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
                return
            }
            const res = await fetch(`${EventURL}/update/unpublish/?eventid=${eventID}&userid=${session.data.user?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    tags: ['events', slug],
                }
            })

            const ReposeMessage = await res.json()

            if (res.status !== 200) {
                toast.error(ReposeMessage.message as string, { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
            }

            toast.success(ReposeMessage.message as string, { theme: 'colored', position: 'top-center', icon: <FaSquareCheck /> })

            Router.refresh()
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
            }
            else {
                toast.error('Unknown error has occured', { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
            }
        }
    }


    const PublishEvent = async () => {

        try {
            if (!session.data?.user) {
                toast.info('You are not logged in!', { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
                return
            }
            const res = await fetch(`${EventURL}/update/publish/?eventid=${eventID}&userid=${session.data?.user?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    tags: ['events', slug],
                }
            })

            const ReposeMessage = await res.json()

            if (res.status !== 200) {
                toast.error(ReposeMessage.message as string, { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
            }

            toast.success(ReposeMessage.message as string, { theme: 'colored', position: 'top-center', icon: <FaSquareCheck /> })

            Router.replace(`/events/${ReposeMessage.slug as string}`)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
            }
            else {
                toast.error('Unknown error has occured', { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
            }
        }
    }


    const DeleteEvent = async () => {

        try {
            if (!session.data?.user) {
                toast.info('You are not logged in!', { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
                return;
            }

            const res = await fetch(`${EventURL}/update/delete/?eventid=${eventID}&userid=${session.data?.user?.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    tags: ['event', eventID],
                }
            })

            if (res.status !== 200) {
                toast.error('Failed to delete event', { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
            }

            toast.success('Event deleted successfully', { theme: 'colored', position: 'top-center', icon: <Trash2Icon /> })

            Router.push('/events')
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
            }
            else {
                toast.error('Unknown error has occured', { theme: 'colored', position: 'top-center', icon: <IoWarningSharp /> })
            }
        }

    }

    if (owerID !== session.data?.user?.id) {
        return null
    }

    return (
        <div className="w-full max-w-fit gap-4  mx-auto flex flex-col md:flex-row items-center align-middle justify-center px-4 py-2">
            {
                !isFeatured &&
                <Button size='lg' className="w-full max-w-[250px] mx-auto hover:bg-opacity-35 transition-all ease-linear">
                    <FaCrown className="w-4 h-4 inline-block mr-2 text-yellow-300" /> Promote Event
                </Button>
            }

            <Button onClick={() => Router.push(`/events/edit/${eventID}`)} size='lg' className="w-full max-w-[250px] bg-lime-700 mx-auto hover:bg-opacity-35 transition-all ease-linear">
                <MdEditDocument className="w-4 h-4 inline-block mr-2" /> Edit Event
            </Button>

            {
                isPublished ? (
                    <Button onClick={UnpublishEvent} size='lg' variant='outline' className="w-full max-w-[250px] mx-auto hover:bg-opacity-35 hover:bg-primary hover:text-white transition-all ease-linear">
                        <ImBoxRemove className="w-4 h-4 inline-block mr-2 rotate-180" /> Unpublish Event
                    </Button>
                ) :
                    (
                        <Button onClick={PublishEvent} size='lg' variant='default' className="w-full max-w-[250px] bg-sky-800 mx-auto hover:bg-opacity-35 transition-all ease-linear">
                            <ImBoxRemove className="w-4 h-4 inline-block mr-2" /> Publish Event
                        </Button>
                    )
            }


            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size='lg' variant='destructive' className="w-full max-w-[250px] mx-auto hover:bg-opacity-35 transition-all ease-linear">
                        <FaTrashAlt className="w-4 h-4 inline-block mr-2 " />  Delete Event
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>You are about to delete this event</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this event.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => DeleteEvent()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default EventPreviewButtons