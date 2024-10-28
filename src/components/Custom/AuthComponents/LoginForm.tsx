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
import { Label } from "@/components/ui/label"
import { IoLogIn } from "react-icons/io5";
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"

export function LoginForm() {
    return (
        <Card className="mx-auto w-full min-h-[75vh] max-w-[400px] my-4">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>

                <CardDescription className="text-xs">
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <div className="w-full grid gap-4">
                    <div className="w-full grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="w-full grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href='/resetPassword' className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        <IoLogIn className="w-4 h-4 mr-2" />  Login
                    </Button>
                    <Button variant="outline" className="w-full  bg-sky-800 text-white">
                        <FcGoogle className="w-4 h-4 mr-2" />   Login with Google
                    </Button>
                </div>
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
