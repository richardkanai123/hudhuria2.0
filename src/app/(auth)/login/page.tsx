'use client'

import { LoginForm } from '@/components/Custom/AuthComponents/LoginForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginPage = () => {
    const session = useSession()
    const Router = useRouter()

    if (session.status === 'authenticated') {
        Router.replace('/')
    }
    return (
        <div className='w-full h-fit p-2'>
            <h1 className="text-center text-sm">Welcome back</h1>
            <LoginForm />
        </div>
    )
}

export default LoginPage