import FaqComponent from '@/components/Custom/nav/FaqComponent'
import Link from 'next/link'
import React from 'react'

const AboutPage = () => {
    return (
        <div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            // transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
            className="py-10 px-6">

            <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
                <section id="about-us">
                    {/* About Us Section */}
                    <h2 className="text-3xl font-bold text-primary mb-6 text-center">About Us</h2>

                    <div
                        // initial={{ opacity: 0 }}
                        // animate={{ opacity: 1 }}
                        // exit={{ opacity: 0 }}
                        // transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
                        className="mb-6">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Who We Are</h3>
                        <p className="text-sky-800 font-normal">
                            At Hudhuria, we are passionate about bringing people together through exciting events and experiences.
                            Our platform connects event organizers with audiences from all walks of life. Whether it&apos;s a concert,
                            workshop, or charity event, we make it easy for organizers to list events, and for attendees to discover
                            and join them.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Our Mission</h3>
                        <p className="text-sky-800 font-normal">
                            Our mission is simple: to create a vibrant and accessible space where event organizers can share their
                            passions and attendees can discover unique experiences. We aim to simplify event discovery and ticket
                            purchasing, offering seamless solutions for both organizers and attendees alike.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-primary mb-4">What We Offer</h3>
                        <p className="text-sky-800 font-normal">
                            Whether you are hosting a small local gathering or a large-scale conference, [Website Name] provides you
                            with the tools to manage and promote your events with ease. Our features include:
                        </p>
                        <ul className="list-disc list-inside text-sky-800 font-normal ml-4 mt-2">
                            <li>Event creation and easy listing tools</li>
                            <li>Seamless ticket purchasing experience for attendees</li>
                            <li>City-based and category-based event browsing</li>
                            <li>Support for both paid and free events</li>
                            <li>Notifications and reminders for upcoming events</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Why Choose Us?</h3>
                        <p className="text-sky-800 font-normal">
                            We believe in the power of events to create connections, inspire creativity, and foster community. With
                            Hudhuria, you are not just getting an event listing platform—you&apos;re gaining a partner in bringing your
                            vision to life. Our platform is designed with user-friendliness and efficiency in mind, ensuring that you
                            spend less time managing logistics and more time focusing on what matters: creating unforgettable experiences.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Our Vision</h3>
                        <p className="text-sky-800 font-normal">
                            Our vision is to build a world where everyone has easy access to events that excite and inspire them. We
                            want to foster a sense of discovery and adventure, making it simple for users to find events that align
                            with their passions. Ultimately, we hope to connect communities through shared experiences and foster
                            connections that last a lifetime.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Meet Our Team</h3>
                        <p className="text-sky-800 font-normal">
                            Our team is a group of dedicated professionals who are enthusiastic about events and technology. We
                            combine our expertise in event planning, marketing, and software development to create a platform that
                            serves both event organizers and attendees. Each member of our team is committed to making your event
                            experience the best it can be, from initial setup to ticket purchasing and beyond.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Join Us</h3>
                        <p className="text-sky-800 font-normal">
                            Whether you are an event organizer looking for a platform to promote your event or an attendee eager to
                            discover new experiences, we invite you to join our community. Sign up today and start exploring the
                            endless possibilities that await you!
                        </p>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Contact Us</h3>
                        <p className="text-sky-800 font-normal">
                            Have questions or need support? We&apos;re here to help! Reach out to us at admin@hudhuria.com or through
                            our social media channels. Let&apos;s make your next event unforgettable!
                        </p>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-2xl font-semibold text-primary mb-4">Our Terms and Policy</h3>
                        <p className="text-sky-800 font-normal">
                            Read our Terms and Policy to understand our commitment to privacy, security, and the rights of our users.
                        </p>
                        <Link href="/policy" scroll={true} className="text-sky-800 hover:text-sky-900 underline">
                            Terms and Policy
                        </Link>
                    </div>
                </section>

                <div className="w-full mx-auto max-w-screen-md mt-6 text-sky-800">
                    <h1 className="text-primary text-lg font-bold">FAQs</h1>

                    <FaqComponent />
                </div>
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

export default AboutPage