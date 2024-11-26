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
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import HeaderLinks from './Header-links';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const Header = () => {
    const session = useSession()
    const Router = useRouter()
    const pathname = usePathname()

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
                <Link href="/" className={pathname === '/' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up' : ` text-lg font-bold`}>
                    Home
                </Link>
                <Link href="/events" className={pathname === '/events' || pathname.startsWith('/events/') && pathname !== '/events/create' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up' : ` text-lg font-bold`}>
                    Events
                </Link>

                <Link href="/events/create" className={pathname === '/events/create' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up' : ` text-lg font-bold`}>
                    Create
                </Link>
                <Link href="/about" className={pathname === '/about' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up' : ` text-lg font-bold`}>
                    About
                </Link>
                <Link href="/contact" className={pathname === '/contact' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up' : ` text-lg font-bold`}>
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className='hover:opacity-50 cursor-pointer '>
                                        <AvatarImage src={avatarUrl} />
                                        <AvatarFallback>{session.data.user?.name as string}</AvatarFallback>
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

                        <SheetTrigger className="bg-transparent md:hidden flex align-middle justify-center text-sm font-light items-center">
                            Close <IoLogInSharp className=' w-4 h-4' />
                        </SheetTrigger>
                        {/* logo */}
                        <Link href="/" className='flex flex-col items-center gap-2 relative'>
                            Hudhuria
                        </Link>

                        <nav className='w-full flex flex-col gap-4 align-middle mt-4'>
                            <SheetClose asChild className=" bg-transparent border-b">
                                <Link href="/" className={pathname === '/' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up bg-accent-foreground p-3 rounded-md' : `  hover:bg-accent-foreground hover:text-primary text-lg font-bold p-3 rounded-md`}>
                                    Home
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/events" className={pathname === '/events' || pathname.startsWith('/events/') && pathname !== '/events/create' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up bg-accent-foreground p-3 rounded-md' : `  hover:bg-accent-foreground hover:text-primary text-lg font-bold p-3 rounded-md `}>
                                    Events
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/events/create" className={
                                    pathname === '/events/create' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up bg-accent-foreground p-3 rounded-md' : `  hover:bg-accent-foreground hover:text-primary text-lg font-bold p-3 rounded-md`
                                }>
                                    Create
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">
                                <Link href="/about" className={pathname === '/about' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up bg-accent-foreground p-3 rounded-md' : `  hover:bg-accent-foreground hover:text-primary text-lg font-bold p-3 rounded-md`}>
                                    About
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/profile" className={pathname === '/profile' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up bg-accent-foreground p-3 rounded-md' : `  hover:bg-accent-foreground hover:text-primary text-lg font-bold p-3 rounded-md`}>
                                    Profile
                                </Link>

                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link href="/contact" className={pathname === '/contact' ? 'font-bold text-lg text-primary underline underline-offset-4 touch-pan-up bg-accent-foreground p-3 rounded-md' : `  hover:bg-accent-foreground hover:text-primary text-lg font-bold p-3 rounded-md`}>
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