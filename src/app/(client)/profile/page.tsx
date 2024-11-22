import { auth } from '@/Auth'
import { LoginForm } from '@/components/Custom/AuthComponents/LoginForm'
import ProfileCard from '@/components/Custom/AuthComponents/ProfileCard'
import UserUpcomingEvents from '@/components/Custom/Events/UserUpcomingEvents'
import EventLoadingCard from '@/components/Custom/loaders/EventLoadingCard'
import { Suspense } from 'react'
const ProfilePage = async () => {
    const session = await auth()
    const userid = session?.user.id
    if (!session) return (
        <div className='w-full h-screen flex flex-col align-middle items-center justify-center p-2'>

            <h1 className='text-2xl'>You are not logged in</h1>
            <LoginForm />
        </div>
    )

    return (
        <div className='w-full min-h-screen max-h-fit flex flex-col items-center align-middle p-4 '>
            <h1 className="text-primary text-xl font-semibold my-2">Your Profile</h1>

            <Suspense fallback={<div>Loading...</div>}>
                <ProfileCard />
            </Suspense>


            <div className="w-full flex flex-col align-middle my-4">
                <div className="w-full p-2">
                    <h2 className='text-lg font-semibold text-primary'>Your Upcoming Events</h2>
                    <Suspense fallback={<EventLoadingCard />}>
                        <UserUpcomingEvents />
                    </Suspense>
                </div>
                <h2>Your Uploads</h2>
            </div>
        </div>
    )
}

export default ProfilePage
