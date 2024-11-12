'use client'
import { myCld } from '@/lib/Cloudinary/cloudinary';
import Image from 'next/image';
const CloudImage = ({ image_id }: { image_id: string }) => {
    // console.log(image_id)

    const Myimage = myCld.image(image_id).quality('auto').format('auto').toURL()
    return (

        <Image src={Myimage} alt={`image ${image_id}`} priority={true} fill sizes={'100%'} className="w-full h-full object-cover" />
    );
};

export default CloudImage