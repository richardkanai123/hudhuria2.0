'use client'

import { Button } from '@/components/ui/button'
import { IoLogInSharp } from "react-icons/io5";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react';
const Header = () => {
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
                <Link href="/events?city=all" className="[&.active]:font-bold text-lg [&.active]:text-primary ">
                    Events
                </Link>
                <Link href="/about" className="[&.active]:font-bold text-lg active:text-primary [&.active]:text-primary ">
                    About
                </Link>
                <Link href="/contact" className="[&.active]:font-bold text-lg [&.active]:text-primary ">
                    Contact
                </Link>
            </nav>

            <div className="hidden md:flex gap-4 items-center justify-center">
                <Button className='flex items-center align-middle justify-center ' asChild variant="default">
                    <Link href="/login">Login</Link>

                </Button>
                <Button className='flex items-center align-middle justify-center ' asChild variant="default">
                    <Link href="/signup">
                        Signup
                    </Link>


                </Button>
            </div>

            {/* menu Toggle Button for smalll screens */}
            <div className="flex gap-4 md:hidden">
                <Button className='flex items-center align-middle justify-center ' asChild variant="default">
                    <Link href="/login">Login</Link>
                </Button>

                {/* mobile menu */}

                <Sheet>
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

                                <Link href="/about" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    About
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/about" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    Profile
                                </Link>

                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/contact" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    Contact
                                </Link>

                            </SheetClose>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default Header