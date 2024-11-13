import CreateEventForm from '@/components/Custom/Events/CreateEventForm'

const NewEventPage = () => {
    return (
        <div className="w-full p-2">
            <h1 className="text-2xl font-bold mb-4">New Event</h1>
            <CreateEventForm />
        </div>
    )
}

export default NewEventPage