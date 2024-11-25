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
import { IoLogIn, IoWarning } from "react-icons/io5";
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
// zod for validating the form inputs
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderPinwheel, Router } from "lucide-react";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
export function LoginForm() {

    const Router = useRouter()
    // get email from search params
    const searchParams = useSearchParams()
    const emailparam = searchParams.get('email')

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
            email: emailparam ? emailparam : "",
            password: "",
        }
    })

    const LoginNewUser = async (data: z.infer<typeof LoginFormSchema>) => {
        try {
            const res = await signIn('credentials', { email: data.email, password: data.password, redirect: false })
            if (!res?.error) {

                form.reset()
                Router.back()


            }

            if (res?.error) {

                switch (res?.error) {
                    case 'CredentialsSignin':
                        form.setError("root", { message: 'Invalid email or password' })
                        return { error: 'Invalid email or password' }
                    case 'AccessDenied':
                        form.setError("root", { message: 'Access denied for this user' })
                        return { error: 'Access denied for this user' }
                    case 'AccountNotLinked':
                        form.setError("root", { message: 'Account not linked' })
                        return { error: 'Account not linked' }
                    case 'InvalidCheck':
                        form.setError("root", { message: 'Invalid check' })
                        return { error: 'Invalid check' }
                    case 'MissingAdapter':
                        form.setError("root", { message: 'Missing adapter' })
                        return { error: 'Missing adapter' }
                    default:
                        form.setError("root", { message: 'Unable to login! Please try again' })
                        return { error: "Unable to login! Please try again" }
                }
            }
        } catch (error) {
            if (error instanceof AuthError) {
                form.setError("root", { message: error.message })
            }
            else {
                form.setError("root", { message: "Unable to login! Please try again" })
            }
        }
    }

    return (
        <Card className="mx-auto w-full h-full max-w-[600px] max-h-fit">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>

                <CardDescription className="text-xs">
                    Enter your credentials below to login to your account
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="w-full my-1">
                            {form.formState.errors.root && (
                                <div className="w-[80%] bg-gray-200 p-2 rounded-lg mx-auto text-center flex items-center align-middle gap-2 text-red-500">
                                    <IoWarning className="w-4 h-4" />
                                    <p className="text-sm"> {form.formState.errors.root.message}</p>
                                </div>

                            )}

                        </div>
                        <Button disabled={form.formState.isSubmitting || !form.formState.isValid} type="submit" className="w-full">
                            {
                                form.formState.isSubmitting ? <LoaderPinwheel className="w-4 h-4 mr-1 animate-spin" /> : <IoLogIn className="w-4 h-4 mr-2" />
                            }  Login
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
