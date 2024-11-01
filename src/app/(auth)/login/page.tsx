'use client'

import { LoginForm } from '@/components/Custom/AuthComponents/LoginForm'
import React from 'react'

const LoginPage = () => {
    return (
        <div className='w-full h-fit p-2'>
            <h1 className="text-center text-sm">Welcome back</h1>
            <LoginForm />
        </div>
    )
}

export default LoginPage