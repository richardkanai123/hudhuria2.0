// create or edit a user
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { api } from '../../../../convex/_generated/api';

// api route for getting, creating, updating and deleting users

// bcrypt
import bcrypt from 'bcrypt'


const validateUserSchema = (bodyData: unknown) => {
    const schema = z.object({
        name: z.string().min(5, { message: "Too short, minimum is 5 characters" }),
        email: z.string().email({ message: "Invalid email" }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .min(6, { message: "Password must be at least 6 characters" }),
        bio: z.string().min(10, { message: "Bio is required, at least 10 characters" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm password is required" })
            .min(6, { message: "Confirm password must be at least 8 characters" }),
        
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

    const result = schema.safeParse(bodyData)
    if (result.success) {
        return { valid: true, error: null }
    } else {
        return { valid: false, error: result.error.issues[0].message }
    }

}

export async function POST(request: NextRequest) { 
    try {
        // add new user
        const bodyData = await request.json();
        // validate body
        const { valid, error } = validateUserSchema(bodyData);
        if (!valid) {
            return NextResponse.json({ message: error }, { status: 400 })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(bodyData.password, 10)
        bodyData.password = hashedPassword

        // remove confirm password
        delete bodyData.confirmPassword

        // check if user already exists by comparing the email
        const existingUser = await fetchQuery(api.users.getUserByEmail, { email: bodyData.email });
        if (existingUser) {
            return NextResponse.json({ message: "User email already exists" }, { status: 400 })
        }


        // add new user
        const NewUser = await fetchMutation(api.users.AddNewUser, bodyData);
        if (!NewUser) {
            return NextResponse.json({ message: `Failed to add new user` }, { status: 400 })
        }
        return NextResponse.json({ message: `Added new user!` }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}


// update an existing user 
export async function PUT(request: NextRequest) {
    try {
        const bodyData = await request.json();
        // validate body
        const { valid, error } = validateUserSchema(bodyData);
        if (!valid) {
            return NextResponse.json({ message: error }, { status: 400 })
        }
        
        // update user
        const updatedUser = await fetchMutation(api.users.updateUser, bodyData);
        if (!updatedUser) {
            return NextResponse.json({ message: `Failed to update user` }, { status: 400 })
        }
        revalidatePath('/')
        return NextResponse.json({ message: `Updated user!` }, { status: 201 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: "Unknown error has occured" }, { status: 500 })
        }
    }
}
