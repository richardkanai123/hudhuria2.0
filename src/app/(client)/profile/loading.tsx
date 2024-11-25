import EventLoadingCard from '@/components/Custom/loaders/EventLoadingCard'
import ProfileCardLoader from '@/components/Custom/loaders/ProfileCardLoader'

const ProfilePage = async () => {

    return (
        <div className='w-full min-h-screen max-h-fit flex flex-col items-center align-middle p-4 '>
            <h1 className="text-primary text-xl font-semibold my-2">Your Profile</h1>
            <ProfileCardLoader />
            <div className="w-full flex flex-col align-middle my-4">
                <div className="w-full p-2">
                    <h2 className=' font-semibold text-primary text-xl'>Your Upcoming Events</h2>
                    <EventLoadingCard />
                </div>
                <div className="w-full p-2">
                    <h2>Your Uploads</h2>
                    <EventLoadingCard />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
