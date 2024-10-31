'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormControl, Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


const NewUserSchema = z.object({
    name: z.string().min(5, { message: "Too short, minimum is 5 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Confirm password is required" })
        .min(6, { message: "Confirm password must be at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})


export function SignUpForm() {

    const form = useForm<z.infer<typeof NewUserSchema>>({
        resolver: zodResolver(NewUserSchema),
    })

    const SignUpNewUser = async (data: z.infer<typeof NewUserSchema>) => {
        console.table(data)

    }


    return (
        <Card className="mx-auto w-full min-h-[75vh] max-w-[450px]  my-4">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription className="text-xs">
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(SignUpNewUser)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Individual full name or company name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        For a company / organization please use your company name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email address (e.g. m@example.com) " {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public contact email address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Your preferred password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Must be atleast 8 characters.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confrim Password</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Confirm your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full font-semibold hover:bg-lime-500  ">
                            Create an account
                        </Button>
                        <Button variant="outline" className="w-full bg-sky-800 text-white">
                            <FcGoogle className="w-4 h-4 mr-3" />  Sign up with Google
                        </Button>
                    </form>

                </Form>

                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href='/login' className="underline">
                        Log In
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
