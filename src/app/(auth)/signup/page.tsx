import { SignUpForm } from '@/components/Custom/AuthComponents/SignUpForm'
import React from 'react'

const SignUpPage = () => {
    return (
        <div className='w-full min-h-[70vh] flex flex-col align-middle justify-center  max-h-fit p-2'>
            <SignUpForm />
        </div>
    )
}

export default SignUpPage