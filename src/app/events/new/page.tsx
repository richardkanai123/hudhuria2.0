import NewEvent from '@/components/Custom/Events/NewEvent'

const NewEventPage = () => {
    return (
        <div className="w-full p-2">
            <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
            <div className="w-full min-h-screen flex flex-col items-center gap-4">
                <NewEvent />
            </div>
        </div>
    )
}

export default NewEventPage