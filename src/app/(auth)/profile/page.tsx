import { auth } from '@/Auth'
import { LoginForm } from '@/components/Custom/AuthComponents/LoginForm'
import ProfileCard from '@/components/Custom/AuthComponents/ProfileCard'
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

            <Suspense fallback={<div>Loading...</div>}>
                <ProfileCard />
            </Suspense>


            <div className="w-full">
                <h1>Attending Events</h1>
                <h2>Your Uploads</h2>
            </div>
        </div>
    )
}

export default ProfilePage
