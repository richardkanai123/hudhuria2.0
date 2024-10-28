import { AdvancedImage, lazyload, placeholder, responsive, } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { myCld } from '@/lib/Cloudinary/cloudinary';

export default function CloudinaryImageComponent({ publicId }: { publicId: string }) {

    const Myimage = myCld.image(publicId).resize(fill()).format('auto').quality('auto');
    return (
        <div className='w-full p-2'>
            <AdvancedImage plugins={[
                lazyload(),
                responsive(),
                placeholder({ mode: 'blur' })
            ]} cldImg={Myimage} />
        </div>
    )
}