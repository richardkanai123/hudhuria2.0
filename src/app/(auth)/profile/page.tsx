import { auth } from '@/Auth'
import { LoginForm } from '@/components/Custom/AuthComponents/LoginForm'
import SignOutBtn from '@/components/Custom/AuthComponents/SignOutBtn'
import React from 'react'

const ProfilePage = async () => {
    const session = await auth()

    if (!session) return (
        <div className='w-full h-screen flex flex-col align-middle items-center justify-center p-2'>

            <h1 className='text-2xl'>You are not logged in</h1>
            <LoginForm />
        </div>
    )

    return (
        <div className='w-full h-screen flex flex-col align-middle items-center justify-center'>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>

            <SignOutBtn />
        </div>
    )
}

export default ProfilePage
