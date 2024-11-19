"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import { HiUserRemove } from "react-icons/hi";

const ICON_SIZE = 5;
const ICON_COLOR = "pink-300";

type PropsType = {
    likedBy?: string[];
    uploader: string;
    attendees?: string[];
};

const EventLikesandMarks = ({ likedBy, uploader, attendees }: PropsType) => {
    const session = useSession();
    const isOwner = uploader === session.data?.user.id as string;
    const isAttending = attendees?.includes(session.data?.user.id as string);
    const isLiked = likedBy?.includes(session.data?.user.id as string);

    if (session.status === "unauthenticated") return null;

    const renderLikeButton = () => {
        if (isLiked) {
            return (
                <Button size="sm" className="flex align-middle">
                    <FaThumbsDown className={`w-${ICON_SIZE} h-${ICON_SIZE} text-${ICON_COLOR}`} />
                    Unlike <span className="text-xs align-sub"> {likedBy?.length}</span>
                </Button>
            );
        }
        return (
            <Button size="sm" className="flex align-middle">
                <FaHeartCircleCheck className={`w-${ICON_SIZE} h-${ICON_SIZE} text-${ICON_COLOR}`} />
                Like <span className="text-xs align-sub"> {likedBy?.length}</span>
            </Button>
        );
    };

    const renderAttendButton = () => {
        if (isAttending) {
            return (
                <Button size="sm" className="flex align-middle">
                    <HiUserRemove className={`w-${ICON_SIZE} h-${ICON_SIZE} text-${ICON_COLOR}`} />
                    <span className="text-xs align-sub"> {attendees?.length}</span> attending
                </Button>
            );
        }
        return (
            <Button size="sm" className="flex align-middle bg-lime-300">
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