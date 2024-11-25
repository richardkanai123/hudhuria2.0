import { FetchEvents } from "@/lib/actions/EventsActions"
import { Event } from "@/lib/types"
import Client_Side_Events_Lister from "@/components/Custom/Events/Client_Side_Events_Lister"

const UserUploaded = async ({ userid }: { userid: string }) => {

    const res = await FetchEvents()
    const eventsList: Event[] | [] = await res.json()

    if (res.status !== 200) {
        return (
            <div className="w-full mx-auto h-fit flex items-center align-middle justify-center flex-col px-4 py-2">
                <h1 className="w-full text-3xl font-bold text-left text-primary mb-4 "> Featured Events</h1>
                <p className="text-yellow-600">
                    Something went wrong
                </p>
                <p>Refresh the page</p>

            </div>
        )
    }

    if (!eventsList || eventsList.length === 0) return <div>No upcoming events</div>

    return (
        <Client_Side_Events_Lister events={eventsList as Event[]} userid={userid} />
    )
}

export default UserUploaded