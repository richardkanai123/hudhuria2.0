'use client'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"


const CitiesCarousel = () => {

    const Cities = [
        {
            "name": "Nairobi",
            "image": "https://images.unsplash.com/photo-1669127300649-940337f1487e?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "description": "Kenya's bustling capital city, is a vibrant hub for culture, business, and wildlife."
        },
        {
            "name": "Kisumu",
            "image": "https://images.unsplash.com/photo-1690715408641-fd1d5b8931fe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "description": "A port city on Lake Victoria, offers scenic lakeside views and a rich cultural heritage."
        },
        {
            "name": "Mombasa",
            "image": "https://images.unsplash.com/photo-1673902274292-36d5732dd3a4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "description": "A coastal city, is known for its beautiful beaches and Swahili culture."
        },
        {
            "name": "Eldoret",
            "image": "https://plus.unsplash.com/premium_photo-1666426138194-b2679ce9602d?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "description": "A highland city known for its athletics champions and agricultural wealth."
        },
        {
            "name": "Kakamega",
            "image": "https://images.unsplash.com/photo-1708515961610-869981297fb6?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "description": "Home to the Kakamega Forest, offers lush landscapes and rich biodiversity."
        },
        {
            "name": "Nyali",
            "image": "https://images.unsplash.com/photo-1685380518106-308ed23847a4?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "description": "A serene coastal suburb of Mombasa, known for its pristine beaches and upscale resorts."
        },
        {
            "name": "Diani",
            "image": "https://images.unsplash.com/photo-1664093671658-a2aac3a344a9?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "description": "A popular beach destination, offering white sands, crystal clear waters, and water sports."
        }
    ]

    return (
        <div className="w-full h-fit flex flex-col px-4 py-2 mx-auto my-4">

            <h1 className="w-full text-3xl font-bold text-left text-primary mb-4 ">Discover By City</h1>
            <div className="w-full mx-auto px-2">
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                    <div className="flex w-full space-x-4 py-4 mb-3">

                        {Cities.map((city) => (

                            <Link href={`/events${city.name.toLocaleLowerCase()}`}
                                key={city.name.toLocaleLowerCase()} className="min-w-[280px] h-[250px] md:w-[300px] max-w-xs group cursor-pointer  rounded-md overflow-hidden shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                                <div
                                    style={{
                                        backgroundImage: `url(${city.image})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundBlendMode: 'overlay',
                                        backgroundColor: 'rgba(11, 6, 10, 0.5)',
                                        backgroundAttachment: 'local',

                                    }}
                                    className="w-full h-full flex flex-col items-center justify-center align-middle gap-2 transition-all ease-in-out duration-1000 delay-500">

                                    <h1 className=" transition-all my-auto text-white font-bold group-hover:text-primary text-3xl">{city.name}</h1>

                                    <div className=" bg-sky-50 transition-all ease-in-out backdrop-blur-sm bg-opacity-10 hidden mt-auto w-full h-fit mx-auto group-hover:flex items-center justify-center p-2 animate-in delay-200  animate-out slide-out-to-bottom-4  duration-1000 ">
                                        <p className="text-base font-semibold text-primary text-wrap ">{city.description}</p>
                                    </div>

                                </div>
                            </Link>



                        ))}

                    </div>
                    <ScrollBar className="mt-3 bg-gradient-to-r from-primary to-primary-foreground  " orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}

export default CitiesCarousel