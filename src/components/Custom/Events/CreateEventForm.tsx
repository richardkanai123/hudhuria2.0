/**
 * The `CreateEventForm` component is responsible for rendering the form to create a new event. It manages the current step of the form using the `currentStep` state variable.
 * 
 * The component renders either the `CustomCloudImageUpload` component or the `NewEvent` component based on the current step. It also renders "Previous" and "Next" buttons to allow the user to navigate between the steps.
 */
'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NewEvent from "./NewEvent";
import CloudinaryImageUpload from "@/lib/Cloudinary/Cloudinary-Image-Upload";

const CreateEventForm = () => {
    // steps for the form
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <div className="w-full min-h-screen flex flex-col items-center gap-4">

            <NewEvent />


            {/* <div className="w-full flex items-center justify-center gap-4 mx-auto min-h-screen px-3 py-1 border-t m-auto self-end ">
                <Button disabled={currentStep === 1} onClick={() => setCurrentStep(1)}>
                    Previous
                </Button>

                <Button disabled={currentStep === 2} onClick={() => setCurrentStep(2)}>
                    Next
                </Button>
            </div> */}
        </div>
    )
}

export default CreateEventForm