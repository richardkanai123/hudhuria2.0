'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Session } from 'next-auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa6'
import SignOutBtn from '@/components/Custom/AuthComponents/SignOutBtn'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const HeaderLinks = ({ session, status }: { session: Session | null, status: string }) => {
    const Router = useRouter()

    if (!session && status === 'unauthenticated') return (
        <div className="hidden md:flex gap-4 items-center justify-center">
            <Button className='flex items-center align-middle justify-center ' asChild variant="default">
                <Link href="/login">Login</Link>
            </Button>
            <Button className='flex items-center align-middle justify-center ' asChild variant="default">
                <Link href="/signup">Signup</Link>
            </Button>
        </div>
    )

    if (status === 'loading') {
        // return null
        return (
            <Button className="w-fit mt-2 mx-auto hover:bg-opacity-35 transition-all ease-linear rounded-full" disabled>
                <FaSpinner className='animate-spin w-4 h-4' />
            </Button>
        )
    }

    if (status === 'authenticated' && session) {
        const avatarUrl = `https://ui-avatars.com/api/?name=${session.user.name}&background=random`
        return (
            <div className="hidden md:flex gap-4 items-center align-middle justify-center relative">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='hover:opacity-50 cursor-pointer '>
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>{session.user?.name as string}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/events/create">Create event</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/policy">Policy</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <SignOutBtn />
            </div>
        )
    }

    return null
}

export default HeaderLinks