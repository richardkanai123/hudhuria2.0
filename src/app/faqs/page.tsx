import FaqComponent from '@/components/Custom/nav/FaqComponent'
import Link from 'next/link'
import React from 'react'

const FaqPage = () => {
    return (
        <div className='w-full p-4 flex flex-col items-center align-middle justify-center mx-auto'>
            <h1 className='text-2xl font-bold text-primary'>FAQS</h1>
            <div className="w-full mx-auto max-w-screen-md">

                <FaqComponent />
            </div>
            <div className="mt-4 w-full flex justify-center align-middle gap-2 md:gap-4 items-center underline">
                <Link href="/" className="text-sm hover:text-primary">Home</Link>
                <Link href="/" className="text-sm hover:text-primary">About us</Link>
                <Link href="/contact" className="text-sm hover:text-primary">Contact</Link>
                <Link href="/policy" className="text-sm hover:text-primary">Terms</Link>
            </div>
        </div>
    )
}

export default FaqPage