"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import { HiUserRemove } from "react-icons/hi";
type PropsType = {
    likedBy?: string[];
    uploader: string;
    attendees?: string[];
};

const EventLikesandMarks = ({ likedBy, uploader, attendees }: PropsType) => {
    const session = useSession();
    const isOwner = uploader === session.data?.user.id;
    const isAttending = attendees ? attendees.includes(session.data?.user.id as string) : [];
    const isLiked = likedBy ? likedBy.includes(session.data?.user.id as string) : [];
    const NumberOfLikes = likedBy ? likedBy.length : 0;
    const NumberOfAttendees = attendees ? attendees.length : 0;

    if (session.status === 'unauthenticated') {
        return null
    }

    if (isOwner) {
        <div className="flex flex-col align-middle mt-2">
            <p className="text-sm font-semibold"> Attending:  {NumberOfAttendees}</p>
            <p className="text-sm font-semibold"> Likes:  {NumberOfLikes}</p>
        </div>
    }

    return (
        <div className="flex  items-center align-middle mt-2">
            <div className="flex align-middle gap-2 bg-slate-50 rounded-sm p-2">
                {!isLiked ? (
                    <Button
                        className="flex align-middle bg-pink-900"
                        size='icon'
                        variant="ghost">
                        <FaThumbsDown className="w-5 h-5 text-pink-400" />
                        <span className="text-xs align-sub"> {NumberOfLikes}</span>
                    </Button>
                ) : (
                    <Button
                        size='icon'
                        className="flex align-middle"
                        variant="ghost">
                        <FaHeartCircleCheck className="w-5 h-5 text-pink-400" />{" "}
                        <span className="text-xs align-sub"> {NumberOfLikes}</span>
                    </Button>
                )}

                {isAttending ? (
                    <Button
                        size='icon'
                        className="flex align-middle"
                        variant="ghost">
                        <HiUserRemove className="w-5 h-5 text-pink-400" />
                        <span className="text-xs align-sub"> {NumberOfAttendees}</span>
                    </Button>
                ) : (
                    <Button
                        size='icon'
                        className="flex align-middle bg-lime-300"
                        variant="ghost">
                        <BsPersonFillAdd className="w-5 h-5 text-pink-400" />{" "}
                        <span className="text-xs align-sub"> {NumberOfAttendees}</span>
                    </Button>
                )}
            </div>
            <div className="flex"></div>
        </div>
    );
};

export default EventLikesandMarks;
