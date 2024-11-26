'use server'

import { revalidateTag } from "next/cache"

const eventsApiURl = `${process.env.NEXT_PUBLIC_URL}/api/events`
export const FetchEvents = async (): Promise<Response> => {
        const res = await fetch(eventsApiURl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ['events'],
            },
            cache: "no-cache",
        })

        return res
    }

export const LikeAnEvent = async (userid: string, eventid: string): Promise<Response> => { 
    const likeUrl = `${eventsApiURl}/update/like`
    const res = await fetch(likeUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, eventid }),
    })
    
    revalidateTag('events')
    return res
}

export const UnlikeAnEvent = async (userid: string, eventid: string): Promise<Response> => { 
    const UnlikeUrl = `${eventsApiURl}/update/unlike`
    const res = await fetch(UnlikeUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, eventid }),

    })
    revalidateTag('events')
    return res
}

export const MarkAttendance = async (userid: string, eventid: string): Promise<Response> => { 
    const MarkAttendanceUrl = `${eventsApiURl}/update/markAttendance`
    const res = await fetch(MarkAttendanceUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, eventid }),
    })
    return res
}

export const RemoveAttendance = async (userid: string, eventid: string): Promise<Response> => { 
    const RemoveAttendanceUrl = `${eventsApiURl}/update/unmarkAttendance`
    const res = await fetch(RemoveAttendanceUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, eventid }),
    })
    return res
}

export const UnPublishEvent = async (eventid: string, userid: string): Promise<Response> => { 
    const res = await fetch(`${eventsApiURl}/update/delete/?eventid=${eventid}&userid=${userid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['events'],
        } 
    })
    return res
}

export const PublishEvent = async (eventid: string, userid: string): Promise<Response> => { 
    const res = await fetch(`${eventsApiURl}/update/publish/?eventid=${eventid}&userid=${userid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['events'],
        } 
    })
    return res
}

export const DeleteEvent = async (eventid: string, userid: string): Promise<Response> => { 
    const res = await fetch(`${eventsApiURl}/update/delete/?eventid=${eventid}&userid=${userid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                tags: ['events'],
        } 
    })
    return res
}

