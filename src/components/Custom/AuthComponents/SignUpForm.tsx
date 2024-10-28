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
import Link from "next/link"
import { FcGoogle } from "react-icons/fc";

export function SignUpForm() {
    return (
        <Card className="mx-auto w-full min-h-[75vh] max-w-[450px]  my-4">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription className="text-xs">
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Robinson" required />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confrimPassword">Confrim Password</Label>
                        <Input id="confrimPassword" type="password" />
                    </div>
                    <Button type="submit" className="w-full font-semibold hover:bg-opacity-75  ">
                        Create an account
                    </Button>
                    <Button variant="outline" className="w-full bg-sky-800 text-white">
                        <FcGoogle className="w-4 h-4 mr-3" />  Sign up with Google
                    </Button>
                </div>
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
