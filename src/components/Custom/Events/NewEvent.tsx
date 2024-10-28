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
import { Textarea } from "@/components/ui/textarea"

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
import { CalendarIcon, Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import citiesInKenya from "@/lib/cities"
import { Switch } from '@/components/ui/switch';
import { TimePickerDemo } from "@/lib/time-picker-demo"
import { useMemo, useRef, useState } from "react"
import CustomCloudImageUploader from "@/lib/Cloudinary/Cloudinary-Image-Upload"
import { toast } from "react-toastify"

// zod schema for event data
const categories = eventCategories.map((item) => item.name)

const NewEventSchema = z.object({
    title: z.string().min(10, "Title is required, at least 10 characters"),
    description: z.string().min(1, "Description is required"),
    category: z.enum(categories as [string, ...string[]]),
    city: z.enum(citiesInKenya.sort() as [string, ...string[]]),
    venue: z.string().min(1, "Venue is required"),
    startDate: z.date().min(new Date(), 'Event cannot be in the past'),
    endDate: z.date().min(new Date(), 'Event cannot be in the past'),
    ticket: z.object({
        price: z.number().nonnegative(),
        totalTickets: z.number().int().nonnegative(),
    }),
    isPaidEvent: z.boolean().default(false),
}).refine(
    (data) => data.startDate < data.endDate, // Ensure startDate is before endDate
    {
        path: ["endDate"], // Where the error message will be displayed
        message: "End date must be after the start date",
    }

).refine(
    (data) =>
        !data.isPaidEvent || (data.ticket.price > 0 && data.ticket.totalTickets > 0), // Ensure price and totalTickets > 0 if event is paid
    {
        path: ["isPaidEvent"], // Where the error message will be displayed
        message: "For paid events, ticket price and total tickets must be greater than zero",
    }
);


const NewEvent = () => {
    const [imageData, setImageData] = useState<{ publicId: string, url: string } | null>(null);
    const eventFormRef = useRef<HTMLFormElement>(null);

    const handleImageUpload = (data: { publicId: string, url: string }) => {
        setImageData(data);
    };



    const form = useForm<z.infer<typeof NewEventSchema>>({
        resolver: zodResolver(NewEventSchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            city: '',
            venue: '',
            ticket: {
                price: 0,
                totalTickets: 0,
            },
            isPaidEvent: false,
        },
        mode: 'onChange',
    });

    const handleSubmit = form.handleSubmit(async (data) => {

        if (!imageData || !eventFormRef.current) {
            toast.error("Please upload an banner image for the event");
            return;
        }
        try {
            const eventData = {
                ...data,
                bannerid: imageData.publicId,
                imageUrl: imageData.url,
            }
            console.table(eventData);
            // TODO : Send the event data to the database

            // TODO : redirect to preview page for the event to confirm publishing or not

        } catch (error) {
            if (error instanceof Error) {
                toast.error("Error submitting event data: " + error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }

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
                <h1 className="text-2xl font-bold mb-4">New Event</h1>

                <Form {...form}>
                    <form ref={eventFormRef} onSubmit={handleSubmit} className="w-full space-y-8">
                        <CustomCloudImageUploader
                            eventFormData={eventFormRef.current ? new FormData(eventFormRef.current) : new FormData()}
                            onImageUpload={handleImageUpload}
                        />

                        <fieldset title="General Details" className="grid grid-cols-1 md:grrid-cols-2 gap-4 items-center align-middle border p-2">

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

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Event Description" rows={8} />
                                        </FormControl>
                                        <FormDescription>
                                            Briefly describe your event. What is it about? What makes it special? What can attendees expect? Keep it clear and precise.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                        </fieldset>

                        <fieldset title="Venue and Time Details" className="grid grid-cols-1 md:grrid-cols-2 gap-4 items-center align-middle border p-2">

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
                        <fieldset title="Ticketing details" className="grid grid-cols-2 gap-4 items-center align-middle border p-2 transition-all ease-linear duration-700 delay-200 ">
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
                                            name="ticket.price"
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
                                            name="ticket.totalTickets"
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
                            className="cursor-pointer"
                            type="submit" disabled={!imageData}>
                            {form.formState.isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                            Create Event</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
export default NewEvent