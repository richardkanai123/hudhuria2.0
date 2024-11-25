'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const HomeCTAButton = () => {
    const Router = useRouter()
    return (
        <Button onClick={() => Router.push('/events')} className="w-fit mt-2 mx-auto hover:bg-opacity-35 transition-all ease-linear rounded-md text-lg md:text-xl px-4 py-6" >Browse Events</Button>
    )
}

export default HomeCTAButton