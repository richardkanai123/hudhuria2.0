'use client'

import CloudImage from '@/components/Custom/Events/CloudImage';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

const CloudinaryImageUpload = () => {
    const [imageDetails, setImageDetails] = useState(null)
    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            <CldUploadWidget onSuccess={
                (result) => {
                    console.log(result?.info);
                }
            } uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}>
                {({ open }) => {

                    return (
                        <button onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
            <div className="w-full h-40 relative aspect-video">
                {/* "xaobwu2yetbzzrjkofba" */}
                <CloudImage image_id='b71glpcyscepfytzlr0r' />
            </div>

        </div>
    )
}

export default CloudinaryImageUpload