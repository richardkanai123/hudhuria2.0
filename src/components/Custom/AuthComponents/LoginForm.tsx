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
import { IoLogIn } from "react-icons/io5";
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
// zod for validating the form inputs
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"




export function LoginForm() {

    const LoginFormSchema = z.object({
        email: z.string().email({ message: "Invalid email" }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .min(6, { message: "Password must be at least 6 characters" }),
    })

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const LoginNewUser = async (data: z.infer<typeof LoginFormSchema>) => {
        console.table(data)
    }

    return (
        <Card className="mx-auto w-full min-h-[75vh] max-w-[400px] my-4">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>

                <CardDescription className="text-xs">
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(LoginNewUser)} className="w-full grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder="user email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            <IoLogIn className="w-4 h-4 mr-2" />  Login
                        </Button>
                        <Button variant="outline" className="w-full  bg-sky-800 text-white">
                            <FcGoogle className="w-4 h-4 mr-2" />   Login with Google
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href='/signup' className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
