'use client'

import { Button } from '@/components/ui/button'
import { IoLogInSharp } from "react-icons/io5";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react';
import ClientAuthBtn from '../AuthComponents/AuthButton.client';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import HeaderLinks from './Header-links';
import { signOut } from 'next-auth/react';
const Header = () => {



    const session = useSession()
    const Router = useRouter()

    const avatarUrl = `https://ui-avatars.com/api/?name=${session.data?.user?.name}&background=random`

    return (
        <header className="w-full sticky top-0 backdrop-blur-sm pt-2 px-4 pb-4 flex align-middle justify-between items-center bg-slate-50 z-20">
            {/* logo */}
            <Link href="/" className='flex flex-col h-fit items-center gap-2 relative'>
                <Image fill src="/EventBanner.jpeg" priority sizes={'100%'} className="h-8 w-8 rounded-full" alt="logo" />
                <span className="text-2xl font-bold text-primary">Hudhuria</span>
            </Link>
            {/* nav */}
            <nav className='hidden md:flex gap-4 align-middle'>
                <Link href="/" className="[&.active]:font-bold text-lg [&.active]:text-primary ">
                    Home
                </Link>
                <Link href="/events" className="[&.active]:font-bold text-lg [&.active]:text-primary ">
                    Events
                </Link>
                <Link href="/about" className="[&.active]:font-bold text-lg active:text-primary [&.active]:text-primary ">
                    About
                </Link>
                <Link href="/contact" className="[&.active]:font-bold text-lg [&.active]:text-primary ">
                    Contact
                </Link>
            </nav>

            <div className="flex ">
                <HeaderLinks session={session.data} status={session.status} />
            </div>

            {/* menu Toggle Button for small screens */}
            <div className="flex gap-4 md:hidden">
                {
                    session.data?.user && session.status === 'authenticated' ?
                        <div className="flex gap-2 items-center align-middle justify-center">
                            <Avatar onClick={() => {
                                Router.push('/profile')
                            }} className='hover:opacity-50 cursor-pointer '>
                                <AvatarImage src={avatarUrl} />
                                <AvatarFallback>{session.data?.user?.name as string}</AvatarFallback>
                            </Avatar>

                            <HeaderLinks session={session.data} status={session.status} />

                        </div> :
                        <Button className='flex items-center align-middle justify-center ' asChild variant="default">
                            <Link prefetch={false} href="/login">Login</Link>
                        </Button>

                }

                {/* mobile menu */}

                <Sheet>

                    <SheetTitle hidden>Menu</SheetTitle>
                    <SheetTrigger className=" bg-transparent md:hidden">
                        <Menu className='w-6 h-6' />
                    </SheetTrigger>
                    <SheetContent className='mt-4'>

                        <SheetTrigger className="bg-transparent md:hidden flex align-middle justify-center text-sm font-light">
                            Close <IoLogInSharp className='ml-1 w-4 h-4' />
                        </SheetTrigger>
                        {/* logo */}
                        <Link href="/" className='flex flex-col items-center gap-2 relative'>
                            Hudhuria
                        </Link>

                        <nav className='w-full flex flex-col gap-4 align-middle mt-4'>
                            <SheetClose asChild className=" bg-transparent border-b">
                                <Link href="/" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    Home
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/events" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    Events
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/about" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    About
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/profile" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    Profile
                                </Link>

                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/contact" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    Contact
                                </Link>

                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">
                                <div className="flex align-middle w-full gap-4 items-center justify-center">
                                    {
                                        session.data?.user && session.status === 'authenticated' ?
                                            <div className="flex gap-2 items-center align-middle justify-center">
                                                <Avatar onClick={() => {
                                                    Router.push('/profile')
                                                }} className='hover:opacity-50 cursor-pointer '>
                                                    <AvatarImage src={avatarUrl} />
                                                    <AvatarFallback>{session.data?.user?.name as string}</AvatarFallback>
                                                </Avatar>
                                            </div> :
                                            <Button className='w-full flex items-center align-middle justify-center ' asChild variant="default">
                                                <Link prefetch={false} href="/login">Login</Link>
                                            </Button>
                                    }

                                </div>
                            </SheetClose>

                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default Header