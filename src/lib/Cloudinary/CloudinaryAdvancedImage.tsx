'use client'
import { CldImage } from 'next-cloudinary';

export default function CloudinaryImageComponent(publicId: string) {

    return (
        <div className='w-full p-2'>
            <CldImage
                width="960"
                height="600"
                src={publicId}
                sizes="100vw"
                alt="Cloudinary image loading..."
                crop='fill'
                aspectRatio={'16:9'}
                loading="lazy"
                format='auto'
                fill={true}
            />
        </div>
    )
}