'use client'

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
const SignOutBtn = () => {
    const Router = useRouter()
    return (
        <Button onClick={async () => await signOut({
            redirect: false,
            // redirectTo: '/'
        }).then(() => Router.refresh())} variant='destructive' className="w-full max-w-[250px] mx-auto self-center ">
            Sign Out
        </Button>
    )
}

export default SignOutBtn