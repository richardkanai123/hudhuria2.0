/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import CloudinaryImageComponent from "./CloudinaryAdvancedImage"
import PlaceholderImage from "@/components/Custom/Events/PlaceholderImage"
import { LoaderPinwheelIcon } from "lucide-react"
// import { Cloudinary } from "@cloudinary/url-gen/index"



const CustomCloudImageUpload = ({ eventFormData }: {
    eventFormData: FormData
}) => {
    const [targetImage, setTargetImage] = useState<File | null>(null)
    const [imagePublicId, setImagePublicId] = useState<string | null>(null)
    const [isPendingUpload, setIsPendingUpload] = useState<boolean>(false)
    // const [isPendingDelete, setIsPendingDelete] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    // const [imageSignature, setImageSignature] = useState<string | null>(null)
    // const [imageTimestamp, setImageTimestamp] = useState<string | null>(null)

    const uploadForm = useRef<HTMLFormElement>(null)



    const UploadImage = async () => {

        if (!eventFormData) {
            setError('No event form data')
            return false
        }
        if (!targetImage) {
            setError('No image selected')
            return false
        }

        try {
            setError(null)
            const formData = new FormData()
            formData.append("file", targetImage)
            formData.append("upload_preset", process.env.NEXT_CLOUD_UPLOAD_PRESET as string)
            formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME as string)
            formData.append("api_key", process.env.NEXT_CLOUD_API_KEY as string)
            formData.append("api_secret", process.env.NEXT_API_SECRET as string)
            // timeStamp
            formData.append("timestamp", Date.now().toString())
            setIsPendingUpload(true)
            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUD_API_KEY}/image/upload`, {
                method: "POST",
                body: formData
            })
            const data = await response.json()

            if (data.error) {
                setError(data.error.message)
                setIsPendingUpload(false)
                return false
            }

            setImagePublicId(data.public_id)
            setTargetImage(null)
            setError(null)
            // setImageSignature(data.signature)
            // setImageTimestamp(data.timestamp)
            console.log(data, eventFormData.get('cloud_name'))

            // add event to database

            setIsPendingUpload(false)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('An unknown error occurred')
            }
            setIsPendingUpload(false)
        }
    }
    // const handleDelete = async () => {
    //     try {
    //         setIsPendingDelete(true)
    //         setError(null)
    //         const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUD_API_KEY}/image/destroy`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 public_id: imagePublicId,
    //                 // apikey
    //                 api_key: process.env.VITE_CLOUD_API_KEY,
    //                 // api_secret
    //                 api_secret: process.env.VITE_CLOUD_API_SECRET,
    //                 // cloud name
    //                 cloud_name: process.env.VITE_CLOUD_NAME,
    //                 signature: imageSignature,
    //                 timestamp: imageTimestamp,
    //             })
    //         })
    //         const data = await response.json()
    //         console.log(data)
    //         if (data.error) {
    //             setError(data.error.message)
    //             setIsPendingDelete(false)
    //             return false
    //         }
    //         uploadForm.current?.reset();
    //         setTargetImage(null)
    //         setImagePublicId(null)
    //         setIsPendingDelete(false)
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             setError(error.message)
    //         } else {
    //             setError('An unknown error occurred')
    //         }
    //         setIsPendingDelete(false)
    //     }
    // }



    return (
        <div className="w-full mx-auto px-4 py-2 h-fit md:max-w-screen-sm border border-gray-300 rounded-md my-2">
            <h1 className="text-lg font-semibold text-sky-800 my-1 ">Upload Bannner</h1>
            <form className="w-full" ref={uploadForm}>
                <input className="p-2" type="file" onChange={(e) => {
                    // reset errors and other states
                    setError(null)
                    setImagePublicId(null)
                    // setImageSignature(null)
                    // setImageTimestamp(null)
                    setIsPendingUpload(false)
                    setTargetImage(null)
                    // set target image
                    if (e.target.files) {
                        setTargetImage(e.target.files[0])
                    }

                }} />
                <div className="w-full flex gap-2 items-center justify-center my-2">
                    {
                        targetImage && <Button className='flex align-middle items-center ' variant='default' type="button" onClick={UploadImage} disabled={isPendingUpload}>
                            {isPendingUpload && <LoaderPinwheelIcon className='mr-2 h-4 w-4 animate-spin' />}
                            <span> {isPendingUpload ? "Uploading..." : "Upload"}</span>
                        </Button>
                    }

                    {/* temporary delete button */}
                    {/* {
                        imagePublicId && <Button variant='destructive' type="button" onClick={handleDelete} disabled={isPendingDelete}>
                            {isPendingDelete && <LoaderPinwheelIcon className='mr-2 h-4 w-4 animate-spin' />}
                            <span> {isPendingDelete ? "Deleteing..." : "Delete"}</span>
                        </Button>
                    } */}

                </div>
                {/* error message */}
                <div className="w-full p-2 min-h-fit"> {error && <p className="text-red-500 my-2 text-wrap text-sm">{error}</p>}</div>

                <div className="w-full ">

                    {/* image preview */}
                    {(targetImage && !isPendingUpload) && <img src={URL.createObjectURL(targetImage)} alt="Preview" />}
                    {isPendingUpload && <PlaceholderImage />}
                    {/* removed temporary placeholder */}
                    {/* TODO: Figure out why delete fails!! */}
                    {(imagePublicId && !targetImage) && <CloudinaryImageComponent publicId={imagePublicId} />}
                </div>
            </form>
        </div>
    )
}
export default CustomCloudImageUpload