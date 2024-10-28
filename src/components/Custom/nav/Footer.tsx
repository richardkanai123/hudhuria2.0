import { Button } from "@/components/ui/button"
import { FaFacebook, FaGithub, FaWhatsapp } from "react-icons/fa6";
import { MailPlusIcon, PhoneCall } from "lucide-react";
import Link from "next/link";
const Footer = () => {
    return (
        //    footer
        <footer className="w-full h-full flex flex-col  overflow-x-hidden bg-primary text-primary-foreground p-4 mt-4">
            <div className="w-full h-full flex flex-col md:flex-row items-center align-top gap-4">

                {/* social links */}
                <div className=" flex-1 flex flex-col justify-center gap-4 text-left sm:border-b md:border-none">
                    <h1 className="text-xl font-bold">Links</h1>
                    <Link href="/" scroll={true} className="w-fit text-sm hover:text-sky-400 font-semibold underline cursor-pointer">Home</Link>
                    <Link scroll={true} href="/about" className="w-fit text-sm hover:text-sky-400 font-semibold underline cursor-pointer">About Us</Link>
                    <Link scroll={true} href="/policy" className="w-fit text-sm hover:text-sky-400 font-semibold underline cursor-pointer">Terms and Conditions</Link>
                    <Link scroll={true} href="/policy" className="w-fit text-sm hover:text-sky-400 font-semibold underline cursor-pointer">Privacy Policy</Link>
                </div>
                {/* social links */}
                <div className=" flex-1 flex flex-col justify-center gap-4 text-left sm:border-b md:border-none">
                    <Link scroll={true} href="/events?city=all" className="w-fit text-sm hover:text-sky-400 font-semibold underline cursor-pointer">Events</Link>
                    <Link scroll={true} href="/events?city=mombasa" className="w-fit text-sm hover:text-sky-400 font-semibold underline cursor-pointer">Mombasa</Link>
                    <Link scroll={true} href="/events?city=nairobi" className="w-fit text-sm hover:text-sky-400 font-semibold underline cursor-pointer">Nairobi</Link>
                    <Link scroll={true} href="/contact" className="w-fit text-sm hover:text-sky-400 font-semibold underline cursor-pointer">Contact Us</Link>
                </div>

                {/* policy and terms links */}
                <div className=" flex-1 flex flex-col items-center justify-center gap-4 pb-4 sm:border-b md:border-none">
                    <h1 className="text-lg font-bold">Reach us </h1>
                    <div className="flex-1 flex flex-col justify-center gap-4 text-left ">
                        {/* facebook link */}
                        <Button variant="ghost" asChild className="flex items-center justify-center gap-2 bg-transparent hover:bg-transparent  ">
                            <a href="https://www.facebook.com/hudhuria" target='blank' className="text-lg text-sky-700 hover:text-sky-400 font-semibold  cursor-pointer">
                                <FaFacebook className="h-2 w-2" />
                                <span> Facebook</span>
                            </a>
                        </Button>

                        {/* whatsapp link */}
                        <Button variant="ghost" asChild className="flex items-center justify-center gap-2 bg-transparent hover:bg-transparent  ">
                            <a href="https://wa.me/+25470987654321" target='blank' className="text-lg text-lime-700 hover:text-green-400 font-semibold  cursor-pointer">
                                <FaWhatsapp className="h-2 w-2 " /> Whatsapp
                            </a>
                        </Button>

                        {/* phone link */}
                        <Button variant="ghost" asChild className="flex items-center justify-center gap-2 bg-transparent hover:bg-transparent  ">
                            <a href="tel:+25470987654321" target='blank' className="text-lg text-sky-700 hover:text-sky-400 font-semibold  cursor-pointer">
                                <PhoneCall className="h-2 w-2" />  +25470987654321
                            </a>
                        </Button>

                        {/* email link */}
                        <Button variant="ghost" asChild className="flex items-center justify-center gap-2 bg-transparent hover:bg-transparent ">
                            <a href="mailto:admin@hudhuria.com" target='blank' className="text-lg text-sky-700 hover:text-sky-400 font-semibold  cursor-pointer">
                                <MailPlusIcon className="h-2 w-2" />  admin@hudhuria.com
                            </a>
                        </Button>
                    </div>
                </div>

                {/* copyright end */}
                <div className=" flex-1 flex flex-col items-center justify-center gap-4 sm:border-b md:border-none">
                    <h1 className="text-xl font-bold">Copyright</h1>
                    <p className="text-center text-lg font-semibold">
                        &copy; 2024 Hudhuria. All rights reserved.
                    </p>
                    <p className="text-center flex gap-2 text-lg font-semibold">
                        Powered by <a href="https://github.com/richardkanai123" target='blank' className="text-sky-700 hover:text-sky-400 font-semibold  cursor-pointer">
                            <FaGithub className="h-6 w-6" />RK
                        </a>
                    </p>
                </div>



            </div>
            <ul className="flex items-center justify-center gap-4 border-t text-sm list-inside list-disc  contain-style">
                <li>
                    <Link href="/" className="font-semibold hover:text-sky-400">Home</Link>
                </li>
                <li>
                    <Link href="/about" className="font-semibold hover:text-sky-400">About</Link>
                </li>
                <li>
                    <Link href="/contact" className="font-semibold hover:text-sky-400">Contact</Link>
                </li>
                <li>
                    <Link href="/policy" className="font-semibold hover:text-sky-400">Privacy Policy</Link>
                </li>

            </ul>
        </footer>

    )
}

export default Footer