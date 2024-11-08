'use client'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { signOutUser } from '@/lib/authHelpers'
import { useRouter } from 'next/navigation'

const ClientAuthBtn = () => {
    const Router = useRouter()
    const session = useSession()

    if (session.status === 'authenticated') {
        return (
            <Button className="w-full mt-2 mx-auto max-w-[250px] hover:bg-opacity-35 transition-all ease-linear" onClick={async () => await signOutUser().then(() => Router.push('/login'))}>Sign Out</Button>
        )
    }

    if (session.status === 'loading') {
        return (
            <Button className="w-full mt-2 mx-auto max-w-[250px] hover:bg-opacity-35 transition-all ease-linear" disabled>Loading...</Button>
        )
    }

    if (session.status === 'unauthenticated') {
        return (
            <Button className="w-full mt-2 mx-auto max-w-[250px] hover:bg-opacity-35 transition-all ease-linear" onClick={() => Router.push('/login')}>Log in</Button>
        )
    }


}

export default ClientAuthBtn