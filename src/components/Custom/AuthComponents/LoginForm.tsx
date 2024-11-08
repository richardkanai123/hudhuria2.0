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
import { useSearchParams } from "next/navigation";
import { LoginUserByCredentials } from "@/lib/authHelpers";
import { LoaderPinwheel } from "lucide-react";
export function LoginForm() {

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
        // send the form data to the server
        try {
            const res = await LoginUserByCredentials(data)
            console.log(res)
            if (res.error) {
                form.setError("root", { message: res.error })
            }
        } catch (error) {
            if (error instanceof Error) {
                form.setError("root", { message: error.message })

            }
        }
    }

    return (
        <Card className="mx-auto w-full min-h-[75vh] max-w-[400px] my-4">
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
