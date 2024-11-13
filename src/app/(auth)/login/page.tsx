'use client'

import { LoginForm } from '@/components/Custom/AuthComponents/LoginForm'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginPage = () => {
    const session = useSession()
    const Router = useRouter()

    if (session.status === 'loading') {
        return (
            <div className="w-full h-[70vh] flex flex-col items-center align-middle justify-center gap-4">
                <h1 className="text-center text-sm">Loading...</h1>
            </div>
        )
    }

    if (session.status === 'authenticated' || session.data != null) {
        return <div className="w-full h-[70vh] flex flex-col items-center align-middle justify-center gap-4 ">
            <h1 className="text-center text-sm">You are already logged in as {session.data?.user?.name}</h1>

            <Button variant='link' onClick={() => Router.push('/profile')}>
                Go to Profile
            </Button>

        </div>
    }

    return (
        <div className='w-full min-h-[70vh] flex flex-col align-middle justify-center  max-h-fit p-2'>
            <h1 className="text-center text-sm">Welcome back</h1>
            <LoginForm />
        </div>
    )
}

export default LoginPage