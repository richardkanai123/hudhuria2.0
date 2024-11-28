'use client'
/**
 * The `NewEvent` component is a React component that renders a form for creating a new event. It uses the `react-hook-form` library to manage the form state and validation, and the `zod` library to define the schema for the event data.
 *
 * The form includes fields for the event title, description, category, venue, city, start and end dates, organizer information, ticket details, and whether the event is paid or free. The component also includes a calenar component for selecting the start and end dates.
 *
 * The `onSubmit` function is called when the form is submitted, and it logs the event data to the console.
 */


import { Card } from "@/components/ui/card"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import eventCategories from "@/lib/Event_categories"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2Icon, Router } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import citiesInKenya from "@/lib/cities"
import { Switch } from '@/components/ui/switch';
import { TimePickerDemo } from "@/lib/time-picker-demo"
import { useMemo } from "react"
import { toast } from "react-toastify"
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"

const TipTap = dynamic(() => import('./Editor'), {
    ssr: false,
})

// zod schema for event data
const categories = eventCategories.map((item) => item.name)
const fileSizeLimit = 5 * 1024 * 1024

const NewEventSchema = z.object({
    imageFile: z
        .instanceof(File)
        .refine(
            (file) =>
                [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "image/webp",

                ].includes(file.type),
            { message: "Invalid image file type" }
        )
        .refine((file) => file.size <= fileSizeLimit, {
            message: "File size should not exceed 5MB",
        }),
    title: z.string().min(10, "Title is required, at least 10 characters"),
    description: z.string().min(1, "Description is required"),
    category: z.enum(categories as [string, ...string[]]),
    city: z.enum(citiesInKenya.sort() as [string, ...string[]]),
    venue: z.string().min(1, "Venue is required"),
    startDate: z.date().min(new Date(), 'Event cannot be in the past'),
    endDate: z.date().min(new Date(), 'Event cannot be in the past'),
    organizer: z.string().min(1, "Organizer name is required"),
    ticketPrice: z.number().min(0, "Ticket price must be greater than zero").optional(),
    totalTickets: z.number().int().min(0, "Total tickets must be greater than zero").optional(),
    isPaidEvent: z.boolean().default(false),
}).refine(
    (data) => data.startDate < data.endDate, // Ensure startDate is before endDate
    {
        path: ["endDate"], // Where the error message will be displayed
        message: "End date must be after the start date",
    }

).refine(
    (data) =>
        !data.isPaidEvent || (data.ticketPrice as number > 0 && data.totalTickets as number > 0), // Ensure price and totalTickets > 0 if event is paid
    {
        path: ["isPaidEvent"], // Where the error message will be displayed
        message: "For paid events, ticket price and total tickets must be greater than zero",
    }
);


const NewEvent = () => {



    const Router = useRouter()
    const session = useSession()

    const form = useForm<z.infer<typeof NewEventSchema>>({
        resolver: zodResolver(NewEventSchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            city: '',
            venue: '',
            ticketPrice: 0,
            totalTickets: 0,
            isPaidEvent: false,
            organizer: ''

        },
        mode: 'onChange',
    });






    const handleSubmit = form.handleSubmit(async (data: z.infer<typeof NewEventSchema>) => {


        console.log(data)
        // try {
        //     if (!session.data?.user) {
        //         throw new Error('No User found, Please login first!')
        //     }



        //     // TODO : Send the event data to the database
        //     const newEventUrl = `${process.env.NEXT_PUBLIC_URL}/api/events`


        //     const formData = new FormData()
        //     formData.append('imageFile', data.imageFile)
        //     formData.append('eventTitle', data.title)
        //     formData.append('description', data.description)
        //     formData.append('category', data.category)
        //     formData.append('city', data.city)
        //     formData.append('location', data.venue)
        //     formData.append('startDate', data.startDate.toISOString())
        //     formData.append('endDate', data.endDate.toISOString())
        //     formData.append('organizer', data.organizer)
        //     formData.append('isPaid', data.isPaidEvent ? 'true' : 'false')
        //     formData.append('ticketPrice', data.isPaidEvent ? data.ticketPrice as unknown as string : '0')
        //     formData.append('totalTickets', data.isPaidEvent ? data.totalTickets as unknown as string : '0')
        //     formData.append('uploadedBy', session.data?.user?.id as string)
        //     const res = await fetch(newEventUrl, {
        //         method: 'POST',
        //         body: formData,

        //     })
        //     const resBody = await res.json()

        //     if (res.status !== 201) {
        //         form.setError('root', { message: resBody.message as string })
        //     }

        //     toast.success("Event created successfully!");
        //     form.reset();
        //     // TODO : redirect to preview page for the event to confirm publishing or not
        //     Router.replace(`/events/details/${resBody.slug}`)

        // } catch (error) {
        //     if (error instanceof Error) {
        //         toast.error("Error submitting event data: " + error.message);
        //     } else {
        //         toast.error("An unknown error occurred");
        //     }
        // }

    });


    const isPaidEvent = form.watch("isPaidEvent")

    const categoryOptions = useMemo(() =>
        eventCategories.map((category) => (
            <SelectItem key={category.name} value={category.name}>
                {category.name}
            </SelectItem>
        )), []
    );



    return (
        <div
            className="w-full flex flex-col items-center justify-center gap-4 mx-auto min-h-screen px-3 py-1 ">
            <Card className="w-full max-w-screen-lg p-6 rounded-sm">
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="w-full space-y-8">

                        <FormField
                            control={form.control}
                            name="imageFile"
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem>
                                    <FormLabel>Cover Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...fieldProps}
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg, image/webp"
                                            onChange={(event) =>
                                                onChange(event.target.files && event.target.files[0])
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Upload an image for your event, only accepts png, jpeg, jpg, webp
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <fieldset title="General Details" className="grid grid-cols-1 md:grrid-cols-2 gap-4 items-center align-middle border p-2 shadow-md pb-4">

                            <legend className="text-lg font-semibold  text-sky-700">General Details</legend>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Event Title" {...field} type="text" />
                                        </FormControl>
                                        <FormDescription>
                                            Title or name of the event
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="organizer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Organizer Name / Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Event organizer" {...field} type="text" />
                                        </FormControl>
                                        <FormDescription>
                                            Title or name of the person or entity organizing the event
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* select category */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Event Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>                                        <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Select a category</SelectLabel>
                                                    {categoryOptions}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="relative w-full">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Event Description</FormLabel>
                                            <FormControl>
                                                <TipTap description={field.name} onChange={field.onChange} />
                                            </FormControl>
                                            <FormDescription>
                                                Briefly describe your event. What is it about? What makes it special? What can attendees expect? Keep it clear and precise.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>



                        </fieldset>

                        <fieldset title="Venue and Time Details" className="grid grid-cols-1 md:grrid-cols-2 gap-4 items-center align-middle border p-2  shadow-md pb-4">

                            <legend className="text-lg font-semibold  text-sky-700">Venue and Time Details</legend>

                            <FormField
                                control={form.control}
                                name="venue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Venue</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Event Venue" {...field} type="text" />
                                        </FormControl>
                                        <FormDescription>
                                            The exact place/ building, street or facility where the event will be happening
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Venue City</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the Venue City" />
                                                </SelectTrigger>
                                            </FormControl>                                        <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Select City</SelectLabel>
                                                    {
                                                        citiesInKenya.map((city) => (
                                                            <SelectItem key={city} value={city}>
                                                                {city}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-left">Start Date and Time</FormLabel>
                                        <Popover>
                                            <FormControl>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full max-w-sm justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(field.value, "PPP HH:mm:ss")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                            </FormControl>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                                <div className="p-3 border-t border-border">
                                                    <TimePickerDemo
                                                        setDate={field.onChange}
                                                        date={field.value}
                                                    />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-left">End Date and Time</FormLabel>
                                        <Popover>
                                            <FormControl>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full max-w-sm justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? (
                                                            format(field.value, "PPP HH:mm:ss")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                            </FormControl>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                                <div className="p-3 border-t border-border">
                                                    <TimePickerDemo
                                                        setDate={field.onChange}
                                                        date={field.value}
                                                    />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </fieldset>

                        {/* ticketing */}
                        <fieldset title="Ticketing details" className="grid grid-cols-2 gap-4 items-center align-middle border p-2 transition-all ease-linear duration-700 delay-200  shadow-md pb-4 ">
                            <legend className='text-lg font-semibold  text-sky-700'>Ticketing</legend>

                            <FormField
                                control={form.control}
                                name="isPaidEvent"
                                render={({ field }) => (
                                    <FormItem className='flex items-center align-middle gap-2'>
                                        <FormLabel> Paid Event</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* listen to isPaid variable to only show the input for price on a paid event */}

                            {
                                isPaidEvent && (
                                    <aside className="flex flex-col md:flex-row items-start align-middle justify-center gap-4 flex-wrap" >
                                        <FormField
                                            control={form.control}
                                            name="ticketPrice"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Ticket Price</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Price in KSh."
                                                            {...field}
                                                            type="number"
                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                            min={0}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="totalTickets"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Available Tickets</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Number of available tickets for sale."
                                                            {...field}
                                                            type="number"
                                                            onChange={e => field.onChange(Number(e.target.value))}
                                                            min={0}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </aside>
                                )
                            }
                        </fieldset>

                        {
                            form.formState.errors.root && <FormMessage className="my-3">
                                {form.formState.errors.root?.message}
                            </FormMessage>
                        }

                        <Button
                            disabled={form.formState.isSubmitting}
                            className="cursor-pointer"
                            type="submit" >
                            {form.formState.isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                            Create Event
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
export default NewEvent