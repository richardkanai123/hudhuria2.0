import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FaqComponent = () => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger> How do I create an event on your website?</AccordionTrigger>
                <AccordionContent>
                    <p>
                        Creating an event is simple! First, sign up for an account as an organizer. Once logged in, click on the &ldquo;Create Event&ldquo; button. Fill in the event details, such as the title, date, location, category, and ticket price (if applicable). You can also upload an event image and set the maximum number of attendees. After submitting, your event will be reviewed and listed for the audience to view and purchase tickets.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Can I list both free and paid events?</AccordionTrigger>
                <AccordionContent>
                    Yes, you can list both free and paid events. When creating an event, simply choose whether the event is free or specify the ticket price. Free events will be marked accordingly, while paid events will display the ticket price to users.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>How can I buy tickets for an event?</AccordionTrigger>
                <AccordionContent>
                    To buy tickets, browse the events listed on our website, select the event you are interested in, and click the &ldquo;Buy Tickets&ldquo; button. You will be prompted to enter your payment details, and upon successful payment, you will receive a confirmation email with your e-ticket.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Can I get a refund if I cannot attend an event?</AccordionTrigger>
                <AccordionContent>
                    Refunds are dependent on the event organizer&apos;s refund policy. Some events may offer refunds up to a certain date, while others may not. Please check the event details or contact the event organizer for specific refund options.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>How do I receive notifications about upcoming events?</AccordionTrigger>
                <AccordionContent>
                    You can receive notifications by subscribing to our newsletter or enabling notifications in your account settings. You can also follow specific event categories or cities to get alerts when new events are posted in those areas. We&apos;ll send you timely reminders and updates on events you&apos;re interested in.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger>Is there a limit to how many events I can create?</AccordionTrigger>
                <AccordionContent>
                    No, there is no limit to the number of events you can create. Whether you are organizing one or multiple events, you can list them all on our platform. Each event will be treated individually with its own details, ticketing options, and audience.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
                <AccordionTrigger> What payment methods are available for buying tickets?</AccordionTrigger>
                <AccordionContent>
                    We accept a wide range of payment methods including credit cards, debit cards, mobile payments (M-Pesa), and PayPal. The available options will be displayed at checkout, ensuring a secure and seamless transaction.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
                <AccordionTrigger> How do I promote my event to attract more attendees?</AccordionTrigger>
                <AccordionContent>
                    There are several ways to promote your event on our platform. You can choose to feature your event at an additional cost, ensuring more visibility on our homepage and in search results. Additionally, we offer tools to share your event on social media platforms and in email newsletters. You can also target audiences by city and event category to boost attendance.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default FaqComponent