import { auth } from '@/Auth'
import { LoginForm } from '@/components/Custom/AuthComponents/LoginForm'
import ProfileCard from '@/components/Custom/AuthComponents/ProfileCard'
import UserUpcomingEvents from '@/components/Custom/Events/UserUpcomingEvents'
import EventLoadingCard from '@/components/Custom/loaders/EventLoadingCard'
import ProfileCardLoader from '@/components/Custom/loaders/ProfileCardLoader'
import { Suspense } from 'react'
const ProfilePage = async () => {
    const session = await auth()
    const userid = session?.user?.id
    if (!session) return (
        <div className='w-full h-screen flex flex-col align-middle items-center justify-center p-2'>

            <h1 className='text-2xl'>You are not logged in</h1>
            <LoginForm />
        </div>
    )

    return (
        <div className='w-full min-h-screen max-h-fit flex flex-col items-center align-middle p-4 '>
            <h1 className="text-primary text-xl font-semibold my-2">Your Profile</h1>

            <Suspense fallback={<ProfileCardLoader />}>
                <ProfileCard />
            </Suspense>


            <div className="w-full flex flex-col align-middle my-4">
                <div className="w-full p-2">
                    <h2 className=' font-semibold text-primary text-xl'>Your Upcoming Events</h2>
                    {
                        userid ? (
                            <Suspense fallback={<EventLoadingCard />}>
                                <UserUpcomingEvents userid={userid} />
                            </Suspense>
                        ) : (
                            <p className='text-sm text-gray-500'>You are not logged in</p>
                        )
                    }
                </div>
                <h2>Your Uploads</h2>
            </div>
        </div>
    )
}

export default ProfilePage
