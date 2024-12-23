import CitiesCarousel from "@/components/Custom/Events/CitiesCarousel";
import EventLoadingCard from "@/components/Custom/loaders/EventLoadingCard";
import ContactForm from "@/components/Custom/nav/ContactForm";
import UpcomingEventsLister from "@/components/Custom/Events/UpcomingEventsLister";
import { Suspense } from "react";
import HomeCTAButton from "@/components/Custom/nav/HomeCTAButton";

export default function Home() {
  return (
    <div className="w-full h-full max-h-fit flex flex-col items-center justify-center gap-4 overflow-x-hidden  bg-opacity-5">
      {/* hero image */}
      <div style={{
        backgroundImage: `url('/conference_banner.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',

      }} className="w-full h-[60vh] bg-opacity-10  bg-slate-900 flex flex-col align-middle justify-center items-center gap-2 backdrop-blur-sm max-h-[800px]" >
        <h1 className='text-7xl tracking-wide font-extrabold animate-in slide-in-from-top-6  bg-opacity-20 text-transparent bg-clip-text  bg-gradient-to-tr from-primary to-primary-foreground '> Hudhuria</h1>
        <p className="text-center text-xl font-semibold text-white backdrop-blur-[1px] bg-stone-800 bg-blend-darken bg-opacity-10 p-2 rounded-md">
          Discover, Book, Attend and Connect with events near you.
        </p>

        <HomeCTAButton />

      </div>
      {/* Upcoming events */}
      <Suspense fallback={<EventLoadingCard />}>
        <UpcomingEventsLister />
      </Suspense>
      {/* Cities carousel */}
      <CitiesCarousel />
      {/* contact form */}
      <ContactForm />


    </div >

  );
}
