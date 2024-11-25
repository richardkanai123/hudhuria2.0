'use client'
import { MailPlusIcon, PhoneCall } from 'lucide-react'
import { FaFacebook, FaWhatsapp } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const ContactForm = () => {
    return (
        <div id='contact' className="w-full h-full flex flex-col align-middle items-center justify-center gap-4 overflow-x-hidden my-4 mx-auto px-2">
            <h1 className='text-2xl text-center font-bold text-primary'>Contact Us</h1>
            <form className="w-full max-w-lg mx-auto p-4 space-y-4 bg-slate-100 shadow-md rounded-md flex flex-col justify-center items-center ">

                <div className="w-full md:space-x-4 flex flex-col gap-4 md:gap-[unset] md:flex-row mb-4">
                    <div>
                        <label htmlFor="Firstname" className="block  text-primary font-bold mb-2">
                            Firstname
                        </label>

                        <input
                            type='text'
                            id='Firstname'
                            name='Firstname'
                            className="w-full px-3 py-2 border border-gray-300 bg-slate-200 text-sky-800 font-semibold rounded-md focus:outline-none focus:border-blue-500 placeholder:text-sm placeholder:font-light"
                            placeholder="Enter your Firstname"
                        />
                    </div>
                    <div>
                        <label htmlFor="Surname" className="block text-primary font-bold md:mb-2">
                            Surname
                        </label>

                        <input
                            type='text'
                            id='Surname'
                            name='Surname'
                            className="w-full px-3 py-2 border border-gray-300 bg-slate-200 text-sky-800 font-semibold rounded-md focus:outline-none focus:border-blue-500 placeholder:text-sm placeholder:font-light"
                            placeholder="Enter your surname"
                        /></div>
                </div>

                <div className="w-full mb-4">

                    <label htmlFor="email" className="block  text-primary font-bold mb-2">
                        Email
                    </label>

                    <input
                        type='email'
                        id='email'
                        name='email'
                        className="w-full px-3 py-2 border border-gray-300 bg-slate-200 text-sky-800 font-semibold rounded-md focus:outline-none focus:border-blue-500 placeholder:text-sm placeholder:font-light"
                        placeholder="Enter your email"
                    />

                </div>

                <div className="w-full mb-4">
                    <label htmlFor="message" className="block  text-primary font-bold mb-2">
                        Message
                    </label>

                    <Textarea
                        id='message'
                        name='message'
                        className="w-full px-3 py-2 border border-gray-300 bg-slate-200 text-sky-800 font-semibold rounded-md focus:outline-none focus:border-blue-500 placeholder:text-sm placeholder:font-light"
                        placeholder="Enter your message"
                        rows={5}
                        cols={50}
                    />

                </div>

                <button
                    type="submit"
                    className="w-3/4 mx-auto self-center px-4 py-2 bg-primary text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Send Message
                </button>
            </form>

            <div className="flex-1 flex justify-center gap-4 text-left mx-auto flex-col align-start place-items-start md:flex-row  ">
                {/* facebook link */}
                <Button variant="ghost" className="flex items-center justify-center gap-2 bg-transparent hover:bg-transparent  ">
                    <a href="https://www.facebook.com/hudhuria" target='blank' className="text-lg text-sky-700 hover:text-sky-400 font-semibold  cursor-pointer  flex items-center align-middle gap-2">
                        <FaFacebook className="w12 h-12" /> Facebook
                    </a>

                </Button>

                {/* whatsapp link */}
                <Button variant="ghost" className="flex items-center justify-center gap-2 bg-transparent hover:bg-transparent  ">
                    <a href="https://wa.me/+25470987654321" target='blank' className="text-lg text-lime-700 hover:text-green-400 font-semibold  cursor-pointer  flex items-center align-middle gap-2">
                        <FaWhatsapp className="w12 h-12 " /> Chat now
                    </a>

                </Button>

                {/* phone link */}
                <Button variant="ghost" className="flex items-center justify-center gap-2 bg-transparent hover:bg-transparent  ">
                    <a href="tel:+25470987654321" target='blank' className="text-lg text-sky-700 hover:text-sky-400 font-semibold  cursor-pointer flex items-center align-middle gap-2">
                        <PhoneCall className="w12 h-12" />  Call now
                    </a>

                </Button>

                {/* email link */}
                <Button variant="ghost" className="flex items-center justify-center gap-2 bg-transparent hover:bg-transparent ">
                    <a href="mailto:admin@hudhuria.com" target='blank' className="text-lg text-sky-700 hover:text-sky-400 font-semibold  cursor-pointer  flex items-center align-middle gap-2">
                        <MailPlusIcon className="w12 h-12" />      Email
                    </a>

                </Button>
            </div>
        </div >

    )
}

export default ContactForm