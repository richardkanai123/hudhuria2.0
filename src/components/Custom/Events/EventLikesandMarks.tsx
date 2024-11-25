"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import { HiUserRemove } from "react-icons/hi";
import { toast } from "react-toastify";
import { MdOutlineWarning } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ICON_SIZE = 5;
const ICON_COLOR = "pink-300";

type PropsType = {
    likedBy?: string[];
    uploader: string;
    attendees?: string[];
    eventID: string,
};

const EventLikesandMarks = ({ likedBy, uploader, attendees, eventID }: PropsType) => {
    const session = useSession();
    const isOwner = uploader === session.data?.user.id as string;
    const isAttending = attendees?.includes(session.data?.user.id as string);
    const isLiked = likedBy?.includes(session.data?.user.id as string);
    const eventsApiURl = `${process.env.NEXT_PUBLIC_URL}/api/events`
    const Router = useRouter()

    if (session.status === "unauthenticated") return null;


    const MarkAttendance = async (userid: string, eventid: string) => {
        const MarkAttendanceUrl = `${eventsApiURl}/update/markAttendance`
        const res = await fetch(MarkAttendanceUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid, eventid }),
        })

        const ResData = await res.json();

        if (res.status !== 201) {
            toast.error(
                ResData.message as string,
                {
                    position: 'top-center',
                    theme: 'colored',
                    icon: <MdOutlineWarning />
                }
            )
        }

        toast.success(
            ResData.message as string,
            {
                position: 'top-center',
                theme: 'colored',
                icon: <FaSquareCheck />
            }
        )

        Router.refresh()
    }


    const UnMarkAttendance = async (userid: string, eventid: string) => {
        const MarkAttendanceUrl = `${eventsApiURl}/update/unmarkAttendance`
        const res = await fetch(MarkAttendanceUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid, eventid }),
        })

        const ResData = await res.json();

        if (res.status !== 201) {
            toast.error(
                ResData.message as string,
                {
                    position: 'top-center',
                    theme: 'colored',
                    icon: <MdOutlineWarning />
                }
            )
        }

        toast.success(
            ResData.message as string,
            {
                position: 'top-center',
                theme: 'colored',
                icon: <FaSquareCheck />
            }
        )

        Router.refresh()
    }


    const LikeEvent = async (userid: string, eventid: string) => {
        const LikeEventUrl = `${eventsApiURl}/update/like`
        const res = await fetch(LikeEventUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
            , body: JSON.stringify({ userid, eventid }),
        })

        const ResData = await res.json();

        if (res.status !== 201) {
            toast.error(
                ResData.message as string,
                {
                    position: 'top-center',
                    theme: 'colored',
                    icon: <MdOutlineWarning />
                }
            )
        }

        toast.success(
            ResData.message as string,
            {
                position: 'top-center',
                theme: 'colored',
                icon: <ThumbsUpIcon />
            }
        )

        Router.refresh()
    }

    const UnlikeEvent = async (userid: string, eventid: string) => {
        const UnlikeEventUrl = `${eventsApiURl}/update/unlike`
        const res = await fetch(UnlikeEventUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
            , body: JSON.stringify({ userid, eventid }),
        })

        const ResData = await res.json();

        if (res.status !== 201) {
            toast.error(
                ResData.message as string,
                {
                    position: 'top-center',
                    theme: 'colored',
                    icon: <MdOutlineWarning />
                }
            )
        }

        toast.success(
            ResData.message as string,
            {
                position: 'top-center',
                theme: 'colored',
                icon: <ThumbsDownIcon />
            }
        )

        Router.refresh()
    }


    const renderLikeButton = () => {
        if (isLiked) {
            return (
                <Button onClick={() => UnlikeEvent(session.data?.user.id as string, eventID)} variant='destructive' size="sm" className="flex align-middle">
                    <FaThumbsDown className={`w-${ICON_SIZE} h-${ICON_SIZE} text-${ICON_COLOR}`} />
                    Unlike <span className="text-xs align-sub"> {likedBy?.length}</span>
                </Button>
            );
        }
        return (
            <Button onClick={() => LikeEvent(session.data?.user.id as string, eventID)} size="sm" className="flex align-middle">
                <FaHeartCircleCheck className={`w-${ICON_SIZE} h-${ICON_SIZE} text-${ICON_COLOR}`} />
                Like <span className="text-xs align-sub"> {likedBy?.length}</span>
            </Button>
        );
    };

    const renderAttendButton = () => {
        if (isAttending) {
            return (
                <Button onClick={() => UnMarkAttendance(session.data?.user.id as string, eventID)} variant='destructive' size="sm" className="flex align-middle">
                    <HiUserRemove className={`w-${ICON_SIZE} h-${ICON_SIZE} text-${ICON_COLOR}`} />
                    <span className="text-xs align-sub"> {attendees?.length}</span> attending
                </Button>
            );
        }
        return (
            <Button onClick={() => MarkAttendance(session.data?.user.id as string, eventID)} size="sm" className="flex align-middle bg-lime-300">
                <BsPersonFillAdd className={`w-${ICON_SIZE} h-${ICON_SIZE} text-${ICON_COLOR}`} />{" "}
                <span className="text-xs align-sub"> {attendees?.length}</span> attend
            </Button>
        );
    };

    if (!isOwner) {
        return (
            <div className="flex items-center align-middle mt-2">
                <div className="flex align-middle gap-2 bg-slate-50 rounded-sm p-2">
                    {renderLikeButton()}
                    {renderAttendButton()}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col align-middle mt-2">
            <p className="text-sm font-semibold"> Attending: {attendees?.length}</p>
            <p className="text-sm font-semibold"> Likes: {likedBy?.length}</p>
        </div>
    );
};

export default EventLikesandMarks;